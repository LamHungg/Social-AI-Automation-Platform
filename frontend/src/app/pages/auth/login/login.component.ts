import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = 'admin@evnshop.vn';
  password = '••••••••';
  rememberMe = true;
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private router: Router) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage.set('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 800);
  }

  onSocialLogin(provider: string): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/dashboard']);
    }, 600);
  }
}
