import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { SocialPost, SocialComment, Lead } from '../../core/models';

@Component({
  selector: 'app-comment-center',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './comment-center.component.html',
  styleUrls: ['./comment-center.component.css']
})
export class CommentCenterComponent {
  public mockData = inject(MockDataService);
  readonly posts = signal<SocialPost[]>(this.mockData.socialPosts);
  readonly selectedPost = signal<SocialPost>(this.mockData.socialPosts[0]);
  readonly comments = signal<SocialComment[]>([...this.mockData.comments]);

  // Modals state
  showCreateLeadModal = signal<boolean>(false);
  showMarkSpamModal = signal<boolean>(false);
  showThreadDetailDrawer = signal<boolean>(false); // COMPLETE / B1 / Comment Thread Detail
  targetComment = signal<SocialComment | null>(null);
  notificationMsg = signal<string>('');

  // Form Create Lead from Comment (COMPLETE / B1 / Popup / Create Lead From Comment)
  leadCustomerName = '';
  leadPhone = '';
  leadProduct = '';
  leadTemperature: 'HOT' | 'WARM' = 'HOT';
  leadNotes = '';

  // Form Mark Spam (COMPLETE / B1 / Popup / Mark Spam Confirm)
  spamAction: 'HIDE' | 'BLOCK' = 'HIDE';

  // Thread detail reply input
  manualReplyText = '';

  selectPost(post: SocialPost): void {
    this.selectedPost.set(post);
  }

  replyComment(cmt: SocialComment): void {
    this.comments.update(list => list.map(c => 
      c.id === cmt.id ? { ...c, replyStatus: 'REPLIED' } : c
    ));
    this.showToast(`Đã xuất bản phản hồi tự động cho ${cmt.authorName}!`);
  }

  sendDm(cmt: SocialComment): void {
    this.comments.update(list => list.map(c => 
      c.id === cmt.id ? { ...c, replyStatus: 'DM_SENT' } : c
    ));
    this.showToast(`Đã gửi tin nhắn riêng (DM) vào Messenger cho ${cmt.authorName}!`);
  }

  // Comment Thread Detail handlers (COMPLETE / B1 / Comment Thread Detail)
  openThreadDetail(cmt: SocialComment): void {
    this.targetComment.set(cmt);
    this.manualReplyText = `Dạ em chào anh/chị ${cmt.authorName}! Em đã gửi thông tin báo giá chi tiết và ưu đãi quà tặng qua tin nhắn riêng (DM), anh/chị kiểm tra hộp thư giúp em nha ạ! ✨`;
    this.showThreadDetailDrawer.set(true);
  }

  closeThreadDetail(): void {
    this.showThreadDetailDrawer.set(false);
  }

  sendManualReply(): void {
    const cmt = this.targetComment();
    if (!cmt || !this.manualReplyText.trim()) return;

    this.comments.update(list => list.map(c =>
      c.id === cmt.id ? { ...c, replyStatus: 'REPLIED' } : c
    ));
    this.closeThreadDetail();
    this.showToast(`Đã phản hồi bình luận của ${cmt.authorName} thành công!`);
  }

  openCreateLeadModal(cmt: SocialComment): void {
    this.targetComment.set(cmt);
    this.leadCustomerName = cmt.authorName;
    const phoneMatch = cmt.content.match(/(0[3|5|7|8|9])+([0-9]{8})\b/);
    this.leadPhone = phoneMatch ? phoneMatch[0] : '';
    this.leadProduct = 'iPhone 17 Pro 256GB';
    this.leadTemperature = cmt.isHotLead ? 'HOT' : 'WARM';
    this.leadNotes = `Tạo từ bình luận: "${cmt.content}"`;
    this.showCreateLeadModal.set(true);
  }

  closeCreateLeadModal(): void {
    this.showCreateLeadModal.set(false);
    this.targetComment.set(null);
  }

  confirmCreateLead(): void {
    const cmt = this.targetComment();
    if (!cmt) return;

    const newLead: Lead = {
      id: `lead-cmt-${Date.now()}`,
      name: this.leadCustomerName,
      phone: this.leadPhone,
      platform: 'FACEBOOK',
      stage: 'NEW',
      temperature: this.leadTemperature,
      aiScore: this.leadTemperature === 'HOT' ? 95 : 75,
      interestProduct: this.leadProduct,
      assignedTo: 'Minh Anh (Sales)',
      createdAt: 'Vừa xong',
      lastInteraction: 'Vừa xong',
      notes: this.leadNotes,
      tags: ['Tạo từ bình luận', 'Hot Lead']
    };

    this.mockData.leads.unshift(newLead);
    this.closeCreateLeadModal();
    this.showToast(`Đã chuyển đổi thành công khách hàng ${newLead.name} sang phễu Lead CRM!`);
  }

  openMarkSpamModal(cmt: SocialComment): void {
    this.targetComment.set(cmt);
    this.showMarkSpamModal.set(true);
  }

  closeMarkSpamModal(): void {
    this.showMarkSpamModal.set(false);
    this.targetComment.set(null);
  }

  confirmMarkSpam(): void {
    const cmt = this.targetComment();
    if (!cmt) return;

    this.comments.update(list => list.map(c => 
      c.id === cmt.id ? { ...c, replyStatus: 'HIDDEN' } : c
    ));

    this.closeMarkSpamModal();
    this.showToast(`Đã ẩn bình luận và đánh dấu spam đối với người dùng ${cmt.authorName}!`);
  }

  private showToast(msg: string): void {
    this.notificationMsg.set(msg);
    setTimeout(() => this.notificationMsg.set(''), 3500);
  }
}
