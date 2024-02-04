import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (
    req: any,
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (
      username === process.env.ADMIN_BASIC_AUTH_USERNAME &&
      password === process.env.ADMIN_BASIC_AUTH_PASSWORD
    ) {
      return true;
    }

    throw new UnauthorizedException();
  };
}
