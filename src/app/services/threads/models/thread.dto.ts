import { MessageDto } from "./message.dto";

export interface ThreadDto {
  identity: string;
  lastMessage: MessageDto;
  ownerIdentity: string;
  unreadMessages: number;
}