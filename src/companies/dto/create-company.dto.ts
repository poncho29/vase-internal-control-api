import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MinLength(2)
  company_name: string;

  @IsString()
  nit: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  department: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  url_logo?: string;

  @IsString()
  @IsOptional()
  legal_text?: string;

  @IsString()
  @IsOptional()
  paper_size?: string;

  @IsInt()
  @IsOptional()
  print_format?: string;

  @IsString()
  @IsOptional()
  url_backup_db?: string;
}
