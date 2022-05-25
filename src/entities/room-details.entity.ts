import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export enum RoomRoleEnums {
  member = 1,
  memberLeader = 2
}

@Entity({ name: 'room_details' })
export class RoomDetailsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  room_id: number;

  @Column({ type: 'enum', enum: RoomRoleEnums, default: RoomRoleEnums.member })
  room_role: RoomRoleEnums;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ length: 50 })
  user_name: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_at: Date;
}
