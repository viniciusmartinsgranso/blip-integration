export enum MessageStatusEnum {
  RECEIVED = 'received',
  CONSUMED = 'consumed',
}

export const translatedMessageStatusEnum: Record<MessageStatusEnum, string> = {
  [MessageStatusEnum.CONSUMED]: 'Lida',
  [MessageStatusEnum.RECEIVED]: 'Recebida'
};