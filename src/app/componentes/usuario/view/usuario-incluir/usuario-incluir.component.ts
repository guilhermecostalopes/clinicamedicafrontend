import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { PrincipalComponente } from 'src/app/componentes/principal.componente';
import { EnumModel } from "src/app/core/model/enum.model";
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { MensagemModel } from 'src/app/security/model/error.model';
import { UsuarioModel } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: "app-usuario-incluir",
  templateUrl: "./usuario-incluir.component.html",
  styleUrls: ["./usuario-incluir.component.scss"]
})
export class UsuarioIncluirComponent extends PrincipalComponente {
  public usuarioIncluirFormGroup: FormGroup;
  public roles: EnumModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: UsuarioService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService,
    public snackBar: SnackBarComponent
  ) {
    super(
      new UsuarioModel(),
      "usuarios",
      service,
      router,
      dialog,
      routaAtual,
      translate,
      snackBar
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criarFormGroup();
    this.buscarRoles();
  }

  public criarFormGroup() {
    this.usuarioIncluirFormGroup = this.formBuilder.group({
      nome: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
          Validators.required
        ])
      ),
      login: new FormControl(
        { value: " " },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
          Validators.required
        ])
      ),
      senha: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(14),
          Validators.minLength(8),
          Validators.required
        ])
      ),
      confirmacaoSenha: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(14),
          Validators.minLength(8),
          Validators.required
        ])
      ),
      role: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      )
    });
  }

  public salvarForm() {
    if (this.usuarioIncluirFormGroup.invalid) {
      let errorMessage = new MensagemModel();
      let errorMessages: Array<MensagemModel> = [];
      if (this.usuarioIncluirFormGroup.get("nome").errors != null) {
        const nome = this.usuarioIncluirFormGroup.get("nome").errors;
        if (nome.required) {
          errorMessage.texto = "Nome é obrigatório !";
        } else if (nome.minlength) {
          errorMessage.texto = "Nome deve ter no mínimo de " +
            nome.minlength.requiredLength
            + " caracteres !";
        } else if (nome.maxlength) {
          errorMessage.texto = "Nome deve ter no máximo de " +
            nome.maxlength.requiredLength
            + " caracteres !";
        }
      } else if (this.usuarioIncluirFormGroup.get("login").errors != null) {
        const login = this.usuarioIncluirFormGroup.get("login").errors;
        if (login.errors.required) {
          errorMessage.texto = "Login é obrigatório !";
        } else if (login.errors.minlength) {
          errorMessage.texto = "Login deve ter no mínimo de " +
            login.minlength.requiredLength
            + " caracteres !";
        } else if (login.errors.maxlength) {
          errorMessage.texto = "Login deve ter no máximo de " +
            login.maxlength.requiredLength
            + " caracteres !";
        }
      } else if (this.usuarioIncluirFormGroup.get("senha").errors != null) {
        const senha = this.usuarioIncluirFormGroup.get("senha").errors;
        if (senha.errors.required) {
          errorMessage.texto = "Senha é obrigatório !";
        } else if (senha.errors.minlength) {
          errorMessage.texto = "Senha deve ter no mínimo de " +
            senha.minlength.requiredLength
            + " caracteres !";
        } else if (senha.errors.maxlength) {
          errorMessage.texto = "Senha deve ter no máximo de " +
            senha.maxlength.requiredLength
            + " caracteres !";
        }
      } else if (this.usuarioIncluirFormGroup.get("role").errors != null) {
        if (this.usuarioIncluirFormGroup.get("role").errors.required) {
          errorMessage.texto = "Role da consulta é obrigatório !";
        }
      }
      errorMessages.push(errorMessage);
      super.mensagemTela("ERROR", errorMessages);
      return;
    }
    super.salvar(this.usuarioIncluirFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.usuarioIncluirFormGroup.reset();
  }

  private buscarRoles() {
    this.service.buscarRoles().subscribe((data: any) => {
      data.forEach((dado: any) => {
        let enun = new EnumModel();
        enun.key = dado.key;
        enun.texto = dado.texto;
        this.roles.push(enun);
      });
    });
  }
}
