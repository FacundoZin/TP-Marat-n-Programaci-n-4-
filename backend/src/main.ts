import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

    app.useGlobalPipes(
    new ValidationPipe({
      // El ValidationPipe por defecto necesita algunas opciones clave:
      // Transforma los datos de entrada al tipo del DTO (útil para números)
      transform: true, 
      // Permite que solo los campos definidos en el DTO pasen (mayor seguridad)
      whitelist: true, 
      // Rechaza la petición si encuentra campos no definidos en el DTO
      forbidNonWhitelisted: true, 
    }),
  );
}
bootstrap();
