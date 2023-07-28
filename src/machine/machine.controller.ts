import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { Machine } from './models/machine.model';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Machinelar')
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @ApiOperation({ summary: 'Machine yaratish' })
  @Post('create')
  async createMachine(
    @Body() createMachineDto: CreateMachineDto,
  ): Promise<Machine> {
    const machine = await this.machineService.createMachine(createMachineDto);
    return machine;
  }

  @ApiOperation({ summary: 'Machinelarni ko`rish' })
  @Get('all')
  async getAllMachine(): Promise<Machine[]> {
    return this.machineService.getAllMachine();
  }

  @ApiOperation({ summary: 'Machineni id orqali topish' })
  @Get(':id')
  async getMachineById(@Param('id') id: string): Promise<Machine> {
    return this.machineService.getMachineById(+id);
  }

  @ApiOperation({ summary: 'Machineni nomi orqali topish' })
  @Get('name/:name')
  async getMachineByName(@Param('name') name: string): Promise<Machine> {
    return this.machineService.getMachineByName(name);
  }

  @ApiOperation({ summary: 'Machineni id orqali o`chirish' })
  @Delete('id')
  async deleteMachineById(@Param('id') id: string): Promise<number> {
    return this.machineService.deleteMachineById(+id);
  }

  @ApiOperation({ summary: 'Machineni id orqali o`zgartirish' })
  @Put(':id')
  async updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.machineService.updateMachine(+id, updateMachineDto);
  }
}
