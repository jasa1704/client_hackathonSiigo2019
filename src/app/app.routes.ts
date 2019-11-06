import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { routingPages } from './pages/pages.routes';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  routingPages,

  // {
  //   path: '**',
  //   component: NopagefoundComponent
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class APP_ROUTES {}
