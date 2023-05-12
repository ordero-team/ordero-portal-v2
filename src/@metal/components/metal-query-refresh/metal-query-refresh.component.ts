import { Component, Input } from '@angular/core';
import { MetalQuery } from '@lib/metal-data';

@Component({
  selector: 'ps-metal-query-refresh',
  templateUrl: './metal-query-refresh.component.html',
  styleUrls: ['./metal-query-refresh.component.scss'],
})
export class MetalQueryRefreshComponent<T> {
  @Input() query: MetalQuery<T>;
}
