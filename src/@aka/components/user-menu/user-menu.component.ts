import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Profile } from '@cl/profile.collection';
import { AuthService } from '@cs/auth.service';
import { AuthState } from '@ct/auth/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'userMenu',
})
export class UserMenuComponent {
  @Input() showAvatar = true;

  @Select(AuthState.currentUser) currentUser$: Observable<Profile>;
  constructor(public authService: AuthService) {}
}
