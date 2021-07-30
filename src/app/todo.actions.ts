import { createAction, props } from '@ngrx/store';
import { FilterEnum } from './filter-enum';
import { Todo } from './todo';

export enum TodoActions {
  getTodos = '[Todo] Get Todos',
  getTodosSuccess = '[Todo] Get Todos Success',
  addTodo = '[Todo] Add Todo',
  addTodoSuccess = '[Todo] Add Todo Success',
  deleteTodo = '[Todo] Delete Todo',
  deleteTodoSuccess = '[Todo] Delete Todo Success',
  completeTodo = '[Todo] Complete Todo',
  completeTodoSuccess = '[Todo] Complete Todo Success',
  setFilter = '[Filter] Set filter',
}

export const getTodos = createAction(TodoActions.getTodos);

export const getTodosSuccess = createAction(
  TodoActions.getTodosSuccess,
  props<{ todos: Todo[] }>()
);

export const addTodo = createAction(
  TodoActions.addTodo,
  props<{ desc: string }>()
);

export const addTodoSuccess = createAction(
  TodoActions.addTodoSuccess,
  props<{ todo: Todo }>()
);

export const deleteTodo = createAction(
  TodoActions.deleteTodo,
  props<{ id: string; order: number }>()
);

export const deleteTodoSuccess = createAction(
  TodoActions.deleteTodoSuccess,
  props<{ id: string }>()
);

export const completeTodo = createAction(
  TodoActions.completeTodo,
  props<{ id: string; value: boolean; order: number }>()
);

export const completeTodoSuccess = createAction(
  TodoActions.completeTodoSuccess,
  props<{ id: string }>()
);

export const setFilter = createAction(
  TodoActions.setFilter,
  props<{ filter: FilterEnum }>()
);
