import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { Driver } from './models/driver.model';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Haydovchilar')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiOperation({ summary: 'Haydovchi yaratish' })
  @Post('create')
  async createDriver(
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<Driver> {
    const driver = await this.driverService.createDriver(createDriverDto);
    return driver;
  }

  @ApiOperation({ summary: 'Haydovchilarni ko`rish' })
  @Get('all')
  async getAllDriver(): Promise<Driver[]> {
    return this.driverService.getAllDriver();
  }

  @ApiOperation({ summary: 'Haydovchini id orqali topish' })
  @Get(':id')
  async getDriverById(@Param('id') id: string): Promise<Driver> {
    return this.driverService.getDriverById(+id);
  }

  @ApiOperation({ summary: 'Haydovchini nomi orqali topish' })
  @Get('name/:name')
  async getDriverByName(@Param('name') first_name: string): Promise<Driver> {
    return this.driverService.getDriverByName(first_name);
  }

  @ApiOperation({ summary: 'Haydovchini id orqali o`chirish' })
  @Delete('id')
  async deleteDriverById(@Param('id') id: string): Promise<number> {
    return this.driverService.deleteDriverById(+id);
  }

  @ApiOperation({ summary: 'Haydovchini id orqali o`zgartirish' })
  @Put(':id')
  async updateDriver(
    @Param('id') id: string,
    @Body() updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    return this.driverService.updateDriver(+id, updateDriverDto);
  }
}
