import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Ingresso } from '../ingressos/ingresso.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'telefone' })
  telefone!: string;

  @OneToMany(() => Ingresso, (ingresso) => ingresso.cliente, { cascade: true })
  ingressos?: Ingresso[];

}
