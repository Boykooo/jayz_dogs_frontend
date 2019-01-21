import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './initialy/app.component';
import {CuratorComponent} from './dogs/components/curator/curator.component';
import {DogComponent} from './dogs/components/dog/dog.component';
import {RoutingModule} from './dogs/modules/routing.module';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './dogs/modules/material.module';
import {CuratorService} from './dogs/service/curator.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CuratorDialogComponent} from './dogs/components/curator/curator-dialog/curator-dialog.component';
import {ConfirmDialogComponent} from './dogs/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CuratorComponent,
    DogComponent,
    CuratorDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RoutingModule,
    HttpClientModule,
    MaterialModule,
    MatCardModule,
    FlexLayoutModule
  ],
  providers: [
    CuratorService
  ],
  entryComponents: [
    CuratorDialogComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
