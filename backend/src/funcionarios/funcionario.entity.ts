import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Ingresso } from '../ingressos/ingresso.entity';

@Entity('funcionarios')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome!: string;

  @Column({ name: 'cargo' })
  cargo!: string;

  @Column({ name: 'email' })
  email!: string;

  @OneToMany(() => Ingresso, (ingresso) => ingresso.funcionario, { cascade: true })
  ingressos?: Ingresso[];

}
