import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MessageService } from '../message.service';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import * as fromTodo from '../todo.reducer';
import { AppState } from '../app-state';
import * as TodoActions from '../todo.actions';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  selectedTodo?: Todo;
  destroy = new Subject();

  todos: Todo[] = [];

  constructor(
    private messageService: MessageService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(fromTodo.filterTodos), takeUntil(this.destroy))
      .subscribe((todos) => {
        this.todos = todos;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    this.messageService.add(`TodosComponent: Selected todo id=${todo.id}`);
  }

  delete(todo: Todo): void {
    this.messageService.add(`TodoService: deleting todo id=${todo.id}`);
    this.store.dispatch(TodoActions.deleteTodo({ id: todo.id }));
  }

  complete(todo: Todo): void {
    this.messageService.add(`TodoService: completing todo id=${todo.id}`);
    this.store.dispatch(TodoActions.completeTodo({ id: todo.id }));
  }
}
