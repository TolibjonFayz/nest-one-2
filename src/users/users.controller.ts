import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/createUser.dto';
import { User } from './models/users.model';
import { AddRoleDto } from './dto/add-role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @ApiResponse({ status: 200, description: 'List of users', type: [User] })
  @Post()
  createUser(@Body() createUserDto: createUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchilarni ko`rish' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getOneUser(id);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchiga rolelini nimadir qilish' })
  @HttpCode(200)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchiga activate qilish' })
  @HttpCode(200)
  @Post('activate')
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activateUser(activateUserDto);
  }

  @ApiOperation({ summary: 'Foydalanuvchiga deactivate qilish' })
  @HttpCode(200)
  @Post('deactivate')
  deactivateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.deactivateUser(activateUserDto);
  }
}
