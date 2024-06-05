export class CartStateModel {
  table_id: string;
  product_id: string;
  qty: number;
  price?: number;
}

export class CartAddAction {
  static readonly type = '[Cart] Add';
  constructor(public payload: CartStateModel) {}
}
