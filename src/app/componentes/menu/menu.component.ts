import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { LoginService } from 'src/app/security/service/login.service';

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
  options: FormGroup;
  logado: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public translate: TranslateService,
  ) {
    this.options = formBuilder.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );

  usuarioLogado() {
    this.logado = this.loginService.isAuthenticated;
  }
}
