export class RestaurantStateModel {
  id?: string;
  name?: string;
  status?: 'active' | 'inactive';
  slug?: string;
}

export class RestaurantAction {
  static readonly type = '[Restaurant] Fetch Restaurant';
  constructor(public RestaurantId: string) {}
}

export class PatchRestaurantAction {
  static readonly type = '[Restaurant] Patch Restaurant';
  constructor(public payload: RestaurantStateModel) {}
}

export class ClearRestaurantAction {
  static readonly type = '[Restaurant] Clear Restaurant';
}
