import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Sessao } from '../sessaos/sessao.entity';

@Entity('filmes')
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'titulo' })
  titulo!: string;

  @Column({ name: 'duracao' })
  duracao!: number;

  @Column({ name: 'genero' })
  genero!: string;

  @Column({ name: 'classificacao' })
  classificacao!: string;

  @Column({ name: 'sinopse' })
  sinopse!: string;

  @OneToMany(() => Sessao, (sessao) => sessao.filme, { cascade: true })
  sessaos?: Sessao[];

}
