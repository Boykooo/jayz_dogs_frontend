import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './initialy/app.component';
import {CuratorComponent} from './dogs/components/curator/curator.component';
import {DogComponent} from './dogs/components/dog/dog.component';
import {RoutingModule} from './dogs/modules/routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './dogs/modules/material.module';

@NgModule({
  declarations: [
    AppComponent,
    CuratorComponent,
    DogComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
