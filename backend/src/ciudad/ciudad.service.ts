import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { failure, Result, success } from 'src/Common/result.type';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { Ciudad } from './ciudad.entity';
import { CreateCiudadDto } from './Dtos/create-ciudad.dto';
import { UpdateCiudadDto } from './Dtos/update-ciudad.dto';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createCiudadDto: CreateCiudadDto): Promise<Result<Ciudad>> {
    try {
      const nuevaCiudad = this.ciudadRepository.create(createCiudadDto);

      const ciudadCreada = await this.ciudadRepository.save(nuevaCiudad);

      return success(ciudadCreada, 201);
    } catch (error) {
      console.error('Error al crear la ciudad:', error);
      return failure('Error interno del servidor al registrar la ciudad.', 500);
    }
  }

  async findAll(): Promise<Result<Ciudad[]>> {
    try {
      const ciudades = await this.ciudadRepository.find();
      return success(ciudades, 200);
    } catch (error) {
      console.error('Error al obtener ciudades:', error);
      return failure(
        'Error interno del servidor al obtener la lista de ciudades.',
        500,
      );
    }
  }

  async findOne(id: number): Promise<Result<Ciudad>> {
    try {
      const ciudad = await this.ciudadRepository.findOne({ where: { id } });

      if (!ciudad) {
        return failure(`Ciudad con ID ${id} no encontrada.`, 404);
      }

      return success(ciudad, 200);
    } catch (error) {
      console.error('Error al obtener la ciudad:', error);
      return failure('Error interno del servidor al buscar la ciudad.', 500);
    }
  }

  async update(
    id: number,
    updatedCiudadDto: UpdateCiudadDto,
  ): Promise<Result<Ciudad>> {
    try {
      const findResult = await this.findOne(id);

      if (!findResult.isSuccess) {
        return findResult;
      }

      const ciudad = findResult.value;

      const updated = Object.assign(ciudad, updatedCiudadDto);

      const ciudadActualizada = await this.ciudadRepository.save(updated);

      return success(ciudadActualizada, 200);
    } catch (error) {
      console.error('Error al actualizar la ciudad:', error);
      return failure(
        'Error interno del servidor al actualizar la ciudad.',
        500,
      );
    }
  }

  async remove(id: number): Promise<Result<void>> {
    try {
      const result = await this.ciudadRepository.delete(id);

      if (result.affected === 0) {
        return failure(`Ciudad con ID ${id} no encontrada.`, 404);
      }

      return success(undefined, 204);
    } catch (error) {
      console.error('Error al eliminar la ciudad:', error);
      return failure('Error interno del servidor al eliminar la ciudad.', 500);
    }
  }
}
