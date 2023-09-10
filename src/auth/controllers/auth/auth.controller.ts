import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/LoginDto.dto';
import { SignUpDto } from 'src/auth/dtos/SignUpDto.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
