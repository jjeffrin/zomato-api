import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewComponent } from './components/review/review.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { from } from 'rxjs';
import { DiscoverComponent } from './components/discover/discover.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationComponent } from './components/location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantComponent,
    PageNotFoundComponent,
    WrapperComponent,
    AboutRestaurantComponent,
    NavbarComponent,
    ReviewListComponent,
    ReviewComponent,
    MenuListComponent,
    DiscoverComponent,
    LocationListComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ZomatoApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
