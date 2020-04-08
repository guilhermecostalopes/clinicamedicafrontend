import { OnInit } from "@angular/core";
import { SnackBarComponent } from "./snack-bar/snack-bar.component";
import { MensagemModel } from '../security/model/error.model';

export abstract class ComumComponente implements OnInit {
  constructor(public snackBar: SnackBarComponent) { }

  ngOnInit(): void { }

  protected mensagemTela(tipoMensagem: string, mensagens: MensagemModel[]) {
    const mensagem: string = this.ajustarMensagens(mensagens);
    if (tipoMensagem === "ERROR") {
      this.snackBar.openSnackBar(mensagem, 'error')
    } else if (tipoMensagem === "SUCCESS") {
      this.snackBar.openSnackBar(mensagem, 'success')
    } else if (tipoMensagem === "WARNING") {
      this.snackBar.openSnackBar(mensagem, 'warning')
    } else {
      this.snackBar.openSnackBar(mensagem)
    }
  }

  private ajustarMensagens(mensagens: MensagemModel[]) {
    let mensagemRetorno: string = '';
    mensagens.forEach(m => {
      mensagemRetorno = mensagemRetorno + m.texto;
    });
    return mensagemRetorno;
  }

  public cpfMask() {
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
  }

  public cnpjMask() {
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

  public cnpjCpfMask(rawValue: string) {
    const numbers = rawValue.match(/\d/g);
    let numberLength = 0;
    if (numbers) {
      numberLength = numbers.join("").length;
    }
    if (numberLength <= 11) {
      this.cpfMask();
    } else {
      this.cnpjMask();
    }
  }
}
