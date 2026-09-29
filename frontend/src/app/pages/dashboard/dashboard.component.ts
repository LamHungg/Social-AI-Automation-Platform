import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { StateService } from '../../core/services/state.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Export Modal state (COMPLETE / B1 / Popup / Export Dashboard)
  showExportModal = signal<boolean>(false);
  exportFormat: 'PDF' | 'CSV' | 'EXCEL' = 'PDF';
  exportRange: 'TODAY' | '7DAYS' | '30DAYS' = '7DAYS';
  includeKPI = true;
  includeMessages = true;
  includeLeads = true;
  exportSuccessMsg = signal<string>('');

  constructor(
    public mockData: MockDataService,
    public state: StateService,
    private router: Router
  ) {}

  openExportModal(): void {
    this.showExportModal.set(true);
  }

  closeExportModal(): void {
    this.showExportModal.set(false);
  }

  downloadExport(): void {
    const fileName = `MetaFlow_Dashboard_Export_${this.exportRange}_${Date.now()}.${this.exportFormat.toLowerCase() === 'excel' ? 'xlsx' : this.exportFormat.toLowerCase()}`;
    const blob = new Blob([`Báo cáo Meta Flow Dashboard\nKhoảng thời gian: ${this.exportRange}\nĐịnh dạng: ${this.exportFormat}\nNgày xuất: ${new Date().toLocaleString()}`], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);

    this.closeExportModal();
    this.exportSuccessMsg.set(`Đã xuất và tải file ${fileName} thành công!`);
    setTimeout(() => this.exportSuccessMsg.set(''), 3500);
  }

  readonly recentActivities = [
    {
      id: 'act-1',
      time: '10:14',
      type: 'AI_REPLY',
      channel: 'FB',
      title: 'AI trả lời tự động khách Nguyễn Văn Minh',
      desc: 'Báo giá iPhone 17 Pro 256GB Titan và xác nhận kho Cầu Giấy (Confidence: 97%)',
      badge: 'Hot Lead',
      badgeType: 'hot',
    },
    {
      id: 'act-2',
      time: '10:05',
      type: 'LEAD_DETECTED',
      channel: 'FB',
      title: 'Phát hiện SĐT từ bình luận bài Flash Sale',
      desc: 'Trần Quỳnh Nga: 0978112233 - Quan tâm gói trả góp 0%',
      badge: 'SĐT Lead',
      badgeType: 'warning',
    },
    {
      id: 'act-3',
      time: '09:48',
      type: 'SUGGESTION',
      channel: 'IG',
      title: 'Đề xuất câu trả lời cho @yen.hoangle',
      desc: 'Tư vấn chính sách freeship phụ kiện TP.HCM',
      badge: 'Đề xuất AI',
      badgeType: 'info',
    },
    {
      id: 'act-4',
      time: '08:30',
      type: 'ESCALATION',
      channel: 'FB',
      title: 'Chuyển giao khách hàng cho nhân viên CSKH',
      desc: 'Khách Phạm Đức Anh phản ánh hộp móp - Đã gán cờ khẩn cấp',
      badge: 'Khiếu nại',
      badgeType: 'danger',
    },
  ];

  readonly chartDays = [
    { day: 'T2', comment: 65, dm: 40, lead: 20 },
    { day: 'T3', comment: 80, dm: 55, lead: 32 },
    { day: 'T4', comment: 50, dm: 35, lead: 18 },
    { day: 'T5', comment: 95, dm: 70, lead: 45 },
    { day: 'T6', comment: 85, dm: 60, lead: 38 },
    { day: 'T7', comment: 110, dm: 85, lead: 60 },
    { day: 'CN', comment: 125, dm: 95, lead: 75 },
  ];

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
