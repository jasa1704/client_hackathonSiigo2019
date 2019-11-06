import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
})
export class AccoutSettingsComponent implements OnInit {

  @Input() public accoutSettings;
  @Input() public usuario;

  @Output() hidden = new EventEmitter();
  @Output() onActualizarContrasena = new EventEmitter();


  constructor( public _ajustes: SettingsService ) { }

  ngOnInit() {}

  hide(){
    this.hidden.emit();
  }

  HandleActualizarContrasena(){
    this.onActualizarContrasena.emit();
  }

}
