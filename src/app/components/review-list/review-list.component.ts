import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZomatoApiService } from 'src/app/services/zomato-api.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  restaurantId: number;
  reviews: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private zomatoService: ZomatoApiService
  ) { }

  ngOnInit() {    
    this.activatedRoute.pathFromRoot[2].params.subscribe(data => {
      this.restaurantId = data.id;
      console.log(data.id);
    })
    this.zomatoService.getRestaurantReviews(this.restaurantId).subscribe(
      (data: any) => {
        console.log(data);
        this.reviews = data.user_reviews;
      }
    );
  }

}
