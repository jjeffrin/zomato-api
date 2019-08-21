import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  costForTwo: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private zomatoService: ZomatoApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      param => {
        console.log(param['id']);
        this.zomatoService.passRestaurantId(this.restaurantId);
        this.restaurantId = param['id'];
        // this.zomatoService.passRestaurantId(this.restaurantId);
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
        this.costForTwo = data.average_cost_for_two;
      }
    )
  }

  timingToggler() {
    this.timingToggle = !this.timingToggle;
  }

  navigateToReviews() {
    this.zomatoService.passRestaurantId(this.restaurantId);
    this.router.navigate(['/aboutRestaurant/'+this.restaurantId+'/reviews']);
  }

}
