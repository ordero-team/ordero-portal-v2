import { Component, Input } from '@angular/core';
import { DarkModeService } from '@app/core/services/dark-mode.service';

@Component({
  selector: 'aka-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss'],
})
export class EmptyPageComponent {
  @Input() title = "It's Lonely Here";
  @Input() message = "We don't have anything yet.";
  @Input() image = '/assets/images/pages/empty_list.svg';

  constructor(darkMode: DarkModeService) {
    darkMode.darkMode$.pipe().subscribe((val) => {
      this.image = val ? '/assets/images/pages/empty_list_dark.svg' : '/assets/images/pages/empty_list.svg';
    });
  }
}
