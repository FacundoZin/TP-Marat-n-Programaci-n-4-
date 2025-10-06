import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtletaModule } from './atleta/atleta.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { Ciudad } from './ciudad/ciudad.entity';
import { Atleta } from './atleta/ateleta.entity';

@Module({
  imports: [
    // 1. Configuración de Variables de Entorno (para usar .env)
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),

    TypeOrmModule.forRoot({
      type: 'mssql', // 🚨 CAMBIAR A MSSQL (SQL Server)
      host: 'DESKTOP-ERTA9LD\\SQLEXPRESS', // 🚨 O la IP/Nombre de tu instancia SQL Server
      port: 1433, // Puerto predeterminado de SQL Server
      database: 'TPMaraton', // 🚨 CÁMBIALO
      entities: [Ciudad, Atleta],
      synchronize: false, // ¡Esencial para usar migraciones!
      
      autoLoadEntities: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'], 
    }),

    CiudadModule,
    AtletaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
