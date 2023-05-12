import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aka-under-development',
  templateUrl: './under-development.component.html',
  styleUrls: ['./under-development.component.scss'],
})
export class UnderDevelopmentComponent implements OnInit {
  @Input()
  image = 'assets/images/pages/maintenance/development.svg';

  // @TODO: Translation
  @Input()
  title = 'This page is under development.';
  @Input()
  subtitle = 'Sorry for the dust! We know it’s taking a while but sit tight and we’ll be with you soon.';

  constructor() {}

  ngOnInit(): void {}
}
