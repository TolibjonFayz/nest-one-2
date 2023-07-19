import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { createMachineDto } from './dto/create-machine.dto';
import { Machine } from './models/machine.model';
import { updateMachineDto } from './dto/update-machine.dto';

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('create')
  async createMachine(@Body() createMachineDto: createMachineDto) {
    return this.machineService.createMachine(createMachineDto);
  }

  @Get('all')
  async getAllMachine(): Promise<Machine[]> {
    return this.machineService.getAllMachine();
  }

  @Get(':id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return this.machineService.getMachineById(+id);
  }

  @Delete(':id')
  async deleteMachineById(@Param('id') id: string): Promise<number> {
    return this.machineService.deleteMachineById(+id);
  }

  @Put(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: updateMachineDto,
  ): Promise<Machine> {
    return this.machineService.updateMachine(+id, updateMachineDto);
  }
}
