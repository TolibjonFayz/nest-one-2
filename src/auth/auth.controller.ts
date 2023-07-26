import { Controller, Get, Post, Body, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { createUserDto } from '../users/dto/createUser.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Userni registrartsiya qilish' })
  @Post('registration')
  create(@Body() createUserDto: createUserDto) {
    console.log(createUserDto);

    return this.authService.registration(createUserDto);
  }

  @ApiOperation({ summary: 'Userni login qilish' })
  @HttpCode(200)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);

    return this.authService.login(loginDto);
  }
}
