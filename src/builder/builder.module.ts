import { Module } from '@nestjs/common';
import { BuilderController } from './builder.controller';
import { BuilderService } from './builder.service';

@Module({
  controllers: [BuilderController],
  providers: [BuilderService]
})
export class BuilderModule {}