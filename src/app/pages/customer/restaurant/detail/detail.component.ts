import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, RestaurantCollection } from '@app/collections/restaurant.collection';
import { INavRoute } from '@app/core/services/navigation.service';
import { ToastService } from '@app/core/services/toast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cloneDeep } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'aka-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  restaurantId$ = new BehaviorSubject<string>(null);
  restaurant: Restaurant = null;

  categories: Array<{ id: string; name: string }> = [];
  selectedCategory = '';
  menus: Array<any> = [];

  isFetching = true;
  isFetchingMenu = true;

  constructor(
    private route: ActivatedRoute,
    private collection: RestaurantCollection,
    private toast: ToastService,
    private title: Title
  ) {
    this.route.params.pipe(untilDestroyed(this)).subscribe((val) => {
      if (val.restaurant_id) {
        this.restaurantId$.next(val.restaurant_id);
      } else {
        this.restaurantId$.next(null);
      }
    });

    this.restaurantId$.pipe(untilDestroyed(this)).subscribe(async (val) => {
      await this.fetch(val);
      this.fetchMenu(val).catch(() => null);
    });
  }

  ngOnInit(): void {}

  async fetch(id: string) {
    try {
      this.isFetching = true;

      const data = await this.collection.findOne(id);
      this.restaurant = data;
      this.title.setTitle(`${data.name} | Ordero`);
    } catch (error) {
      this.toast.error(error);
    } finally {
      this.isFetching = false;
    }
  }

  async fetchMenu(id: string) {
    try {
      this.isFetchingMenu = true;

      const menus = await this.collection.getMenus(id);

      const categories = new Map<string, any>();
      menus.forEach((menu) => {
        for (const categ of menu.categories) {
          if (!categories.get(categ.id)) {
            categories.set(categ.id, categ);
          }
        }
      });

      this.categories = Array.from(categories.values());
      this.menus = cloneDeep(menus.map((val) => ({ ...val, qty: null })));
    } catch (error) {
      this.toast.error(error);
    } finally {
      this.isFetchingMenu = false;
    }
  }

  onIncrease(menu: any) {
    menu.qty++;
  }

  onDecrease(menu: any) {
    if (menu.qty > 0) {
      menu.qty--;

      if (menu.qty === 0) {
        menu.qty = null;
      }
    }
  }
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
