import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ThreadService } from "../../services/threads/thread.service";
import { map, take } from "rxjs";
import { MessageDto } from "../../services/threads/models/message.dto";
import { NgClass } from "@angular/common";
import { DirectionEnum } from "../../services/threads/models/direction.enum";
import { ChatComponent } from "../../components/chat/chat.component";
import { MatIcon } from "@angular/material/icon";
import { MatMiniFabButton } from "@angular/material/button";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    NgClass,
    ChatComponent,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {

  constructor() {
    this.threadId = this.route.snapshot.paramMap.get('id') || '';
  }

  //#region Inject Properties

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly router: Router = inject(Router);

  private readonly threadService: ThreadService = inject(ThreadService);

  //#endregion

  //#region Private Properties


  //#endregion

  //#region Public Properties

  public threadId: string;

  public messages: MessageDto[] = [];

  public textMessages: MessageDto[] = [];

  public imagesMessages: MessageDto[] = [];

  //#endregion

  //#region Public Methods

  public ngOnInit(): void {
    this.threadService.getOne(this.threadId)
      .pipe(take(1))
      .subscribe({
        next: messages => {
          this.messages = messages;

          this.textMessages = this.messages
            .filter(message => message.type.startsWith('text') || message.type.startsWith('voice'))

          this.imagesMessages = this.messages
            .filter(message => !message.type.startsWith('text') || !message.type.startsWith('text'));
        },
        error: error => console.log(error)
      });
  }

  public async redirectToHome(): Promise<void> {
    return void await this.router.navigateByUrl('');
  }

  //#endregion

}
