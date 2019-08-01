import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';


import { LandingComponent } from './landing/landing.component';

const appRoutes: Routes = [
  
  { path: '', component: LandingComponent,data: {
    meta: {
        title: 'Landing',
        description: 'Local car owner'
    }
} }
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
