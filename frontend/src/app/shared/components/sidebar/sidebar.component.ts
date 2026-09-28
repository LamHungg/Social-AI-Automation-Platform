import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StateService } from '../../../core/services/state.service';

interface NavItem {
  path: string;
  label: string;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'hot';
  iconSvg: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public state: StateService) {}

  readonly navItems: NavItem[] = [
    {
      path: '/dashboard',
      label: 'Tổng quan',
      iconSvg: 'dashboard'
    },
    {
      path: '/inbox',
      label: 'Inbox hợp nhất',
      badge: '3',
      badgeType: 'info',
      iconSvg: 'inbox'
    },
    {
      path: '/comments',
      label: 'Comment Center',
      badge: '32',
      badgeType: 'warning',
      iconSvg: 'comments'
    },
    {
      path: '/automations',
      label: 'Automation Builder',
      iconSvg: 'automations'
    },
    {
      path: '/leads',
      label: 'Khách hàng & Lead',
      badge: '86',
      badgeType: 'hot',
      iconSvg: 'leads'
    },
    {
      path: '/ai-agent',
      label: 'AI Agent',
      iconSvg: 'ai-agent'
    },
    {
      path: '/channels',
      label: 'Kênh kết nối',
      iconSvg: 'channels'
    },
    {
      path: '/analytics',
      label: 'Báo cáo',
      iconSvg: 'analytics'
    },
  ];
}
