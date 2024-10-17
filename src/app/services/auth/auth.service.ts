import { inject, Injectable } from '@angular/core';
import { TokenDto } from "./models/token.dto";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, take } from "rxjs";
import { generateUUID } from "../../utils/functions";
import { environment } from "../../../environments/environment";
import { MethodsEnum } from "../../modules/enums/methods.enum";
import { ApiBody } from "../shared-dto/api.body";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly localStorage: LocalStorageService = inject(LocalStorageService);

  private readonly http: HttpClient = inject(HttpClient);

  private isValidToken: boolean = false;

  public getToken(): TokenDto | null {
    return this.localStorage.getItem<TokenDto>(environment.keys.token);
  }

  public logout(): void {
    return this.localStorage.remove(environment.keys.token);
  }

  public login(headers: HttpHeaders): Observable<unknown> {
    const body: ApiBody = {
      id: generateUUID(),
      method: MethodsEnum.GET,
      uri: environment.routes.ping
    };

    return this.http.post('', body, { headers })
      .pipe(take(1));
  }

  public validateToken(token: string): Observable<unknown> {
    const headers = new HttpHeaders({
      'Authorization': `Key ${ token }`
    });

    const body = {
      id: generateUUID(),
      method: 'GET',
      uri: environment.routes.ping
    };

    return this.http.post('', body, { headers });
  }
}
