import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { createDriverDto } from './dto/create-driver.dto';
import { Driver } from './models/driver.model';
import { updateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('create')
  async createDriver(@Body() createDriverDto: createDriverDto) {
    return this.driverService.createDriver(createDriverDto);
  }

  @Get('all')
  async getAllDrivers(): Promise<Driver[]> {
    return this.driverService.getAllDivers();
  }

  @Get(':id')
  async getDriverById(@Param('id') id: string): Promise<Driver> {
    return this.driverService.getDriverById(+id);
  }

  @Delete(':id')
  async deleteDriverById(@Param('id') id: string): Promise<number> {
    return this.driverService.deleteDriverById(+id);
  }

  @Put(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: updateDriverDto,
  ): Promise<Driver> {
    return this.driverService.updateDriver(+id, updateDriverDto);
  }
}
