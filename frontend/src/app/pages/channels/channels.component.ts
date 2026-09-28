import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MockDataService } from '../../core/services/mock-data.service';
import { ChannelConnection } from '../../core/models';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent {
  public mockData = inject(MockDataService);
  readonly channels = signal<ChannelConnection[]>(this.mockData.channels);

  toggleAutoReply(channel: ChannelConnection): void {
    this.channels.update(items =>
      items.map(c => c.id === channel.id ? { ...c, autoReplyEnabled: !c.autoReplyEnabled } : c)
    );
  }

  connectChannel(): void {
    alert('Mở cửa sổ ủy quyền Meta OAuth (Facebook / Instagram)...');
  }
}
