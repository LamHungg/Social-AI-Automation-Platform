import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { AutomationRule } from '../../core/models';

export interface AutomationRunLog {
  runId: string;
  time: string;
  source: string;
  triggerMatched: string;
  confidence: number;
  status: 'SUCCESS' | 'FAILED' | 'RETRY';
  actionsCount: number;
  latencyMs: number;
}

@Component({
  selector: 'app-automation',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css']
})
export class AutomationComponent {
  public mockData = inject(MockDataService);
  readonly rules = signal<AutomationRule[]>([...this.mockData.automations]);
  readonly selectedRule = signal<AutomationRule>(this.mockData.automations[0]);

  // Test Simulator
  testInputText = 'iPhone 17 Pro 256GB màu titan giá sao shop?';
  simulationResult: {
    matchedIntent: string;
    confidence: number;
    executedActions: string[];
  } | null = null;

  // Modals state
  showCreateModal = signal<boolean>(false);
  showPublishModal = signal<boolean>(false);
  showRunDetailModal = signal<boolean>(false);
  showTestModal = signal<boolean>(false); // COMPLETE / B2 / Popup / Test Automation
  notificationMsg = signal<string>('');

  // Create Automation Builder Form (COMPLETE / B2 / Create Automation Builder)
  newRuleName = '';
  newRuleTriggerType: 'INTENT' | 'KEYWORD' | 'POST_COMMENT' | 'TIME_WINDOW' = 'INTENT';
  newRuleTriggers = 'Hỏi giá, Còn hàng không, Báo giá giúp em';
  newRuleConfidence = 0.85;
  newRuleActionType = 'AI_REPLY_AND_LEAD';

  // Run Logs (COMPLETE / B4 / Automation Run Detail)
  readonly runLogs = signal<AutomationRunLog[]>([
    {
      runId: '#RUN-1248',
      time: '10:48:36',
      source: 'Comment (Bài Flash Sale)',
      triggerMatched: 'INTENT: PHONE_LEAD',
      confidence: 0.96,
      status: 'SUCCESS',
      actionsCount: 3,
      latencyMs: 340
    },
    {
      runId: '#RUN-1247',
      time: '10:45:12',
      source: 'Messenger (Nguyễn Văn Minh)',
      triggerMatched: 'INTENT: ASK_PRICE',
      confidence: 0.98,
      status: 'SUCCESS',
      actionsCount: 4,
      latencyMs: 290
    },
    {
      runId: '#RUN-1246',
      time: '10:39:04',
      source: 'Instagram Direct (@yen.hoangle)',
      triggerMatched: 'KEYWORD: freeship',
      confidence: 0.88,
      status: 'SUCCESS',
      actionsCount: 2,
      latencyMs: 410
    },
    {
      runId: '#RUN-1245',
      time: '09:55:20',
      source: 'Comment (Bài MacBook M3)',
      triggerMatched: 'INTENT: STOCK_CHECK',
      confidence: 0.92,
      status: 'SUCCESS',
      actionsCount: 2,
      latencyMs: 310
    }
  ]);

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

  // Create Modal handlers
  openCreateModal(): void {
    this.newRuleName = '';
    this.newRuleTriggers = 'Hỏi giá, Tư vấn ship, Còn hàng không';
    this.newRuleConfidence = 0.85;
    this.showCreateModal.set(true);
  }

  closeCreateModal(): void {
    this.showCreateModal.set(false);
  }

  saveNewRule(): void {
    if (!this.newRuleName.trim()) return;

    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: this.newRuleName,
      status: 'DRAFT',
      triggerType: this.newRuleTriggerType,
      triggers: this.newRuleTriggers.split(',').map(s => s.trim()),
      confidenceThreshold: this.newRuleConfidence,
      actionsSummary: ['Tự động phản hồi AI', 'Chuyển đổi thành Lead CRM', 'Gửi thông báo nội bộ'],
      runsCount: 0,
      successRate: 100,
      updatedAt: 'Vừa xong'
    };

    this.rules.update(list => [newRule, ...list]);
    this.selectedRule.set(newRule);
    this.closeCreateModal();
    this.showToast(`Đã tạo kịch bản tự động mới: ${newRule.name}`);
  }

  // Publish Modal handlers (COMPLETE / B2 / Popup / Publish Automation)
  openPublishModal(): void {
    this.showPublishModal.set(true);
  }

  closePublishModal(): void {
    this.showPublishModal.set(false);
  }

  confirmPublish(): void {
    this.selectedRule.update(r => ({
      ...r,
      status: 'ACTIVE',
      updatedAt: 'Vừa xong'
    }));
    this.rules.update(list => list.map(r => r.id === this.selectedRule().id ? { ...r, status: 'ACTIVE' } : r));
    this.closePublishModal();
    this.showToast(`Đã xuất bản (Publish) thành công kịch bản: ${this.selectedRule().name}!`);
  }

  // Run Detail Modal handlers (COMPLETE / B4 / Automation Run Detail)
  openRunDetailModal(): void {
    this.showRunDetailModal.set(true);
  }

  closeRunDetailModal(): void {
    this.showRunDetailModal.set(false);
  }

  // Test Automation Modal handlers (COMPLETE / B2 / Popup / Test Automation)
  openTestModal(): void {
    this.showTestModal.set(true);
  }

  closeTestModal(): void {
    this.showTestModal.set(false);
  }

  private showToast(msg: string): void {
    this.notificationMsg.set(msg);
    setTimeout(() => this.notificationMsg.set(''), 3500);
  }
}
