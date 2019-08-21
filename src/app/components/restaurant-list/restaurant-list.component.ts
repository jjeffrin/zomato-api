import { Component, OnInit, HostListener } from '@angular/core';
import { ZomatoApiService } from 'src/app/services/zomato-api.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  @HostListener('input') onSearchChange() {
    this.zomatoService.search(this.latitude, this.longitude, this.search).subscribe(data => {
      console.log(data.restaurants);
      this.restaurantList = data.restaurants;
    })
  }
  latitude: number;
  longitude: number;
  location: string;
  restaurantList: any[] = [];
  search: string;
  constructor(
    private zomatoService: ZomatoApiService
  ) { }

  ngOnInit() {
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    };
  }

  setPosition(locationData) {
    this.latitude = locationData.coords.latitude;
    this.longitude = locationData.coords.longitude;
    console.log(this.latitude, this.longitude);
    this.zomatoService.getRestaurants(this.latitude, this.longitude).subscribe(
      data => {
        console.log(data);
        this.location = data.location.title;
        data.nearby_restaurants.sort(function(a, b) { return b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating });
        this.restaurantList = data.nearby_restaurants;
      }
    );
  }

}
