import { Module } from '@nestjs/common';
import { FileRepository } from 'src/repositories/file.repository';
import { FileStorageService } from 'src/share/common/interceptor/file-storage.service';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileRepository, FileService, FileStorageService],
})
export class FileModule {}
