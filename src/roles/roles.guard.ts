import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {    
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;    
    if (!token) {      
      throw new UnauthorizedException();
    }
    try {      
      const payload = await this.jwtService.verifyAsync(token);                  
      if (payload.role == "Commander") {
        request['user'] = payload;
        return true
      }
      return false
    }
    catch {      
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {      
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);  
      request['user'] = payload;          
      return true
      }
    catch {      
      throw new UnauthorizedException();
    }
  }
}