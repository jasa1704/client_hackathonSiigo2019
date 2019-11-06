import { Component, OnInit } from '@angular/core';
declare function init_plugins();

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit{
  constructor() { }

  ngOnInit() {
    init_plugins();
  }
 }
