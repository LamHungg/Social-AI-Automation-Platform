import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { AiAgentConfig } from '../../core/models';

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: 'PDF' | 'URL' | 'FAQ';
  meta: string;
  status: 'ACTIVE' | 'PROCESSING';
}

export interface PromptVersion {
  version: string;
  author: string;
  date: string;
  note: string;
  prompt: string;
  isCurrent?: boolean;
}

@Component({
  selector: 'app-ai-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './ai-agent.component.html',
  styleUrls: ['./ai-agent.component.css']
})
export class AiAgentComponent implements OnInit {
  public mockData = inject(MockDataService);
  readonly config = signal<AiAgentConfig>({ ...this.mockData.aiAgentConfig });

  // Sandbox chat
  sandboxInput = '';
  sandboxMessages: { sender: string; text: string; confidence?: number }[] = [
    { sender: 'user', text: 'Shop còn bản titan tự nhiên không ạ?' },
    { sender: 'ai', text: 'Dạ chào bạn! Bản Titan Tự Nhiên hiện đang có sẵn tại shop với ưu đãi giảm 500k và tặng kèm ốp lưng chính hãng ạ. Bạn muốn em giữ máy tại cửa hàng nào giúp bạn nhỉ?', confidence: 0.97 },
  ];

  // Modals state
  showKnowledgeModal = signal<boolean>(false);
  showHistoryModal = signal<boolean>(false);
  showAddAgentModal = signal<boolean>(false);   // COMPLETE / B3 / Add AI Agent
  showTestAgentModal = signal<boolean>(false);  // COMPLETE / B3 / Popup / Test AI Agent
  notificationMsg = signal<string>('');

  // Add AI Agent Form
  newAgentName = 'EVN CSKH & Bảo hành';
  selectedTemplate = 'CSKH_WARRANTY';
  selectedModel = 'llama-3.3-70b-instruct';
  selectedTemp = 0.4;

  // Knowledge Base Documents (COMPLETE / B3 / Popup / Add Knowledge Source)
  knowledgeDocs = signal<KnowledgeDocument[]>([
    {
      id: 'kb-1',
      name: 'Bảng giá iPhone & MacBook Q3-2026.pdf',
      type: 'PDF',
      meta: 'Đã đồng bộ • 142 sản phẩm',
      status: 'ACTIVE'
    },
    {
      id: 'kb-2',
      name: 'Chính sách bảo hành & Freeship EVN.docx',
      type: 'PDF',
      meta: 'Đã đồng bộ • 32 điều khoản',
      status: 'ACTIVE'
    },
    {
      id: 'kb-3',
      name: 'https://evnshop.vn/chinh-sach-tra-gop-0',
      type: 'URL',
      meta: 'Crawl tự động • Cập nhật hôm qua',
      status: 'ACTIVE'
    }
  ]);

  // Knowledge Modal Form
  knowledgeSourceType: 'FILE' | 'URL' | 'TEXT' = 'FILE';
  newDocName = '';
  newDocUrl = '';
  newDocContent = '';

  // Prompt Version History (COMPLETE / B4 / AI Prompt Version History)
  readonly promptVersions = signal<PromptVersion[]>([
    {
      version: 'v12',
      author: 'Minh Anh',
      date: 'Hôm nay, 10:15',
      note: 'Tối ưu câu hỏi xin số điện thoại tự nhiên hơn và thêm chính sách khuyến mãi flash sale',
      prompt: `Bạn là Mia, trợ lý bán hàng và CSKH chuyên nghiệp, thân thiện của EVN Shop.
Nhiệm vụ:
1. Chào hỏi lịch sự, xưng 'em' và gọi khách là 'anh/chị'.
2. Trả lời chính xác về giá bán, quà tặng và tình trạng hàng dựa theo Knowledge Base.
3. Khi khách hỏi giá hoặc có nhu cầu mua, khéo léo mời khách để lại SĐT hoặc địa chỉ nhận hàng để nhận ưu đãi flash sale.
4. Nếu khách khiếu nại hoặc giận dữ, xin lỗi chân thành và chuyển tiếp cho chuyên viên hỗ trợ.`,
      isCurrent: true
    },
    {
      version: 'v11',
      author: 'Minh Anh',
      date: '25/09/2026, 14:30',
      note: 'Thêm từ khóa chặn chuyển tiếp cho nhân viên khi khách bức xúc về giao hàng',
      prompt: `Bạn là Mia, trợ lý bán hàng EVN Shop. Trả lời khách lịch sự, báo giá nhanh. Khi khách cần mua xin SĐT để chốt đơn.`
    },
    {
      version: 'v10',
      author: 'EVN Administrator',
      date: '20/09/2026, 09:00',
      note: 'Phiên bản khởi tạo cấu hình AI Agent ban đầu',
      prompt: `Trợ lý bán hàng tự động cho EVN Shop.`
    }
  ]);

  ngOnInit(): void {
    const savedChat = localStorage.getItem('metaflow_sandbox_chat');
    if (savedChat) {
      try {
        this.sandboxMessages = JSON.parse(savedChat);
      } catch (e) {
        // fallback
      }
    }
  }

  sendSandboxMessage(): void {
    if (!this.sandboxInput.trim()) return;

    this.sandboxMessages.push({ sender: 'user', text: this.sandboxInput });
    const userQ = this.sandboxInput;
    this.sandboxInput = '';

    setTimeout(() => {
      this.sandboxMessages.push({
        sender: 'ai',
        text: `Dạ em đã nhận được yêu cầu về "${userQ}". Em xin tư vấn chi tiết chính sách ưu đãi của EVN Shop cho bạn ngay ạ! Anh/chị cho em xin SĐT để em giữ giá tốt này nhé!`,
        confidence: 0.96
      });
      localStorage.setItem('metaflow_sandbox_chat', JSON.stringify(this.sandboxMessages));
    }, 400);

    localStorage.setItem('metaflow_sandbox_chat', JSON.stringify(this.sandboxMessages));
  }

  resetSandboxChat(): void {
    this.sandboxMessages = [];
    localStorage.removeItem('metaflow_sandbox_chat');
  }

  saveConfig(): void {
    this.showToast('Đã lưu và cập nhật cấu hình AI Agent lên hệ thống thành công!');
  }

  // Add Knowledge Modal
  openKnowledgeModal(): void {
    this.newDocName = '';
    this.newDocUrl = '';
    this.newDocContent = '';
    this.knowledgeSourceType = 'FILE';
    this.showKnowledgeModal.set(true);
  }

  closeKnowledgeModal(): void {
    this.showKnowledgeModal.set(false);
  }

  saveKnowledgeDoc(): void {
    let name = '';
    let meta = '';
    if (this.knowledgeSourceType === 'FILE') {
      name = this.newDocName || 'Bang_gia_khuyen_mai_moi.pdf';
      meta = 'Vừa tải lên • Đang lập chỉ mục Vector Embedding';
    } else if (this.knowledgeSourceType === 'URL') {
      name = this.newDocUrl || 'https://evnshop.vn/san-pham';
      meta = 'Đã crawl thành công • 85 trang con';
    } else {
      name = this.newDocName || 'Quy tắc hỏi đáp FAQ';
      meta = 'Văn bản tùy chỉnh • 24 câu hỏi đáp';
    }

    const newDoc: KnowledgeDocument = {
      id: `doc-${Date.now()}`,
      name,
      type: this.knowledgeSourceType === 'FILE' ? 'PDF' : (this.knowledgeSourceType === 'URL' ? 'URL' : 'FAQ'),
      meta,
      status: 'ACTIVE'
    };

    this.knowledgeDocs.update(list => [...list, newDoc]);
    this.closeKnowledgeModal();
    this.showToast(`Đã thêm nguồn tri thức "${name}" vào Knowledge Base!`);
  }

  // Version History Modal
  openHistoryModal(): void {
    this.showHistoryModal.set(true);
  }

  closeHistoryModal(): void {
    this.showHistoryModal.set(false);
  }

  rollbackVersion(v: PromptVersion): void {
    this.config.update(c => ({
      ...c,
      systemPrompt: v.prompt
    }));
    this.promptVersions.update(list => list.map(item => ({
      ...item,
      isCurrent: item.version === v.version
    })));
    this.closeHistoryModal();
    this.showToast(`Đã khôi phục System Prompt về phiên bản ${v.version}!`);
  }

  // Add AI Agent handlers (COMPLETE / B3 / Add AI Agent)
  openAddAgentModal(): void {
    this.showAddAgentModal.set(true);
  }

  closeAddAgentModal(): void {
    this.showAddAgentModal.set(false);
  }

  createAgentFromTemplate(): void {
    this.config.update(c => ({
      ...c,
      name: this.newAgentName,
      model: this.selectedModel,
      temperature: this.selectedTemp
    }));
    this.closeAddAgentModal();
    this.showToast(`Đã khởi tạo thành công Agent mới: ${this.newAgentName}!`);
  }

  // Test AI Agent Modal handlers (COMPLETE / B3 / Popup / Test AI Agent)
  openTestAgentModal(): void {
    this.showTestAgentModal.set(true);
  }

  closeTestAgentModal(): void {
    this.showTestAgentModal.set(false);
  }

  private showToast(msg: string): void {
    this.notificationMsg.set(msg);
    setTimeout(() => this.notificationMsg.set(''), 3500);
  }
}
