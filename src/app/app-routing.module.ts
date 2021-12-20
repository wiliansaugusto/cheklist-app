import { CheklistComponent } from './views/cheklist/cheklist.component';
import { CategoryComponent } from './views/category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'category', component: CategoryComponent},
  {path:'checklist', component:CheklistComponent},
  {path:'**', component:PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
