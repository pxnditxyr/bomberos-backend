import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';

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
    return `You're signed in!`
  } 

  @Get( 'check-auth-status' )
  checkAuthStatus () {
    return `You're authenticated!`
  }

}
