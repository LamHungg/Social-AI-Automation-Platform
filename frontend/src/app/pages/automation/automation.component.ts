import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { AutomationRule } from '../../core/models';

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent {
  public mockData = inject(MockDataService);
  readonly rules = signal<AutomationRule[]>(this.mockData.automations);
  readonly selectedRule = signal<AutomationRule>(this.mockData.automations[0]);

  testInputText = 'iPhone 17 Pro 256GB màu titan giá sao shop?';
  simulationResult: {
    matchedIntent: string;
    confidence: number;
    executedActions: string[];
  } | null = null;

  selectRule(rule: AutomationRule): void {
    this.selectedRule.set(rule);
    this.simulationResult = null;
  }

  runSimulation(): void {
    this.simulationResult = {
      matchedIntent: 'ASK_PRICE',
      confidence: 0.98,
      executedActions: [
        'Trích xuất sản phẩm: iPhone 17 Pro 256GB Titan',
        'Tạo câu trả lời tự động bằng AI Agent',
        'Gửi tin nhắn riêng (DM) kèm ưu đãi Flash Sale',
        'Tạo Lead mới trong CRM (AI Score: 86 - HOT)',
        'Gửi thông báo Telegram cho đội ngũ CSKH'
      ]
    };
  }
}
