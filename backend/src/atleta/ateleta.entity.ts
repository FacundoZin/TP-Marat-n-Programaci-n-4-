import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ciudad } from '../ciudad/ciudad.entity';

@Entity('atletas')
export class Atleta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'int' })
  dni: number;

  @Column()
  nombre: string;

  @Column()
  tiempo: string;

  @Column({ type: 'int' })
  posicion: number;

  @Column()
  ciudadId: number;

  // Relación: Muchos Atletas a una Ciudad
  @ManyToOne(() => Ciudad, (ciudad) => ciudad.atletas)
  @JoinColumn({ name: 'ciudadId' }) // Usa la columna 'ciudadId' como clave foránea
  ciudad: Ciudad;
}