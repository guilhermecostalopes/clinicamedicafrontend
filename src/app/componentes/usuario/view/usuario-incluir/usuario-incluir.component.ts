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
import { EnumModel } from "src/app/core/model/enum.model";
import { PrincipalComponente } from 'src/app/componentes/principal.componente';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioModel } from '../../model/usuario.model';
import { SnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

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
      if (this.usuarioIncluirFormGroup.get("nome").errors != null) {
        if (this.usuarioIncluirFormGroup.get("nome").errors.required) {
          super.mensagemTela("ERROR", "Nome é obrigatório !");
        } else if (this.usuarioIncluirFormGroup.get("nome").errors.minlength) {
          super.mensagemTela(
            "ERROR",
            "Nome deve ter no mínimo de 5 caracteres !"
          );
        } else if (this.usuarioIncluirFormGroup.get("nome").errors.maxlength) {
          super.mensagemTela(
            "ERROR",
            "Nome deve ter no máximo de 255 caracteres !"
          );
        }
      } else if (this.usuarioIncluirFormGroup.get("login").errors != null) {
        if (this.usuarioIncluirFormGroup.get("login").errors.required) {
          super.mensagemTela("ERROR", "Login é obrigatório !");
        } else if (this.usuarioIncluirFormGroup.get("login").errors.minlength) {
          super.mensagemTela(
            "ERROR",
            "Login deve ter no mínimo de 5 caracteres !"
          );
        } else if (this.usuarioIncluirFormGroup.get("login").errors.maxlength) {
          super.mensagemTela(
            "ERROR",
            "Login deve ter no máximo de 255 caracteres !"
          );
        }
      } else if (this.usuarioIncluirFormGroup.get("senha").errors != null) {
        if (this.usuarioIncluirFormGroup.get("senha").errors.required) {
          super.mensagemTela("ERROR", "Senha é obrigatório !");
        } else if (this.usuarioIncluirFormGroup.get("login").errors.minlength) {
          super.mensagemTela(
            "ERROR",
            "Senha deve ter no mínimo de 8 caracteres !"
          );
        } else if (this.usuarioIncluirFormGroup.get("senha").errors.maxlength) {
          super.mensagemTela(
            "ERROR",
            "Senha deve ter no máximo de 14 caracteres !"
          );
        }
      } else if (this.usuarioIncluirFormGroup.get("role").errors != null) {
        if (this.usuarioIncluirFormGroup.get("role").errors.required) {
          super.mensagemTela("ERROR", "Role da consulta é obarigatório !");
        }
      }
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
      data.forEach((e: any) => {
        let enun = new EnumModel();
        enun.key = e.key;
        enun.texto = e.texto;
        this.roles.push(enun);
      });
    });
  }
}
