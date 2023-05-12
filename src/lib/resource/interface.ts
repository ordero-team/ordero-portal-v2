import { Record as XRecord } from 'js-data';

export interface IRestConfigs {
  name: string;
  endpoint?: string;
  schema?: any;
  parents?: IRestParents;
  include?: IRestInclude;
  exclude?: IRestExclude;
  relations?: IRestRelations;
  headers?: any;
}

export interface IRestInclude {
  find?: string[];
  findAll?: string[];
  create?: string[];
  update?: string[];
  destroy?: string[];
}

export interface IRestExclude {
  find?: string[];
  findAll?: string[];
  create?: string[];
  update?: string[];
  destroy?: string[];
}

export interface IRestRelations {
  belongsTo?: {
    [name: string]: IBelongsToRelation;
  };
  hasOne?: IRestRelation;
  hasMany?: IRestRelation;
}

export interface IRestRelation {
  [name: string]: IChildRelation;
}

export interface IRestRelationRef {
  parent?: boolean;
  localField: string;
}

export interface IBelongsToRelation extends IRestRelationRef {
  foreignKey: string;
}

export interface IChildRelation extends IRestRelationRef {
  localKey: string;
}

export interface IRestOptions {
  bypassCache?: boolean;
  endpoint?: string;
  params?: any;
  headers?: any;
  suffix?: string;
  transformRequest?: any;
}

export interface IRestParent {
  config: IRestConfigs;
  foreignKey: string;
  localField: string;
}

export interface IRestParents {
  [name: string]: IRestParent;
}

export interface IRestRecord extends XRecord {
  [key: string]: any;

  id: string;
  __checked__?: boolean;
  __removed__?: boolean;
}

export interface IRestPagination {
  total_count: number;
  page_count: number;
  page: number;
  per_page?: number;
}

/*export interface IRestPagination {
  offAll: number;
  current?: number;
}*/

export interface IRestParams {
  page?: number;
  per_page?: number;
  sort?: string;
}

export interface IRestFilters {
  [key: string]: string;
}

export interface IRestHooks {
  onCreateSuccess?: (record: IRestRecord) => void;
  onUpdateSuccess?: (record: IRestRecord) => void;
  onDeleteSuccess?: (record: IRestRecord) => void;

  onCreateFailed?: (error: Error, payload: any, options?: IRestOptions) => void;
  onUpdateFailed?: (error: Error, id: string, payload: any, options: IRestOptions) => void;
  onDeleteFailed?: (error: Error, id: string, options: IRestOptions) => void;
}
