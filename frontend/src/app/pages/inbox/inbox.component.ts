import { Component, signal, inject } from '@angular/core';
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

  readonly conversations = signal<Conversation[]>(this.mockData.conversations);
  readonly selectedConversation = signal<Conversation>(this.mockData.conversations[0]);
  readonly messages = signal<Message[]>(this.mockData.messages);

  newMessageText = '';
  activeTab: 'ALL' | 'UNREAD' | 'HOT_LEAD' | 'TAKEOVER' = 'ALL';

  selectConv(conv: Conversation): void {
    this.selectedConversation.set(conv);
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

    this.messages.update(prev => [...prev, newMsg]);
    this.newMessageText = '';
  }

  applyAiSuggestion(): void {
    this.newMessageText = 'Dạ chào anh Minh! EVN Shop có thể giao máy hỏa tốc trong 2h tại Hà Nội ạ. Anh cho em xin địa chỉ chính xác để em lên đơn nhé!';
  }

  takeOver(): void {
    this.selectedConversation.update(conv => ({
      ...conv,
      aiMode: 'HUMAN_TAKEOVER',
      assignedAgent: 'EVN Administrator'
    }));
  }
}
