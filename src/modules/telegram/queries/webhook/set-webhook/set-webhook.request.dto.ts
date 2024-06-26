import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class SetWebhookRequestDto {
  @ApiProperty()
  @IsUrl()
  domain: string;
}
