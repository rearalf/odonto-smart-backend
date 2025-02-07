import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isActive = (await super.canActivate(context)) as boolean;
    if (!isActive) return false;

    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user as { id: number; roles: { id: number }[] };

    const permissions = new Set(await this.getUserPermissions(user));

    if (!this.hasRequiredPermissions(permissions, requiredPermissions)) {
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

    const userPermissions = await this.permissionService.getPermissionsByUserId(
      user.id,
    );

    return [...new Set([...rolePermissions.flat(), ...userPermissions])];
  }

  private hasRequiredPermissions(
    permissions: Set<string>,
    requiredPermissions: string[],
  ): boolean {
    return requiredPermissions.every((permission) =>
      permissions.has(permission),
    );
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (info?.expiredAt) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: `La sesión ha expirado el ${new Date(info.expiredAt).toLocaleString()}.`,
      });
    }

    return user;
  }
}
