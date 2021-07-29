import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { TodoService } from './todo.service';
import * as todoActions from './todo.actions';

@Injectable()
export class TodoEffects {
  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.TodoActions.getTodos),
      switchMap(() => {
        return this.todoService.getTodos();
      }),
      map((todos) => todoActions.getTodosSuccess({ todos }))
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.TodoActions.addTodo),
      switchMap((action: { desc: string }) => {
        return this.todoService.addTodo(action.desc);
      }),
      map((todo) => todoActions.addTodoSuccess({ todo }))
    )
  );

  completeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.TodoActions.completeTodo),
      switchMap((action: { id: string, value: boolean }) => {
        return this.todoService.completeTodo(action.id, action.value);
      }),
      map((id) => todoActions.completeTodoSuccess({ id }))
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoActions.TodoActions.deleteTodo),
      switchMap((action: { id: string }) => {
        return this.todoService.deleteTodo(action.id);
      }),
      map((id) => todoActions.deleteTodoSuccess({ id: id as string }))
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
