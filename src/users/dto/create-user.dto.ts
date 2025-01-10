import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  full_name: string;

  @IsEmail({}, { message: 'El email debe ser una dirección de correo válida' })
  @IsNotEmpty({ message: 'El email es requerido' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener 6 o más caracteres' })
  @MaxLength(50, { message: 'La contraseña debe tener menos de 50 caracteres' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener una letra mayúscula, una minúscula y un número.',
  })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;

  @IsString({ message: 'El telefono debe ser una cadena de texto' })
  @MinLength(10, { message: 'El telefono debe tener 10 caracteres' })
  @IsNotEmpty({ message: 'El telefono es requerido' })
  phone: string;

  @IsUUID('4', { message: 'El rol debe ser un UUID' })
  @IsNotEmpty({ message: 'El rol es requerido' })
  role: string;

  @IsBoolean({ message: 'El valor de is_active debe ser un booleano' })
  @IsOptional()
  is_active?: boolean;
}
