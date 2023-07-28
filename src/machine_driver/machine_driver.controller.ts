import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Machine_DriverService } from './machine_driver.service';
import { CreateMachine_DriverDto } from './dto/create-machine_driver.dto';
import { Machine_Driver } from './models/machine_driver.model';
import { UpdateMachine_DriverDto } from './dto/update-machine_driver.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Machine haydovchilar')
@Controller('machine_driver')
export class Machine_DriverController {
  constructor(private readonly machine_driverService: Machine_DriverService) {}

  @ApiOperation({ summary: 'Machine driver yaratish' })
  @Post('create')
  async createMachine_Driver(
    @Body() createMachine_DriverDto: CreateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    const machine_driver =
      await this.machine_driverService.createMachine_Driver(
        createMachine_DriverDto,
      );
    return machine_driver;
  }

  @ApiOperation({ summary: 'Machine driverlarni ko`rish' })
  @Get('all')
  async getAllMachine_Driver(): Promise<Machine_Driver[]> {
    return this.machine_driverService.getAllMachine_Driver();
  }

  @ApiOperation({ summary: 'Machine driverni id orqali topish' })
  @Get(':id')
  async getMachine_DriverById(
    @Param('id') id: string,
  ): Promise<Machine_Driver> {
    return this.machine_driverService.getMachine_DriverById(+id);
  }

  @ApiOperation({ summary: 'Machine driverni o`chirish' })
  @Delete('id')
  async deleteMachine_DriverById(@Param('id') id: string): Promise<number> {
    return this.machine_driverService.deleteMachine_DriverById(+id);
  }

  @ApiOperation({ summary: 'Machine driverni o`zgartirish' })
  @Put(':id')
  async updateMachine_Driver(
    @Param('id') id: string,
    @Body() updateMachine_DriverDto: UpdateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    return this.machine_driverService.updateMachine_Driver(
      +id,
      updateMachine_DriverDto,
    );
  }
}
