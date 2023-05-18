import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrpdownComponent } from './drpdownn/drpdown/drpdown.component';
import { DemoComponent } from './demo/demo.component';
import { ZehnselectComponent } from './zehnselect/zehnselect.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this line


@NgModule({
  declarations: [
    AppComponent,
    DrpdownComponent,
    DemoComponent,
    ZehnselectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbDropdownModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
