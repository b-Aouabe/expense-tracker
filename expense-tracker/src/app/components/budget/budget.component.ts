import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  budget = 0;
  totalExpenses = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.fetchTotalExpenses();
  }

  saveBudget() {
    alert(`Budget set to ${this.budget}`);
  }

  fetchTotalExpenses() {
    this.expenseService.getTotalExpenses().subscribe((total) => {
      this.totalExpenses = total;
    });
  }
}
