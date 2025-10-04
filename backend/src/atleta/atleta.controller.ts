import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AtletaService } from './atleta.service';
import { CreateAtletaDto } from './Dtos/create.atleta.dto';
import { UpdateAtletaDto } from './Dtos/update.atleta.dto';

@Controller('atleta')
export class AtletaController {
  constructor(private readonly atletaService: AtletaService) {}

  @Post()
  async CreateAtleta(@Body() createAtletaDto: CreateAtletaDto) {
    const Result = await this.atletaService.create(createAtletaDto);

    if (!Result.isSuccess) {
      throw new HttpException(Result.error.message, Result.error.status);
    }

    return Result.value;
  }

  @Get()
  async GetAtletas() {
    const result = await this.atletaService.findAll();

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }
    return result.value;
  }

  @Get(':id')
  async findOneAtleta(@Param('id', ParseIntPipe) id: number) {
    const result = await this.atletaService.findOne(id);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }
    return result.value;
  }

  @Put(':id')
  async UpdateAtleta(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAtletaDto: UpdateAtletaDto,
  ) {
    const result = await this.atletaService.update(id, updateAtletaDto);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }

    return result.value;
  }

  @Delete(':id')
  @HttpCode(204) // Si el método termina sin excepción, la respuesta es 204 No Content
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.atletaService.remove(id);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }
  }
}
