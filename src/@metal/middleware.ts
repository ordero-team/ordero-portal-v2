import axios from '@lib/axios';
import {
  MetalDataMeta,
  MetalOriginConfig,
  MetalTransaction,
  MetalTransactionError,
  MetalTransactionMiddleware,
} from '@lib/metal-data';
import { RequestTracker } from '@lib/request';
import { LocalStorage } from '@lib/storage';

/**
 * Add X-Auth-Token to the header.
 * @param trx
 * @param next
 */
export const tokenizer: MetalTransactionMiddleware<any> = (trx, next) => {
  const auth: any = LocalStorage.getItem('auth');

  if (auth) {
    const { access_token } = JSON.parse(auth);
    if (access_token) {
      trx.configs.headers['Authorization'] = `Bearer ${access_token}`;
    }
  }

  return next();
};

/**
 * Add X-Auth-Token to the header.
 * @param trx
 * @param next
 */
export const ownerTokenizer: MetalTransactionMiddleware<any> = (trx, next) => {
  const auth: any = LocalStorage.getItem('owner');

  if (auth) {
    const { access_token } = JSON.parse(auth);
    if (access_token) {
      trx.configs.headers['Authorization'] = `Bearer ${access_token}`;
    }
  }

  return next();
};

/**
 * Add X-Auth-Token to the header.
 * @param trx
 * @param next
 */
export const staffTokenizer: MetalTransactionMiddleware<any> = (trx, next) => {
  const auth: any = LocalStorage.getItem('staff');

  if (auth) {
    const { access_token } = JSON.parse(auth);
    if (access_token) {
      trx.configs.headers['Authorization'] = `Bearer ${access_token}`;
    }
  }

  return next();
};

/**
 * Transform all requests params.
 * @param trx
 * @param next
 */
export const parametrize: MetalTransactionMiddleware<any> = (trx, next) => {
  return next();
};

/**
 * Transform all params and run the transaction with axios.
 */
export const http = (configs: MetalOriginConfig) => {
  axios.defaults.baseURL = configs.baseURL;
  axios.defaults.headers = configs.headers;

  return async (trx: MetalTransaction<any>, next) => {
    if (trx.status !== 'complete') {
      const { listing, configs, method, params } = trx.request;

      if (trx.configs.method === 'patch') {
        trx.configs.method = 'put';
      }

      if (listing && configs) {
        if (method === 'head') {
          trx.configs.method = 'get';
          (trx.configs.params as any).per_page = 1;
        } else {
          (trx.configs.params as any).per_page = params.limit;
        }

        for (const key of ['where', 'fields', 'excludeFields', 'orderBy', 'limit', 'filterRefs']) {
          delete trx.configs.params[key];
        }
      }

      RequestTracker.onHttpStart.emit();
      await trx.run(async (configs) => {
        try {
          return await axios.request(configs);
        } catch (error) {
          const { message, response } = error;
          const { status, statusText } = response;

          RequestTracker.onHttpErrors.emit(error);

          throw new MetalTransactionError(response, message, status, statusText);
        }
      });
      RequestTracker.onHttpFinish.emit();

      // standardize response
      if (trx.response.data.result) {
        const { result } = trx.response.data;
        trx.response.data = Array.isArray(result) ? { data: result } : result;
      }

      if (listing) {
        const key = trx.configs.url.split('/').pop();
        const { data } = trx.response;

        if (key && data[key]) {
          data.data = data[key];
          delete data[key];
        }

        if (data && data.pagination) {
          const meta: MetalDataMeta = {
            limit: data.pagination.per_page,
            totalRecords: data.pagination.total || data.pagination.total_count,
            totalPages: data.pagination.page_count,
            currentPage: data.pagination.page,
          };

          if (meta.currentPage > 1) {
            meta.prevPage = meta.currentPage - 1;
          }

          if (meta.currentPage < meta.totalPages) {
            meta.nextPage = meta.currentPage + 1;
          }

          trx.response.data.meta = meta;
        }
      }
    }

    return next();
  };
};

/**
 * Transform the transaction response so meet with the data structure.
 * @param trx
 * @param next
 */
export const finalizer: MetalTransactionMiddleware<any> = (trx, next) => {
  const { request, response } = trx;

  if (request.method === 'head' && response.data.meta) {
    response.data = response.data.meta;
  }

  return next();
};
