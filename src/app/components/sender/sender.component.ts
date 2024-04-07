import { Component } from '@angular/core';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrl: './sender.component.css'
})
export class SenderComponent {
  String =  "Data";
  showReceiver: boolean = false;

  toggleReceiver() {
    this.showReceiver = !this.showReceiver;
  }

}
