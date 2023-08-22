import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { PictureRepository } from 'src/repositories/picture.repository';
import { FileStorageService } from 'src/share/common/interceptor/file-storage.service';
import {
  IResponseAPI,
  errorAPI,
  successAPI,
} from 'src/share/common/response.const';
import { FileUtils } from 'src/share/utils/file-utils';
import { LogUtils } from 'src/share/utils/logger.utils';
import { CreatePictureDto } from './dto/create-picture.dto';
import { CreateMultipleFilesDto } from './dto/create-multiple-files.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from 'src/entities/picture.entity';
import { GENERAL_CONFIG } from 'src/config/constant.config';
import { COMMON_CONST } from 'src/share/common/app.const';
import { CONST_URL } from 'src/share/constant/route.constant';

@Injectable()
export class PictureService {
  private logger = new LogUtils();
  private fileUtils = new FileUtils();

  constructor(
    private readonly fileRepository: PictureRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  public async getImage(key: string, @Res() res: Response): Promise<void> {
    try {
      const file = await this.fileRepository.findByKey(key);

      return res.sendFile(file.filePath);
    } catch (e: any) {
      this.logger.setContextName(
        `${PictureService.name}.${this.getImage.name}`,
      );
      this.logger.error(e);
      return errorAPI(e.message);
    }
  }

  public async uploadFile(createDto: CreatePictureDto): Promise<IResponseAPI> {
    try {
      const folderDestination = this.fileStorageService.createSubDirectory(
        createDto.subfolder,
      );

      const fileName = await this.fileUtils.getFileNameWithTimestamp(
        createDto.file.originalname,
      );
      createDto.file.originalname = fileName;

      const newFile = this.createNewFileEntry(folderDestination, createDto);

      const file = createDto.file;
      const pathFile = this.fileStorageService.getPathFileName(
        folderDestination,
        file.originalname,
      );

      const newPicture = new Picture();
      newPicture.fileName = file.originalname;
      newPicture.filePath = pathFile;
      newPicture.fileSize = file.size;
      newPicture.fileType = file.mimetype;

      // Save the file information to the database
      // const fileRes = await this.fileRepository.save(newFile);
      // fileRes.link = this.getLinkFile(fileRes);

      // await this.fileRepository.save(fileRes);

      // Save the file to the local folder
      await this.fileUtils.saveFile(createDto.file, folderDestination);

      // return { ...successAPI, data: { ...fileRes } };
    } catch (e: any) {
      this.logger.setContextName(
        `${PictureService.name}.${this.uploadFile.name}`,
      );
      this.logger.error(e);
      return errorAPI(e.message);
    }
  }

  public async uploadMultipleFiles(
    createMultipleFilesDto: CreateMultipleFilesDto,
  ): Promise<IResponseAPI> {
    try {
      const arrFile = [];

      for (const file of createMultipleFilesDto.files) {
        const folderDestination = this.fileStorageService.createSubDirectory(
          createMultipleFilesDto.subfolder,
        );

        const createFileDto: CreatePictureDto = {
          file: file,
          subfolder: createMultipleFilesDto.subfolder,
        };

        const fileName = await this.fileUtils.getFileNameWithTimestamp(
          createFileDto.file.originalname,
        );
        createFileDto.file.originalname = fileName;

        const newFile = this.createNewFileEntry(
          folderDestination,
          createFileDto,
        );

        // Save the file information to the database
        // const fileRes = await this.fileRepository.save(newFile);
        // fileRes.link = this.getLinkFile(fileRes);

        // await this.fileRepository.save(fileRes);

        // Save the file to the local folder
        await this.fileUtils.saveFile(createFileDto.file, folderDestination);

        // arrFile.push(fileRes);
      }

      return { ...successAPI, data: arrFile };
    } catch (e: any) {
      this.logger.setContextName(
        `${PictureService.name}.${this.uploadMultipleFiles.name}`,
      );
      this.logger.error(e);
      return errorAPI(e.message);
    }
  }

  public async backupAllFile(): Promise<IResponseAPI> {
    try {
      const sourceFolderPath = this.fileStorageService.getRootDirectory();
      const destinationFolderPath =
        this.fileStorageService.getFolderBackupDirectory();

      const messageRes = await this.moveAllFileRootToBackup(
        sourceFolderPath,
        destinationFolderPath,
      );

      return { ...successAPI, data: { messageRes: messageRes } };
    } catch (e: any) {
      this.logger.setContextName(
        `${PictureService.name}.${this.backupAllFile.name}`,
      );
      this.logger.error(e);
      return errorAPI(e.message);
    }
  }

  public async restoreAllFile(): Promise<IResponseAPI> {
    try {
      const sourceFolderPath =
        this.fileStorageService.getFolderBackupDirectory();
      const destinationFolderPath = this.fileStorageService.getRootDirectory();

      const messageRes = await this.moveAllFileRootToBackup(
        sourceFolderPath,
        destinationFolderPath,
      );

      await this.fileUtils.deleteFolder(sourceFolderPath);

      return { ...successAPI, data: { messageRes: messageRes } };
    } catch (e: any) {
      this.logger.setContextName(
        `${PictureService.name}.${this.restoreAllFile.name}`,
      );
      this.logger.error(e);
      return errorAPI(e.message);
    }
  }

  private getLinkFile(fileRes: Picture): string {
    const pathUrlFile = fileRes.name.match(/\.(jpg|jpeg|png|gif)$/)
      ? CONST_URL.GET_IMAGE
      : '';
    return `${GENERAL_CONFIG.SERVER_URL}/${COMMON_CONST.API_PREFIX}/${CONST_URL.URL_CONTROLLER}/${pathUrlFile}/${fileRes.key}`;
  }

  private async moveAllFileRootToBackup(
    sourceFolderPath: string,
    destinationFolderPath: string,
  ): Promise<string> {
    try {
      const checkFile = await this.fileUtils.checkFileExistsInFolder(
        sourceFolderPath,
      );

      if (checkFile) {
        await this.fileUtils.moveAllFilesInFolder(
          sourceFolderPath,
          destinationFolderPath,
        );

        if (
          await this.fileUtils.checkFileExistsInFolder(destinationFolderPath)
        ) {
          return `Path root: ${destinationFolderPath} move file exists in folder success`;
        }
      } else {
        return `Path root: ${sourceFolderPath} not exists file in folder`;
      }
    } catch (e: any) {
      this.logger.setContextName(
        `${PictureService.name}.${this.moveAllFileRootToBackup.name}`,
      );
      this.logger.error(e);
      return errorAPI(e.message);
    }
  }

  private createNewFileEntry(
    folderDestination: string,
    createFileDto: CreatePictureDto,
  ) {
    const file = createFileDto.file;
    const pathFile = this.fileStorageService.getPathFileName(
      folderDestination,
      file.originalname,
    );

    return {
      fileName: file.originalname,
      pathFile: pathFile,
      size: file.size,
      mimeType: file.mimetype,
    };
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdatePictureDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
