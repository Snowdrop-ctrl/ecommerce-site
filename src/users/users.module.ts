import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserModel } from 'src/db/models/user.model';
import { RoleModel } from 'src/db/models/role.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [ObjectionModule.forFeature([UserModel, RoleModel]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UsersService,RolesService],
  exports: [UsersService],
})
export class UsersModule {}
