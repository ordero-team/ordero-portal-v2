import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-table-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class TableListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const TableListNavRoute: INavRoute = {
  path: 'list',
  name: 'table.list',
  title: 'table.list',
};

export const TableListRoute: INavRoute = {
  ...TableListNavRoute,
  component: TableListComponent,
};
