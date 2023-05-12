import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';

@Directive({ selector: '[psTHeadCellRef]' })
export class TableHeadCellRefDirective {}

@Directive({ selector: '[psTHeadCell]' })
export class TableHeadCellDirective {
  @HostBinding('class') className = 'ps-table-header-cell';

  @Input()
  get class() {
    return this.className;
  }

  set class(value) {
    this.className = `ps-table-header-cell ${value}`;
  }
}

@Directive({ selector: '[psTCellRef]' })
export class TableCellRefDirective {}

@Directive({ selector: '[psTCell]' })
export class TableCellDirective {
  @HostBinding('class') className = 'ps-table-cell';

  @Input()
  get class() {
    return this.className;
  }

  set class(value) {
    this.className = `ps-table-cell ${value}`;
  }
}

@Directive({ selector: '[psTExpandCol]' })
export class TableExpandColDirective {
  @ContentChild(TableHeadCellRefDirective, { read: TemplateRef, static: true }) headCellRef: TableHeadCellRefDirective;
  @ContentChild(TableCellRefDirective, { read: TemplateRef, static: true }) cellRef: TableCellRefDirective;
}

@Directive({ selector: '[psTCol]' })
export class TableColDirective {
  @ContentChild(TableHeadCellRefDirective, { read: TemplateRef, static: true }) headCellRef: TableHeadCellRefDirective;
  @ContentChild(TableCellRefDirective, { read: TemplateRef, static: true }) cellRef: TableCellRefDirective;
}

@Component({
  selector: 'aka-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() rows: any[];
  @Input() class?: string;
  @Input() emptyMessage = "We don't have anything yet.";

  @ContentChildren(TableColDirective) colRefs: QueryList<TableColDirective>;
  @ContentChildren(TableExpandColDirective) expandColRefs?: QueryList<TableExpandColDirective>;

  constructor() {}

  ngOnInit(): void {}
}
