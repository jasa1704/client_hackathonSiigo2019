import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profilePatient',
  templateUrl: './profilePatient.component.html',
  styles: []
})
export class ProfilePatientComponent implements OnInit {

  @Input() public patient;
  @Input() public imagenTemp;

  @Output() hidden = new EventEmitter();
  @Output() onActualizarPerfil = new EventEmitter();
  @Output() onSelectionImage: EventEmitter<File> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  hide(){
    this.hidden.emit();
  }

  HandleSelectionImage(archivo:File){
    this.onSelectionImage.emit(archivo);
  }

  HandleActualizarPerfil(){
    this.onActualizarPerfil.emit();
  }

}
