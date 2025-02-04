import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

// TODO: Add revoke tokens feature.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookies]),
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
    return { ...payload };
  }
}

function extractJwtFromCookies(request: Request): string | null {
  return request.cookies['access_token'] || null;
}
