import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MessageService } from '../message.service';
import { Todo } from '../todo';
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
    this.store.dispatch(TodoActions.getTodos());
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
    this.messageService.add(
      `TodosComponent: Selected todo with order=${this.todos.indexOf(todo) + 1}`
    );
  }

  delete(todo: Todo): void {
    this.messageService.add(
      `TodoService: Deleting todo with order=${this.todos.indexOf(todo) + 1}`
    );
    this.store.dispatch(
      TodoActions.deleteTodo({
        id: todo.id || '',
        order: this.todos.indexOf(todo) + 1,
      })
    );
  }

  complete(todo: Todo): void {
    if (todo.isCompleted) {
      this.messageService.add(
        `TodoService: Resetting to uncomplete todo with order=${
          this.todos.indexOf(todo) + 1
        }`
      );
    } else {
      this.messageService.add(
        `TodoService: Completing todo with order=${
          this.todos.indexOf(todo) + 1
        }`
      );
    }

    this.store.dispatch(
      TodoActions.completeTodo({
        id: todo.id || '',
        value: !todo.isCompleted,
        order: this.todos.indexOf(todo) + 1,
      })
    );
  }
}
