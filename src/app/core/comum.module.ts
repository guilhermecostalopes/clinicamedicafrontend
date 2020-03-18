import { NgModule } from '@angular/core';
import { MaterialModule } from './material-module/material.module';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { DialogComponent } from './dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';

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
    providers: [],
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