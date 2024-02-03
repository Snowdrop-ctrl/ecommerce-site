import { Module } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { RolesController } from 'src/roles/roles.controller';
import { RoleModel } from 'src/db/models/role.model';

@Module({
  imports: [ObjectionModule.forFeature([RoleModel])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
