import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book = {};
  id:number = -1;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
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

}
