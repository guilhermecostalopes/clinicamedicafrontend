import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComumModule } from 'src/app/core/comum.module';
import { LoginService } from './service/login.service';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './routes/login.routing.module';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        ComumModule,
        LoginRoutingModule
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule { }