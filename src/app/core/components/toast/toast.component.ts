import { Component } from '@angular/core';
import { ToastService } from '@cs/toast.service';

@Component({
  selector: 'aka-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(public service: ToastService) {}
}
