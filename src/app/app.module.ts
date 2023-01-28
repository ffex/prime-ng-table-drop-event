import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {TableModule} from 'primeng/table';
import { AppComponent } from './app.component';
import {CardModule} from 'primeng/card';
import { ReordableRowDrop } from './reordable-row-drop.directive';


@NgModule({
  declarations: [
    AppComponent,
    ReordableRowDrop
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
