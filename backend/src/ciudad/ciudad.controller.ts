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
import { CiudadService } from './ciudad.service';
import { CreateCiudadDto } from './Dtos/create-ciudad.dto';
import { UpdateCiudadDto } from './Dtos/update-ciudad.dto';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Post()
  async CreateCiudad(@Body() ciudadDto: CreateCiudadDto) {
    const result = await this.ciudadService.create(ciudadDto);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }

    return result.value;
  }

  @Get()
  async GetCiudades() {
    const result = await this.ciudadService.findAll();

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }

    return result.value;
  }

  @Get(':id')
  async GetCiudad(@Param('id', ParseIntPipe) id: number) {
    const result = await this.ciudadService.findOne(id);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }

    return result.value;
  }

  @Put(':id')
  async UpdateCiudad(
    @Param('id', ParseIntPipe) id: number,
    @Body() ciudadDto: UpdateCiudadDto,
  ) {
    const result = await this.ciudadService.update(id, ciudadDto);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }

    return result.value;
  }

  @Delete(':id')
  @HttpCode(204)
  async DeleteCiudad(@Param('id', ParseIntPipe) id: number) {
    const result = await this.ciudadService.remove(id);

    if (!result.isSuccess) {
      throw new HttpException(result.error.message, result.error.status);
    }
  }
}
