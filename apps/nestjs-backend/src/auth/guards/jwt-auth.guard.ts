import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable as InjectableDecorator } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecutionContext } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const envSecret = configService.get<string>('JWT_SECRET');
    const fallbackSecret = 'default-secret-key-change-in-production';
    const secret = envSecret || fallbackSecret;
    
    console.log('JWT Strategy - Environment secret:', envSecret);
    console.log('JWT Strategy - Using secret:', secret);
    console.log('JWT Strategy - Secret length:', secret.length);
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    console.log('JWT Strategy validate called with payload:', payload);
    return { 
      userId: payload.sub, 
      email: payload.email, 
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName
    };
  }
}

@InjectableDecorator()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard canActivate called');
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    console.log('Authorization header:', authHeader ? 'Present' : 'Missing');
    
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('JwtAuthGuard handleRequest:', { err, user, info });
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}