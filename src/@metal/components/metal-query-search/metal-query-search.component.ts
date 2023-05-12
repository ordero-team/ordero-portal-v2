import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MetalFilterState } from '@lib/metal-data/filter-state';

@Component({
  selector: 'ps-metal-query-search',
  templateUrl: './metal-query-search.component.html',
  styleUrls: ['./metal-query-search.component.scss'],
  exportAs: 'psQuerySearch',
})
export class MetalQuerySearchComponent<T> implements OnInit {
  @Input() public state: MetalFilterState<T>;

  private __timer: any;
  private __listens = true;
  public __hasValue = false;

  constructor(private elem: ElementRef) {}

  public ngOnInit(): void {
    if (this.state && this.state.parentQuery.filters.search) {
      this.__hasValue = true;
    }

    const input = this.elem.nativeElement.querySelector('input');

    if (input) {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'Slash' && this.__listens) {
          e.stopPropagation();
          e.preventDefault();
          input.focus();
        }
      });

      input.addEventListener('keyup', (event: KeyboardEvent) => {
        clearTimeout(this.__timer);

        if (event.code === 'Enter') {
          this.apply();
        } else {
          this.__timer = window.setTimeout(() => {
            this.apply();
          }, 500);
        }
      });
    }
  }

  public apply(): void {
    this.__hasValue = !!this.state.parentQuery.filters.search;
    this.state.parentQuery.goto(1, true).catch(console.error);
  }

  public reset(): void {
    this.__hasValue = false;
    this.state.parentQuery.filters.search = undefined;
    this.state.apply();
  }
}
