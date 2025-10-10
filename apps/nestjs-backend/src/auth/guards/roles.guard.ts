import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user-role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);
  
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    this.logger.debug('RolesGuard canActivate called. Required roles:', requiredRoles);
    
    if (!requiredRoles) {
      return true;
    }
    
    const req = context.switchToHttp().getRequest();
    this.logger.debug('RolesGuard - User from request:', req.user);
    
    if (!req?.user || typeof req.user.role === 'undefined') {
      this.logger.warn('RolesGuard - No user or user.role found in request');
      return false;
    }
    
    const hasRole = requiredRoles.some((role) => req.user.role === role);
    this.logger.debug('RolesGuard - Has required role:', hasRole, 'User role:', req.user.role, 'Required:', requiredRoles);
    
    return hasRole;
  }
}