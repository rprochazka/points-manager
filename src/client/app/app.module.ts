import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app.module.routing';
import { EditPointFormComponent, PointListComponent, PointListFilterComponent, PagingComponent } from './components';

const components = [
  EditPointFormComponent,
  PointListComponent,
  PointListFilterComponent,
  PagingComponent
];

@NgModule({
  declarations: [
    AppComponent,
    ...routedComponents,
    ...components
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgxDatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
