import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { FilmeModule } from './filmes/filmes.module';
import { ClienteModule } from './clientes/clientes.module';
import { FuncionarioModule } from './funcionarios/funcionarios.module';
import { SessaoModule } from './sessaos/sessaos.module';
import { IngressoModule } from './ingressos/ingressos.module';

const dataDir = process.env.DATA_DIR?.replace(/\/$/, '');
const databaseFile = dataDir ? dataDir + '/db.sqlite' : 'db.sqlite';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: databaseFile,
      synchronize: true,
      autoLoadEntities: true,
    }),
    FilmeModule,
    ClienteModule,
    FuncionarioModule,
    SessaoModule,
    IngressoModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
