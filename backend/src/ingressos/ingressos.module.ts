import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingresso } from './ingresso.entity';
import { IngressoController } from './ingressos.controller';
import { IngressoService } from './ingressos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingresso])],
  controllers: [IngressoController],
  providers: [IngressoService],
  exports: [IngressoService],
})
export class IngressoModule {}
