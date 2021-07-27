import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(),
    author: new FormControl(),
    description: new FormControl()
  });
  id: number = -1;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.getBook(this.id);
    });
  }

  ngOnInit() {
  }

  getBook(id: number) {
    this.bookService.findById(id).subscribe(book => {
      this.bookForm = new FormGroup({
        id: new FormControl(id),
        title: new FormControl(book.title),
        author: new FormControl(book.author),
        description: new FormControl(book.description)
      });
    });
  }

  updateBook(id: number) {
    const book = this.bookForm.value;
    this.bookService.updateBook(id,book).subscribe(() => {
      alert('Update Succesful');
    }, e => {
      console.log(e);
    });
  }
}
