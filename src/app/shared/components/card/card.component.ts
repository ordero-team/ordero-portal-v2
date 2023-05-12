import { Component, Host, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'aka-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'akaCard',
})
export class CardComponent {
  public classList = 'aka-card';

  @HostBinding('class')
  get hostClass() {
    let classes = this.classList;

    if (this.color) {
      classes = `${classes} card-${this.color}`;
    }

    return classes;
  }

  @Input()
  get class() {
    return this.classList;
  }

  set class(value: string) {
    this.classList = `aka-card ${value}`;
  }

  @Input() color?: string;
}

@Component({
  selector: 'aka-card-head',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
})
export class CardHeadComponent {
  classList = 'aka-card-head';

  @HostBinding('class')
  get hostClass() {
    const { color } = this.card;
    if (color) {
      return `${this.classList} card-${color}`;
    }

    return this.classList;
  }

  @Input()
  get class() {
    return this.classList;
  }

  set class(value: string) {
    this.classList = `aka-card-head ${value}`;
  }

  constructor(@Host() private card: CardComponent) {}
}

@Component({
  selector: 'aka-card-title',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
})
export class CardTitleComponent {
  classList = 'aka-card-title';

  @HostBinding('class')
  get hostClass() {
    const { color } = this.card;
    if (color) {
      return `${this.classList} card-${color}`;
    }

    return this.classList;
  }

  @Input()
  get class() {
    return this.classList;
  }

  set class(value: string) {
    this.classList = `aka-card-title ${value}`;
  }

  constructor(@Host() private card: CardComponent) {}
}

@Component({
  selector: 'aka-card-inner',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
})
export class CardInnerComponent {
  classList = 'aka-card-inner';

  @HostBinding('class')
  get hostClass() {
    const { color } = this.card;
    if (color) {
      return `${this.classList} card-${color}`;
    }

    return this.classList;
  }

  @Input()
  get class() {
    return this.classList;
  }

  set class(value: string) {
    this.classList = `aka-card-inner ${value}`;
  }

  constructor(@Host() private card: CardComponent) {}
}

@Component({
  selector: 'aka-card-content',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
})
export class CardContentComponent {
  classList = 'aka-card-content';

  @HostBinding('class')
  get hostClass() {
    const { color } = this.card;
    if (color) {
      return `${this.classList} card-${color}`;
    }

    return this.classList;
  }

  @Input()
  get class() {
    return this.classList;
  }

  set class(value: string) {
    this.classList = `aka-card-content ${value}`;
  }

  constructor(@Host() private card: CardComponent) {}
}

@Component({
  selector: 'aka-card-foot',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
})
export class CardFootComponent {
  classList = 'aka-card-foot';

  @HostBinding('class')
  get hostClass() {
    const { color } = this.card;
    if (color) {
      return `${this.classList} card-${color}`;
    }

    return this.classList;
  }

  @Input()
  get class() {
    return this.classList;
  }

  set class(value: string) {
    this.classList = `aka-card-foot ${value}`;
  }

  constructor(@Host() private card: CardComponent) {}
}
