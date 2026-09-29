import { Injectable } from '@angular/core';
import {
  Workspace,
  ChannelConnection,
  Conversation,
  Message,
  SocialPost,
  SocialComment,
  AutomationRule,
  Lead,
  AiAgentConfig,
  AnalyticsKPI,
  WorkspaceMember,
  RoleType,
  RoleDetail,
  AuditLogItem,
  FacebookPersonalProfile,
  FbWorkerJob,
  WorkspaceSettings
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  readonly workspaces: Workspace[] = [
    { id: 'ws-1', code: 'EVN_SHOP', name: 'EVN Shop Official', role: 'OWNER' },
    { id: 'ws-2', code: 'TECH_STORE', name: 'Tech Store Vietnam', role: 'ADMIN' },
  ];

  readonly channels: ChannelConnection[] = [
    {
      id: 'ch-1',
      workspaceId: 'ws-1',
      channelType: 'FACEBOOK_PAGE',
      externalId: '109283746192',
      name: 'EVN Shop Official',
      status: 'CONNECTED',
      webhookStatus: 'HEALTHY',
      autoReplyEnabled: true,
      connectedAt: '2026-09-20T10:00:00Z',
    },
    {
      id: 'ch-2',
      workspaceId: 'ws-1',
      channelType: 'INSTAGRAM_BUSINESS',
      externalId: '987123654123',
      name: '@evnshop.official',
      status: 'CONNECTED',
      webhookStatus: 'HEALTHY',
      autoReplyEnabled: true,
      connectedAt: '2026-09-22T14:30:00Z',
    },
    {
      id: 'ch-3',
      workspaceId: 'ws-1',
      channelType: 'FACEBOOK_PAGE',
      externalId: '234567890123',
      name: 'EVN Accessories Hub',
      status: 'CONNECTED',
      webhookStatus: 'HEALTHY',
      autoReplyEnabled: false,
      connectedAt: '2026-09-24T08:15:00Z',
    },
  ];

  readonly kpis: AnalyticsKPI = {
    connectedChannels: 5,
    channelsGrowthText: '+1 kênh tuần này',
    aiRepliedCount: 1248,
    aiRepliedGrowth: 18.4,
    hotLeadsCount: 86,
    hotLeadsGrowth: 12,
    escalationCount: 24,
    escalationPercent: 1.9,
  };

  readonly conversations: Conversation[] = [
    {
      id: 'conv-1',
      channelId: 'ch-1',
      channelType: 'FACEBOOK',
      channelName: 'EVN Shop Official',
      profile: {
        id: 'prof-1',
        name: 'Nguyễn Văn Minh',
        platform: 'FACEBOOK',
        phone: '0987654321',
        location: 'Hà Nội',
      },
      lastMessage: 'Shop ơi bản 256GB Titan tự nhiên còn hàng sẵn ở cơ sở Cầu Giấy không?',
      lastMessageDate: '10:14',
      unreadCount: 1,
      status: 'OPEN',
      aiMode: 'AUTO',
      aiConfidence: 0.97,
      assignedAgent: 'AI Agent Mia',
      leadScore: 86,
      leadTemperature: 'HOT',
      tags: ['Hot Lead', 'Hỏi giá', 'iPhone 17 Pro'],
    },
    {
      id: 'conv-2',
      channelId: 'ch-2',
      channelType: 'INSTAGRAM',
      channelName: '@evnshop.official',
      profile: {
        id: 'prof-2',
        name: 'Lê Hoàng Yến',
        handle: '@yen.hoangle',
        platform: 'INSTAGRAM',
        phone: '0912345678',
        location: 'TP. Hồ Chí Minh',
      },
      lastMessage: 'Giao hàng về Quận 1 mất bao lâu vậy ạ? Có freeship không?',
      lastMessageDate: '09:48',
      unreadCount: 0,
      status: 'OPEN',
      aiMode: 'SUGGEST',
      aiConfidence: 0.88,
      assignedAgent: 'Trần Thảo (CSKH)',
      leadScore: 72,
      leadTemperature: 'WARM',
      tags: ['Tư vấn ship', 'Phụ kiện'],
    },
    {
      id: 'conv-3',
      channelId: 'ch-1',
      channelType: 'FACEBOOK',
      channelName: 'EVN Shop Official',
      profile: {
        id: 'prof-3',
        name: 'Phạm Đức Anh',
        platform: 'FACEBOOK',
      },
      lastMessage: 'Hàng mình nhận bị móp góc hộp, đề nghị quản lý kiểm tra lại giúp tôi!',
      lastMessageDate: '08:30',
      unreadCount: 2,
      status: 'PENDING',
      aiMode: 'HUMAN_TAKEOVER',
      assignedAgent: 'Cần nhân viên can thiệp',
      leadScore: 40,
      leadTemperature: 'COMPLAINT',
      tags: ['Khiếu nại', 'Hỗ trợ đổi trả'],
    },
  ];

  readonly messages: Message[] = [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      direction: 'INBOUND',
      senderType: 'CUSTOMER',
      content: 'Shop ơi bản 256GB Titan tự nhiên còn hàng sẵn ở cơ sở Cầu Giấy không?',
      timestamp: '10:14',
      status: 'READ',
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      direction: 'OUTBOUND',
      senderType: 'AI',
      content: 'Dạ chào anh Minh! Bản iPhone 17 Pro 256GB màu Titan Tự Nhiên hiện đang có sẵn 3 máy tại cơ sở Cầu Giấy ạ. Giá ưu đãi hôm nay là 28.990.000đ kèm quà tặng voucher 500k. Anh có muốn em giữ máy trước khi qua xem không ạ?',
      timestamp: '10:14',
      status: 'SENT',
      aiConfidence: 0.97,
      suggestedByAi: true,
    },
  ];

  readonly socialPosts: SocialPost[] = [
    {
      id: 'post-1',
      channelType: 'FACEBOOK',
      title: '🔥 FLASH SALE CUỐI TUẦN: Giảm đến 40% cho iPhone & MacBook!',
      permalink: 'https://facebook.com/evnshop/posts/101',
      unreadCommentsCount: 24,
      totalCommentsCount: 182,
      publishedDate: 'Hôm qua, 18:00',
    },
    {
      id: 'post-2',
      channelType: 'INSTAGRAM',
      title: 'Unbox cực phẩm Titan Sa Mạc cùng EVN Shop ✨ Nhận quà ngay',
      permalink: 'https://instagram.com/p/reel202',
      unreadCommentsCount: 8,
      totalCommentsCount: 95,
      publishedDate: 'Hôm nay, 08:30',
    },
  ];

  readonly comments: SocialComment[] = [
    {
      id: 'cmt-1',
      postId: 'post-1',
      postTitle: 'FLASH SALE CUỐI TUẦN: Giảm đến 40%',
      authorName: 'Đặng Tuấn Kiệt',
      content: 'Có màu trắng 128gb không shop? Giá bao nhiêu inbox mình nhé',
      commentDate: 'Vừa xong',
      intent: 'ASK_PRICE',
      confidence: 0.98,
      replyStatus: 'UNREPLIED',
      suggestedReply: 'Dạ chào bạn Kiệt, bản 128GB Trắng còn hàng sẵn giá chỉ 21.990.000đ. EVN Shop đã gửi tin nhắn chi tiết cho bạn rồi, bạn check inbox nhé!',
      isHotLead: true,
    },
    {
      id: 'cmt-2',
      postId: 'post-1',
      postTitle: 'FLASH SALE CUỐI TUẦN: Giảm đến 40%',
      authorName: 'Trần Quỳnh Nga',
      content: 'SĐT mình 0978112233, gọi tư vấn gói trả góp 0% giúp mình nha',
      commentDate: '5 phút trước',
      intent: 'PHONE_LEAD',
      confidence: 0.99,
      replyStatus: 'UNREPLIED',
      suggestedReply: 'Cảm ơn chị Nga! Chuyên viên trả góp của EVN Shop sẽ liên hệ qua SĐT 0978112233 ngay trong ít phút ạ.',
      isHotLead: true,
    },
  ];

  readonly automations: AutomationRule[] = [
    {
      id: 'auto-1',
      name: 'Tự động phản hồi hỏi giá & gửi DM ưu đãi',
      description: 'Bắt từ khóa [giá, bao nhiêu, ib] -> Nhận diện Intent ASK_PRICE -> Reply & gửi DM kèm Lead Tag',
      status: 'ACTIVE',
      triggerType: 'INTENT',
      triggers: ['giá', 'ib', 'xin giá', 'bao nhiêu'],
      confidenceThreshold: 0.85,
      actionsSummary: ['Reply Comment bằng AI', 'Gửi DM ưu đãi', 'Tạo Lead HOT', 'Thông báo cho Sale'],
      runsCount: 1420,
      successRate: 98.4,
      updatedAt: '2026-09-27',
    },
    {
      id: 'auto-2',
      name: 'Phát hiện khiếu nại -> Escalate ngay cho Admin',
      description: 'Quét sentiment tiêu cực hoặc từ khóa lỗi/hỏng -> Tắt AI tự động -> Gán cờ Khẩn cấp cho CSKH',
      status: 'ACTIVE',
      triggerType: 'KEYWORD',
      triggers: ['lừa đảo', 'hỏng', 'móp', 'thái độ', 'hoàn tiền'],
      confidenceThreshold: 0.90,
      actionsSummary: ['Tắt AI Reply', 'Chuyển giao nhân viên', 'Gửi cảnh báo Telegram/Slack'],
      runsCount: 38,
      successRate: 100.0,
      updatedAt: '2026-09-26',
    },
    {
      id: 'auto-3',
      name: 'Phát hiện SĐT khách hàng -> Tự động chuyển Lead CRM',
      description: 'Regex trích xuất SĐT hợp lệ từ bình luận hoặc tin nhắn -> Tạo bản ghi Lead mới',
      status: 'ACTIVE',
      triggerType: 'KEYWORD',
      triggers: ['Regex: 0[3|5|7|8|9]+[0-9]{8}'],
      confidenceThreshold: 0.95,
      actionsSummary: ['Trích xuất SĐT', 'Tạo Lead trong CRM', 'Gắn nhãn PHONE_LEAD'],
      runsCount: 312,
      successRate: 99.1,
      updatedAt: '2026-09-25',
    },
  ];

  readonly leads: Lead[] = [
    {
      id: 'lead-1',
      name: 'Nguyễn Văn Minh',
      phone: '0987654321',
      email: 'minh.nguyen@gmail.com',
      platform: 'FACEBOOK',
      stage: 'HOT_LEAD',
      temperature: 'HOT',
      aiScore: 86,
      interestProduct: 'iPhone 17 Pro 256GB Titan',
      assignedTo: 'Trần Thảo',
      createdAt: '2026-09-28 10:14',
      lastInteraction: 'Vừa xong',
      tags: ['Hot Lead', 'Hà Nội', 'Sẵn sàng mua'],
      notes: 'Khách muốn lấy máy trong ngày tại Cầu Giấy',
    },
    {
      id: 'lead-2',
      name: 'Trần Quỳnh Nga',
      phone: '0978112233',
      platform: 'FACEBOOK',
      stage: 'NEW',
      temperature: 'HOT',
      aiScore: 92,
      interestProduct: 'Gói trả góp iPhone 0%',
      assignedTo: 'Lê Tuấn',
      createdAt: '2026-09-28 10:05',
      lastInteraction: '10 phút trước',
      tags: ['SĐT Bình luận', 'Trả góp'],
      notes: 'Để lại SĐT trên bài Flash Sale cuối tuần',
    },
    {
      id: 'lead-3',
      name: 'Lê Hoàng Yến',
      phone: '0912345678',
      platform: 'INSTAGRAM',
      stage: 'CONSULTING',
      temperature: 'WARM',
      aiScore: 72,
      interestProduct: 'Ốp lưng & Sạc nhanh MagSafe',
      assignedTo: 'Trần Thảo',
      createdAt: '2026-09-28 09:48',
      lastInteraction: '25 phút trước',
      tags: ['TP.HCM', 'Freeship'],
    },
  ];

  readonly aiAgentConfig: AiAgentConfig = {
    id: 'agent-1',
    name: 'Mia – Trợ lý CSKH Đa Kênh',
    roleDescription: 'Chuyên gia tư vấn sản phẩm, báo giá nhanh và thu thập thông tin khách hàng cho EVN Shop.',
    defaultTone: 'FRIENDLY',
    language: 'Tiếng Việt',
    systemPrompt: `Bạn là Mia, trợ lý bán hàng và CSKH chuyên nghiệp, thân thiện của EVN Shop.
Nhiệm vụ:
1. Chào hỏi lịch sự, xưng 'em' và gọi khách là 'anh/chị'.
2. Trả lời chính xác về giá bán, quà tặng và tình trạng hàng dựa theo Knowledge Base.
3. Khi khách hỏi giá hoặc có nhu cầu mua, khéo léo mời khách để lại SĐT hoặc địa chỉ nhận hàng để nhận ưu đãi flash sale.
4. Nếu khách khiếu nại hoặc giận dữ, xin lỗi chân thành và chuyển tiếp cho chuyên viên hỗ trợ.`,
    useEmojis: true,
    maxSentenceLength: 'MEDIUM',
    contextMemoryTurns: 5,
    fallbackThreshold: 0.60,
    fallbackKeywords: ['khiếu nại', 'hoàn tiền', 'gặp quản lý', 'lừa đảo', 'gặp người'],
    handoffToHuman: true,
    autoSolveRate: 72.4,
    csatScore: 4.6,
    escalationRate: 1.9,
    model: 'llama-3.3-70b-instruct',
    temperature: 0.7,
  };

  // Members & Roles (B5)
  readonly workspaceMembers: WorkspaceMember[] = [
    {
      id: 'mem-1',
      name: 'Minh Anh',
      email: 'minhanh@evnshop.vn',
      role: 'Admin',
      channelScope: 'All',
      status: 'ACTIVE',
      lastActive: '10:54',
    },
    {
      id: 'mem-2',
      name: 'Hồng Nhung',
      email: 'hongnhung@evnshop.vn',
      role: 'Agent',
      channelScope: 'Facebook',
      status: 'ACTIVE',
      lastActive: '10:48',
    },
    {
      id: 'mem-3',
      name: 'Quang Huy',
      email: 'quanghuy@evnshop.vn',
      role: 'Analyst',
      channelScope: 'All - Read',
      status: 'ACTIVE',
      lastActive: '09:32',
    },
    {
      id: 'mem-4',
      name: 'Lan Phương',
      email: 'lanphuong@evnshop.vn',
      role: 'Agent',
      channelScope: 'Instagram',
      status: 'ACTIVE',
      lastActive: 'Hôm qua',
    },
    {
      id: 'mem-5',
      name: 'Tuấn Anh',
      email: 'tuananh@evnshop.vn',
      role: 'Viewer',
      channelScope: 'All - Read',
      status: 'INVITED',
      lastActive: '—',
    },
  ];

  readonly roleDetails: Record<RoleType, RoleDetail> = {
    Admin: {
      role: 'Admin',
      userCount: 2,
      description: 'Toàn quyền cấu hình hệ thống, quản lý thành viên, tài chính và kết nối kênh.',
      permissions: {
        canViewAndReplyInbox: true,
        canModerateComment: true,
        canManageLeads: true,
        canRunAutomationTest: true,
        canManageWorkspace: true,
      },
    },
    Agent: {
      role: 'Agent',
      userCount: 6,
      description: 'Nhân viên trực chat, phản hồi bình luận, xử lý phễu khách hàng & gán nhãn Lead.',
      permissions: {
        canViewAndReplyInbox: true,
        canModerateComment: true,
        canManageLeads: true,
        canRunAutomationTest: true,
        canManageWorkspace: false,
      },
    },
    Analyst: {
      role: 'Analyst',
      userCount: 2,
      description: 'Chuyên viên phân tích số liệu, xem báo cáo KPI, phễu chuyển đổi và xuất file dữ liệu.',
      permissions: {
        canViewAndReplyInbox: false,
        canModerateComment: false,
        canManageLeads: false,
        canRunAutomationTest: false,
        canManageWorkspace: false,
      },
    },
    Viewer: {
      role: 'Viewer',
      userCount: 3,
      description: 'Chỉ xem dữ liệu ở chế độ Read-only, không được chỉnh sửa hay gửi tin.',
      permissions: {
        canViewAndReplyInbox: false,
        canModerateComment: false,
        canManageLeads: false,
        canRunAutomationTest: false,
        canManageWorkspace: false,
      },
    },
  };

  // Audit Logs (B5)
  readonly auditLogs: AuditLogItem[] = [
    {
      id: 'log-1',
      timestamp: '11:02:41',
      user: 'Minh Anh',
      module: 'Channel',
      action: 'RECONNECT_SESSION',
      target: 'Nguyễn Văn A',
      result: 'SUCCESS',
      details: 'Khôi phục kết nối Facebook Personal worker thành công.',
    },
    {
      id: 'log-2',
      timestamp: '10:58:13',
      user: 'AI Worker',
      module: 'Inbox',
      action: 'AUTO_SEND',
      target: 'CV-10293',
      result: 'SUCCESS',
      details: 'Tự động gửi phản hồi tư vấn iPhone 17 Titan cho khách hàng.',
    },
    {
      id: 'log-3',
      timestamp: '10:52:04',
      user: 'Minh Anh',
      module: 'Lead',
      action: 'UPDATE_STAGE',
      target: 'LD-1048',
      result: 'SUCCESS',
      details: 'Chuyển trạng thái Lead sang HOT_LEAD.',
    },
    {
      id: 'log-4',
      timestamp: '10:48:36',
      user: 'Automation',
      module: 'Comment',
      action: 'SEND_DM',
      target: 'Run #1248',
      result: 'SUCCESS',
      details: 'Tự động gửi tin nhắn riêng cho khách để lại SĐT dưới bài viết.',
    },
    {
      id: 'log-5',
      timestamp: '10:39:04',
      user: 'Automation',
      module: 'Channel',
      action: 'SEND_MESSAGE',
      target: 'Run #1246',
      result: 'FAILED',
      details: 'Lỗi timeout khi gửi tin nhắn qua Instagram Direct.',
    },
    {
      id: 'log-6',
      timestamp: '10:15:22',
      user: 'Minh Anh',
      module: 'AI Agent',
      action: 'PUBLISH_PROMPT',
      target: 'Sales Assistant v12',
      result: 'SUCCESS',
      details: 'Cập nhật System Prompt và lưu phiên bản v12.',
    },
  ];

  // Facebook Personal Profile (B3 / B5)
  readonly fbPersonalProfile: FacebookPersonalProfile = {
    id: 'fbp-1',
    accountName: 'Nguyễn Văn A',
    sessionStatus: 'READY',
    autoSendEnabled: true,
    queuePendingCount: 3,
    lastActivityTime: '10:52',
    capabilities: {
      readMessenger: true,
      autoSendMessenger: true,
      readComment: true,
      autoReplyComment: true,
      aiReply: true,
      automation: true,
    },
    browserSession: {
      mode: 'BROWSER_AUTOMATION',
      workerId: 'fb-profile-worker-01',
      pollingInterval: '10 giây',
      lastCheckpoint: 'Không có',
      proxy: '103.142.26.18:8080 (VN Static Residential)',
    },
  };

  readonly fbJobs: FbWorkerJob[] = [
    { id: '#J-9012', type: 'SEND_MESSAGE', target: 'Messenger / Minh Khôi', result: 'SUCCESS', time: '10:52' },
    { id: '#J-9011', type: 'REPLY_COMMENT', target: 'Post / Thu Hà', result: 'SUCCESS', time: '10:50' },
    { id: '#J-9010', type: 'SEND_MESSAGE', target: 'Messenger / Lan Anh', result: 'RETRY 1/3', time: '10:48' },
    { id: '#J-9009', type: 'READ_THREAD', target: 'Messenger Inbox', result: 'SUCCESS', time: '10:46' },
  ];

  // Workspace Settings (B4)
  readonly workspaceSettings: WorkspaceSettings = {
    workspaceName: 'EVN Shop Automation',
    timezone: 'Asia/Ho_Chi_Minh',
    language: 'Tiếng Việt',
    defaultAssignee: 'Sales Online',
    autoAiFallback: true,
    security2FA: false,
  };
}
