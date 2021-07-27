import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {
  book: Book = {};
  id:number = -1;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.getBook(this.id);
    });
  }

  ngOnInit(): void {
  }
  getBook(id: number) {
    this.bookService.findById(id).subscribe(book => {
      this.book = book
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteCustomer(id).subscribe(() => {
      this.router.navigate(['/books']);
    }, e => {
      console.log(e);
    });
  }

}
