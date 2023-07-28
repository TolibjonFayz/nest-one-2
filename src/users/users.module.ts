import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from '../roles/model/user-roles.model';
import { User } from './model/user.model';
import { RolesModule } from '../roles/roles.module';
import { Role } from '../roles/model/role.model';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/models/post.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RolesModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
