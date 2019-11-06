import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

//Components
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilePatientComponent } from './profilePatient/profilePatient.component';
// import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        FormsModule,
        ModalModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        HeaderMainComponent,
        SidebarComponent,
        FooterComponent,
        NopagefoundComponent,
        AccoutSettingsComponent,
        ProfileComponent,
        ProfilePatientComponent
        // BreadcrumbsComponent,
    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        HeaderMainComponent,
        SidebarComponent,
        FooterComponent,
        NopagefoundComponent
        // BreadcrumbsComponent,
    ]
})
export class SharedModule { }
