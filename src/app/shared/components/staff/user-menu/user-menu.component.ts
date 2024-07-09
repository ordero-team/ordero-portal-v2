import { Component, Input } from '@angular/core';
import { StaffProfile } from '@app/collections/staff/profile.collection';
import { StaffAuthService } from '@app/core/services/staff/auth.service';
import { StaffState } from '@app/core/states/staff/staff.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'aka-staff-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class StaffUserMenuComponent {
  @Input() showAvatar = true;

  @Select(StaffState.currentUser) currentUser$: Observable<StaffProfile>;
  @Select(StaffState.currentRestaurant) currentRestaurant$: Observable<any>;

  constructor(public authService: StaffAuthService) {}
}
