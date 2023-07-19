import { Controller, Post, Body, Get, Put, Delete } from '@nestjs/common';
import { MachineDriverService } from './machine_driver.service';
import { createMachineDriverDto } from './dto/create-machinedriver.dto';
import { MachineDriver } from './models/machine-driver.model';

@Controller('machine-driver')
export class MachineDriverController {
  constructor(private readonly machineDriverService: MachineDriverService) {}

  @Post('create')
  async createMachineDrive(
    @Body() createMachineDriverDto: createMachineDriverDto,
  ) {
    return this.machineDriverService.createMachineDriver(
      createMachineDriverDto,
    );
  }

  @Get('all')
  async getAllMachineDrivers(): Promise<MachineDriver[]> {
    return this.machineDriverService.getAllMachineDriver();
  }
}
