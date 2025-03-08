import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from '../../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-book-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-book-page.component.html',
  styleUrls: ['./create-book-page.component.css'],
})
export class CreateBookPageComponent {
  bookForm: FormGroup;

  constructor(private booksService: BooksService, private router: Router) {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
      author: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBook = this.bookForm.value;
      this.booksService.createBook(newBook).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error creating book:', err)
      });
    }
  }
}