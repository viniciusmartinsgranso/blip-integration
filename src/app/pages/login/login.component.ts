import { Component, inject } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { HttpHeaders } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";
import { MatFormField, MatHint, MatLabel } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatButton, MatFabButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";
import { environment } from "../../../environments/environment";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { TokenDto } from "../../services/auth/models/token.dto";
import { SnackbarService } from "../../services/snackbar/snackbar.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    MatFormField,
    MatLabel,
    MatIcon,
    MatInput,
    MatHint,
    MatButton,
    MatFabButton,
    MatDivider
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //#region Inject Properties

  private readonly authService: AuthService = inject(AuthService);

  private readonly localStorage: LocalStorageService = inject(LocalStorageService)

  private readonly snackbarService: SnackbarService = inject(SnackbarService);

  private readonly router: Router = inject(Router);

  //#endregion

  //#region Public Properties

  public apiBotKey: string = '';

  //#endregion

  //#region Public Methods

  public submit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Key ${this.apiBotKey}`
    });

    const req = this.authService.login(headers);

    req.subscribe({
        next: async () => {
          const token: TokenDto = {
            apiBotKey: this.apiBotKey
          }

          this.localStorage.setItem(environment.keys.token, token);
          this.snackbarService.create('ID do Chatbot encontrado, seja bem vindo!');
          await this.router.navigateByUrl('/')
        },
        error: () => {
          this.snackbarService.create('O ID do Chatbot está incorreto.', 'Entendi')
        },
      });
  }

  //#endregion

}
