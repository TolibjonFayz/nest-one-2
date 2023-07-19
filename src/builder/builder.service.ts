import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Builder } from './models/builder.modules';
import { createBuilderDto } from './dto/create-builder.dto';

@Injectable()
export class BuilderService {
  constructor(@InjectModel(Builder) private builderRepo: typeof Builder) {}

  async getAllBuilder(): Promise<Builder[]> {
    const builders = await this.builderRepo.findAll({ include: { all: true } });
    return builders;
  }

  async createBuilder(createBuilderDto: createBuilderDto): Promise<Builder> {
    const builder = await this.builderRepo.create(createBuilderDto);
    return builder;
  }
}
