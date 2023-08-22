import { Module } from '@nestjs/common';
import { PictureRepository } from 'src/repositories/picture.repository';
import { FileStorageService } from 'src/share/common/interceptor/file-storage.service';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

@Module({
  controllers: [PictureController],
  providers: [PictureRepository, PictureService, FileStorageService],
})
export class PictureModule {}
