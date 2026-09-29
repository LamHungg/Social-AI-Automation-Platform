import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'META FLOW – AI Automation Platform';
  public router = inject(Router);

  isAuthRoute(): boolean {
    const url = this.router.url;
    return url.includes('/login') || url.includes('/onboarding');
  }
}
