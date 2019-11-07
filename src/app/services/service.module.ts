import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

//Importación de servicios
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  PatientService,
  UtilitiesService,
  LoginGuardGuard,
  AdminGuard,
  SubirArchivoService,
  VerificaTokenGuard,
  PagerService,
  FilesService,
  ProductoService,
  ClientesService
 } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    PatientService,
    LoginGuardGuard,
    AdminGuard,
    PagerService,
    UtilitiesService,
    SubirArchivoService,
    ModalUploadService,
    FilesService,
    ProductoService,
    ClientesService,
    VerificaTokenGuard
  ],
  declarations: []
})
export class ServiceModule { }
