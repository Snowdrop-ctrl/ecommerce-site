import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import omit from 'lodash/omit'
import {
  LoginDto,
  RegisterDto,
} from 'src/auth/auth.dto';
import { ERROR_MESSAGES } from 'src/constants/error.messages';
import { SUCCESS_MESSAGES } from 'src/constants/success.messages';
import { UserModel } from 'src/db/models/user.model';
import { OrdersService } from 'src/orders/orders.service';
import { RolesService } from 'src/roles/roles.service';
import { JwtPayload } from 'src/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private readonly rolesService: RolesService,
    // private readonly ordersService: OrdersService,

    @Inject(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  generateToken(payload: JwtPayload, expiryInDays?: number) {
    return this.jwtService.sign(payload, {
      expiresIn: `${expiryInDays || 7} days`,
    });
  }


  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      return omit(user, ['password']);
    }

    return null;
  }

  async login(payload: LoginDto) {
    const { password, email } = payload;
    const user = await this.validateUser(email, password);


    if (user) {
      const payload = { email: user.email, id: user.id };
      return {
        user,
        accessToken: this.generateToken(payload),
      };
    }

    throw new HttpException(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
  }

  async register(payload: RegisterDto) {
    const {
      password,
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      country,
      state
    } = payload;

    const getUserByEmailId = await this.usersService.findUserByEmail(email);

    if (getUserByEmailId) {
      throw new HttpException(ERROR_MESSAGES.ACCOUNT_ALREADY_EXISTS, 409);
    }

    const user = await this.userModel.transaction(async (trx) => {
      let role = null;

      role = await this.rolesService.findRoleBySlug('user');

      const user = await this.usersService.create(
        {
          email,
          password:
            password ? bcrypt.hashSync(password, 10) : null,
          firstName,
          lastName,
          phoneNumber,
          address,
          country,
          state,
          roleId: role.id,
        },
        trx,
      );

      return user;
    });

    if (!user) {
      throw new HttpException(ERROR_MESSAGES.USER_NOT_CREATED, 500);
    }

    return {
        user,
        accessToken: this.generateToken({ email: user.email, id: user.id }),
        message: SUCCESS_MESSAGES.REGISTRATION_COMPLETED,
    };
  }

  async getCurrentUser(email: string) {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException(ERROR_MESSAGES.USER_NOT_FOUND, 404);
    }

    delete user.password;

    return user;
  }
}
