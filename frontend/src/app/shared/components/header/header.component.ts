import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../core/services/state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() actionText = 'Tạo automation';
  @Output() actionClick = new EventEmitter<void>();

  constructor(public state: StateService) {}

  onAction(): void {
    this.actionClick.emit();
  }
}
