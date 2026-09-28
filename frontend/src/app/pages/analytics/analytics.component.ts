import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  readonly funnelSteps = [
    { label: 'Tương tác ban đầu (Inbound)', count: 4268, percent: '100%', color: 'blue' },
    { label: 'Lead tiềm năng (Qualified)', count: 1124, percent: '26.3%', color: 'purple' },
    { label: 'Hot Lead (SĐT / Nhu cầu cao)', count: 312, percent: '7.3%', color: 'amber' },
    { label: 'Đơn hàng thành công (Closed)', count: 96, percent: '2.2%', color: 'emerald' },
  ];

  readonly topAutomations = [
    { name: 'Tự động phản hồi hỏi giá & gửi DM', runs: 1420, successRate: '98.4%', leads: 184 },
    { name: 'Phát hiện SĐT -> Tạo Lead CRM', runs: 312, successRate: '99.1%', leads: 92 },
    { name: 'Khiếu nại -> Escalate Admin CSKH', runs: 38, successRate: '100%', leads: 36 },
  ];

  constructor(public mockData: MockDataService) {}
}
