import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { Builder } from './builder/models/builder.model';
import { BuilderModule } from './builder/builder.module';
import { Machine } from './machine/models/machine.model';
import { MachineModule } from './machine/machine.module';
import { Driver } from './driver/models/driver.model';
import { DriverModule } from './driver/driver.module';
import { Machine_Driver } from './machine_driver/models/machine_driver.model';
import { Machine_DriverModule } from './machine_driver/machine_driver.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/model/role.model';
import { UsersModule } from './users/users.module';
import { User } from './users/model/user.model';
import { UserRoles } from './roles/model/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/models/post.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Company,
        Builder,
        Machine,
        Driver,
        Machine_Driver,
        Role,
        User,
        UserRoles,
        Post,
      ],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    BuilderModule,
    MachineModule,
    DriverModule,
    Machine_DriverModule,
    RolesModule,
    UsersModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
