import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiFile } from 'src/share/common/decorator/api-file.decorator';

export class CreateMultipleFilesDto {
  @ApiFile({ isArray: true })
  @IsNotEmpty()
  files: Express.Multer.File[];

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
