import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { authGuard } from "../modules/guards/auth.guard";
import { MessagesComponent } from "./messages/messages.component";

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'contato/:id',
    component: MessagesComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
