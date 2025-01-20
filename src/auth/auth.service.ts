import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { SignInDto } from './dto/signin.dto';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payload: any) {
    return this.jwtService.sign(payload);
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
        .getOne();

      if (!user) throw new UnauthorizedException('Credentials are not valid.');

      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid.');

      const token = this.getJwtToken({ id: user.id });

      return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        access_token: token,
      };
    });
  }
}
