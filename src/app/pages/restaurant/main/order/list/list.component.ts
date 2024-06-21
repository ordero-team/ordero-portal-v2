import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aka-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: Array<any> = [
    {
      id: 1,
      customerName: 'John Doe',
      orderDate: '2023-10-01',
      status: 'Confirmed',
      items: [
        { itemName: 'Pizza Margherita', quantity: 2, price: 12.99 },
        { itemName: 'Coca Cola', quantity: 1, price: 1.99 },
      ],
      total: 27.97,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      orderDate: '2023-10-02',
      status: 'Pending',
      items: [
        { itemName: 'Pasta Carbonara', quantity: 1, price: 15.5 },
        { itemName: 'Sprite', quantity: 1, price: 1.99 },
      ],
      total: 17.49,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  confirmOrder(order: any) {}
  cancelOrder(order: any) {}
}
