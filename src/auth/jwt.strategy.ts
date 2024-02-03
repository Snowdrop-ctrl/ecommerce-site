import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'src/types';
import { UsersService } from 'src/users/users.service';
import { ERROR_MESSAGES } from 'src/constants/error.messages';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;

    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_JWT_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
