import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  public client;
  public Search: any = '';

  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.client = data;
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get("./assets/data/data1.json");
  }

  ngOnInit() {
  }

}
