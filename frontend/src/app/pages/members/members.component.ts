import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { WorkspaceMember, RoleType, RoleDetail } from '../../core/models';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {
  public mockData = inject(MockDataService);

  readonly members = signal<WorkspaceMember[]>([...this.mockData.workspaceMembers]);
  readonly selectedRole = signal<RoleType>('Agent');
  readonly roleDetails = signal<Record<RoleType, RoleDetail>>(this.mockData.roleDetails);

  // Invite Member Modal
  showInviteModal = signal<boolean>(false);
  inviteEmail = '';
  inviteRole: RoleType = 'Agent';
  inviteChannelScope = 'All';

  // Role Edit Mode
  isEditingRole = signal<boolean>(false);
  successMessage = signal<string>('');

  selectRole(role: RoleType): void {
    this.selectedRole.set(role);
  }

  openInviteModal(): void {
    this.showInviteModal.set(true);
  }

  closeInviteModal(): void {
    this.showInviteModal.set(false);
    this.inviteEmail = '';
  }

  sendInvite(): void {
    if (!this.inviteEmail.trim()) return;

    const newMember: WorkspaceMember = {
      id: `mem-${Date.now()}`,
      name: this.inviteEmail.split('@')[0],
      email: this.inviteEmail,
      role: this.inviteRole,
      channelScope: this.inviteChannelScope,
      status: 'INVITED',
      lastActive: '—'
    };

    this.members.update(list => [...list, newMember]);
    this.closeInviteModal();
    this.successMessage.set(`Đã gửi lời mời thành viên tới ${this.inviteEmail}!`);
    setTimeout(() => this.successMessage.set(''), 3000);
  }

  toggleEditRole(): void {
    if (this.isEditingRole()) {
      this.isEditingRole.set(false);
      this.successMessage.set('Đã cập nhật ma trận phân quyền cho Role này thành công!');
      setTimeout(() => this.successMessage.set(''), 3000);
    } else {
      this.isEditingRole.set(true);
    }
  }
}
