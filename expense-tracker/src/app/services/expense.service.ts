import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private selectedExpense: any = null;
  private notificationSent: boolean = false;

  setExpense(expense: any) {
    this.selectedExpense = expense;
  }

  getExpense() {
    return this.selectedExpense;
  }

  clearExpense() {
    this.selectedExpense = null;
  }

  private apiUrl = 'https://localhost:7245/api'; // Update this with your backend URL

  constructor(private http: HttpClient) {}

  getExpenses() {
    return this.http.get<any[]>(`${this.apiUrl}/expense`);
  }

  addExpense(expense: any) {
    return this.http.post(`${this.apiUrl}/expense`, expense);
  }

  updateExpense(expense: any) {
    return this.http.put(`${this.apiUrl}/expense/${expense.id}`, expense);
  }

  deleteExpense(id: number) {
    return this.http.delete(`${this.apiUrl}/expense/${id}`);
  }

  getTotalExpenses() {
    return this.http.get<number>(`${this.apiUrl}/expense/total`);
  }

  sendNotification(userEmail:string) {
    const payload = { email: userEmail};
  
    this.http.post(`${this.apiUrl}/notifications/send`, payload).subscribe({
      next: () => {
        console.log('Notification sent successfully.');
        this.notificationSent = true; // Prevent duplicate notifications
      },
      error: (err) => {
        console.error('Failed to send notification:', err);
      },
    });
  }
  
}
