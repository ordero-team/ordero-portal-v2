import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageCollection } from '@app/collections/image.collection';
import { OwnerProduct, OwnerProductCollection } from '@app/collections/owner/product.collection';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { StaffProduct, StaffProductCollection } from '@app/collections/staff/product.collection';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { ToastService } from '@app/core/services/toast.service';
import { Form, FormRecord } from '@lib/form';
import { forEach, get } from 'lodash';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'aka-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Form({
    name: 'required|alphaNumSpace',
    description: '',
    sku: 'required',
    status: 'required',
    price: 'required',
    categories: '',
    variants: '',
  })
  formData: FormRecord;
  _record: OwnerProduct;

  @Input()
  get record() {
    return this._record;
  }

  set record(val: OwnerProduct) {
    this._record = val;

    if (val && val.id) {
      this.applyData();
    }
  }

  @Input() user: OwnerProfile | StaffProfile = null;

  @Output() onSuccess = new EventEmitter<any>();

  another = false;

  // Images
  totalImage = Array(5);
  images: File[] | null = [];

  // Data
  statuses = [
    { value: 'available', label: 'Available' },
    { value: 'unavailable', label: 'Unavailable' },
    { value: 'sold_out', label: 'Sold Out' },
    { value: 'coming_soon', label: 'Coming Soon' },
    { value: 'discontinued', label: 'Discontinued' },
  ];

  get isEdit() {
    return this.record && this.record.id;
  }

  get isOwner() {
    return this.user.role.name === 'owner';
  }

  constructor(
    private collection: OwnerProductCollection,
    private staffCol: StaffProductCollection,
    private imageCol: ImageCollection<OwnerProduct>,
    private staffImageCol: ImageCollection<StaffProduct>,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.isEdit) {
      this.formData.$import({
        name: '',
        description: '',
        sku: '',
        status: '',
        price: '',
        categories: null,
        variants: null,
      });
    }
  }

  applyData() {
    this.formData.$import({ ...this.record });
    if (this.record.images && this.record.images.length) {
      this.images = [];
      this.record.images.forEach((data: any) => {
        this.images.push(data.original);
      });
    }
  }

  async submit() {
    this.formData.$loading = true;
    try {
      let res;

      const payload = {
        name: get(this.formData.$payload, 'name', null),
        status: get(this.formData.$payload, 'status', null),
        description: get(this.formData.$payload, 'description', null),
        sku: get(this.formData.$payload, 'sku', null),
        price: get(this.formData.$payload, 'price', null),
        category_ids: [],
        variant_ids: [],
      };

      if (get(this.formData.$payload, 'categories', [])?.length > 0) {
        forEach(this.formData.$payload.categories, (val) => payload.category_ids.push(val.value));
      }

      if (get(this.formData.$payload, 'variants', [])?.length > 0) {
        forEach(this.formData.$payload.variants, (val) => payload.variant_ids.push(val.value));
      }

      if (!this.isEdit) {
        if (this.isOwner) {
          res = await this.collection.create({ ...payload, restaurant_id: this.user.restaurant.id });
        } else {
          res = await this.staffCol.create({ ...payload, restaurant_id: this.user.restaurant.id });
        }
      } else {
        if (this.isOwner) {
          await this.collection.update(this.record.id, {
            ...payload,
            restaurant_id: this.user.restaurant.id,
          });
        } else {
          await this.staffCol.update(this.record.id, {
            ...payload,
            restaurant_id: this.user.restaurant.id,
          });
        }

        await this.fetch();

        res = this.record;
      }

      if (this.isOwner) {
        const record = this.collection.createRecord(res.id, res);
        record.path.url = `products/${res.id}`;

        if (this.images.length > 0) {
          for (let i = 0; i < this.images.length; i++) {
            if (typeof this.images[i] === 'object') {
              await this.imageCol.createFor(`/owner/restaurants/${this.user.restaurant.id}`, record, this.images[i]);
            }
          }
        }
      } else {
        const record = this.staffCol.createRecord(res.id, res);
        record.path.url = `products/${res.id}`;

        if (this.images.length > 0) {
          for (let i = 0; i < this.images.length; i++) {
            if (typeof this.images[i] === 'object') {
              await this.staffImageCol.createFor(`/staff/restaurants/${this.user.restaurant.id}`, record, this.images[i]);
            }
          }
        }
      }

      if (this.another) {
        this.formData.$reset();
        this.images = [];
      }

      this.onSuccess.emit({ ...res, another: this.another });
    } catch (error) {
      this.toast.error({ title: 'Error', detail: 'Something went wrong' }, error);
    }
    this.formData.$loading = false;
  }

  setImage(event, index) {
    this.images[index] = event;
  }

  addImageField() {
    this.totalImage.push([]);
  }

  removeImageField(index, isField = false) {
    this.images.splice(index, 1);

    if (isField) {
      this.totalImage.splice(index, 1);
    }
  }

  removeImage(index) {
    if (this.isEdit) {
      const image = this.record.images.find((data) => data.original === this.images[index]);
      if (image) {
        const delRef = this.dialog.open(DialogConfirmComponent, {
          data: {
            title: `Delete Image`,
            message: `Are you sure?`,
            showConfirm: true,
            confirmLabel: 'Delete',
            confirmColor: 'warn',
            showWarning: false,
            class: 'min-w-60',
          },
        });

        delRef.afterClosed().subscribe(async (result) => {
          if (result) {
            try {
              const record = this.collection.createRecord(this.record.id, this.record);
              await this.imageCol.removeFor(`/restaurants/${this.user.restaurant.id}`, record, image);
              this.toast.info('Image deleted successfully!');
              this.removeImageField(index);
            } catch (error) {
              this.toast.error({ title: 'Error', detail: 'Something went wrong' }, error);
            }
          }
        });
      } else {
        this.removeImageField(index);
      }
    } else {
      this.removeImageField(index);
    }
  }

  async fetch() {
    if (this.isOwner) {
      this.record = await this.collection.findOne(this.record.id, {
        params: { restaurant_id: this.user.restaurant.id },
      });
    } else {
      this.record = await this.staffCol.findOne(this.record.id, {
        params: { restaurant_id: this.user.restaurant.id },
      });
    }
  }
}
