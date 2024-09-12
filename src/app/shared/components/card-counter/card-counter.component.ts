import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aka-card-counter',
  templateUrl: './card-counter.component.html',
  styleUrls: ['./card-counter.component.scss'],
})
export class CardCounterComponent implements OnInit {
  // card description
  @Input() title: string | number;
  @Input() subtitle: string;
  // icon property
  @Input() icon: string;
  @Input() iconColor: string;
  @Input() bgIcon: string;
  // show income
  @Input() isShowIncome = false;
  @Input() income: number;
  @Input() isIncomeUp = false;
  // show time if card have value time
  @Input() isShowTime = false;
  @Input() time: string;
  // matToolTip
  @Input() toolTip = '';
  @Input() loading = true;

  constructor() {}

  ngOnInit(): void {}
}
