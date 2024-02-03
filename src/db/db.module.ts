import { Module } from '@nestjs/common';
import { knexSnakeCaseMappers } from 'objection';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModel } from 'src/db/models/user.model';
import { OrderModel } from 'src/db/models/order.model';
import { RoleModel } from 'src/db/models/role.model';

const models = [
  RoleModel,
  UserModel,
  OrderModel,
];

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory() //config: ConfigService
      {
        return {
          config: {
            client: 'pg',
            connection: 'pg://postgres:myPassword@localhost:5432/ecommerce',
            debug: process.env.KNEX_DEBUG === 'true',
            ...knexSnakeCaseMappers({ underscoreBeforeDigits: true }),
          },
        };
      },
    }),
    //Register your objection models, so it can be provided when needed.
    ObjectionModule.forFeature([...models]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
