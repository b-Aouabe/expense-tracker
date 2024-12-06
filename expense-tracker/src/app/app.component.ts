import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentAction: any;
  actions: Array<any> = [
    { title: "Home", route: "/home", icon: "house" },
    { title: "All Expenses", route: "/expenses", icon: "envelope" },
    { title: "Add Expenses", route: "/add-expense", icon: "envelope" },
    { title: "About", route: "/about", icon: "question-circle" },
    { title: "Contact", route: "/contact", icon: "envelope" },
  ];
  title = 'expense-tracker';

  constructor(public router: Router) {}

  ngOnInit() {
    this.updateActiveAction();
    // Listen to route changes and update active action dynamically
    this.router.events.subscribe(() => {
      this.updateActiveAction();
    });
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
    this.router.navigate([action.route]);
  }

  updateActiveAction() {
    const currentUrl = this.router.url;
    this.currentAction = this.actions.find(action => currentUrl.includes(action.route));
  }
}
