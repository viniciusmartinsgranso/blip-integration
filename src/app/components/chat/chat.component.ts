import { Component, Input } from '@angular/core';
import { MessageDto } from "../../services/threads/models/message.dto";
import { DirectionEnum } from "../../services/threads/models/direction.enum";
import { DatePipe, NgClass, NgStyle } from "@angular/common";
import { MessageStatusEnum, translatedMessageStatusEnum } from "../../services/threads/models/message-status.enum";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    NgStyle
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  //#region Public Properties

  @Input({ required: true })
  public messages: MessageDto[] = [];

  public direction: typeof DirectionEnum = DirectionEnum;

  public translatedMessageStatusEnum: Record<MessageStatusEnum, string> = translatedMessageStatusEnum;

  //#endregion

}
