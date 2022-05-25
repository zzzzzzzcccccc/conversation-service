export enum MessageType {
  user = 1,
  tenant = 2
}

export interface MessageData {
  event: string;
  type: MessageType,
  target: string | number;
  data?: Record<string, any>;
}

export const USER_STATUS_CHANGE = 'USER_STATUS_CHANGE';
export const AUTH_ERROR = 'AUTH_ERROR';
