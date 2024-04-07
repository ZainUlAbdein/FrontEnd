import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrl: './receiver.component.css'
})
export class ReceiverComponent {
  @Input() data!: string;
  showReceiver: boolean = false;

  toggleReceiver() {
    this.showReceiver = !this.showReceiver;
  }

}
