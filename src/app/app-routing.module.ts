import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosSellComponent } from './pos-sell/pos-sell.component';
import { ProductsComponent } from './products/products.component';
import { MenuComponent } from './menu/menu.component';
import { Report1Component } from './report1/report1.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'pos-sell', component: PosSellComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'report1', component: Report1Component },
  { path: 'menu', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
