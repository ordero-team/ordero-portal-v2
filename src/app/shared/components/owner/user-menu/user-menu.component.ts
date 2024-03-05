import { Component, Input } from '@angular/core';
import { OwnerProfile } from '@app/collections/owner/profile.collection';
import { OwnerAuthService } from '@app/core/services/owner/auth.service';
import { OwnerState } from '@app/core/states/owner/owner.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'aka-owner-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class OwnerUserMenuComponent {
  @Input() showAvatar = true;

  @Select(OwnerState.currentUser) currentUser$: Observable<OwnerProfile>;
  @Select(OwnerState.currentRestaurant) currentRestaurant$: Observable<any>;

  constructor(public authService: OwnerAuthService) {}
}
