import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export interface AuthData {
  id: string | number;
  user_name: string;
  tenant_id: string | number;
  role_id: string | number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: AuthData) {
    return payload
  }
}
