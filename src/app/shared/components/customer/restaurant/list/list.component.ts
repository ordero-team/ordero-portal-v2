import { Component, OnInit } from '@angular/core';
import { Restaurant, RestaurantCollection } from '@app/collections/restaurant.collection';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'aka-customer-restaurant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CustomerRestaurantListComponent implements OnInit {
  resstaurants$ = new BehaviorSubject<Restaurant[]>([]);

  constructor(private collection: RestaurantCollection) {}

  async ngOnInit() {
    const data = await this.collection.find();
    this.resstaurants$.next(data);
  }
}
