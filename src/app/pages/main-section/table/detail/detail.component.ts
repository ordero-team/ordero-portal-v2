import { Component, OnInit } from '@angular/core';
import { INavRoute } from '@app/core/services/navigation.service';

@Component({
  selector: 'aka-table-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class TableDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

export const TableDetailNavRoute: INavRoute = {
  path: ':table_id/detail',
  name: 'table.detail',
  title: 'table.detail',
};

export const TableDetailRoute: INavRoute = {
  ...TableDetailNavRoute,
  component: TableDetailComponent,
};
