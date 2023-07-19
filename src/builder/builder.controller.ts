import { Controller, Post, Get, Body } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { Builder } from './models/builder.modules';
import { createBuilderDto } from './dto/create-builder.dto';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService: BuilderService) {}

  @Get('all')
  async getAllBuilder(): Promise<Builder[]> {
    return this.builderService.getAllBuilder();
  }

  @Post('create')
  async createBuilder(@Body() createBuilderDto: createBuilderDto) {
    return this.builderService.createBuilder(createBuilderDto);
  }
}
