import { IsNotEmpty, IsString } from "class-validator";

export class CreateCiudadDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre de la ciudad es obligatorio.' })
    nombre: string;
}
