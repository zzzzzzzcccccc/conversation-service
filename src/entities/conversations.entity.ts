import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { RoomsEntity } from "./rooms.entity";
import { UserEntity } from "./user.entity";

export enum ConversationStatusEnums {
  hide,
  display
}

export enum ConversationTargetTypeEnums {
  unknown,
  user,
  room
}

@Entity({ name: 'conversations' })
export class ConversationsEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  tenant_id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  target_id: number;

  @Column({ type: 'enum', enum: ConversationTargetTypeEnums, default: ConversationTargetTypeEnums.unknown })
  target_type: ConversationTargetTypeEnums;

  @Column({ type: 'enum', enum: ConversationStatusEnums, default: ConversationStatusEnums.hide })
  status: ConversationStatusEnums;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  update_at: Date;
}

export class ConversationsWhitTargetEntity extends ConversationsEntity {
  target_name: string;
  target_metadata?: RoomsEntity | UserEntity;
}
