import { Component, OnInit } from "@angular/core";
import { LoginService } from "../service/login.service";
import { UsuarioModel } from "../model/usuario.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedService } from "src/app/core/services/shared/shared.service";
import { Router } from "@angular/router";
import { AlertService } from "ngx-alerts";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CurrrentUserModel } from "../model/currrent-user.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  hide: any;
  loading: boolean;
  formularioLogin: FormGroup;
  loginResource: UsuarioModel;
  user = new UsuarioModel();
  shared: SharedService;
  mensagem: string;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    public alertService: AlertService,
    public loginService: LoginService
  ) {
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

  protected cnpjCpfMask(rawValue: string) {
    const numbers = rawValue.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join("").length;
    }
    if (numberLength <= 11) {
      return [
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/
      ];
    } else {
      return [
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        ".",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        "-",
        /[0-9]/,
        /[0-9]/
      ];
    }
  }

  private mensagemTela(erroServidor: string, mensagem: string) {
    if (erroServidor === "ERROR") {
      this.alertService.danger({ html: mensagem });
    } else if (erroServidor === "SUCCESS") {
      this.alertService.success({ html: mensagem });
    } else if (erroServidor === "WARNING") {
      this.alertService.warning({ html: mensagem });
    } else {
      this.alertService.info({ html: mensagem });
    }
  }
}
