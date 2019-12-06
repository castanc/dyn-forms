import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericComponent} from './components/generic/generic.component'
import { BaseComponent } from './components/base/base.component'


const routes: Routes = [];
const appRoutes: Routes = [
  {path: '', redirectTo: '/Nuevo', pathMatch: 'full'},
  {path: 'create', component: GenericComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
