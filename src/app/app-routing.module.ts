import { Routes, RouterModule } from "@angular/router";
import { AppBlankComponent } from "./componentes/layouts/blank/blank.component";
import { FullComponent } from "./componentes/layouts/full.component";
import { NgModule } from '@angular/core';

const PrincipalRoutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () => import('./componentes/dashboard/dashboard.module').then(m => m.DashboardModule)
        //loadChildren: "/src/componentes/dashboard/dashboard.module#DashboardModule"
      },
      {
        path: "especialidades",
        loadChildren: () => import('./componentes/especialidade/especialidade.module').then(m => m.EspecialidadeModule)
        //loadChildren: "/src/componentes/dashboard/dashboard.module#DashboardModule"
      }
    ],
  },
  {
    path: "",
    component: AppBlankComponent,
    children: [
      {
        path: "",
        loadChildren: () => import('./security/login.module').then(m => m.LoginModule)
        //loadChildren: "/src/security/login.module#LoginModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(PrincipalRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

