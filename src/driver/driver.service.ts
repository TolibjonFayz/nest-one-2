import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './models/driver.model';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private driverRepo: typeof Driver) {}
  async createDriver(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = await this.driverRepo.create(createDriverDto);
    return driver;
  }

  async getAllDriver(): Promise<Driver[]> {
    const drivers = await this.driverRepo.findAll();
    console.log(drivers);

    return drivers;
  }

  async getDriverById(id: number): Promise<Driver> {
    const driver = await this.driverRepo.findByPk(id, {
      include: { all: true },
    });
    // const driver = await this.driverRepo.findOne({ where: { id } });
    return driver;
  }

  async getDriverByName(first_name: string): Promise<Driver> {
    const driver = await this.driverRepo.findOne({ where: { first_name } });
    return driver;
  }

  async deleteDriverById(id: number): Promise<number> {
    return this.driverRepo.destroy({ where: { id } });
  }

  async updateDriver(
    id: number,
    updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    const driver = await this.driverRepo.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    return driver[1][0].dataValues;
  }
}
