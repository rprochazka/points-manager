import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { reducers, metaReducers } from './reducers';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app.module.routing';
import {
  EditPointFormComponent,
  PointListComponent,
  PointListFilterComponent,
  PagingComponent
} from './components';

const components = [
  EditPointFormComponent,
  PointListComponent,
  PointListFilterComponent,
  PagingComponent
];

import * as fromPoints from './reducers/points-reducer';
import { PointsEffects } from './effects/points-effects';

@NgModule({
  declarations: [AppComponent, ...routedComponents, ...components],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    NgxDatatableModule,

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    // StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forRoot({ points: fromPoints.reducer }),
    EffectsModule.forRoot([PointsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
