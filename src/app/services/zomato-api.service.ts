import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZomatoApiService {
  latitude: number = 0;
  longitude: number = 0;
  requestUrl: string = 'https://developers.zomato.com/api/v2.1/';

  constructor(
    private http: HttpClient
  ) { }

  getRestaurants(lat, long) {
    return this.http.get(this.requestUrl + 'geocode?lat=' + lat + '&lon=' + long, {
      headers: new HttpHeaders({
        'user-key': '3b6768b3cc0215ffda3a6c60e3a97a9a'
      })
    });
  }

  getRestaurantDetailsById(id: number) {
    return this.http.get(this.requestUrl + 'restaurant?res_id=' + id, {
      headers: new HttpHeaders({
        'user-key': '3b6768b3cc0215ffda3a6c60e3a97a9a'
      })
    });
  }

}
