import { NgModule } from '@angular/core';
import { MaterialModule } from './material-module/material.module';
import { CommonModule } from '@angular/common';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { DialogComponent } from './dialog/dialog.component';
import { LoaderService } from './services/loader/loader.service';
import { AuthInterceptor } from '../security/interceptor/auth.interceptor';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
        HttpClientModule
    ],
    declarations: [
        DialogComponent
    ],
    providers: [
        LoaderService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    entryComponents: [
        DialogComponent
    ],
    exports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule,
        DialogComponent,
        HttpClientModule
    ]
})
export class ComumModule { }