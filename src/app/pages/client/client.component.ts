import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

//Interfaces
import { Client } from '../../interfaces/index'

//Servicios
import { PagerService } from '../../services/shared/pager.service'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  client = new Client();
  client1: Client[] = [];

  constructor(private http: HttpClient, private pagerService: PagerService) {
    this.getJSON().subscribe(data => {
      this.client1 = data;
      this.allItems = data;
      this.setPage(1);
    });
  }

  private allItems: any[];
  public pager: any = {};
  public pagedItems = [];
  public Search: any = '';

  public getJSON(): Observable<any> {
    return this.http.get("./assets/data/data1.json");
  }

  ngOnInit() {
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
