import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { AuditLogItem } from '../../core/models';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent {
  public mockData = inject(MockDataService);

  readonly allLogs = signal<AuditLogItem[]>(this.mockData.auditLogs);

  // Filters
  filterUser = signal<string>('Tất cả');
  filterModule = signal<string>('Tất cả');
  filterAction = signal<string>('Tất cả');
  filterDate = signal<string>('2026-09-28');

  // Filtered log items
  readonly filteredLogs = computed(() => {
    return this.allLogs().filter(item => {
      const matchUser = this.filterUser() === 'Tất cả' || item.user === this.filterUser();
      const matchModule = this.filterModule() === 'Tất cả' || item.module === this.filterModule();
      const matchAction = this.filterAction() === 'Tất cả' || item.action === this.filterAction();
      return matchUser && matchModule && matchAction;
    });
  });

  exportCsv(): void {
    const headers = ['Thời gian', 'Người dùng', 'Module', 'Action', 'Đối tượng', 'Kết quả', 'Chi tiết'];
    const rows = this.filteredLogs().map(l => [
      l.timestamp,
      l.user,
      l.module,
      l.action,
      l.target,
      l.result,
      l.details || ''
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `audit_logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
