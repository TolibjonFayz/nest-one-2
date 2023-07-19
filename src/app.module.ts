import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CompanyModule } from './company/company.module';
import { Company } from './company/models/company.model';
import { MachineModule } from './machine/machine.module';
import { Machine } from './machine/models/machine.model';
import { DriverModule } from './driver/driver.module';
import { BuilderModule } from './builder/builder.module';
import { Driver } from './driver/models/driver.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Company, Machine, Driver],
      autoLoadModels: true,
      logging: true,
    }),
    CompanyModule,
    MachineModule,
    DriverModule,
    BuilderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
