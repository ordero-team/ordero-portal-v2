import { environment } from '@env/environment';
import axios from '@lib/axios';
import { Debug } from '@lib/debug';
import { RequestTracker } from '@lib/request';
import { LocalStorage } from '@lib/storage';
import { DataStore } from 'js-data';
import { HttpAdapter } from 'js-data-http';
import { has } from 'lodash';

const BaseStorage = new DataStore();
const BaseAdapter = new HttpAdapter({
  http: axios,
  basePath: environment.apiUrl,
  deserialize(mapper: any, response: any): any {
    // response error will not reach this function
    const res: any = response.data || {};
    if (!res) {
      return { id: Date.now(), ...res };
    }

    if (!Array.isArray(res) && !Object.keys(res).length) {
      return { id: new Date().toISOString() };
    }

    if (Array.isArray(res)) {
      return res;
    }

    if (res.hasOwnProperty('pagination') && res.pagination) {
      Object.assign(mapper, { pagination: res.pagination });

      return res.data;
    }

    return res;
  },
  error(...args: any[]) {
    Debug.error('[ADAPTER_ERROR]', args[0] || 'Something bad happened!');
  },
  responseError(err: any, config?: any, options?: any) {
    RequestTracker.onHttpErrors.emit(err);
    return HttpAdapter.prototype.responseError.call(this, err, config, options);
  },
  beforeHTTP(config: any, options: any) {
    RequestTracker.onHttpStart.emit();

    if (!config.headers) {
      config.headers = {};
    }

    try {
      const owner = JSON.parse(LocalStorage.getItem('owner').toString());
      const staff = JSON.parse(LocalStorage.getItem('staff').toString());
      const auth: any = has(owner, 'access_token') ? owner : staff;

      if (auth) {
        const { access_token } = auth;
        const opts = { Authorization: `Bearer ${access_token}` };

        Object.assign(config.headers, opts);
      }
    } catch (e) {
      throw new Error('Unable to decode token!');
    }

    return HttpAdapter.prototype.beforeHTTP.call(this, config, options);
  },
  afterHTTP(config: any, options: any, response: any) {
    RequestTracker.onHttpFinish.emit();
    return HttpAdapter.prototype.afterHTTP.call(this, config, options, response);
  },
});

BaseStorage.registerAdapter('http', BaseAdapter, { default: true });

export { BaseAdapter, BaseStorage };
