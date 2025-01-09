import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'El nombre del permiso es requerido' })
  @IsString({ message: 'El nombre del permiso debe ser una cadena de texto' })
  permission_name: string;

  @IsBoolean({ message: 'El valor de read debe ser un booleano' })
  @IsOptional()
  read?: boolean;

  @IsBoolean({ message: 'El valor de create debe ser un booleano' })
  @IsOptional()
  create?: boolean;

  @IsBoolean({ message: 'El valor de update debe ser un booleano' })
  @IsOptional()
  update?: boolean;

  @IsBoolean({ message: 'El valor de delete debe ser un booleano' })
  @IsOptional()
  delete?: boolean;

  @IsBoolean({ message: 'El valor de is_active debe ser un booleano' })
  @IsOptional()
  is_active?: boolean;
}
