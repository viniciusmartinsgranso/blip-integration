/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/pages/app.config';
import { AppComponent } from './app/pages/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
