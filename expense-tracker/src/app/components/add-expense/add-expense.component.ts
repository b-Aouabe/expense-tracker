import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ExpenseService } from '../../services/expense.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule
  ],
})
export class AddExpenseComponent implements OnInit{
  isEditMode = false;
  expenseForm: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router) {
    this.expenseForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const selectedExpense = this.expenseService.getExpense();
    if (selectedExpense) {
      this.isEditMode = true;
      this.expenseForm.patchValue(selectedExpense); // Pre-fill form
    }
  }
  get name() {
    return this.expenseForm.get('name');
  }

  get amount() {
    return this.expenseForm.get('amount');
  }

  get category() {
    return this.expenseForm.get('category');
  }

  onSubmit() {
    console.log('Expense Added:', this.expenseForm.value);
    if (this.expenseForm.valid) {
      if (this.isEditMode) {
        // Update existing expense
        const updatedExpense = {
          ...this.expenseForm.value,
          id: this.expenseService.getExpense().id,
        };
        this.expenseService.updateExpense(updatedExpense).subscribe(
          () => {
            console.log('Expense updated successfully');
            this.expenseService.clearExpense(); // Clear state
            this.router.navigate(['/expenses']); // Navigate back to the list
          },
          (error) => {
            console.error('Error updating expense:', error);
          }
        );
      } else {
        this.expenseService.addExpense(this.expenseForm.value).subscribe(
          (response) => {
            console.log('Expense Added:', response);
            this.expenseForm.reset(); // Reset form after successful submission
            this.router.navigate(['/expenses']); // Navigate back to the list
          },
          (error) => {
            console.error('Error adding expense:', error);
          }
        );
      }
    }
  }
}


