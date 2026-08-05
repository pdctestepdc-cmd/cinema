import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Filme } from '../filmes/filme.entity';
import { Ingresso } from '../ingressos/ingresso.entity';

@Entity('sessaos')
export class Sessao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'horario' })
  horario!: Date;

  @Column({ name: 'sala' })
  sala!: string;

  @Column({ name: 'preco' })
  preco!: number;

  @ManyToOne(() => Filme, { lazy: true })
  @JoinColumn({ name: 'filme_id' })
  filme!: Filme;

  @OneToMany(() => Ingresso, (ingresso) => ingresso.sessao, { cascade: true })
  ingressos?: Ingresso[];

}
