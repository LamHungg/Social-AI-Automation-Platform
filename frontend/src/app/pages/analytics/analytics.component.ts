import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {
  // Active Tab: overview or drilldown (COMPLETE / B4 / Analytics Drill-down)
  activeTab = signal<'overview' | 'drilldown'>('overview');

  // Export Modal state (COMPLETE / B4 / Popup / Export Analytics)
  showExportModal = signal<boolean>(false);
  exportFormat: 'PDF' | 'EXCEL' | 'CSV' = 'EXCEL';
  exportDateRange = '30d';
  exportChannels = { facebook: true, instagram: true, personal: true };
  includeRawLogs = true;
  toastMsg = signal<string>('');

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

  // Drilldown channel comparison data
  readonly channelDrilldowns = [
    {
      channel: 'EVN Shop Flagship Store (FB)',
      inbound: 2450,
      aiSolvedPercent: '76.8%',
      escalated: 142,
      frt: '3.2s',
      leadConverted: 188,
      csat: '4.8 ⭐'
    },
    {
      channel: 'EVN Fashion Official (IG)',
      inbound: 1180,
      aiSolvedPercent: '68.4%',
      escalated: 94,
      frt: '4.9s',
      leadConverted: 86,
      csat: '4.5 ⭐'
    },
    {
      channel: 'Facebook Profile Auto-Send (Worker)',
      inbound: 480,
      aiSolvedPercent: '88.5%',
      escalated: 24,
      frt: '6.1s',
      leadConverted: 38,
      csat: '4.7 ⭐'
    },
    {
      channel: 'EVN Tech Gadgets (FB)',
      inbound: 158,
      aiSolvedPercent: '62.0%',
      escalated: 18,
      frt: '5.4s',
      leadConverted: 12,
      csat: '4.6 ⭐'
    }
  ];

  readonly agentPerformances = [
    { agent: 'AI Sales Assistant (v12)', handled: 2780, frt: '2.1s', accuracy: '98.2%', resolutionRate: '72.4%' },
    { agent: 'Minh Anh (Admin)', handled: 480, frt: '45s', accuracy: '99.5%', resolutionRate: '94.0%' },
    { agent: 'Hồng Nhung (Agent)', handled: 360, frt: '52s', accuracy: '97.8%', resolutionRate: '91.5%' },
    { agent: 'Quang Huy (Analyst)', handled: 120, frt: '60s', accuracy: '98.0%', resolutionRate: '88.0%' },
  ];

  constructor(public mockData: MockDataService) {}

  openExportModal(): void {
    this.showExportModal.set(true);
  }

  closeExportModal(): void {
    this.showExportModal.set(false);
  }

  downloadExportReport(): void {
    this.closeExportModal();
    this.toastMsg.set(`Đang xuất file báo cáo Analytics định dạng ${this.exportFormat}...`);
    setTimeout(() => {
      this.toastMsg.set(`Đã tải xuống thành công báo cáo phân tích Analytics_${this.exportDateRange}.${this.exportFormat.toLowerCase()}!`);
      setTimeout(() => this.toastMsg.set(''), 4000);
    }, 1200);
  }
}
