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
}
