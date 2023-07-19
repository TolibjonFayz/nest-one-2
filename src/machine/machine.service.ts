import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Machine } from './models/machine.model';
import { createMachineDto } from './dto/create-machine.dto';
import { updateMachineDto } from './dto/update-machine.dto';

@Injectable()
export class MachineService {
  constructor(@InjectModel(Machine) private machineRepo: typeof Machine) {}

  async createMachine(createMachineDto: createMachineDto): Promise<Machine> {
    const machine = await this.machineRepo.create(createMachineDto);
    return machine;
  }

  async getAllMachine(): Promise<Machine[]> {
    const machines = await this.machineRepo.findAll();
    return machines;
  }

  async getMachineById(id: number): Promise<Machine> {
    const machine = await this.machineRepo.findByPk(id);
    return machine;
  }

  async deleteMachineById(id: number): Promise<number> {
    return this.machineRepo.destroy({ where: { id } });
  }

  async updateMachine(
    id: number,
    UpdateMachineDto: updateMachineDto,
  ): Promise<Machine> {
    const machine = await this.machineRepo.update(UpdateMachineDto, {
      where: { id },
      returning: true,
    });
    return machine[1][0].dataValues;
  }
}
