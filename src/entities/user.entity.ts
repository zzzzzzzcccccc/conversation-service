import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum UserStatusEnums {
  offLine,
  onLine,
  busy
}

export enum UserGenderEnums {
  unknown,
  male,
  female
}

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  tenant_id: number;

  @Column({ length: 50 })
  user_name: string;

  @Column({ length: 200, nullable: true })
  avatar_url: string;

  @Column({ length: 100 })
  password: string;

  @Column({ type: 'enum', enum: UserStatusEnums, default: UserStatusEnums.offLine })
  status: UserStatusEnums;

  @Column({ length: 50, nullable: true })
  phone_number: string;

  @Column({ type: 'enum', enum: UserGenderEnums, default: UserGenderEnums.unknown })
  gender: UserGenderEnums;

  @Column({ default: true })
  enabled: boolean;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ type: 'bigint', nullable: true })
  role_id: number;

  @Column({ length: 50, nullable: true })
  role_name: string;

  @Column({ type: 'timestamp', nullable: true })
  birthday: Date;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_at: Date;
}
