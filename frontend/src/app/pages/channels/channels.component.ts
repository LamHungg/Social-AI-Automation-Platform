import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { ChannelConnection } from '../../core/models';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent {
  public mockData = inject(MockDataService);
  readonly channels = signal<ChannelConnection[]>([...this.mockData.channels]);

  // Modals state
  showConnectWizard = signal<boolean>(false);
  showDisconnectModal = signal<boolean>(false);
  showReconnectModal = signal<boolean>(false);
  showDetailDrawer = signal<boolean>(false);
  targetChannel = signal<ChannelConnection | null>(null);
  notificationMsg = signal<string>('');

  // Wizard state (COMPLETE / B3 / Connect Channel Wizard)
  wizardStep = signal<number>(1);
  selectedPlatform: 'FACEBOOK_PAGE' | 'INSTAGRAM_BUSINESS' = 'FACEBOOK_PAGE';
  selectedPageName = 'EVN Flagship Store';
  enableAutoReplyOnConnect = true;

  toggleAutoReply(channel: ChannelConnection): void {
    this.channels.update(items =>
      items.map(c => c.id === channel.id ? { ...c, autoReplyEnabled: !c.autoReplyEnabled } : c)
    );
    this.showToast(`Đã thay đổi cài đặt Tự động trả lời cho kênh ${channel.name}!`);
  }

  // Connect Channel Wizard handlers
  openConnectWizard(): void {
    this.wizardStep.set(1);
    this.showConnectWizard.set(true);
  }

  closeConnectWizard(): void {
    this.showConnectWizard.set(false);
  }

  nextWizardStep(): void {
    if (this.wizardStep() < 3) {
      this.wizardStep.update(s => s + 1);
    } else {
      // Finish connect
      const newChannel: ChannelConnection = {
        id: `ch-${Date.now()}`,
        workspaceId: 'ws-1',
        channelType: this.selectedPlatform,
        externalId: `${Date.now()}`,
        name: this.selectedPageName,
        status: 'CONNECTED',
        webhookStatus: 'HEALTHY',
        autoReplyEnabled: this.enableAutoReplyOnConnect,
        connectedAt: new Date().toISOString()
      };

      this.channels.update(prev => [...prev, newChannel]);
      this.closeConnectWizard();
      this.showToast(`Đã liên kết thành công kênh ${newChannel.name} và kích hoạt Webhook!`);
    }
  }

  // Channel Detail Drawer handler (COMPLETE / B3 / Channel Detail)
  openChannelDetail(ch: ChannelConnection): void {
    this.targetChannel.set(ch);
    this.showDetailDrawer.set(true);
  }

  closeChannelDetail(): void {
    this.showDetailDrawer.set(false);
    this.targetChannel.set(null);
  }

  // Reconnect Channel handler (COMPLETE / B3 / Popup / Reconnect Channel)
  openReconnectModal(ch: ChannelConnection): void {
    this.targetChannel.set(ch);
    this.showReconnectModal.set(true);
  }

  closeReconnectModal(): void {
    this.showReconnectModal.set(false);
    this.targetChannel.set(null);
  }

  confirmReconnect(): void {
    const ch = this.targetChannel();
    if (!ch) return;

    this.channels.update(items =>
      items.map(c => c.id === ch.id ? { ...c, status: 'CONNECTED', webhookStatus: 'HEALTHY' } : c)
    );
    this.closeReconnectModal();
    this.showToast(`Đã làm mới mã truy cập Token và khôi phục kết nối thành công cho ${ch.name}!`);
  }

  // Disconnect Channel handler (COMPLETE / B3 / Popup / Disconnect Channel)
  openDisconnectModal(ch: ChannelConnection): void {
    this.targetChannel.set(ch);
    this.showDisconnectModal.set(true);
  }

  closeDisconnectModal(): void {
    this.showDisconnectModal.set(false);
    this.targetChannel.set(null);
  }

  confirmDisconnect(): void {
    const ch = this.targetChannel();
    if (!ch) return;

    this.channels.update(list => list.filter(c => c.id !== ch.id));
    this.closeDisconnectModal();
    this.showToast(`Đã ngắt kết nối và hủy đăng ký Webhook cho ${ch.name}!`);
  }

  private showToast(msg: string): void {
    this.notificationMsg.set(msg);
    setTimeout(() => {
      this.notificationMsg.set('');
    }, 4000);
  }
}
