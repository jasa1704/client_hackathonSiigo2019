
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { HttpModule } from '@angular/http';
import { DataTableModule } from "angular-6-datatable";
import { ModalModule } from 'ngx-bootstrap/modal';
import { SelectModule } from 'ng-select';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

//Componente
import { MainComponent } from './main.component';
import { SharedModule } from '../../shared/shared.module';
import { DataFilterPipe } from './datafilterpipe';
import { ServiceModule } from '../../services/service.module';

@NgModule({
    declarations: [
      MainComponent,
      DataFilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ServiceModule,
        ChartsModule,
        SharedModule,
        HttpModule,
        DataTableModule,
        ModalModule.forRoot(),
        SelectModule,
        TooltipModule.forRoot(),
    ]
})
export class MainModule { }
