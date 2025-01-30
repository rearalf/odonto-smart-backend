import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserSession } from './entities/user-session.entity';
import { User } from 'src/user/entities/user.entity';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private getJwtToken(payload: any, refresh_token?: boolean) {
    return this.jwtService.sign(
      payload,
      refresh_token
        ? {
            expiresIn: this.configService.get('JWT_EXPIRENSIN_REFRESH'),
          }
        : {},
    );
  }

  private validateToken(token: string, ignoreExpiration?: boolean) {
    return this.jwtService.verify(token, {
      ignoreExpiration,
    });
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    return await this.dataSource.transaction(async (manage) => {
      const userRepository = manage.getRepository(User);

      const user = await userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .select([
          'user.id',
          'user.name',
          'user.last_name',
          'user.email',
          'user.password',
        ])
        .leftJoinAndSelect('user.role', 'userRole')
        .leftJoinAndSelect('userRole.role', 'role')
        .addSelect(['userRole.id', 'role.id', 'role.name', 'role.description'])
        .getOne();

      if (!user) throw new UnauthorizedException('Credentials are not valid.');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid.');

      const roles = user.role.map((rol) => ({
        id: rol.role.id,
        name: rol.role.name,
      }));

      const payload = {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        roles,
      };

      const access_token = this.getJwtToken(payload);

      const refresh_token = this.getJwtToken({ id: user.id }, true);

      this.create(refresh_token, user);

      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        roles,
        access_token,
        refresh_token,
      };
    });
  }

  async logOut(refresh_token: string) {
    const token: { id: number } = this.jwtService.verify(refresh_token);

    const sessions = await this.getSessionsByUserId(token.id);

    let current_session: UserSession;

    for (const session of sessions) {
      if (bcrypt.compareSync(refresh_token, session.refresh_token)) {
        current_session = session;
        break;
      }
    }

    const deleted = await this.deleteRefreshToken(current_session.id);

    if (deleted.affected > 0) {
      return deleted.affected;
    }
    return 0;
  }

  async getSessionsByUserId(userId: number) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(UserSession);

      const sessions = await repository
        .createQueryBuilder('user_session')
        .leftJoinAndSelect('user_session.user', 'user')
        .where('user.id = :userId', {
          userId,
        })
        .getMany();

      return sessions;
    });
  }

  async create(refresh_token: string, user: User) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(UserSession);

      const refresh_token_hash = bcrypt.hashSync(refresh_token, 10);

      const create = repository.create({
        refresh_token: refresh_token_hash,
        user,
      });

      await repository.save(create);
    });
  }

  async deleteRefreshToken(id: number) {
    return await this.dataSource.transaction(async (manage) => {
      const repository = manage.getRepository(UserSession);

      return await repository.delete({ id });
    });
  }

  async refreshToken(
    access_token: string,
    refresh_token: string,
    response: Response,
  ) {
    if (!refresh_token || !access_token)
      throw new UnauthorizedException({
        message: 'La sesión no existe.',
        statusCode: 401,
      });

    try {
      const verify_access_token = this.validateToken(access_token, true);
      const verify_refresh_token = this.validateToken(refresh_token, false);

      const sessions = await this.getSessionsByUserId(verify_refresh_token.id);

      let current_session: UserSession;

      for (const session of sessions) {
        if (bcrypt.compareSync(refresh_token, session.refresh_token)) {
          current_session = session;
          break;
        }
      }

      if (!current_session)
        throw new UnauthorizedException({
          message: 'Sesión invalida.',
          errorMessage: 'No existe la sesión',
        });

      const deleted = await this.deleteRefreshToken(current_session.id);

      if (deleted.affected === 0)
        throw new UnauthorizedException({
          message: 'Sesión invalida.',
          errorMessage: 'Error eliminando sesión',
        });

      const payload = {
        id: verify_access_token.id,
        name: verify_access_token.name,
        last_name: verify_access_token.last_name,
        email: verify_access_token.email,
        roles: verify_access_token.roles,
      };

      const new_access_token = this.getJwtToken(payload);

      const new_refresh_token = this.getJwtToken(
        {
          id: current_session.user.id,
        },
        true,
      );

      this.create(new_refresh_token, current_session.user);

      return { new_refresh_token, new_access_token };
    } catch (error) {
      if (error as TokenExpiredError) {
        const verify_refresh_token = this.validateToken(refresh_token, true);

        await this.deleteRefreshToken(verify_refresh_token.id);

        response.clearCookie('access_token');
        response.clearCookie('refresh_token');

        throw new UnauthorizedException({
          message: 'Sesión expirada. Inicie sesión nuevamente.',
          errorMessage: 'El refresh token ha expirado.',
          statusCode: 401,
          expiredAt:
            new Date(error.expiredAt).toLocaleDateString() +
            ' - ' +
            new Date(error.expiredAt).toLocaleTimeString(),
          error,
        });
      }
      throw new UnauthorizedException({
        message: 'Token no valido.',
        statusCode: 401,
        error,
      });
    }
  }
}
