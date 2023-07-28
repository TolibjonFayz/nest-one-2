import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine_Driver } from './models/machine_driver.model';
import { UpdateMachine_DriverDto } from './dto/update-machine_driver.dto';
import { CreateMachine_DriverDto } from './dto/create-machine_driver.dto';

@Injectable()
export class Machine_DriverService {
  constructor(
    @InjectModel(Machine_Driver)
    private machine_driverRepo: typeof Machine_Driver,
  ) {}
  async createMachine_Driver(
    createMachine_DriverDto: CreateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    const machine_driver = await this.machine_driverRepo.create(
      createMachine_DriverDto,
    );
    return machine_driver;
  }

  async getAllMachine_Driver(): Promise<Machine_Driver[]> {
    const machine_drivers = await this.machine_driverRepo.findAll({
      include: { all: true },
    });
    return machine_drivers;
  }

  async getMachine_DriverById(id: number): Promise<Machine_Driver> {
    const machine_driver = await this.machine_driverRepo.findByPk(id, {
      include: { all: true },
    });
    // const machine_driver = await this.machine_driverRepo.findOne({ where: { id } });
    return machine_driver;
  }

  async deleteMachine_DriverById(id: number): Promise<number> {
    return this.machine_driverRepo.destroy({ where: { id } });
  }

  async updateMachine_Driver(
    id: number,
    updateMachine_DriverDto: UpdateMachine_DriverDto,
  ): Promise<Machine_Driver> {
    const machine_driver = await this.machine_driverRepo.update(
      updateMachine_DriverDto,
      {
        where: { id },
        returning: true,
      },
    );
    return machine_driver[1][0].dataValues;
  }
}
