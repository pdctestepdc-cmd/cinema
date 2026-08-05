import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './filme.entity';
import { FilmeController } from './filmes.controller';
import { FilmeService } from './filmes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Filme])],
  controllers: [FilmeController],
  providers: [FilmeService],
  exports: [FilmeService],
})
export class FilmeModule {}
