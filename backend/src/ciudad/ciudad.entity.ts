import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Atleta } from '../atleta/ateleta.entity';
@Entity('ciudades') // Nombre de la tabla en la DB
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Agregamos unique para asegurar que el nombre no se repita
  nombre: string;

  // Relación: Una Ciudad puede tener muchos Atletas
  @OneToMany(() => Atleta, (atleta) => atleta.ciudad)
  atletas: Atleta[];
}