import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { AiAgentConfig } from '../../core/models';

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './ai-agent.component.html',
  styleUrls: ['./ai-agent.component.css']
})
export class AiAgentComponent {
  public mockData = inject(MockDataService);
  readonly config = signal<AiAgentConfig>(this.mockData.aiAgentConfig);

  sandboxInput = '';
  sandboxMessages = [
    { sender: 'user', text: 'Shop còn bản titan tự nhiên không ạ?' },
    { sender: 'ai', text: 'Dạ chào bạn! Bản Titan Tự Nhiên hiện đang có sẵn tại shop với ưu đãi giảm 500k và tặng kèm ốp lưng chính hãng ạ. Bạn muốn em giữ máy tại cửa hàng nào giúp bạn nhỉ?' },
  ];

  sendSandboxMessage(): void {
    if (!this.sandboxInput.trim()) return;

    this.sandboxMessages.push({ sender: 'user', text: this.sandboxInput });
    const userQ = this.sandboxInput;
    this.sandboxInput = '';

    setTimeout(() => {
      this.sandboxMessages.push({
        sender: 'ai',
        text: `Dạ em đã nhận được yêu cầu về "${userQ}". Em xin tư vấn chi tiết chính sách ưu đãi của EVN Shop cho bạn ngay ạ!`
      });
    }, 400);
  }

  saveConfig(): void {
    alert('Đã lưu và cập nhật cấu hình AI Agent thành công!');
  }
}
