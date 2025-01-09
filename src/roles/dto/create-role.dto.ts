import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'El nombre del role es requerido' })
  @IsString({ message: 'El nombre del role debe ser una cadena de texto' })
  role_name: string;

  @IsArray({ message: 'Los permisos deben ser un array' })
  @ArrayNotEmpty({ message: 'Debe proporcionar al menos un permiso' })
  @IsUUID('4', { each: true, message: 'Cada permiso debe ser un UUID válido' })
  permissions: string[];

  @IsBoolean({ message: 'El valor de is_active debe ser un booleano' })
  @IsOptional()
  is_active?: boolean;
}
