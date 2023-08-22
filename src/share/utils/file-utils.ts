import * as fs from 'fs-extra';
import { extname, join } from 'path';

export class FileUtils {
  public async saveFile(
    file: Express.Multer.File,
    folderDestination: string,
  ): Promise<void> {
    const filePath = join(folderDestination, file.originalname);

    // Ensure the destination folder exists
    await fs.ensureDir(folderDestination);

    // Save the file to the local disk
    await fs.writeFile(filePath, file.buffer);
  }

  public async getFileNameWithTimestamp(
    fileOriginalName: string,
  ): Promise<string> {
    const fileName = fileOriginalName.replace(/\.[^/.]+$/, '');
    const fileExt = extname(fileOriginalName);
    return `${fileName}_${Date.now()}${fileExt}`;
  }

  public async createFolderRoot(pathRoot: string) {
    await fs.ensureDir(pathRoot);
  }

  public async moveFile(
    sourcePath: string,
    destinationPath: string,
  ): Promise<void> {
    await fs.move(sourcePath, destinationPath);
  }

  public async deleteFile(filePath: string): Promise<void> {
    await fs.unlink(filePath);
  }

  public async backupFile(
    filePath: string,
    backupFolderPath: string,
  ): Promise<string> {
    const originalFileName = join(
      backupFolderPath,
      `${Date.now()}${extname(filePath)}`,
    );
    await fs.copy(filePath, originalFileName);
    return originalFileName;
  }

  public async deleteFolder(folderPath: string): Promise<void> {
    await fs.remove(folderPath);
  }

  public async moveFolder(
    sourcePath: string,
    destinationPath: string,
  ): Promise<void> {
    await fs.move(sourcePath, destinationPath);
  }

  public async backupFolder(
    folderPath: string,
    backupFolderPath: string,
  ): Promise<void> {
    const backupFileName = `${Date.now()}_backup.zip`;
    const backupFilePath = join(backupFolderPath, backupFileName);
    await fs.ensureDir(backupFolderPath);
    await fs.zip(folderPath, backupFilePath);
  }

  public async moveAllFilesInFolder(
    sourceFolderPath: string,
    destinationFolderPath: string,
  ): Promise<void> {
    // Ensure the destination folder exists
    await fs.ensureDir(destinationFolderPath);

    // Get the list of files and folders in the source folder
    const items = await fs.readdir(sourceFolderPath);

    // Move each item (file or folder) to the destination folder
    for (const item of items) {
      const sourceItemPath = join(sourceFolderPath, item);
      const destinationItemPath = join(destinationFolderPath, item);

      // Check if the item is a file or a folder
      const stats = await fs.stat(sourceItemPath);
      if (stats.isFile()) {
        // If it's a file, move it
        await fs.move(sourceItemPath, destinationItemPath);
      } else if (stats.isDirectory()) {
        // If it's a directory, move its contents recursively
        await this.moveAllFilesInFolder(sourceItemPath, destinationItemPath);
      }
    }
  }

  public async checkFileNameExistsInFolder(
    folderPath: string,
    fileName: string,
  ): Promise<boolean> {
    const filePath = join(folderPath, fileName);
    return fs.existsSync(filePath);
  }

  public async checkFileExistsInFolder(folderPath: string): Promise<boolean> {
    const files = await fs.readdir(folderPath);
    return files.length > 0;
  }
}
