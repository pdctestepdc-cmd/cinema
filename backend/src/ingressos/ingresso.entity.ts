import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Sessao } from '../sessaos/sessao.entity';
import { Funcionario } from '../funcionarios/funcionario.entity';

@Entity('ingressos')
export class Ingresso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'assento' })
  assento!: string;

  @ManyToOne(() => Cliente, { lazy: true })
  @JoinColumn({ name: 'cliente_id' })
  cliente!: Cliente;

  @ManyToOne(() => Sessao, { lazy: true })
  @JoinColumn({ name: 'sessao_id' })
  sessao!: Sessao;

  @ManyToOne(() => Funcionario, { lazy: true })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario?: Funcionario;

}
