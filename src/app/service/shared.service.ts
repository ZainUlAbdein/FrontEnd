// shared.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Subject to trigger function in other component
  triggerFunctionSubject = new Subject<void>();

  // Function to trigger
  triggerFunction() {
    this.triggerFunctionSubject.next();
  }
}
