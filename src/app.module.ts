import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfigDatabase } from './config/typeorm.config';
import { PictureModule } from './module/picture/picture.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfigDatabase),
    PictureModule,
  ],
})
export class AppModule {}
