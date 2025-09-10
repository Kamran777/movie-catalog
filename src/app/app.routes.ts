import { Routes } from '@angular/router';
import { CataloguePageComponent } from './features/catalogue-page/catalogue-page.component';

export const routes: Routes = [
  { path: '', component: CataloguePageComponent },
  { path: '**', redirectTo: '' },
];
