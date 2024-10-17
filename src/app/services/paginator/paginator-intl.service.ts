import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginatorIntl implements MatPaginatorIntl {

  readonly changes: Subject<void> = new Subject<void>();

  public firstPageLabel: string = $localize`Primeira página`;

  public itemsPerPageLabel: string = $localize`Itens por página:`;

  public lastPageLabel: string = $localize`Última página`;

  public nextPageLabel: string = $localize`Próxima página`;

  public previousPageLabel: string = $localize`Página anterior`;

  public getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Página ${ page + 1 } de ${ amountPages }`;
  }


}
