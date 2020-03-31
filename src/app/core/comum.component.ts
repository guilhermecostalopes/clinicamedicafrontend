import { OnInit } from "@angular/core";
import { AlertService } from "ngx-alerts";

export abstract class ComumComponente implements OnInit {
  constructor(public alertService: AlertService) {}

  ngOnInit(): void {}

  protected mensagemTela(tipoMensagem: string, mensagem: string) {
    if (tipoMensagem === "ERROR") {
      this.alertService.danger({ html: mensagem });
    } else if (tipoMensagem === "SUCCESS") {
      this.alertService.success({ html: mensagem });
    } else if (tipoMensagem === "WARNING") {
      this.alertService.warning({ html: mensagem });
    } else {
      this.alertService.info({ html: mensagem });
    }
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
