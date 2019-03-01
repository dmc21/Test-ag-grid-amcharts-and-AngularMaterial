import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSidenavModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { AdminComponent } from './administrator/admin/admin.component';



import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes } from '@angular/router';
import { GraficosComponent } from './administrator/graficos/graficos.component';
import { AgGridModule } from 'ag-grid-angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import 'ag-grid-enterprise';

const routes: Routes = [
  {path: 'graficos', component: GraficosComponent},
  {path: 'administracion', component: AdminComponent},
  {path: '**', redirectTo: 'graficos'}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GraficosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AgGridModule.withComponents([]),
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
