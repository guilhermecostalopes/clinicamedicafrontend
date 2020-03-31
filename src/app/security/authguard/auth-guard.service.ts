import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from "../service/login.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    if (this.loginService.isAuthenticated()) {
      this.loginService.refreshToken();
      return true;
    } else {
      this.loginService.logout();
      this.router.navigate(["login"]);
      return false;
    }
  }
}
