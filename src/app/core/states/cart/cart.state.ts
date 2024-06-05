import { Injectable } from '@angular/core';
import { NgxsOnInit, State, StateContext } from '@ngxs/store';
import { CartStateModel } from './cart.actions';

@State<CartStateModel>({ name: 'cart' })
@Injectable()
export class CartState implements NgxsOnInit {
  ngxsOnInit(ctx?: StateContext<any>) {
    throw new Error('Method not implemented.');
  }
}
