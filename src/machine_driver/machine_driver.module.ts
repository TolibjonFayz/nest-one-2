import { Module } from '@nestjs/common';
import { MachineDriverController } from './machine_driver.controller';
import { MachineDriverService } from './machine_driver.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine-driver.model';

@Module({
  imports: [SequelizeModule.forFeature([MachineDriver])],
  controllers: [MachineDriverController],
  providers: [MachineDriverService],
})
export class MachineDriverModule {}
