export interface ApiRootResource<T> {
  itemType: string;
  items: T[];
  total: number;
}