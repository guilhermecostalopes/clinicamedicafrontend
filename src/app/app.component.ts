import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Sistema de clinica médica";
  public translate: any;
  constructor(translate: TranslateService) {
    translate.addLangs(["pt", "en"]);
    translate.setDefaultLang("pt");

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/pt|en/) ? browserLang : "pt");
  }
}
