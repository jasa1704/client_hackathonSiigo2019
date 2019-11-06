import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  @Input() public usuario;
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
