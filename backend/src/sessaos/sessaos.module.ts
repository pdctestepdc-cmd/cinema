import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sessao } from './sessao.entity';
import { SessaoController } from './sessaos.controller';
import { SessaoService } from './sessaos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sessao])],
  controllers: [SessaoController],
  providers: [SessaoService],
  exports: [SessaoService],
})
export class SessaoModule {}
