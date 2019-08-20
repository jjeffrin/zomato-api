import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZomatoApiService } from 'src/app/services/zomato-api.service';

@Component({
  selector: 'app-about-restaurant',
  templateUrl: './about-restaurant.component.html',
  styleUrls: ['./about-restaurant.component.css']
})
export class AboutRestaurantComponent implements OnInit {
  restaurantId: number;
  name: string;
  cuisines: string;
  bgImage: string;
  rating: number;
  ratingColor: string;
  timing: string;
  timingToggle: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private zomatoService: ZomatoApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      param => {
        console.log(param['id']);
        this.restaurantId = param['id'];
      }
    );
    this.zomatoService.getRestaurantDetailsById(this.restaurantId).subscribe(
      data => {
        console.log(data);
        console.log(data.user_rating.rating_color);
        this.name = data.name;
        this.cuisines = data.cuisines;
        this.bgImage = data.featured_image;
        this.rating = data.user_rating.aggregate_rating;
        this.ratingColor = data.user_rating.rating_color;
        this.timing = data.timings;
      }
    )
  }

  timingToggler() {
    this.timingToggle = !this.timingToggle;
  }

}
