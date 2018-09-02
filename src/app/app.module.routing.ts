import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePointComponent, PointsComponent } from './pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'points' },
  { path: 'points', pathMatch: 'full', component: PointsComponent },
  { path: 'points/create', pathMatch: 'full', component: CreatePointComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [CreatePointComponent, PointsComponent];
