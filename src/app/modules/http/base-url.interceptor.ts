import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from "../../../environments/environment";

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    url: `${ environment.apiUrl }`,
  });

  return next(newReq);
};
