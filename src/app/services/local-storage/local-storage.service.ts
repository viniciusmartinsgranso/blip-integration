import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //#region Public Methods

  public setItem<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);

    if (item)
      return JSON.parse(item) as T;

    return null;
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  //#endregion

}
