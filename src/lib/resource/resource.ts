import { Debug } from '@lib/debug';
import { EventEmitter } from '@lib/event';
import {
  IRestConfigs,
  IRestFilters,
  IRestHooks,
  IRestOptions,
  IRestPagination,
  IRestParams,
  IRestRecord,
} from '@lib/resource/interface';
import { Mapper, createMapper } from '@lib/resource/mapper';
import { BaseStorage } from '@lib/resource/store';
import { has } from 'lodash';

export class BaseResource {
  public configs: IRestConfigs;
  public storage: any;
  public mapper: Mapper;
  public params: IRestParams = { page: 1, per_page: 25 };
  public records: IRestRecord[] = [];
  public filters: IRestFilters = {};
  public hooks: IRestHooks = {};
  public loading = false;

  public activeRequest: any;

  public listUpdated = new EventEmitter();
  public onRecordUpdated = new EventEmitter();
  public onRecordDeleted = new EventEmitter();
  public currentEndpoint: string;
  public currentParams: any;

  get store() {
    return this.storage || BaseStorage;
  }

  constructor(configs: IRestConfigs, storage?: any) {
    this.configs = configs;
    this.storage = storage;

    if (!this.configs.endpoint) {
      this.configs.endpoint = this.configs.name;
    }

    this.mapper = createMapper(this.configs.name, this.configs, storage);

    this.onRecordUpdated.subscribe((id, payload: any = {}) => {
      Debug.log(id, payload);
    });

    this.onRecordDeleted.subscribe((id) => {
      Debug.log(id);
    });
  }

  importConfig(config: IRestConfigs) {
    this.configs = { ...this.configs, ...config };
  }

  get pagination(): IRestPagination {
    if (this.mapper.pagination) {
      return this.mapper.pagination;
    }

    return null;
  }

  get items(): any {
    return this.records;
  }

  get totalItems() {
    const { total_count } = this.pagination;

    return total_count.toLocaleString();
  }

  get isLoading(): boolean {
    return this.loading;
  }

  async find(id: string | number, options: IRestOptions = {}): Promise<any> {
    this.loading = true;
    if (!options.params) {
      options.params = {};
    }

    if (!has(options, 'params.include') && has(this.configs, 'include.find')) {
      options.params.include = this.configs.include.find.join(',');
    }

    if (!has(options, 'params.exclude') && has(this.configs, 'exclude.find')) {
      options.params.exclude = this.configs.exclude.find.join(',');
    }

    try {
      this.loading = false;
      return await this.mapper.find(id, { ...options });
    } catch (error) {
      // chain error to next resource
      this.loading = false;
      throw error;
    }
  }

  async findAll(params: any = {}, options: IRestOptions = {}): Promise<any[] | undefined> {
    this.loading = true;
    const reqParams: any = { ...(this.params || {}), ...params };

    if (!has(reqParams, 'include') && has(this.configs, 'include.findAll')) {
      reqParams.include = this.configs.include.findAll.join(',');
    }

    if (!has(reqParams, 'exclude') && has(this.configs, 'exclude.findAll')) {
      reqParams.exclude = this.configs.exclude.findAll.join(',');
    }

    try {
      this.activeRequest = Object.assign({}, { params: reqParams }, { options });
      this.records = await this.mapper.findAll(reqParams, options);
      this.loading = false;
      this.listUpdated.emit(this.records);
      return this.records;
    } catch (error) {
      // chain error to next resource
      this.loading = false;
      throw error;
    }
  }

  async create(payload: any, options: IRestOptions = {}): Promise<any> {
    this.loading = true;
    if (!options.params) {
      options.params = {};
    }

    if (!has(options, 'params.include') && has(this.configs, 'include.create')) {
      options.params.include = this.configs.include.create.join(',');
    }

    if (!has(options, 'params.exclude') && has(this.configs, 'exclude.create')) {
      options.params.exclude = this.configs.exclude.create.join(',');
    }

    try {
      this.loading = false;
      const response = await this.mapper.create(payload, { ...options });

      this.triggerHook('CreateSuccess', response, options);
      return response;
    } catch (error) {
      // chain error to next resource
      this.loading = false;

      this.triggerHook('CreateFailed', error, payload, options);
      throw error;
    }
  }

  async delete(id: string | number, options: IRestOptions = {}): Promise<any> {
    this.loading = true;
    try {
      if (!options.params) {
        options.params = {};
      }

      if (!has(options, 'params.include') && has(this.configs, 'include.destroy')) {
        options.params.include = this.configs.include.destroy.join(',');
      }

      if (!has(options, 'params.exclude') && has(this.configs, 'exclude.destroy')) {
        options.params.exclude = this.configs.exclude.destroy.join(',');
      }
      this.loading = false;
      const response = await this.mapper.destroy(id, options);

      this.triggerHook('DeleteSuccess');
      return response;
    } catch (error) {
      // chain error to next resource
      this.loading = false;
      this.triggerHook('DeleteFailed');
      throw error;
    }
  }

  async update(id: string | number, payload: any, options: IRestOptions = {}): Promise<any> {
    this.loading = true;
    try {
      if (!options.params) {
        options.params = {};
      }

      if (!has(options, 'params.include') && has(this.configs, 'include.update')) {
        options.params.include = this.configs.include.update.join(',');
      }

      if (!has(options, 'params.exclude') && has(this.configs, 'exclude.update')) {
        options.params.exclude = this.configs.exclude.update.join(',');
      }
      this.loading = false;
      const response = await this.mapper.update(id, payload, { ...options });

      this.triggerHook('UpdateSuccess', response);
      return response;
    } catch (error) {
      // chain error to next resource
      this.loading = false;
      this.triggerHook('UpdateFailed', error, id, payload, options);
      throw error;
    }
  }

  async refresh() {
    const { params, options } = this.activeRequest;
    delete params.page;
    delete params.per_page;

    this.params.page = 1;
    this.params.per_page = 25;

    return await this.findAll(params, options);
  }

  async refreshSingle(id: string | number) {
    const { options } = this.activeRequest;
    return await this.find(id, options);
  }

  async goto(page: number) {
    const { params, options } = this.activeRequest;
    delete params.page;

    this.params.page = page;
    return await this.findAll(params, options);
  }

  async next() {
    const { params, options } = this.activeRequest;
    delete params.page;

    this.params.page += 1;
    return await this.findAll(params, options);
  }

  async prev() {
    const { params, options } = this.activeRequest;
    delete params.page;

    this.params.page -= 1;
    return await this.findAll(params, options);
  }

  async limit(limit: number) {
    const { params, options } = this.activeRequest;

    Object.assign(this.params, params, {
      page: 1,
      per_page: limit,
    });

    return await this.findAll({}, options);
  }

  async sortBy(sort: string) {
    const { params, options } = this.activeRequest;

    Object.assign(this.params, params, {
      sort,
    });

    return await this.findAll({}, options);
  }

  protected triggerHook(name: string, ...args: any[]): void {
    name = `on${name}`;

    if (this.hooks && this.hooks[name]) {
      this.hooks[name](...args);
    }
  }
}
