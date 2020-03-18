import { Injectable, EventEmitter } from '@angular/core';
import { UsuarioModel } from 'src/app/security/model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public static instance: SharedService = null;
  usuario: UsuarioModel;
  showTemplate = new EventEmitter(false);

  constructor() {
    return SharedService.instance = SharedService.instance || this;
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggeIn() {
    if (this.usuario == null) {
      return false;
    }
    return this.usuario.login !== '';
  }
}
