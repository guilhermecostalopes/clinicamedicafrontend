import { CommonModule } from "@angular/common";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TextMaskModule } from "angular2-text-mask";
import { AlertModule } from "ngx-alerts";
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG
} from "ngx-perfect-scrollbar";
//import { AppRoutingModule } from "../app-routing.module";
import { MenuItems } from "../componentes/shared/menu/menu-items";
import { AuthInterceptor } from "../security/interceptor/auth.interceptor";
import { DialogComponent } from "./dialog/dialog.component";
import { MaterialModule } from "./material-module/material.module";
import { LoaderService } from "./services/loader/loader.service";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    PerfectScrollbarModule,
    //AppRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: "right" }),
    HttpClientModule,
    TextMaskModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [DialogComponent],
  providers: [
    MenuItems,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [DialogComponent],
  exports: [
    PerfectScrollbarModule,
    //AppRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    HttpClientModule,
    TextMaskModule,
    TranslateModule
  ]
})
export class ComumModule {}
