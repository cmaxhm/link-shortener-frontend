import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { LinksComponent } from './pages/links/links.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateLinkComponent } from './pages/links/components/create-link/create-link.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LinksComponent,
    ProfileComponent,
    CreateLinkComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    MenubarModule
  ]
})
export class DashboardModule {}
