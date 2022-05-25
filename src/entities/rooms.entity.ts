import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  tenant_id: number;

  @Column({ length: 100 })
  room_name: string;

  @Column({ length: 200, nullable: true })
  room_avatar_url: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_at: Date;
}
