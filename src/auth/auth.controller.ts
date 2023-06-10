import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { User } from './entities/user.entity';

@Controller( 'auth' )
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post( 'signup' )
  create ( @Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post( 'signin' )
  signIn ( @Body() signInUserDto: SignInUserDto ) {
    return this.authService.signIn( signInUserDto );
  } 

  @Get( 'check-auth-status' )
  @Auth()
  checkAuthStatus ( @GetUser() user : User ) {
    return this.authService.checkAuthStatus( user );
  }

  
}
