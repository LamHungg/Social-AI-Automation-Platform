import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { FacebookPersonalProfile, FbWorkerJob } from '../../core/models';

@Component({
  selector: 'app-facebook-personal',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './facebook-personal.component.html',
  styleUrls: ['./facebook-personal.component.css']
})
export class FacebookPersonalComponent {
  public mockData = inject(MockDataService);

  readonly profile = signal<FacebookPersonalProfile>({ ...this.mockData.fbPersonalProfile });
  readonly jobs = signal<FbWorkerJob[]>([...this.mockData.fbJobs]);

  isReconnecting = signal<boolean>(false);
  reconnectNotification = signal<string>('');

  // Sub-screens & Modals
  showSessionSetupModal = signal<boolean>(false); // COMPLETE / B5 / Facebook Personal / Session Setup
  showCheckpointModal = signal<boolean>(false);   // COMPLETE / B5 / Facebook Personal / Checkpoint

  // Session Setup Form fields
  sessionForm = {
    cUser: '100084920194821',
    xsToken: '38:k8A_j29zL40:2:1727500000',
    datrToken: 'uG7xZ9aQ8b1c4e6g',
    proxyServer: 'http://residential-vn.proxynet.io:8080',
    proxyAuth: 'user_vn_auto:pass_secret_88',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36',
    workerMode: 'HEADLESS_CHROMIUM',
    minDelaySeconds: 15,
    maxDelaySeconds: 45
  };

  // Checkpoint Handler Form fields
  checkpointOtp = '';
  checkpointStatus = signal<'WAITING_USER' | 'VERIFYING' | 'RESOLVED'>('WAITING_USER');

  openSessionSetup(): void {
    this.showSessionSetupModal.set(true);
  }

  closeSessionSetup(): void {
    this.showSessionSetupModal.set(false);
  }

  saveSessionSetup(): void {
    this.showSessionSetupModal.set(false);
    this.reconnectNotification.set('Đã lưu cấu hình Cookie & Residential Proxy mới cho Browser Worker!');
    setTimeout(() => this.reconnectNotification.set(''), 4000);
  }

  openCheckpointModal(): void {
    this.checkpointStatus.set('WAITING_USER');
    this.checkpointOtp = '';
    this.showCheckpointModal.set(true);
  }

  closeCheckpointModal(): void {
    this.showCheckpointModal.set(false);
  }

  submitCheckpointOtp(): void {
    if (!this.checkpointOtp || this.checkpointOtp.length < 6) {
      alert('Vui lòng nhập mã 2FA / OTP gồm 6 chữ số hợp lệ.');
      return;
    }

    this.checkpointStatus.set('VERIFYING');
    setTimeout(() => {
      this.checkpointStatus.set('RESOLVED');
      this.profile.update(p => ({
        ...p,
        sessionStatus: 'READY',
        lastActivityTime: 'Vừa xong'
      }));
      setTimeout(() => {
        this.closeCheckpointModal();
        this.reconnectNotification.set('Đã giải quyết Checkpoint 2FA thành công! Worker đã tiếp tục hoạt động.');
        setTimeout(() => this.reconnectNotification.set(''), 4000);
      }, 1200);
    }, 1500);
  }

  approveOnMobileApp(): void {
    this.checkpointStatus.set('VERIFYING');
    setTimeout(() => {
      this.checkpointStatus.set('RESOLVED');
      this.profile.update(p => ({
        ...p,
        sessionStatus: 'READY',
        lastActivityTime: 'Vừa xong'
      }));
      setTimeout(() => {
        this.closeCheckpointModal();
        this.reconnectNotification.set('Đã xác nhận phê duyệt từ thiết bị di động! Session an toàn.');
        setTimeout(() => this.reconnectNotification.set(''), 4000);
      }, 1200);
    }, 1500);
  }

  reconnectSession(): void {
    this.isReconnecting.set(true);
    this.reconnectNotification.set('Đang kiểm tra cookie session và kết nối lại trình duyệt Browser Worker...');

    setTimeout(() => {
      this.isReconnecting.set(false);
      this.reconnectNotification.set('Đã khôi phục và xác thực Session Facebook Cá nhân thành công! Trạng thái: READY');
      this.profile.update(p => ({
        ...p,
        sessionStatus: 'READY',
        lastActivityTime: 'Vừa xong'
      }));
      setTimeout(() => this.reconnectNotification.set(''), 4000);
    }, 1500);
  }

  toggleAutoSend(): void {
    this.profile.update(p => ({
      ...p,
      autoSendEnabled: !p.autoSendEnabled
    }));
  }

  toggleCapability(cap: 'readMessenger' | 'autoSendMessenger' | 'readComment' | 'autoReplyComment' | 'aiReply' | 'automation'): void {
    this.profile.update(p => ({
      ...p,
      capabilities: {
        ...p.capabilities,
        [cap]: !p.capabilities[cap]
      }
    }));
  }
}
