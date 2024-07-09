import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerProduct } from '@app/collections/owner/product.collection';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerStockCollection } from '@app/collections/owner/stock.collection';
import { OwnerVariant } from '@app/collections/owner/variant.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffStockCollection } from '@app/collections/staff/stock.collection';
import { appIcons } from '@app/core/helpers/icon.helper';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { QueueService } from '@app/core/services/queue.service';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { get, has } from 'lodash';

@Component({
  selector: 'aka-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.scss'],
})
export class StockFormComponent implements OnInit {
  @Form({
    locations: 'required',
    product: 'required',
    variant: '',
    qty: 'required|min:1',
  })
  formData: FormRecord;

  variants: Array<any> = [];
  items: Array<{ id: string; product: OwnerProduct; variant: OwnerVariant | any; qty: number }> = [];

  @Input() user: OwnerProfile | StaffProfile;

  get disabledVariants() {
    return this.variants.length === 0;
  }

  get isAbleToSubmit() {
    return this.items.length > 0 && this.formData.$payload.locations.length > 0;
  }

  get isOwner() {
    return this.user && this.user.role.name === 'owner';
  }

  constructor(
    private toast: ToastService,
    private collection: OwnerStockCollection,
    private staffCol: StaffStockCollection,
    private auth: OwnerAuthService,
    private queue: QueueService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.formData.$import({
      locations: '',
      product: '',
      variant: '',
      qty: '',
    });

    this.variants = [];
    this.items = [];
  }

  addItem() {
    const product = get(this.formData.$payload, 'product', null);
    const variant_id = get(this.formData.$payload, 'variant', null);

    if (this.variants.length > 0 && !variant_id) {
      this.toast.warning(`Product (${product.sku}) - ${product.name} is required to choose variant.`);
      return;
    }

    const variant = this.variants.find((val) => val.id === variant_id);
    const qty = get(this.formData.$payload, 'qty', 0);

    const isExist = this.items.find((val) => val.product.id === product.id && val.variant.id === variant.id);

    if (!isExist) {
      this.items.push({ id: product.id, product, variant: variant || {}, qty });
    } else {
      this.toast.warning(
        `Product ${product.sku} - ${product.name} ${
          has(variant, 'variant') ? '(' + variant.variant.name + ')' : ''
        } already in item list below.`
      );
    }

    this.formData.$import({
      product: null,
      variant: '',
      qty: '',
    });
  }

  onProductChange(product: OwnerProduct) {
    this.variants = [];
    if (product && product.variants.length > 1) {
      this.variants = product.variants.filter((val) => val.variant_id !== null); // Get all variants except parent
    }

    this.formData.$import({ qty: 1 });
  }

  async submit() {
    this.formData.$loading = true;
    try {
      const location_ids = get(this.formData.$payload, 'locations', []).map((val) => val.value);
      const products = this.items.map((val) => ({
        id: val.id,
        variant_id: get(val, 'variant.variant_id', null),
        qty: val.qty,
      }));

      const payload = { location_ids, products };

      let res: any;

      if (this.isOwner) {
        res = (await this.collection.create({
          ...payload,
          restaurant_id: this.auth.currentRestaurant.id,
        } as any)) as any;
      } else {
        res = (await this.staffCol.create({
          ...payload,
          restaurant_id: this.auth.currentRestaurant.id,
        } as any)) as any;
      }

      if (has(res, 'request_id')) {
        this.toast.info(`We are processing ${products.length} Products.`);
        this.queue.start(res.request_id, {
          label: `Creating ${products.length} ${products.length > 1 ? 'Products Stocks' : 'Product Stock'}`,
          icon: appIcons.outlineDescription,
        });
      }
    } catch (error) {
      this.toast.error('Something bad happened', error);
    } finally {
      this.formData.$loading = false;
    }
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
