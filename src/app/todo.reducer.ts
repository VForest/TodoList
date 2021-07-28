import { state } from '@angular/animations';
import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from './app-state';
import { FilterEnum } from './filter-enum';
import { Todo } from './todo';
import * as TodoActions from './todo.actions';
import {v4 as uuid} from 'uuid';

let orderCounter = 4;

export interface TodoState {
  todos: Todo[];
  filter: FilterEnum;
}

export const initialState: TodoState = {
  todos: [
    { id: uuid(), order: 1, desc: 'Faire la vaisselle', isCompleted: false },
    { id: uuid(), order: 2, desc: `Faire l'épicerie`, isCompleted: false },
    { id: uuid(), order: 3, desc: 'Faire le ménage', isCompleted: false },
    { id: uuid(), order: 4, desc: 'Mettre les poubelles au chemin', isCompleted: false },
  ],
  filter: FilterEnum.ALL,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { desc }) => {
    return {
      ...state,
      todos: [...state.todos, { id: uuid(), order: ++orderCounter, desc, isCompleted: false }],
    };
  }),
  on(TodoActions.deleteTodo, (state, { id }) => {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id != id),
    };
  }),
  on(TodoActions.completeTodo, (state, { id }) => {
    let todoToModify = state.todos.find((todo) => todo.id === id);
    if (todoToModify) {
      let objModifier = { ...todoToModify };
      objModifier.isCompleted = !objModifier.isCompleted;
      let newTodos = [...state.todos];
      newTodos[state.todos.indexOf(todoToModify)] = objModifier;
      return {
        ...state,
        todos: newTodos,
      };
    }
    return state;
  }),
  on(TodoActions.setFilter, (state, { filter }) => {
    return {
      ...state,
      filter
    }
  })
);

export function reducer(state: TodoState | undefined, action: Action) {
  return todoReducer(state, action);
}

export const selectTodos = createSelector(
  (state: AppState) => state.todos.todos,
  (todos: Todo[]) => todos
);

export const selectFilter = createSelector(
  (state: AppState) => state.todos.filter,
  (filter: FilterEnum) => filter
);

export const filterTodos = createSelector(
  selectTodos,
  selectFilter,
  (todos: Todo[], filter: FilterEnum) => {
    switch (filter) {
      case FilterEnum.COMPLETE:
        return todos.filter((todo) => todo.isCompleted);
      case FilterEnum.INCOMPLETE:
        return todos.filter((todo) => !todo.isCompleted);
      default:
        return todos;
    }
  }
);
