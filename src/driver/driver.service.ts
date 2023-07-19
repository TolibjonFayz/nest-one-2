import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { createDriverDto } from './dto/create-driver.dto';
import { updateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private driverRepo: typeof Driver) {}

  async createDriver(createDriverDto: createDriverDto): Promise<Driver> {
    const driver = await this.driverRepo.create(createDriverDto);
    return driver;
  }

  async getAllDivers(): Promise<Driver[]> {
    const drivers = await this.driverRepo.findAll();
    return drivers;
  }

  async getDriverById(id: number): Promise<Driver> {
    const driver = await this.driverRepo.findByPk(id);
    return driver;
  }

  async deleteDriverById(id: number): Promise<number> {
    return this.driverRepo.destroy({ where: { id } });
  }

  async updateDriver(
    id: number,
    updateDriverDto: updateDriverDto,
  ): Promise<Driver> {
    const driver = await this.driverRepo.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return driver[1][0].dataValues;
  }
}
