import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors
} from "@angular/common/http";
import { baseUrlInterceptor } from "../modules/http/base-url.interceptor";
import { headersInterceptor } from "../modules/http/headers.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from "@angular/common";
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    },
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors(
        [
          baseUrlInterceptor,
          headersInterceptor
        ]
      )
    ), provideAnimationsAsync(),
  ]
};
