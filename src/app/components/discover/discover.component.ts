import { Component, OnInit } from '@angular/core';
import { ZomatoApiService } from 'src/app/services/zomato-api.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  location: string;
  latitude: number;
  longitude: number;
  entityId: number;
  entityType: string;
  search: string;
  searchLocation: string;
  restaurantList: any[] = [];
  locationList: any[] = [];
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
        this.searchLocation = data.location.title;
        // data.nearby_restaurants.sort(function(a, b) { return b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating });
        // this.restaurantList = data.nearby_restaurants;
      }
    );
  }

  searchRestaurants() {
    if (this.search == '') {
      console.log("stay");
      this.restaurantList = [];
    }
    else {
      console.log('changes');
      this.zomatoService.discoverRestaurant(this.entityId, this.entityType, this.search, this.latitude, this.longitude).subscribe(data => {
        console.log(data);
        if (this.search !== '') {
          this.restaurantList = data.restaurants;
        }
      });
    }
  }

  searchCity() {
    console.log('city changes');
    if (this.searchLocation == '') {
      console.log("stay");
      //this.restaurantList = [];
    }
    else {
      console.log('changes');
      this.zomatoService.searchCity(this.searchLocation).subscribe(data => {
        console.log(data.location_suggestions[0]);
        this.restaurantList = [];
        this.locationList = data.location_suggestions;
        // if (this.searchLocation !== '') {
        //   this.restaurantList = data.restaurants;
        // }
      });
    }
  }

  setLocation(data) {
    console.log(data.title);
    this.entityId = data.entity_id;
    this.entityType = data.entity_type;
    this.searchLocation = data.title;
    this.locationList = [];
  }

}
