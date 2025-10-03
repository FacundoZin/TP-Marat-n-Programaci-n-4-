// backend/src/atleta/dto/create-atleta.dto.ts

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateAtletaDto {
  // --- Requisitos del TP ---

  /** dni (int) - Debe ser un número entero y obligatorio */
  @IsNotEmpty({ message: 'El DNI es obligatorio.' })
  @Type(() => Number) // Asegura que el DNI se trate como número si viene como string
  @IsInt({ message: 'El DNI debe ser un número entero válido.' })
  @Min(1000000, { message: 'El DNI debe tener al menos 7 dígitos.' })
  dni: number;

  /** nombre (string) - Obligatorio */
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del atleta es obligatorio.' })
  nombre: string;

  /** tiempo (string, ej: "2h 07m 30s") - Obligatorio */
  @IsString({ message: 'El tiempo debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tiempo de maratón es obligatorio.' })
  tiempo: string;

  /** posicion (int) - Obligatorio y mayor a 0 */
  @IsNotEmpty({ message: 'La posición es obligatoria.' })
  @Type(() => Number)
  @IsInt({ message: 'La posición debe ser un número entero.' })
  @Min(1, { message: 'La posición debe ser mayor o igual a 1.' })
  posicion: number;

  /** ciudadId (int, referencia a la ciudad) - Obligatorio */
  @IsNotEmpty({ message: 'La ciudad de origen es obligatoria.' })
  @Type(() => Number)
  @IsInt({ message: 'El ID de la ciudad debe ser un número entero válido.' })
  ciudadId: number;
}