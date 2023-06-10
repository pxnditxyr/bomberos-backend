import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor (
    private readonly reflector : Reflector
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles : string[] = this.reflector.get( 'roles', context.getHandler() );

    if ( !validRoles ) return true
    if ( validRoles.length === 0 ) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user as User

    if ( !user )
      throw new InternalServerErrorException( 'User not found' )

    for ( const role of user.role ) {
      if ( validRoles.includes( role ) ) return true
    }

    throw new UnauthorizedException( `User does not have any of the following roles: ${ validRoles.join( ', ' ) }` )
  }
}
