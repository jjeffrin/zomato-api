import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AboutRestaurantComponent } from './components/about-restaurant/about-restaurant.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ZomatoApiService } from './services/zomato-api.service';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantComponent,
    PageNotFoundComponent,
    WrapperComponent,
    AboutRestaurantComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ZomatoApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
