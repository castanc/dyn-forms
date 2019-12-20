import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenericComponent } from './components/generic/generic.component';
import { BaseComponent } from './components/base/base.component';
import { BackEndService } from './services/backend';
import { FieldComponent } from './components/field/field.component';
import { GenericWithRelatedComponent } from './components/generic-with-related/generic-with-related.component'

const appRoutes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'create', component: GenericComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    GenericComponent,
    BaseComponent,
    FieldComponent,
    GenericWithRelatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [BackEndService],
  bootstrap: [AppComponent]
})
export class AppModule { }
