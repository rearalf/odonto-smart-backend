import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies['access_token'],
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    _request: Request,
    payload: {
      id: number;
      name: string;
      last_name: string;
      email: string;
      roles: { id: number; name: string }[];
    },
  ) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    return {
      id: payload.id,
      name: payload.name,
      last_name: payload.last_name,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
