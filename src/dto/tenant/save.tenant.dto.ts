import { IsNotEmpty, Length, IsBoolean, IsDate } from 'class-validator';

export class SaveTenantDto {
  id: number;

  @IsNotEmpty()
  @Length(1, 50)
  tenant_name: string;

  @IsNotEmpty()
  @Length(1, 50)
  tenant_tax_no: string;

  tenant_phone_number: string;

  tenant_address: string;

  @IsBoolean()
  enabled: boolean = true;

  @IsDate()
  lease_deadline_at: Date = new Date();
}
