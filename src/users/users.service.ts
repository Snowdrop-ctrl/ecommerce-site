import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/db/models/user.model';
import { Transaction } from 'objection';

@Injectable()
export class UsersService {

  constructor(
      @Inject(UserModel)
      private userModel: typeof UserModel
    ){}

  async findUserByEmail(email: string) {

    const user = await this.userModel
      .query()
      .select('users.*')
      .where({ email: email })
      .withGraphJoined('role')
      .first();

    return user;
  }

  async create(user: Partial<UserModel>, trx?: Transaction) {
    return this.userModel.query(trx).insert(user).returning('*');
  }
}
