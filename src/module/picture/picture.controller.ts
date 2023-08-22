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
import { CreatePictureDto } from './dto/create-picture.dto';
import { CreateMultipleFilesDto } from './dto/create-multiple-files.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { PictureService } from './picture.service';
import { CONST_URL } from 'src/share/constant/route.constant';

@Controller(CONST_URL.URL_CONTROLLER)
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get(CONST_URL.GET_IMAGE + CONST_URL.KEY)
  @ApiOperation({ summary: 'Get file by key' })
  async getImage(@Res() res: Response, @Param('key') key: string) {
    return this.pictureService.getImage(key, res);
  }

  @Post(CONST_URL.UPLOAD_FILE)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Uploads file and creates file details' })
  @ApiBody({ type: CreatePictureDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'), FileToBodyInterceptor)
  async uploadFile(@Body() createFileDto: CreatePictureDto) {
    return this.pictureService.uploadFile(createFileDto);
  }

  @Post(CONST_URL.UPLOAD_MULTIPLE_FILES)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Uploads file and creates multiple files details' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateMultipleFilesDto })
  @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
  async uploadMultipleFiles(
    @Body() createMultipleFilesDto: CreateMultipleFilesDto,
  ) {
    return this.pictureService.uploadMultipleFiles(createMultipleFilesDto);
  }

  @Get(CONST_URL.BACKUP_ALL_FILE)
  @ApiOperation({ summary: 'Backup all file server' })
  async backupAllFile() {
    return this.pictureService.backupAllFile();
  }

  @Get(CONST_URL.RESTORE_ALL_FILE)
  @ApiOperation({ summary: 'Restore all file server' })
  async restoreAllFile() {
    return this.pictureService.restoreAllFile();
  }

  @Get()
  findAll() {
    return this.pictureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pictureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdatePictureDto) {
    return this.pictureService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pictureService.remove(+id);
  }
}
