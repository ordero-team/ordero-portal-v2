import { Component, Input } from '@angular/core';
import { MaterialColorService } from '@app/shared/services/material-color.service';
import { IStateStyle } from '@ss/color.service';
import { snakeCase } from 'lodash';

@Component({
  selector: 'aka-state-label',
  templateUrl: './state-label.component.html',
  styleUrls: ['./state-label.component.scss'],
})
export class StateLabelComponent {
  @Input() state: string;
  @Input() text?: string;
  @Input() class?: string;
  @Input() color?: string;

  get styles() {
    return this.color ? this.styleOf(this.color) : this.service.styles[snakeCase(this.state) || ''];
  }

  // constructor(private service: ColorService) {}
  constructor(private service: MaterialColorService) {}

  styleOf(clr: string): IStateStyle {
    const color = this.service.colors[clr];
    return color
      ? {
          color: this.service.colors[`${color}`]['900'],
          background: this.service.colors[`${color}`]['100'],
          border: `1px solid ${this.service.colors[color]['900']}`,
        }
      : {
          color: this.service.colors[`grey`]['500'],
          background: this.service.colors[`grey`]['100'],
          border: `1px solid ${this.service.colors['grey']['500']}`,
        };
  }
}
