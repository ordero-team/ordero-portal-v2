import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MetalCollection, MetalCollectionConfig, MetalRecord, MetalRequestOptions } from '@lib/metal-data';
import { MetalAPIData } from '@mtl/interfaces';
import { OriginService } from '@mtl/services/origin.service';
import { has } from 'lodash';

export interface Image extends MetalAPIData {
  file?: File;
}

const ImageConfig: MetalCollectionConfig<Image> = {
  name: 'images',
  endpoint: 'images',
};

@Injectable({ providedIn: 'root' })
export class ImageCollection<T extends MetalAPIData> extends MetalCollection<Image, OriginService> {
  constructor(public origin: OriginService, private http: HttpClient) {
    super(origin, ImageConfig);
  }

  async createFor(endpoint = '', record: MetalRecord<T>, file: File, customOpt?: MetalRequestOptions) {
    const defaultOpt = {
      prefix: [endpoint, record.path.url].join('/'),
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const formData: FormData = new FormData();
    formData.append('image', file);

    return await this.create(formData as any, Object.assign({}, defaultOpt, customOpt || {}));
  }

  async removeFor(endpoint = '', record: MetalRecord<T>, image: any, customOpt?: MetalRequestOptions) {
    const defaultOpt = { prefix: [endpoint, record.path.url].join('/') };
    const id = image.id;

    if (customOpt && has(customOpt, 'suffix')) {
      delete customOpt.suffix;
    }

    return await this.delete(id, Object.assign({}, defaultOpt, customOpt || {}));
  }

  generateImage(images) {
    return Promise.all(
      (images || []).map(async (image) => {
        const blob = await this.http
          .get(image.original, {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            responseType: 'blob',
          })
          .toPromise();
        if (typeof blob === 'object') {
          return new File([blob], `id_${image.id}`, { type: 'image/png' });
        }
      })
    ).then((actions) => {
      return actions;
    });
  }

  getImage(images, type) {
    const image = images?.find((image) => image.type == type);
    return image && image.id ? image.url : null;
  }
}
