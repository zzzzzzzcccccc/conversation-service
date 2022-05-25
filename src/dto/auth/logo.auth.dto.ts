import { IsNotEmpty, Length, IsEmail } from "class-validator";

export class LogoAuthDto {
  @IsNotEmpty()
  @Length(1, 50)
  tenant_tax_no: string;

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
