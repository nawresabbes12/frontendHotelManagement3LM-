import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() filterChanged = new EventEmitter<{ capacity?: number; price?: number }>();

  onCapacityChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const capacity = parseInt(inputElement.value, 10);
    this.filterChanged.emit({ capacity });
  }

  onPriceChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const price = parseInt(inputElement.value, 10);
    this.filterChanged.emit({ price });
  }
}
