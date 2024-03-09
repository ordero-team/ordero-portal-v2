import { Injectable } from '@angular/core';
import { OwnerRestaurantCollection } from '@app/collections/owner/restaurant.collection';
import { ToastService } from '@app/core/services/toast.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  ClearRestaurantAction,
  FetchRestaurantAction,
  PatchRestaurantAction,
  RestaurantStateModel,
} from './restaurant.actions';

@State<RestaurantStateModel>({ name: 'restaurant' })
@Injectable()
export class RestaurantState {
  @Selector()
  static currentCompany(state: RestaurantStateModel) {
    return state;
  }

  constructor(private collection: OwnerRestaurantCollection, private toast: ToastService) {}

  @Action(ClearRestaurantAction)
  logout({ setState }: StateContext<RestaurantStateModel>) {
    setState({});
  }

  @Action(PatchRestaurantAction)
  patchCompany({ patchState }: StateContext<RestaurantStateModel>, { payload }: PatchRestaurantAction) {
    patchState({ ...payload });
  }

  @Action(FetchRestaurantAction)
  company({ getState, setState }: StateContext<RestaurantStateModel>, { RestaurantId }: FetchRestaurantAction) {
    return from(this.collection.findOne(RestaurantId)).pipe(
      map((company) => {
        setState({ ...getState(), ...company });
        return company;
      }),
      catchError((error) => {
        this.toast.error('Unable to fetch company!', error);
        return of(null);
      })
    );
  }
}
