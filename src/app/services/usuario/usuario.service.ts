import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { Router } from '@angular/router';

//Interfaces
import { AccoutSettings, Profile } from '../../interfaces/index'

//Sevicios
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  renuevaToken() {

    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url).subscribe((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      console.log('Token renovado');
      return true;
    }, error => {
      swal('Error', error.error.mensaje, 'error');
      this.router.navigate(['/login']);
    })
  }


  estaLogueado() {
    return (this.token.length > 0) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('ajustes');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('patient');

    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recordar: boolean = false, callback) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .subscribe((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return callback(resp);
      }, error => {
        swal('Error en el login', error.error.mensaje, 'error');
      })
  }


  crearUsuario(usuario: Usuario, callback) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).subscribe((resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return callback(resp);
    }, error => {
      swal(error.error.mensaje, 'error');
    })
  }

  cambiarImagen(archivo: File, role: string, id: string) {
    this._subirArchivoService.subirArchivo(archivo, role, id).then((resp: any) => {
      this.usuario.img = resp.img;
      this.guardarStorage(resp._id, this.token, this.usuario, this.menu);
    })
    .catch(err => {
      swal('Error al actualizar la Imagen de perfil', 'Error');
    });
  }

  cargarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);

  }

  // Objeto creado para actualizar contraseña Administrador
  UpdatePassword(accoutSettings: AccoutSettings, _id: string) {
    let url = URL_SERVICIOS + '/usuario/updatepassword/' + _id;
    url += '?token=' + this.token;

    this.http.post(url, accoutSettings).subscribe((resp: any) => {
      if (_id === resp.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }
      swal('Contraseña Actualizada', 'Recuerda ingresar con tu nueva contraseña al iniciar sesión', 'success');
    }, error => {
      swal('Error al actualizar la contraseña', error.error.mensaje, 'error');
    })
  }

  actualizarUsuario(profile: Profile, _id: string, callback) {

    let url = URL_SERVICIOS + '/usuario/' + _id;
    url += '?token=' + this.token;

    this.http.post(url, profile).subscribe((resp: any) => {
        swal('Perfil actualizado', resp.usuario.email, 'success');
        return callback(resp);
    }, error => {
        swal(error.error.mensaje, error.error.errors.message, 'error');
    });
  }

  // buscarUsuarios( termino: string ) {

  //   let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  //   return this.http.get( url )
  //               .map( (resp: any) => resp.usuarios );

  // }

  // borrarUsuario( id: string ) {

  //   let url = URL_SERVICIOS + '/usuario/' + id;
  //   url += '?token=' + this.token;

  //   return this.http.delete( url )
  //               .map( resp => {
  //                 swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
  //                 return true;
  //               });

  // }

}
