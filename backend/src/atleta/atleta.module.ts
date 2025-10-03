// backend/src/atleta/atleta.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atleta } from './ateleta.entity';
import { AtletaController } from './atleta.controller';
import { AtletaService } from './atleta.service';


@Module({
  imports: [TypeOrmModule.forFeature([Atleta])], 
  providers: [AtletaService],
  controllers: [AtletaController],
  exports: [TypeOrmModule],
})
export class AtletaModule {}