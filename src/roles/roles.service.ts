import { Inject, Injectable } from '@nestjs/common';
import { RoleModel } from 'src/db/models/role.model';

@Injectable()
export class RolesService {
  constructor(
    @Inject(RoleModel)
    private roleModel: typeof RoleModel,
  ) {}

  async findRoleBySlug(slug: string) {
    return this.roleModel.query().select('*').where({ slug: slug }).first();
  }

  async findRoleById(id: number) {
    return this.roleModel.query().findById(id)
  }

  async getAllRoles() {
    return this.roleModel.query().select('*');
  }
}
