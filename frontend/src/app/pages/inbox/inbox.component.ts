import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { StateService } from '../../core/services/state.service';
import { Conversation, Message } from '../../core/models';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent {
  public mockData = inject(MockDataService);
  public state = inject(StateService);

  readonly conversations = signal<Conversation[]>([...this.mockData.conversations]);
  readonly selectedConversation = signal<Conversation>(this.mockData.conversations[0]);
  
  // All messages in state
  readonly allMessages = signal<Message[]>([
    ...this.mockData.messages,
    {
      id: 'msg-conv2-1',
      conversationId: 'conv-2',
      direction: 'INBOUND',
      senderType: 'CUSTOMER',
      content: 'Giao hàng về Quận 1 mất bao lâu vậy ạ? Có freeship không?',
      timestamp: '09:48',
      status: 'READ'
    },
    {
      id: 'msg-conv2-2',
      conversationId: 'conv-2',
      direction: 'OUTBOUND',
      senderType: 'AI',
      content: 'Dạ chào bạn Yến! Đơn hàng phụ kiện trên 300k bên em freeship toàn bộ khu vực TP.HCM ạ. Giao hỏa tốc Quận 1 chỉ từ 1-2 tiếng bạn nhé!',
      timestamp: '09:49',
      status: 'SENT',
      suggestedByAi: true
    },
    {
      id: 'msg-conv3-1',
      conversationId: 'conv-3',
      direction: 'INBOUND',
      senderType: 'CUSTOMER',
      content: 'Hàng mình nhận bị móp góc hộp, đề nghị quản lý kiểm tra lại giúp tôi!',
      timestamp: '08:30',
      status: 'READ'
    }
  ]);

  // Filtered messages for current active conversation
  readonly messages = computed(() => {
    const activeId = this.selectedConversation().id;
    return this.allMessages().filter(m => m.conversationId === activeId);
  });

  newMessageText = '';
  activeTab: 'ALL' | 'UNREAD' | 'HOT_LEAD' | 'TAKEOVER' = 'ALL';
  notificationMsg = signal<string>('');

  // Modals state (Figma B1)
  showAssignModal = signal<boolean>(false);
  showCloseModal = signal<boolean>(false);
  assigneeName = 'Hồng Nhung (Agent CSKH)';
  assignNote = '';
  closeReason = 'Đã giải đáp và khách hàng hài lòng';

  selectConv(conv: Conversation): void {
    this.selectedConversation.set(conv);
    // Mark as read
    this.conversations.update(list => list.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c));
  }

  sendMessage(): void {
    if (!this.newMessageText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: this.selectedConversation().id,
      direction: 'OUTBOUND',
      senderType: 'HUMAN',
      content: this.newMessageText,
      timestamp: 'Vừa xong',
      status: 'SENT',
    };

    this.allMessages.update(prev => [...prev, newMsg]);

    // Update conversation last message
    this.conversations.update(list => list.map(c => 
      c.id === this.selectedConversation().id 
        ? { ...c, lastMessage: this.newMessageText, lastMessageDate: 'Vừa xong' }
        : c
    ));

    this.newMessageText = '';
  }

  applyAiSuggestion(): void {
    this.newMessageText = 'Dạ chào bạn! EVN Shop có thể giao máy hỏa tốc trong 2h tại nội thành ạ. Bạn cho em xin địa chỉ chính xác để em lên đơn nhé!';
  }

  takeOver(): void {
    this.selectedConversation.update(conv => ({
      ...conv,
      aiMode: 'HUMAN_TAKEOVER',
      assignedAgent: 'Minh Anh (Admin)'
    }));
    this.showToast('Đã chuyển hội thoại sang chế độ Nhân viên tiếp quản (Human Takeover)!');
  }

  // Assign Conversation Popup (COMPLETE / B1 / Popup / Assign Conversation)
  openAssignModal(): void {
    this.assignNote = '';
    this.showAssignModal.set(true);
  }

  closeAssignModal(): void {
    this.showAssignModal.set(false);
  }

  confirmAssign(): void {
    this.selectedConversation.update(c => ({
      ...c,
      assignedAgent: this.assigneeName
    }));
    this.closeAssignModal();
    this.showToast(`Đã phân công cuộc hội thoại cho ${this.assigneeName}!`);
  }

  // Close Conversation Popup (COMPLETE / B1 / Popup / Close Conversation)
  openCloseModal(): void {
    this.showCloseModal.set(true);
  }

  closeCloseModal(): void {
    this.showCloseModal.set(false);
  }

  confirmClose(): void {
    this.selectedConversation.update(c => ({
      ...c,
      status: 'RESOLVED'
    }));
    this.closeCloseModal();
    this.showToast('Cuộc hội thoại đã được đánh dấu là HOÀN TẤT & ĐÓNG!');
  }

  private showToast(msg: string): void {
    this.notificationMsg.set(msg);
    setTimeout(() => this.notificationMsg.set(''), 3500);
  }
}
