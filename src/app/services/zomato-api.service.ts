import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ZomatoApiService {
  private subject = new Subject<number>();
  latitude: number = 0;
  longitude: number = 0;
  requestUrl: string = 'https://developers.zomato.com/api/v2.1/';

  constructor(
    private http: HttpClient
  ) { }

  passRestaurantId(id: number) {
    this.subject.next(id);
  }

  getRestaurantId(): Observable<number> {
    return this.subject.asObservable();
  }

  getRestaurants(lat, long) {
    return this.http.get(this.requestUrl + 'geocode?lat=' + lat + '&lon=' + long, {
      headers: new HttpHeaders({
        'user-key': 'cc7bcf1aa0a74dbe28337c240180a60d'
      })
    });
  }

  getRestaurantDetailsById(id: number) {
    return this.http.get(this.requestUrl + 'restaurant?res_id=' + id, {
      headers: new HttpHeaders({
        'user-key': 'cc7bcf1aa0a74dbe28337c240180a60d'
      })
    });
  }

  getRestaurantReviews(id: number) {
    return this.http.get(this.requestUrl + 'reviews?res_id=' + id, {
      headers: new HttpHeaders({
        'user-key': 'cc7bcf1aa0a74dbe28337c240180a60d'
      })
    });
  }

  search(lat, long, q) {
    console.log(lat, long, q);
    if (q !== '') {
      var listOfRest = this.http.get(this.requestUrl + 'search?q='+q+'&count=2&lat='+lat+'&lon='+long+'&sort=real_distance&order=asc', {
        headers: new HttpHeaders({
          'user-key': 'cc7bcf1aa0a74dbe28337c240180a60d'
        })
      }).pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"BookName": "No Record Found"} as any]
                );
            }
    ));
    return listOfRest;
    }  
  }

  searchCity(q) {
    console.log(q);
    if (q !== '') {
      var listOfCity = this.http.get(this.requestUrl + 'locations?query='+q+'&count=8', {
        headers: new HttpHeaders({
          'user-key': 'cc7bcf1aa0a74dbe28337c240180a60d'
        })
      }).pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"BookName": "No Record Found"} as any]
                );
            }
    ));
    return listOfCity;
    }  
  }

  discoverRestaurant(entityId: number, entityType: string, q: string, lat: number, long: number) {
    if (q !== '') {
      var listOfRest = this.http.get(this.requestUrl + 'search?entity_id='+entityId+'&entity_type='+entityType+'&q='+q+'&count=5&lat='+lat+'&lon='+long+'&radius=2000', {
        headers: new HttpHeaders({
          'user-key': 'cc7bcf1aa0a74dbe28337c240180a60d'
        })
      }).pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
            (data: any) => {
                return (
                    data.length != 0 ? data as any[] : [{"BookName": "No Record Found"} as any]
                );
            }
    ));
    return listOfRest;
    }
  }

}
