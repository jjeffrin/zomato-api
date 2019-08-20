import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  @Input('restaurant') restaurant;
  constructor() { }

  ngOnInit() {
    
  }

}
