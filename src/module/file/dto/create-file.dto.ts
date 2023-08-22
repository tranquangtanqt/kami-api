import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiFile } from 'src/share/common/decorator/api-file.decorator';

export class CreateFileDto {
  @ApiFile()
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiProperty({ example: 'subfolder' })
  @IsNotEmpty()
  subfolder: string;

  @ApiProperty({ example: 10 })
  maxDownloads?: number;

  @ApiProperty({ example: true })
  autoDelete?: boolean;

  @ApiProperty({ example: '2023-07-31T12:34:56Z' })
  expires?: Date;
}
