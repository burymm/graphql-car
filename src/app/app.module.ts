import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {RegistrationComponent} from "./registration/registration.component";
import {FormsModule} from "@angular/forms";
import {GraphQLModule} from "./graphql.module";
import {CarVendorsComponent} from "./car-vendors/car-vendors.component";
import {CarModelComponent} from "./car-models/car-model.component";


const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'car-vendors', component: CarVendorsComponent },
  { path: 'car-models', component: CarModelComponent },
  /*{ path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    CarVendorsComponent,
    CarModelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GraphQLModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
