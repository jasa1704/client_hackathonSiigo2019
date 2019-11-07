import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

//Servicios
import { UsuarioService} from '../../services/service.index';

//Interfaces
import { Usuario } from '../../models/usuario.model';
import { AccoutSettings, Profile } from '../../interfaces/index'

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css']
})
export class HeaderMainComponent implements OnInit {

  @ViewChild('firstModal') firstModal;
  @ViewChild('secondModal') secondModal;

  public usuario: Usuario;
  public headerNombre;
  public headerProfesion;

  public accoutSettings = new AccoutSettings();
  public profile = new Profile();

  public imagenSubir: File;
  public imagenTemp: any;

  public fechaActual = moment(new Date()).format('L');

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.headerNombre = this.usuario.nombre;
  }

  buscar( termino: string ) {
    this.router.navigate(['/busqueda', termino ]);
  }

  ModalActualizarContrasena(){
    this.firstModal.show();
  }

  ModalActualizarPerfil(){
    this.secondModal.show();
  }

  onActualizarContrasena(){
    if(this.accoutSettings.password2 !== this.accoutSettings.password3) {
      alert("Contraseñas incorrectas");
      return;
    }
    this.usuario = this._usuarioService.usuario
    this._usuarioService.UpdatePassword(this.accoutSettings, this.usuario._id);
  }


  onSelectionImage(archivo:File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      console.log('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = ()=> {
      this.imagenTemp = reader.result;
    }
  }

  cambiarImagen(res) {
    this._usuarioService.cambiarImagen( this.imagenSubir, res.usuario.role, res.usuario._id);
  }

  onActualizarPerfil(){
    this.profile.nombre = this.usuario.nombre;
    if(this.imagenSubir == null){
      this._usuarioService.actualizarUsuario(this.profile, this.usuario._id, res=>{
        this.headerNombre = res.usuario.nombre;
      });
    }else{
      this._usuarioService.actualizarUsuario(this.profile, this.usuario._id, res=>{
        this.headerNombre = res.usuario.nombre;
        this.cambiarImagen(res);
      });
    }
  }

}
