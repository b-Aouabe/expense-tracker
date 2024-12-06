import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'Welcome to the Expense Tracker';
  description = 'Track your expenses, set budgets, and get notified when you exceed your budget!';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

}
