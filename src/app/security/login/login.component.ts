import { Component, OnInit } from "@angular/core";
import { LoginService } from "../service/login.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedService } from "src/app/core/services/shared/shared.service";
import { Router } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CurrrentUserModel } from "../model/currrent-user.model";
import { ComumComponente } from "src/app/core/comum.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent extends ComumComponente implements OnInit {
  hide: any;
  loading: boolean;
  formularioLogin: FormGroup;
  loginResource: CurrrentUserModel;
  user = new CurrrentUserModel();
  shared: SharedService;
  mensagem: string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    public alertService: AlertService,
    public loginService: LoginService
  ) {
    super(alertService);
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.criarFormGroup();
  }

  criarFormGroup() {
    this.formularioLogin = this.formBuilder.group({
      login: ["", Validators.required],
      senha: ["", Validators.required]
    });
  }

  alterarSenha() {}

  logar() {
    this.mensagem = "";
    this.loginService.logar(this.formularioLogin.value).subscribe(
      (userAuthentication: CurrrentUserModel) => {
        console.log(userAuthentication);
        this.loginService.guardarUsuario(
          userAuthentication.login,
          userAuthentication.nome
        );
        this.loginService.guardarToken(userAuthentication.token);
        this.loginService.guardarRole(userAuthentication.autorizacoes);
        this.mensagemTela(
          userAuthentication.mensagem.type,
          userAuthentication.mensagem.texto
        );
        this.router.navigate(["/"]);
      },
      (err: any) => {
        console.log(err);
        this.mensagemTela("ERROR", "Erro ao tentar logar !");
      }
    );
  }

  cancelarLogin() {
    this.mensagem = "";
    window.location.href = "/login";
    window.location.reload(true);
  }
}
