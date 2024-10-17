import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from "../../services/auth/auth.service";
import { inject } from "@angular/core";

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  let newReq = req.clone({
    headers: req.headers
      .set('Content-Type', 'application/json')
  });

  if (token) {
    newReq = newReq.clone({
      headers: newReq.headers
        .set('Authorization', 'Key ' + token.apiBotKey)
    });
  }

  return next(newReq);
};
