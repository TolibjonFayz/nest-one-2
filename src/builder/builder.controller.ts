import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { Builder } from './models/builder.model';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Quruvchi')
@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @ApiOperation({ summary: 'Quruvchi yaratish' })
  @Post('create')
  async createBuilder(
    @Body() createBuilderDto: CreateBuilderDto,
  ): Promise<Builder> {
    const builder = await this.builderService.createBuilder(createBuilderDto);
    return builder;
  }

  @ApiOperation({ summary: 'Quruvchilarni ko`rish' })
  @Get('all')
  async getAllBuilder(): Promise<Builder[]> {
    return this.builderService.getAllBuilder();
  }

  @ApiOperation({ summary: 'Quruvchini id orqali topish' })
  @Get(':id')
  async getBuilderById(@Param('id') id: string): Promise<Builder> {
    return this.builderService.getBuilderById(+id);
  }

  @ApiOperation({ summary: 'Quruvchini nomi orqali topish' })
  @Get('name/:name')
  async getBuilderByName(@Param('name') full_name: string): Promise<Builder> {
    return this.builderService.getBuilderByName(full_name);
  }

  @ApiOperation({ summary: 'Quruvchini id orqali o`chirish' })
  @Delete('id')
  async deleteBuilderById(@Param('id') id: string): Promise<number> {
    return this.builderService.deleteBuilderById(+id);
  }

  @ApiOperation({ summary: 'Quruvchini id orqali o`zgartirish' })
  @Put(':id')
  async updateBuilder(
    @Param('id') id: string,
    @Body() updateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    return this.builderService.updateBuilder(+id, updateBuilderDto);
  }
}
