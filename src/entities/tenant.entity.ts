import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'tenant' })
export class TenantEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 50 })
  tenant_name: string;

  @Column({ length: 50 })
  tenant_tax_no: string;

  @Column({ length: 50, nullable: true })
  tenant_phone_number: string;

  @Column({ length: 255, nullable: true })
  tenant_address: string;

  @Column({ default: true })
  enabled: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lease_deadline_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;
}
