import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aka-customer-restaurant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class CustomerRestaurantListComponent implements OnInit {
  items = new Array(8).fill('1');

  constructor() {}

  ngOnInit(): void {}
}
