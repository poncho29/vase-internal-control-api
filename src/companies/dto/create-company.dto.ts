import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateCompanyDto {
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre de la empresa es requerido' })
  company_name: string;

  @IsString({ message: 'El nit de la empresa debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nit de la empresa es requerido' })
  nit: string;

  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida' })
  @IsNotEmpty({ message: 'El correo de la empresa es requerido' })
  email: string;

  @IsString({
    message: 'La direccion debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'La direccion es requerida' })
  address: string;

  @IsString({ message: 'El telefono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El telefono es requerido' })
  phone: string;

  @IsString({ message: 'El departamento debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El departamento es requerido' })
  department: string;

  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La ciudad es requerida' })
  city: string;

  @IsString({ message: 'La url de la logo debe ser una cadena de texto' })
  @IsOptional()
  url_logo?: string;

  @IsBoolean({ message: 'El valor de is_active debe ser un booleano' })
  @IsOptional()
  is_active?: boolean;

  @IsString({ message: 'El texto legal debe ser una cadena de texto' })
  @IsOptional()
  legal_text?: string;

  @IsString({ message: 'El tamaño de papel debe ser una cadena de texto' })
  @IsOptional()
  paper_size?: string;

  @IsInt({ message: 'El formato de impresión debe ser un entero' })
  @IsOptional()
  print_format?: number;

  @IsString({
    message: 'La url de la base de datos debe ser una cadena de texto',
  })
  @IsOptional()
  url_backup_db?: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  @IsNotEmpty({ message: 'El admin_user es requerido' })
  admin_user: CreateUserDto;
}
