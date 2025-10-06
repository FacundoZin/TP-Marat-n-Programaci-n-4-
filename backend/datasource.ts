import { DataSource } from 'typeorm';

const dataSourceOptions = {
  type: 'mssql', 
  host: 'DESKTOP-ERTA9LD\\SQLEXPRESS', 
  port: 1433,
  database: 'TPMaraton', 
  
  synchronize: false, 
  
  entities: ['src/**/*.entity{.ts,.js}'],
  
  migrations: ['src/migrations/*{.ts,.js}'],
  
  extra: {
    authentication: {
      type: 'ntlm',
      options: {
        domain: 'DESKTOP-ERTA9LD', 
      },
    },
    options: {
      trustedConnection: true, 
      trustServerCertificate: true, 
    },
},

};

export default new DataSource(dataSourceOptions as any);