import { Module } from '@nestjs/common';
import { Machine_DriverController } from './machine_driver.controller';
import { Machine_DriverService } from './machine_driver.service';
import { Sequelize } from 'sequelize';
import { Machine_Driver } from './models/machine_driver.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Machine_Driver])],
  controllers: [Machine_DriverController],
  providers: [Machine_DriverService],
})
export class Machine_DriverModule {}
