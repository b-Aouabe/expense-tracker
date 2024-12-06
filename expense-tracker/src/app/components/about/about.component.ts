import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// interface Informations{
//   name: string,
//   email: string,
//   tel: string
// }
// interface Comment {
//   message: string,
//   date: Date
// }

@Component({
  selector: 'app-about',
  imports: [FormsModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent {
  title = 'About Us';
  description = 'We are dedicated to helping you track your expenses and stay on budget.';

  // infos: Informations = {
  //   name: "Boubker AOUABE",
  //   email: "boubkeraouabe@gmail.com",
  //   tel: "0123456789"
  // }
  // comments: Comment[] = []
  // comment: string = ""

  // addComment(){
  //   if(this.comment != ""){
  //     // this.comment.date = new Date()
  //     this.comments.push({message: this.comment, date: new Date()})
  //     this.comment = ""
  //   }
  // }

  // ngOnInit(): void {
    
  // }

}