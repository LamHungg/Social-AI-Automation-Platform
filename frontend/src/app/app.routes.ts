import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Tổng quan – META FLOW'
  },
  {
    path: 'inbox',
    loadComponent: () => import('./pages/inbox/inbox.component').then(m => m.InboxComponent),
    title: 'Inbox hợp nhất – META FLOW'
  },
  {
    path: 'comments',
    loadComponent: () => import('./pages/comment-center/comment-center.component').then(m => m.CommentCenterComponent),
    title: 'Comment Center – META FLOW'
  },
  {
    path: 'automations',
    loadComponent: () => import('./pages/automation/automation.component').then(m => m.AutomationComponent),
    title: 'Automation Builder – META FLOW'
  },
  {
    path: 'leads',
    loadComponent: () => import('./pages/lead-crm/lead-crm.component').then(m => m.LeadCrmComponent),
    title: 'Khách hàng & Lead – META FLOW'
  },
  {
    path: 'ai-agent',
    loadComponent: () => import('./pages/ai-agent/ai-agent.component').then(m => m.AiAgentComponent),
    title: 'Cấu hình AI Agent – META FLOW'
  },
  {
    path: 'channels',
    loadComponent: () => import('./pages/channels/channels.component').then(m => m.ChannelsComponent),
    title: 'Kênh kết nối – META FLOW'
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
    title: 'Báo cáo & Phân tích – META FLOW'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
