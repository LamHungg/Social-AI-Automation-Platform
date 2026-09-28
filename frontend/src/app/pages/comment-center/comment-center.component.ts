import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { SocialPost, SocialComment } from '../../core/models';

@Component({
  selector: 'app-comment-center',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './comment-center.component.html',
  styleUrls: ['./comment-center.component.css']
})
export class CommentCenterComponent {
  public mockData = inject(MockDataService);
  readonly posts = signal<SocialPost[]>(this.mockData.socialPosts);
  readonly selectedPost = signal<SocialPost>(this.mockData.socialPosts[0]);
  readonly comments = signal<SocialComment[]>(this.mockData.comments);

  selectPost(post: SocialPost): void {
    this.selectedPost.set(post);
  }

  replyComment(cmt: SocialComment): void {
    alert(`Đã gửi câu trả lời tự động cho ${cmt.authorName}!`);
  }

  sendDm(cmt: SocialComment): void {
    alert(`Đã gửi tin nhắn riêng (DM) vào hộp thư của ${cmt.authorName}!`);
  }

  hideComment(cmt: SocialComment): void {
    alert(`Đã ẩn bình luận của ${cmt.authorName} khỏi bài viết.`);
  }
}
