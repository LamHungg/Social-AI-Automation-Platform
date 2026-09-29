import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { WorkspaceSettings, WorkspaceMember } from '../../core/models';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public mockData = inject(MockDataService);

  readonly activeTab = signal<'WORKSPACE' | 'MEMBERS' | 'NOTIFICATIONS' | 'SECURITY' | 'AUDIT' | 'SYSTEM_STATES'>('WORKSPACE');
  readonly settings = signal<WorkspaceSettings>({ ...this.mockData.workspaceSettings });
  readonly members = signal<WorkspaceMember[]>(this.mockData.workspaceMembers.slice(0, 3));

  // Shared System States (COMPLETE / B4 / Shared System States)
  systemStates = {
    metaWebhookVerifyToken: 'meta_ai_auto_verify_token_99218',
    metaAppSecret: '98d8a7c1b2e3f4g5h6j7k8m9n0p1q2r3',
    llmDefaultProvider: 'llama-3.3-70b-instruct',
    aiFallbackLimit: 2,
    rateLimitPerMinute: 600,
    enableBrowserWorker: true,
    enableVoiceTranscription: true,
    enableAutoSpamDefense: true
  };

  // Modal invite member
  showInviteModal = signal<boolean>(false);
  inviteEmail = '';
  inviteRole: 'Admin' | 'Agent' | 'Analyst' | 'Viewer' = 'Agent';
  inviteChannelScope = 'All';

  // Save feedback
  saveSuccessMessage = signal<string>('');

  setTab(tab: 'WORKSPACE' | 'MEMBERS' | 'NOTIFICATIONS' | 'SECURITY' | 'AUDIT' | 'SYSTEM_STATES'): void {
    this.activeTab.set(tab);
  }

  saveSettings(): void {
    this.saveSuccessMessage.set('Đã lưu thay đổi cấu hình Workspace thành công!');
    setTimeout(() => this.saveSuccessMessage.set(''), 3000);
  }

  openInviteModal(): void {
    this.showInviteModal.set(true);
  }

  closeInviteModal(): void {
    this.showInviteModal.set(false);
    this.inviteEmail = '';
  }

  sendInvite(): void {
    if (!this.inviteEmail) return;
    const newMember: WorkspaceMember = {
      id: `mem-${Date.now()}`,
      name: this.inviteEmail.split('@')[0],
      email: this.inviteEmail,
      role: this.inviteRole,
      channelScope: this.inviteChannelScope,
      status: 'INVITED',
      lastActive: '—'
    };
    this.members.update(prev => [...prev, newMember]);
    this.closeInviteModal();
    this.saveSuccessMessage.set(`Đã gửi lời mời tham gia tới ${this.inviteEmail}!`);
    setTimeout(() => this.saveSuccessMessage.set(''), 3000);
  }
}
