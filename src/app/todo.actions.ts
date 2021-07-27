import { createAction, props } from '@ngrx/store';
import { FilterEnum } from './filter-enum';

export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ desc: string }>()
);

export const deleteTodo = createAction(
  '[Todo] Delete Todo',
  props<{ id: number }>()
);

export const completeTodo = createAction(
  '[Todo] Complete Todo',
  props<{ id: number }>()
);

export const setFilter = createAction(
  '[Filter] Set filter',
  props<{ filter: FilterEnum}>()
)
