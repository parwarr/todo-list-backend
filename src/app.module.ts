import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PrismaModule, TodoModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
