import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from './app-state';
import { Todo } from './todo';
import * as TodoActions from './todo.actions';

let idCounter = 4;

export const initialState: Todo[] = [
  { id: 1, desc: 'Faire la vaisselle', isCompleted: false },
  { id: 2, desc: `Faire l'épicerie`, isCompleted: false },
  { id: 3, desc: 'Faire le ménage', isCompleted: false },
  { id: 4, desc: 'Mettre les poubelles au chemin', isCompleted: false },
];

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { desc }) => [
    ...state,
    { id: ++idCounter, desc, isCompleted: false },
  ]),
  on(TodoActions.deleteTodo, (state, { id }) =>
    state.filter((todo) => todo.id != id)
  )
);

export function reducer(state: Todo[] | undefined, action: Action) {
  return todoReducer(state, action);
}

export const selectTodos = createSelector(
  (state: AppState) => state.todos,
  (todos: Todo[]) => todos
);
