import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ComumComponente } from "src/app/core/comum.component";
import { SharedService } from "src/app/core/services/shared/shared.service";
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { CurrrentUserModel } from "../../model/currrent-user.model";
import { MensagemModel } from '../../model/error.model';
import { LoginService } from "../../service/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
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
    public loginService: LoginService,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(snackBar);
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

  alterarSenha() {
    this.router.navigate(["/esqueceu-senha"]);
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
        let errorMessage = new MensagemModel();
        let errorMessages: Array<MensagemModel> = [];
        errorMessage.texto = "Sem permissão para acessa a página !";
        errorMessages.push(errorMessage);
        console.log(errorMessages);
        this.mensagemTela("ERROR", errorMessages);
      }
    );
  }

  cancelarLogin() {
    this.mensagem = "";
    window.location.href = "/login";
    window.location.reload(true);
  }
}
