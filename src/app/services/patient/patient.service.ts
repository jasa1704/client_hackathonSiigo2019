import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { Router } from '@angular/router';

//Interfaces
import { Patient } from '../../interfaces/index'

//Sevicios
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class PatientService {

  patient = new Patient();
  token: string;
  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  guardarStorage(patient: Patient) {
    localStorage.setItem('patient', JSON.stringify(patient));
    return patient;
  }

  crearPatient(patient: Patient, callback) {
    let url = URL_SERVICIOS + '/patient';
    url += '?token=' + this.token;
    return this.http.post(url, patient).subscribe((resp: any) => {
      swal('Paciente creado', patient.correo, 'success');
      return callback(resp);
    }, error => {
      swal('Verifique los datos', error.error.mensaje, 'error');
    })
  }

  cargarPatients(callback) {
    let url = URL_SERVICIOS + '/patient';
    url += '?token=' + this.token;
    return this.http.get(url).subscribe((resp: any) => {
      return callback(resp.patient);
    }, error => {
      swal('Problemas con el servidor', error.error.mensaje, 'error');
    })
  }

  cambiarImagen(archivo: File, role: string, id: string, callback) {
    this._subirArchivoService.subirArchivo(archivo, role, id).then((resp: any) => {
      return callback(this.guardarStorage(resp));
    })
      .catch(err => {
        debugger
        swal('Problemas con el servidor', 'Error al actualizar la Imagen del paciente', 'error');
      });
  }

  actualizarPatient(patient: Patient, _id: string, callback) {

    let url = URL_SERVICIOS + '/patient/' + _id;
    url += '?token=' + this.token;

    this.http.post(url, patient).subscribe((resp: any) => {
        swal('Perfil actualizado', resp.patient.correo, 'success');
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
