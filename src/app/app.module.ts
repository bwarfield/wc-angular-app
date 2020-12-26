import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductMemoryDataService } from './services/product-in-memory-data.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/products/1', pathMatch: 'full' },
  { path: 'products/:id', component: ProductComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      ProductMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
