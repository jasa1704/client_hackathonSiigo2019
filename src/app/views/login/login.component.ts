import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }
    let usuario = new Usuario(null, null, null, null, forma.value.email, forma.value.password);
    // this.router.navigate(['/main']);
    this._usuarioService.login( usuario, forma.value.recuerdame, res=> {
      if(res.ok === true){
        this.router.navigate(['/siigo/client']);
      }
    });
  }
}
