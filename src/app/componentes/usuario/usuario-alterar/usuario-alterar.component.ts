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
import { AlertService } from "ngx-alerts";
import { EpecialidadeService } from "../../especialidade/service/epecialidade.service";
import { PrincipalComponente } from "../../principal.componente";
import { UsuarioModel } from '../model/usuario.model';

@Component({
  selector: "app-usuario-alterar",
  templateUrl: "./usuario-alterar.component.html",
  styleUrls: ["./usuario-alterar.component.css"]
})
export class UsuarioAlterarComponent extends PrincipalComponente {
  public usuarioAlterarFormGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public service: EpecialidadeService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public routaAtual: ActivatedRoute,
    public translate: TranslateService
  ) {
    super(
      new UsuarioModel(),
      "usuarios",
      service,
      router,
      alertService,
      dialog,
      routaAtual,
      translate
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.criarFormGroup();
  }

  public criarFormGroup() {
    this.usuarioAlterarFormGroup = this.formBuilder.group({
      id: new FormControl(
        { value: "" },
        Validators.compose([Validators.required])
      ),
      nome: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
          Validators.required
        ])
      ),
      login: new FormControl(
        { value: "" },
        Validators.compose([
          Validators.maxLength(255),
          Validators.minLength(5),
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
    if (this.usuarioAlterarFormGroup.invalid) {
      if (this.usuarioAlterarFormGroup.get("nome").errors != null) {
        if (this.usuarioAlterarFormGroup.get("nome").errors.required) {
          super.mensagemTela("ERROR", "Nome é obrigatório !");
        } else if (this.usuarioAlterarFormGroup.get("nome").errors.minlength) {
          super.mensagemTela(
            "ERROR",
            "Nome deve ter no mínimo de 5 caracteres !"
          );
        } else if (this.usuarioAlterarFormGroup.get("nome").errors.maxlength) {
          super.mensagemTela(
            "ERROR",
            "Nome deve ter no máximo de 255 caracteres !"
          );
        }
      } else if (this.usuarioAlterarFormGroup.get("login").errors != null) {
        if (this.usuarioAlterarFormGroup.get("login").errors.required) {
          super.mensagemTela("ERROR", "Login é obrigatório !");
        } else if (this.usuarioAlterarFormGroup.get("login").errors.minlength) {
          super.mensagemTela(
            "ERROR",
            "Login deve ter no mínimo de 5 caracteres !"
          );
        } else if (this.usuarioAlterarFormGroup.get("login").errors.maxlength) {
          super.mensagemTela(
            "ERROR",
            "Login deve ter no máximo de 255 caracteres !"
          );
        }
      } else if (this.usuarioAlterarFormGroup.get("role").errors != null) {
        if (this.usuarioAlterarFormGroup.get("role").errors.required) {
          super.mensagemTela("ERROR", "Role da consulta é obarigatório !");
        }
      }
      return;
    }
    super.salvar(this.usuarioAlterarFormGroup.value);
  }

  public limpar() {
    this.mostrarPesquisa = false;
    this.usuarioAlterarFormGroup.reset();
  }
}
