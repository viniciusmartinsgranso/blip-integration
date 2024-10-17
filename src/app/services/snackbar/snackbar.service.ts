import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  //#region Inject Methods

  private readonly snackbarService: MatSnackBar = inject(MatSnackBar);

  //#endregion

  //#region Public Methods

  public create(message: string, action?: string, duration?: number): void {
    this.snackbarService.open(message, action, {
      duration: duration ? duration : 2000
    });
  }

  //#endregion

}
