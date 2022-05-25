import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'user_role' })
export class UserRoleEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: 0 })
  parent_id: number;

  @Column({ type: 'bigint' })
  tenant_id: number;

  @Column({ length: 50 })
  role_name: string;

  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_at: Date;
}
