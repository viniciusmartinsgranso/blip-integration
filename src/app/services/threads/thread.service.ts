import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { ApiBody } from "../shared-dto/api.body";
import { generateUUID } from "../../utils/functions";
import { MethodsEnum } from "../../modules/enums/methods.enum";
import { environment } from "../../../environments/environment";
import { ApiRootRequest } from "../shared-dto/api-root-request";
import { ThreadDto } from "./models/thread.dto";
import { MessageDto } from "./models/message.dto";

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  private readonly http: HttpClient = inject(HttpClient);

  public getThreads(page: number, pageSize: number): Observable<ThreadDto[]> {
    const skip = (page - 1) * pageSize;

    const body: ApiBody = {
      id: generateUUID(),
      method: MethodsEnum.GET,
      uri: `${ environment.routes.threads.many }?$skip=${ skip }&$take=${ pageSize }`
    }

    return this.http.post<ApiRootRequest<ThreadDto>>('', body)
      .pipe(map(items => items.resource.items));
  }

  public getOne(identity: string): Observable<MessageDto[]> {
    const body: ApiBody = {
      id: generateUUID(),
      method: MethodsEnum.GET,
      uri: environment.routes.threads.one(identity)
    }

    return this.http.post<ApiRootRequest<MessageDto>>('', body)
      .pipe(
        map(items => items.resource.items),
        map(messages => messages
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
  }
}
