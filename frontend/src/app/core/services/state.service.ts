import { Injectable, signal, inject } from '@angular/core';
import { Workspace, ChannelConnection } from '../models';
import { MockDataService } from './mock-data.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private mockData = inject(MockDataService);

  // Workspaces
  readonly workspaces = signal<Workspace[]>(this.mockData.workspaces);
  readonly currentWorkspace = signal<Workspace>(this.mockData.workspaces[0]);

  // Channels
  readonly channels = signal<ChannelConnection[]>(this.mockData.channels);
  readonly selectedChannelFilter = signal<'ALL' | 'FACEBOOK' | 'INSTAGRAM'>('ALL');

  // AI Active state
  readonly isAiActive = signal<boolean>(true);

  // Search filter
  readonly searchQuery = signal<string>('');

  // Toggle AI Active
  toggleAiActive(): void {
    this.isAiActive.update(val => !val);
  }

  // Set current workspace
  setWorkspace(ws: Workspace): void {
    this.currentWorkspace.set(ws);
  }

  // Set channel filter
  setChannelFilter(filter: 'ALL' | 'FACEBOOK' | 'INSTAGRAM'): void {
    this.selectedChannelFilter.set(filter);
  }
}
