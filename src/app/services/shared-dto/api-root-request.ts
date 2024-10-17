import { MethodsEnum } from "../../modules/enums/methods.enum";
import { ApiRootResource } from "./api-root-resource";

export interface ApiRootRequest<T> {
  method: MethodsEnum;
  id: string;
  status: string;
  resource: ApiRootResource<T>;
}