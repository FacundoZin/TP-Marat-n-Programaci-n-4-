import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { failure, Result, success } from 'src/Common/result.type';
import { Repository } from 'typeorm';
import { Atleta } from './ateleta.entity';
import { CreateAtletaDto } from './Dtos/create.atleta.dto';
import { UpdateAtletaDto } from './Dtos/update.atleta.dto';

@Injectable()
export class AtletaService {
  constructor(
    @InjectRepository(Atleta)
    private atletaRepository: Repository<Atleta>,
  ) {}

  async create(atletaDto: CreateAtletaDto): Promise<Result<Atleta>> {
    try {
      const isDniUnique = await this.validateDniUnique(atletaDto.dni);
      if (!isDniUnique) {
        return failure(`El DNI ${atletaDto.dni} ya está en uso.`, 400);
      }
      const atleta = this.atletaRepository.create(atletaDto);
      const atletaCreado = await this.atletaRepository.save(atleta);

      return success(atletaCreado, 201);
    } catch (error) {
      console.error('Error al crear el atleta:', error);
      return failure('Error interno del servidor al crear el atleta.', 500);
    }
  }

  async findAll(): Promise<Result<Atleta[]>> {
    try {
      const atletas = await this.atletaRepository.find();
      return success(atletas, 200);
    } catch (error) {
      console.error('Error al obtener los atletas:', error);
      return failure('Error interno del servidor al obtener los atletas.', 500);
    }
  }

  async findOne(id: number): Promise<Result<Atleta>> {
    try {
      const atleta = await this.atletaRepository.findOneBy({ id });
      if (!atleta) {
        return failure('Atleta no encontrado.', 404);
      }
      return success(atleta, 200);
    } catch (error) {
      console.error('Error al obtener el atleta:', error);
      return failure('Error interno del servidor al obtener el atleta.', 500);
    }
  }

  async remove(id: number): Promise<Result<null>> {
    try {
      const result = await this.findOne(id);
      if (!result.isSuccess) {
        return result;
      }
      await this.atletaRepository.remove(result.value);
      return success(null, 204);
    } catch (error) {
      console.error('Error al eliminar el atleta:', error);
      return failure('Error interno del servidor al eliminar el atleta.', 500);
    }
  }

  async update(
    id: number,
    atletaDto: UpdateAtletaDto,
  ): Promise<Result<Atleta>> {
    try {
      const isDniUnique = await this.validateDniUnique(atletaDto.dni);
      if (!isDniUnique) {
        return failure(`El DNI ${atletaDto.dni} ya está en uso.`, 400);
      }

      const findResult = await this.findOne(id);
      if (!findResult.isSuccess) {
        return findResult;
      }
      const atleta = findResult.value;

      const updated = Object.assign(atleta, atletaDto);
      const atletaActualizado = await this.atletaRepository.save(updated);
      return success(atletaActualizado, 200);
    } catch (error) {
      console.error('Error al actualizar el atleta:', error);
      return failure(
        'Error interno del servidor al actualizar el atleta.',
        500,
      );
    }
  }

  private async validateDniUnique(dni: number): Promise<Boolean> {
    const existingAtleta = await this.atletaRepository.findOne({
      where: { dni },
    });

    if (existingAtleta) {
      return false;
    }
    return true;
  }
}
