import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {
  workspaceName = 'EVN Store Vietnam';
  industry = 'RETAIL';
  scale = 'MEDIUM';

  connectFb = true;
  connectIg = true;
  connectPersonal = false;

  isSubmitting = signal<boolean>(false);

  constructor(private router: Router) {}

  createWorkspace(): void {
    if (!this.workspaceName.trim()) return;

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}
