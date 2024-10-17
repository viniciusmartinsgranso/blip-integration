import { DirectionEnum } from "./direction.enum";
import { MessageStatusEnum } from "./message-status.enum";

export interface MessageDto {
  content: string;
  date: Date;
  direction: DirectionEnum;
  status: MessageStatusEnum;
  id: string;
  type: string;
}