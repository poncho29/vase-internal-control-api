import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  permission_name: string;
}
