import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesService } from 'src/roles/roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller({
  path: 'roles',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get('/')
  @ApiBearerAuth('access-token')
  async getRoles() {
    return this.rolesService.getAllRoles();
  }
}
