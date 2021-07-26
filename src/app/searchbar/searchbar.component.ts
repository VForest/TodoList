import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import * as fromTodo from '../todo.reducer';
import * as TodoActions from '../todo.actions';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(private todoService: TodoService, private store: Store<AppState>) {}

  ngOnInit(): void {}

  selected = '';

  add(todoDesc: string): void {
    todoDesc = todoDesc.trim();
    if (!todoDesc) {
      return;
    }
    this.todoService.addTodo(todoDesc).subscribe();
  }

  filterTodos(value: string): void {
    this.todoService.filterTodos(value);
  }
}
