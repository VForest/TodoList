import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from '../message.service';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import * as fromTodo from '../todo.reducer';
import { AppState } from '../app-state';
import * as TodoActions from '../todo.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  selectedTodo?: Todo;

  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(fromTodo.selectTodos).subscribe((todos) => {
      this.todos = todos;
    });
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    this.messageService.add(`TodosComponent: Selected todo id=${todo.id}`);
  }

  delete(todo: Todo): void {
    this.messageService.add(`TodoService: deleting todo id=${todo.id}`);
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  complete(todo: Todo): void {
    this.messageService.add(`TodoService: completing todo id=${todo.id}`);
    this.todoService
      .completeTodo(todo)
      .subscribe(() => this.todoService.executeFilterTodos());
  }
}
