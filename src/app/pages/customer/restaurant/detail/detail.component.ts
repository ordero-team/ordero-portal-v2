import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Restaurant, RestaurantCollection } from '@app/collections/restaurant.collection';
import { CartService, MenuItem } from '@app/core/services/cart.service';
import { INavRoute } from '@app/core/services/navigation.service';
import { ToastService } from '@app/core/services/toast.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'aka-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, AfterViewInit {
  restaurantId$ = new BehaviorSubject<string>(null);
  restaurant: Restaurant = null;

  categories: Array<{ id: string; name: string }> = [];
  selectedCategory = '';
  menus: Array<MenuItem> = [];
  tempMenus: Array<MenuItem> = [];

  isFetching = true;
  isFetchingMenu = true;

  @ViewChildren('search') search: ElementRef;
  _timer: any;

  constructor(
    private route: ActivatedRoute,
    private collection: RestaurantCollection,
    private toast: ToastService,
    private title: Title,
    private cart: CartService,
    private elem: ElementRef
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

  ngOnInit() {
    console.log(this.search.nativeElement);
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          console.log(text, this.search.nativeElement.value);
        })
      )
      .subscribe();
  }

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
      this.menus = menus.map((val: MenuItem) => {
        const cartItem = this.cart.getCartItems().find((item) => item.id === val.id);

        if (cartItem) {
          return { ...val, qty: cartItem.qty };
        }

        return { ...val, qty: null };
      });
      this.tempMenus = cloneDeep(this.menus);
    } catch (error) {
      this.toast.error(error);
    } finally {
      this.isFetchingMenu = false;
    }
  }

  findMenu() {
    // this.menus =
    //   this.search === ''
    //     ? this.tempMenus
    //     : this.menus.filter((val) => val.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  onIncrease(menu: MenuItem) {
    this.cart.addToCart(menu);
    menu.qty++;
  }

  onDecrease(menu: MenuItem) {
    const item = this.cart.decreaseItemQty(menu);
    menu.qty = item.qty;
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
