import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine-driver.model';
import { createMachineDriverDto } from './dto/create-machinedriver.dto';

@Injectable()
export class MachineDriverService {
  constructor(
    @InjectModel(MachineDriver)
    private machinedriverRepo: typeof MachineDriver,
  ) {}

  async createMachineDriver(
    createMachineDriverDto: createMachineDriverDto,
  ): Promise<MachineDriver> {
    const machinedriver = await this.machinedriverRepo.create(
      createMachineDriverDto,
    );
    return machinedriver;
  }

  async getAllMachineDriver(): Promise<MachineDriver[]> {
    const machineDrivers = await this.machinedriverRepo.findAll({
      include: { all: true },
    });
    return machineDrivers;
  }
}
