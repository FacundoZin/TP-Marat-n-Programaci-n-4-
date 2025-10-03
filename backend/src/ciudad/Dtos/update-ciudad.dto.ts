import { IsOptional, IsString } from 'class-validator';

export class UpdateCiudadDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  nombre?: string; // Usamos '?:' para indicar que la propiedad es opcional en TypeScript
}
