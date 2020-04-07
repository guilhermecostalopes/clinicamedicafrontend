import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const PrincipalRoutes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(PrincipalRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

