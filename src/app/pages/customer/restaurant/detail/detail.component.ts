import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INavRoute } from '@app/core/services/navigation.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  restaurantId$ = new BehaviorSubject<string>(null);
  restaurantId: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.pipe(untilDestroyed(this)).subscribe((val) => {
      if (val.restaurant_id) {
        this.restaurantId$.next(val.restaurant_id);
      } else {
        this.restaurantId$.next(null);
      }
    });

    this.restaurantId$.pipe(untilDestroyed(this)).subscribe((val) => {
      this.restaurantId = val;
    });
  }

  ngOnInit(): void {}
}

export const CustomerRestaurantDetailNavRoute: INavRoute = {
  path: ':restaurant_id',
  name: 'customer.restaurant.detail',
  title: 'customer.restaurant.detail.parent',
};

export const CustomerRestaurantDetailRoute: INavRoute = {
  ...CustomerRestaurantDetailNavRoute,
  component: DetailComponent,
};
