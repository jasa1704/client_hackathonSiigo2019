
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from "angular-6-datatable";

//Components
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { BillComponent } from './bill/bill.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { DataFilterPipe } from './datafilterpipe';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    ClientComponent,
    ProductComponent,
    BillComponent,
    DataFilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    PipesModule,
    DataTableModule,
  ]
})
export class PagesModule { }
