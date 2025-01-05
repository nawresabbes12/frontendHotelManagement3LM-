import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../styles.css'],
})
export class AppComponent {
  filters: { capacity?: number; price?: number } = {};

  onFilterChanged(filter: { capacity?: number; price?: number }): void {
    this.filters = { ...this.filters, ...filter };
  }
}
