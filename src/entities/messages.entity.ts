import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { UserEntity } from "./user.entity";

export enum MessageStatusEnums {
  pending,
  success,
  error,
  rollback
}

@Entity({ name: 'messages' })
export class MessagesEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  tenant_id: number;

  @Column({ type: 'bigint' })
  conversation_id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'bigint' })
  from_user_id: number;

  @Column({ type: "enum", enum: MessageStatusEnums, default: MessageStatusEnums.pending })
  status: MessageStatusEnums;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_at: Date;
}

export class MessagesEntityWithFromUserEntity extends MessagesEntity {
  from_user_name: string;
  from_user_metadata: UserEntity;
}
