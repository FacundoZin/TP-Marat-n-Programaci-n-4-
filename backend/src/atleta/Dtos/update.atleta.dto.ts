
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { CreateAtletaDto } from './create.atleta.dto';

// ⚠️ NOTA: Usamos PartialType de @nestjs/mapped-types para heredar
//         todos los campos de CreateAtletaDto y hacerlos opcionales.

export class UpdateAtletaDto extends PartialType(CreateAtletaDto) {
  // Los campos 'nombre', 'tiempo', 'posicion', y 'ciudadId' son ahora opcionales gracias a PartialType.

  // 🚨 Sobreescribimos el DNI: sigue siendo opcional, pero si se envía, debe ser válido.
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El DNI debe ser un número entero válido.' })
  @Min(1000000, { message: 'El DNI debe tener al menos 7 dígitos.' })
  dni?: number;
  
  // Sobreescribimos ciudadId para hacerlo opcional, pero mantenemos la validación si se envía
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El ID de la ciudad debe ser un número entero válido.' })
  ciudadId?: number;
}