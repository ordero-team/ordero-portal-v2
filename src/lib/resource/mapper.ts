import { IRestPagination } from '@lib/resource/index';
import { BaseStorage } from '@lib/resource/store';
import { Mapper as XMapper } from 'js-data';

// Create mapper.
export function createMapper(name: string, options: any, store?: any): any {
  Object.assign(options, {
    async create(...args) {
      try {
        const record = await XMapper.prototype.create.call(this, ...args);
        this.emit('created', record);
        return record;
      } catch (error) {
        throw error;
      }
    },
    async destroy(id, ...args) {
      try {
        this.emit('deleted', id);
        const record = await XMapper.prototype.destroy.call(this, id, ...args);
        this.emit('destroyed', id);
        return record;
      } catch (error) {
        this.emit('undeleted', id);
        throw error;
      }
    },
  });

  return (store || BaseStorage).defineMapper(name, options);
}

export class Mapper extends XMapper {
  pagination: IRestPagination;
}
