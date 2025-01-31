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
    const user = request.user as { id: number; roles: { id: number }[] };

    const permissions = await this.getUserPermissions(user);

    if (
      permissions.length === 0 ||
      !this.hasRequiredPermissions(permissions, requiredPermissions)
    ) {
      throw new UnauthorizedException(
        'Acceso denegado: Permisos insuficientes.',
      );
    }

    return true;
  }

  private async getUserPermissions(user: {
    id: number;
    roles: { id: number }[];
  }): Promise<string[]> {
    const rolePermissions = await Promise.all(
      user.roles.map((role) =>
        this.permissionService.getPermissionsByRoleId(role.id),
      ),
    );
    const permissionsFromRoles = rolePermissions.flat();
    const permissionsFromUser =
      await this.permissionService.getPermissionsByUserId(user.id);

    return [...permissionsFromRoles, ...permissionsFromUser];
  }

  private hasRequiredPermissions(
    permissions: string[],
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.every((permission) =>
      permissions.includes(permission),
    );
  }

  handleRequest(err, user, info) {
    if (info) {
      const messages = { statusCode: 401 };
      const message = info.expiredAt
        ? `La sesión ha expirado. Expirará el ${new Date(info.expiredAt).toLocaleString()}`
        : 'La sesión no existe.';

      throw new UnauthorizedException({ ...messages, message });
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
