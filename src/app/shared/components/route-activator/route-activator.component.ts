import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveRouteService } from '@cs/active-route.service';

@Component({
  selector: 'aka-route-activator',
  template: '<ng-content></ng-content>',
})
export class RouteActivatorComponent implements OnInit {
  constructor(private active: ActivatedRoute, private state: ActiveRouteService) {}

  ngOnInit() {
    this.state.assignState(this.active);
  }
}
