import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileStorageService {
  private uploadDestination = '';
  private folderBackupDirectory = '';

  constructor(private readonly configService: ConfigService) {
    this.uploadDestination = process.cwd() + configService.get('MULTER_DEST');
    this.folderBackupDirectory = configService.get('FOLDER_BACKUP');
    this.ensureUploadDestinationExists();
  }

  public getFolderBackupDirectory(): string {
    return this.folderBackupDirectory;
  }

  public getRootDirectory(): string {
    return this.uploadDestination;
  }

  public createBackupDirectory(pathBackup: string): string {
    const destination = join(pathBackup);
    this.ensureDirectoryExists(destination);
    return destination;
  }

  public createSubDirectory(subfolder: string): string {
    const destination = join(this.uploadDestination, subfolder);
    this.ensureDirectoryExists(destination);
    return destination;
  }

  public getPathFileName(folderDestination: string, filename: string): string {
    return join(folderDestination, filename);
  }

  public ensureUploadDestinationExists(): void {
    this.ensureDirectoryExists(this.uploadDestination);
  }

  private ensureDirectoryExists(directory: string): void {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
  }
}
