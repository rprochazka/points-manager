import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {
  CreatePointPageComponent,
  PointsPageComponent,
  EditPointPageComponent
} from "./pages";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "points" },
  { path: "points", pathMatch: "full", component: PointsPageComponent },
  {
    path: "points/create",
    pathMatch: "full",
    component: CreatePointPageComponent
  },
  {
    path: "points/edit/:pointId",
    component: EditPointPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routedComponents = [
  CreatePointPageComponent,
  PointsPageComponent,
  EditPointPageComponent
];
