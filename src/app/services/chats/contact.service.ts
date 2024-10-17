import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { ContactDto } from "./models/contactDto";
import { MethodsEnum } from "../../modules/enums/methods.enum";
import { ApiBody } from "../shared-dto/api.body";
import { generateUUID } from "../../utils/functions";
import { ApiRootRequest } from "../shared-dto/api-root-request";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private readonly http: HttpClient = inject(HttpClient);

  public getContacts(page: number, pageSize: number): Observable<{ total: number; items: ContactDto[] }> {
    const skip = (page - 1) * pageSize;

    const body: ApiBody = {
      id: generateUUID(),
      method: MethodsEnum.GET,
      uri: `${ environment.routes.contacts }?$skip=${ skip }&$take=${ pageSize }`
    }

    return this.http.post<ApiRootRequest<ContactDto>>('', body)
      .pipe(
        map(items => {
          items.resource.items =
            items.resource.items.sort((a, b) => new Date(b.lastUpdateDate).getTime() - new Date(a.lastUpdateDate).getTime())
          return {
            items: items.resource.items,
            total: items.resource.total
          }
        }));
  }

  public getOne(identity: string): Observable<ContactDto> {
    const body: ApiBody = {
      id: generateUUID(),
      method: MethodsEnum.GET,
      uri: environment.routes.contacts + `/${ identity }`
    }

    return this.http.post<{ resource: ContactDto }>('', body)
      .pipe(
        map(items => items.resource));
  }

}
