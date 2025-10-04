import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtletaModule } from './atleta/atleta.module';
import { CiudadModule } from './ciudad/ciudad.module';

@Module({
  imports: [
    // 1. Configuración de Variables de Entorno (para usar .env)
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),

    // 2. Configuración de la Conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'your_db_password', // ¡CAMBIA ESTO!
      database: process.env.DB_DATABASE || 'maraton_db',
      autoLoadEntities: true, // Carga automáticamente las entidades definidas
      synchronize: true, // ¡USAR SOLO EN DESARROLLO! Crea las tablas automáticamente
    }),

    CiudadModule,
    AtletaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
