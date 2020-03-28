import { NgModule } from "@angular/core";
import { MaterialModule } from "./material-module/material.module";
import { CommonModule } from "@angular/common";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient
} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "ngx-alerts";
import { DialogComponent } from "./dialog/dialog.component";
import { LoaderService } from "./services/loader/loader.service";
import { AuthInterceptor } from "../security/interceptor/auth.interceptor";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, position: "right" }),
    HttpClientModule,
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
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  entryComponents: [DialogComponent],
  exports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    DialogComponent,
    HttpClientModule,
    TranslateModule
  ]
})
export class ComumModule {}
