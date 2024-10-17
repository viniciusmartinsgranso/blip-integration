import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { ContactService } from "../../services/chats/contact.service";
import { ContactDto } from "../../services/chats/models/contactDto";
import { MatCard } from "@angular/material/card";
import { MatDivider } from "@angular/material/divider";
import { MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { take } from "rxjs";
import { SnackbarService } from "../../services/snackbar/snackbar.service";
import { ContactsCardComponent } from "../../components/contacts-card/contacts-card.component";
import { MatPaginator, MatPaginatorIntl, PageEvent } from "@angular/material/paginator";
import { FormsModule } from "@angular/forms";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { PaginatorIntl } from "../../services/paginator/paginator-intl.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { MatOption, MatSelect } from "@angular/material/select";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCard,
    MatDivider,
    MatMiniFabButton,
    MatIcon,
    ContactsCardComponent,
    MatPaginator,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatTabGroup,
    MatTab,
    MatSelect,
    MatOption
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    {
      provide: MatPaginatorIntl, useClass: PaginatorIntl
    }
  ]
})
export class HomeComponent implements OnInit {

  //#region Inject Properties

  private readonly chatService: ContactService = inject(ContactService);

  private readonly snackbarService: SnackbarService = inject(SnackbarService);

  private readonly router: Router = inject(Router);

  private readonly authService: AuthService = inject(AuthService);

  //#endregion

  //#region Public Properties


  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public contacts: ContactDto[] = [];

  public currentContactsPage: number = 1;

  public contactsPageSize: number = 10;

  public pageSizeInput: number = this.contactsPageSize;

  public totalContacts: number = 0;

  //#endregion

  //#region Public Methods

  public ngOnInit(): void {
    this.loadContacts(this.currentContactsPage, this.contactsPageSize);
  }

  public async onLogout(): Promise<void> {
    this.authService.logout();
    return void await this.router.navigateByUrl('/login');
  }

  public onContactsPageChange(event: PageEvent): void {
    this.currentContactsPage = event.pageIndex + 1;
    this.loadContacts(this.currentContactsPage, this.contactsPageSize);
  }

  public onContactsPageSizeChange(): void {
    this.contactsPageSize = this.pageSizeInput;
    this.currentContactsPage = 1;
    this.loadContacts(this.currentContactsPage, this.contactsPageSize);
  }

  //#endregion

  //#region Private Methods

  private loadContacts(page: number, pageSize: number): void {
    this.chatService.getContacts(page, pageSize)
      .pipe(take(1))
      .subscribe({
        next: contacts => {
          this.totalContacts = contacts.total;
          this.contacts = contacts.items;
        },
        error: error => {
          this.snackbarService.create(error.message);
        }
      });
  }

  //#endregion

}
