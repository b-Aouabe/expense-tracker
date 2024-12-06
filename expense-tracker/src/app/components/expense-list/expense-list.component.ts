// import { Component, OnInit } from '@angular/core';
// import { ExpenseService } from '../../services/expense.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';


// interface Expense {
//   id: number;
//   name: string;
//   amount: number;
//   category: string;
// }

// @Component({
//   selector: 'app-expense-list',
//   imports: [FormsModule, CommonModule],
//   templateUrl: './expense-list.component.html',
//   styleUrls: ['./expense-list.component.css'],
// })
// export class ExpenseListComponent implements OnInit {
//   // expenses : Expense[] = [];
//   // displayedColumns: string[] = ['name', 'amount', 'category', 'actions'];

//   // constructor(private expenseService: ExpenseService) {}

//   ngOnInit() {
//     // this.fetchExpenses();
//   }

//   // fetchExpenses() {
//   //   this.expenseService.getExpenses().subscribe((data) => {
//   //     this.expenses = data;
//   //   });
//   // }

//   // deleteExpense(id: number) {
//   //   this.expenseService.deleteExpense(id).subscribe(() => {
//   //     this.fetchExpenses();
//   //   });
//   // }
// }


import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css'],
})
export class ExpenseListComponent implements OnInit {
  budget: number = 1000; // Example budget
  
  // Fake data for expenses
  expenses = [
    { id: 1, name: 'Groceries', amount: 50, category: 'Food' },
    { id: 2, name: 'Taxi', amount: 20, category: 'Transport' },
    { id: 3, name: 'Movie', amount: 15, category: 'Entertainment' },
    { id: 4, name: 'Dinner', amount: 40, category: 'Food' },
    { id: 5, name: 'Bus Ticket', amount: 10, category: 'Transport' },
    { id: 6, name: 'Concert', amount: 30, category: 'Entertainment' },
  ];

  filteredExpenses = [...this.expenses]; // To hold filtered expenses
  searchQuery = ''; // For the search query
  selectedCategory = ''; // For category filter

  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  // Getter for calculating spent amount
  get spentAmount(): number {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  // Getter for calculating progress percentage
  get progressPercentage(): number {
    return Math.min((this.spentAmount / this.budget) * 100, 100);
  }
  get remainingBudget(): number {
    return this.budget - this.spentAmount;
  }


  ngOnInit() {
    this.fetchExpenses(); 
  }

  fetchExpenses() {
    this.expenseService.getExpenses().subscribe(
      (data) => {
        this.expenses = data;
        this.filteredExpenses = [...this.expenses]; // Initialize filteredExpenses
        if(this.remainingBudget <= 0){
          this.notifyUser("boubkeraouabe@gmail.com")
        }
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  filterExpenses() {
    this.filteredExpenses = this.expenses.filter((expense) => {
      const matchesSearch = expense.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesCategory =
        this.selectedCategory === '' || expense.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  UpdateExpense(expense: any) {
    this.expenseService.setExpense(expense);
    this.router.navigate(['/add-expense']); // Redirect to AddExpenseComponent
  }

  notifyUser(email:string){
    this.expenseService.sendNotification(email)
  }
}
