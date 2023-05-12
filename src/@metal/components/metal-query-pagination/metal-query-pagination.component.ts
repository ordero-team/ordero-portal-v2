import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';
import { MetalQuery } from '@lib/metal-data';
import { Unsubscribe } from '@lib/metal-data/event';
import { MetalQueryComponent } from '@mtl/components/metal-query/metal-query.component';

export interface PaginationInfo {
  offsetStart: number;
  offsetEnd: number;
  page: number;
  indexed: number;
  totalRecords: number;
  totalPages: number;
}

export interface PaginationSegment {
  label: string | number;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'ps-metal-query-pagination',
  templateUrl: './metal-query-pagination.component.html',
  styleUrls: ['./metal-query-pagination.component.scss'],
})
export class MetalQueryPaginationComponent<T> implements OnInit, OnDestroy {
  @Input() query: MetalQuery<T>;

  public segments: PaginationSegment[] = [];

  public get info(): PaginationInfo {
    const { totalRecords, indexed } = this.query.meta as any;
    const { limit = 25, page = 1 } = this.query.filters;

    const offsetEnd = limit * page;
    const offsetStart = offsetEnd - limit + 1;

    return {
      offsetStart,
      offsetEnd: offsetEnd > totalRecords ? totalRecords : offsetEnd,
      page,
      indexed,
      totalRecords,
      totalPages: Math.ceil((indexed && indexed < totalRecords ? indexed : totalRecords) / limit),
    };
  }

  private _unsubscribe: Unsubscribe;

  constructor(@Host() public parent: MetalQueryComponent<T>) {}

  public ngOnInit(): void {
    this._buildSegments();
    this._unsubscribe = this.query.metaChange.subscribe(() => {
      this._buildSegments();
    });
  }

  public ngOnDestroy(): void {
    if (typeof this._unsubscribe === 'function') {
      this._unsubscribe();
    }
  }

  public async next(): Promise<void> {
    return await this.goto(this.info.page + 1);
  }

  public async prev(): Promise<void> {
    return await this.goto(this.info.page - 1);
  }

  public async goto(page: number): Promise<void> {
    this.query.goto(page);
    this._buildSegments();
    await this.query.fetch();
    this._resetScroll();
  }

  private _resetScroll(): void {
    const list = this.parent.elem.nativeElement.querySelector('.query-list');

    if (list) {
      list.scrollTop = 0;
    }
  }

  private _buildSegments(): void {
    const { page, totalPages, totalRecords } = this.info;
    const segments: PaginationSegment[] = [{ label: 1, active: page === 1 }];

    if (!totalRecords) {
      return;
    }
    if (totalPages === 1) {
      this.segments = segments;
      return;
    }

    const truncateLimit = 10;
    const truncateStart = totalPages > truncateLimit ? 5 : truncateLimit;
    const segmentsLimit = totalPages > truncateLimit ? 7 : 9;
    let segmentStart = 2;

    if (page > truncateStart) {
      segments.push({ label: '...', disabled: true });
      segmentStart = page + truncateStart < totalPages ? page - 3 : totalPages - segmentsLimit;
    }

    for (let i = segmentStart; i < segmentStart + segmentsLimit; ++i) {
      if (i < totalPages) {
        segments.push({ label: i, active: page === i });
      }
    }

    if (page < totalPages - truncateStart) {
      segments.push({ label: '...', disabled: true });
    }

    segments.push({
      label: totalPages,
      active: page === totalPages,
    });

    this.segments = segments;
  }
}
