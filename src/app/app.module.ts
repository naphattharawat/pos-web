import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from "@clr/angular";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PosSellComponent } from './pos-sell/pos-sell.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertService } from './alert.service';
import { ProductsComponent } from './products/products.component';
import { AutofocusDirective } from './autofocus.directive';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PosSellComponent,
    ProductsComponent,
    AutofocusDirective,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule

  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
