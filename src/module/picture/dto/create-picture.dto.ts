import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ApiFile } from 'src/share/common/decorator/api-file.decorator';

export class CreatePictureDto {
  @ApiFile()
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiProperty({ example: 'subfolder' })
  @IsNotEmpty()
  subfolder: string;
}
