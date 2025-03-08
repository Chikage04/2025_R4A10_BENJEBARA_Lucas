import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { GeneratePageComponent } from './generate-page/generate-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'generate',
    component: GeneratePageComponent,
  },
  {
    path: 'detail/:id',
    component: DetailPageComponent,
  },
  {
    path: '404',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
