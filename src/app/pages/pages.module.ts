
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

//Components
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { BillComponent } from './bill/bill.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    ClientComponent,
    ProductComponent,
    BillComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ]
})
export class PagesModule { }
