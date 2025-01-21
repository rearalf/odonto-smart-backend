import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionService } from '../../permission/permission.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isActive = await super.canActivate(context);
    if (!isActive) return false;

    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as {
      id: number;
      name: string;
      last_name: string;
      email: string;
      roles: { id: number; name: string }[];
    };

    const permissions: string[] = [];

    for (const role of user.roles) {
      const permissionsByRole =
        await this.permissionService.getPermissionsByRoleId(role.id);

      permissions.push(...permissionsByRole);
    }

    const userPermissions = await this.permissionService.getPermissionsByUserId(
      user.id,
    );

    permissions.push(...userPermissions);

    if (permissions.length === 0) {
      throw new UnauthorizedException(
        'Acceso denegado: Permisos insuficientes.',
      );
    }

    const hasPermission = requiredPermissions.every((permission) =>
      permissions.includes(permission),
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        'Acceso denegado: Permisos insuficientes.',
      );
    }

    return true;
  }

  handleRequest(err, user, _info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
