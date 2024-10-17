import { Component, Input, inject } from '@angular/core';
import { Router } from "@angular/router";
import { ContactDto } from "../../services/chats/models/contactDto";
import { DatePipe } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-contacts-card',
  standalone: true,
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
  ],
  templateUrl: './contacts-card.component.html',
  styleUrl: './contacts-card.component.scss'
})
export class ContactsCardComponent {

  //#region Inject Properties

  private readonly router: Router = inject(Router);

  //#endregion

  //#region Public Properties

  @Input({required: true })
  public contact!: ContactDto;

  //#endregion

  //#region Public Methods

  public async redirectToThread(identity: string): Promise<void> {
    return void await this.router.navigateByUrl(`/contato/${ identity }`)
  }

  //#endregion

}
