import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { BudgetComponent } from './components/budget/budget.component';
import { NgModule } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'expenses', component: ExpenseListComponent},
    {path: 'add-expense', component: AddExpenseComponent},
    {path: 'budget', component: BudgetComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
  