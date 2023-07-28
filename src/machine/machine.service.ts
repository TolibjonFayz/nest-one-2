import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { CreateMachineDto } from './dto/create-machine.dto';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine) private machineRepo: typeof Machine) {}
  async createMachine(createMachineDto: CreateMachineDto): Promise<Machine> {
    const machine = await this.machineRepo.create(createMachineDto);
    return machine;
  }

  async getAllMachine(): Promise<Machine[]> {
    const machines = await this.machineRepo.findAll({ include: { all: true } });
    return machines;
  }

  async getMachineById(id: number): Promise<Machine> {
    const machine = await this.machineRepo.findByPk(id, {
      include: { all: true },
    });
    // const machine = await this.machineRepo.findOne({ where: { id } });
    return machine;
  }

  async getMachineByName(name: string): Promise<Machine> {
    const machine = await this.machineRepo.findOne({
      where: { name },
      include: { all: true },
    });
    return machine;
  }

  async deleteMachineById(id: number): Promise<number> {
    return this.machineRepo.destroy({ where: { id } });
  }

  async updateMachine(
    id: number,
    updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    const machine = await this.machineRepo.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    return machine[1][0].dataValues;
  }
}
