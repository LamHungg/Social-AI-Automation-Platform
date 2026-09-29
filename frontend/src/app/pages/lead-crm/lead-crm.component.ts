import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { Lead, LeadTemperature } from '../../core/models';

@Component({
  selector: 'app-lead-crm',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './lead-crm.component.html',
  styleUrls: ['./lead-crm.component.css']
})
export class LeadCrmComponent {
  public mockData = inject(MockDataService);

  readonly leads = signal<Lead[]>([...this.mockData.leads]);
  readonly selectedLead = signal<Lead | null>(this.mockData.leads[0]);

  readonly pipelineStats = [
    { label: 'Lead mới', count: 124, color: 'blue' },
    { label: 'Đang tư vấn', count: 82, color: 'purple' },
    { label: 'Hot Lead', count: 46, color: 'amber' },
    { label: 'Đã đặt hàng', count: 31, color: 'emerald' },
    { label: 'Lost', count: 12, color: 'gray' },
  ];

  // Modals state
  showAddModal = signal<boolean>(false);
  showEditModal = signal<boolean>(false);
  notificationMsg = signal<string>('');

  // Form New Lead (COMPLETE / B2 / Add Lead)
  newLeadName = '';
  newLeadPhone = '';
  newLeadEmail = '';
  newLeadPlatform: 'FACEBOOK' | 'INSTAGRAM' = 'FACEBOOK';
  newLeadProduct = '';
  newLeadTemperature: LeadTemperature = 'HOT';
  newLeadNotes = '';

  // Form Edit Lead (COMPLETE / B2 / Popup / Edit Lead)
  editLeadName = '';
  editLeadPhone = '';
  editLeadEmail = '';
  editLeadProduct = '';
  editLeadStage: 'NEW' | 'CONSULTING' | 'HOT_LEAD' | 'ORDERED' | 'LOST' = 'CONSULTING';
  editLeadTemperature: LeadTemperature = 'HOT';
  editLeadNotes = '';

  selectLead(lead: Lead): void {
    this.selectedLead.set(lead);
  }

  closeDrawer(): void {
    this.selectedLead.set(null);
  }

  openAddLeadModal(): void {
    this.newLeadName = '';
    this.newLeadPhone = '';
    this.newLeadEmail = '';
    this.newLeadProduct = 'iPhone 17 Pro 256GB';
    this.newLeadTemperature = 'HOT';
    this.newLeadNotes = '';
    this.showAddModal.set(true);
  }

  closeAddLeadModal(): void {
    this.showAddModal.set(false);
  }

  saveNewLead(): void {
    if (!this.newLeadName.trim()) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: this.newLeadName,
      phone: this.newLeadPhone,
      email: this.newLeadEmail,
      platform: this.newLeadPlatform,
      stage: 'NEW',
      temperature: this.newLeadTemperature,
      aiScore: this.newLeadTemperature === 'HOT' ? 92 : (this.newLeadTemperature === 'WARM' ? 75 : 45),
      interestProduct: this.newLeadProduct || 'Sản phẩm mới',
      assignedTo: 'Minh Anh (Sales)',
      createdAt: 'Vừa xong',
      lastInteraction: 'Vừa xong',
      notes: this.newLeadNotes,
      tags: [this.newLeadTemperature === 'HOT' ? 'Hot Lead' : 'Lead mới', 'Thủ công']
    };

    this.leads.update(prev => [newLead, ...prev]);
    this.selectedLead.set(newLead);
    this.closeAddLeadModal();
    this.showToast(`Đã thêm thành công khách hàng tiềm năng: ${newLead.name}`);
  }

  openEditLeadModal(): void {
    const lead = this.selectedLead();
    if (!lead) return;

    this.editLeadName = lead.name;
    this.editLeadPhone = lead.phone || '';
    this.editLeadEmail = lead.email || '';
    this.editLeadProduct = lead.interestProduct;
    this.editLeadStage = lead.stage;
    this.editLeadTemperature = lead.temperature;
    this.editLeadNotes = lead.notes || '';
    this.showEditModal.set(true);
  }

  closeEditLeadModal(): void {
    this.showEditModal.set(false);
  }

  saveEditLead(): void {
    const current = this.selectedLead();
    if (!current) return;

    const updated: Lead = {
      ...current,
      name: this.editLeadName,
      phone: this.editLeadPhone,
      email: this.editLeadEmail,
      interestProduct: this.editLeadProduct,
      stage: this.editLeadStage,
      temperature: this.editLeadTemperature,
      notes: this.editLeadNotes
    };

    this.leads.update(list => list.map(l => l.id === updated.id ? updated : l));
    this.selectedLead.set(updated);
    this.closeEditLeadModal();
    this.showToast(`Đã cập nhật thông tin Lead: ${updated.name}`);
  }

  exportExcel(): void {
    const csvRows = [
      ['ID', 'Tên khách hàng', 'Số điện thoại', 'Email', 'Kênh', 'Nhiệt độ', 'AI Score', 'Sản phẩm', 'Giai đoạn', 'Phụ trách', 'Ghi chú'],
      ...this.leads().map(l => [
        l.id,
        l.name,
        l.phone || '',
        l.email || '',
        l.platform,
        l.temperature,
        l.aiScore.toString(),
        l.interestProduct,
        l.stage,
        l.assignedTo || '',
        l.notes || ''
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + csvRows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Đã xuất danh sách Lead thành file CSV/Excel thành công!');
  }

  private showToast(msg: string): void {
    this.notificationMsg.set(msg);
    setTimeout(() => this.notificationMsg.set(''), 3500);
  }
}
