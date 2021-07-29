import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from './app-state';
import { FilterEnum } from './filter-enum';
import { Todo } from './todo';
import * as TodoActions from './todo.actions';

let orderCounter = 4;

export interface TodoState {
  todos: Todo[];
  filter: FilterEnum;
}

export const initialState: TodoState = {
  todos: [],
  filter: FilterEnum.ALL,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.getTodosSuccess, (state, { todos }) => {
    return {
      ...state,
      todos: todos,
    };
  }),
  on(TodoActions.addTodoSuccess, (state, { todo }) => {
    return {
      ...state,
      todos: [...state.todos, todo],
    };
  }),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => {
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    };
  }),
  on(TodoActions.completeTodoSuccess, (state, { id }) => {
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
      filter,
    };
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
