import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import { FileToBodyInterceptor } from 'src/share/common/interceptor/file-to-body.interceptor';
import { FilesToBodyInterceptor } from 'src/share/common/interceptor/files-to-body.interceptor';
import { CreateFileDto } from './dto/create-file.dto';
import { CreateMultipleFilesDto } from './dto/create-multiple-files.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';
import { PATH_URL_FILE_CONFIG } from 'src/config/constant.config';

@Controller(PATH_URL_FILE_CONFIG.URL_CONTROLLER)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get(PATH_URL_FILE_CONFIG.GET_IMAGE + PATH_URL_FILE_CONFIG.KEY)
  @ApiOperation({ summary: 'Get file by key' })
  async getImage(@Res() res: Response, @Param('key') key: string) {
    return this.fileService.getImage(key, res);
  }

  @Post(PATH_URL_FILE_CONFIG.UPLOAD_FILE)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Uploads file and creates file details' })
  @ApiBody({ type: CreateFileDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  async uploadFile(@Body() createFileDto: CreateFileDto) {
    return this.fileService.uploadFile(createFileDto);
  }

  @Post(PATH_URL_FILE_CONFIG.UPLOAD_MULTIPLE_FILES)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Uploads file and creates multiple files details' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMultipleFilesDto })
  @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
  async uploadMultipleFiles(
    @Body() createMultipleFilesDto: CreateMultipleFilesDto,
  ) {
    return this.fileService.uploadMultipleFiles(createMultipleFilesDto);
  }

  @Get(PATH_URL_FILE_CONFIG.BACKUP_ALL_FILE)
  @ApiOperation({ summary: 'Backup all file server' })
  async backupAllFile() {
    return this.fileService.backupAllFile();
  }

  @Get(PATH_URL_FILE_CONFIG.RESTORE_ALL_FILE)
  @ApiOperation({ summary: 'Restore all file server' })
  async restoreAllFile() {
    return this.fileService.restoreAllFile();
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.fileService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
