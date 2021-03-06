import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { CategoryComponent } from './views/category/category.component';
import { DialogComponent } from './dialog/dialog.component';
import { CategoryEditComponent } from './views/category-edit/category-edit.component';
import { CategoryFormComponent } from './views/category-form/category-form.component';
import { CheklistComponent } from './views/cheklist/cheklist.component';
import { ChecklistEditComponent } from './views/checklist-edit/checklist-edit.component';
import { ChecklistFormComponent } from './views/checklist-form/checklist-form.component';

//configurações pt-Br locale
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
registerLocaleData(localePt);



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    CategoryComponent,
    DialogComponent,
    CategoryEditComponent,
    CategoryFormComponent,
    CheklistComponent,
    ChecklistEditComponent,
    ChecklistFormComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule

  ],
  providers: [
    {provide: LOCALE_ID, useValue:'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
