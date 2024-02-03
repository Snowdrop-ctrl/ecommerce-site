import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
