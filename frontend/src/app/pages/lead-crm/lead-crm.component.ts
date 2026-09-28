import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { Lead } from '../../core/models';

@Component({
  selector: 'app-lead-crm',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './lead-crm.component.html',
  styleUrls: ['./lead-crm.component.css']
})
export class LeadCrmComponent {
  public mockData = inject(MockDataService);

  readonly leads = signal<Lead[]>(this.mockData.leads);
  readonly selectedLead = signal<Lead | null>(this.mockData.leads[0]);

  readonly pipelineStats = [
    { label: 'Lead mới', count: 124, color: 'blue' },
    { label: 'Đang tư vấn', count: 82, color: 'purple' },
    { label: 'Hot Lead', count: 46, color: 'amber' },
    { label: 'Đã đặt hàng', count: 31, color: 'emerald' },
    { label: 'Lost', count: 12, color: 'gray' },
  ];

  selectLead(lead: Lead): void {
    this.selectedLead.set(lead);
  }

  closeDrawer(): void {
    this.selectedLead.set(null);
  }
}
