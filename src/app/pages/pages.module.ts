
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MatInputModule } from '@angular/material/input';
import { DataTableModule } from "angular-6-datatable";

//Components
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { BillComponent } from './bill/bill.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng-select';

@NgModule({
  declarations: [
    ClientComponent,
    ProductComponent,
    BillComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SelectModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    MatInputModule,
    ModalModule.forRoot(),
    PipesModule,
    ReactiveFormsModule,
    DataTableModule,
    TooltipModule.forRoot(),
  ]
})
export class PagesModule { }
