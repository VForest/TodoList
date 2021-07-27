import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app-state';
import * as TodoActions from '../todo.actions';
import { FilterEnum } from '../filter-enum';
import * as fromTodo from '../todo.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  selected = FilterEnum.ALL;
  filterEnum = FilterEnum;
  destroy = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .pipe(select(fromTodo.selectFilter), takeUntil(this.destroy))
      .subscribe((filter) => {
        this.selected = filter;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  add(todoDesc: string): void {
    todoDesc = todoDesc.trim();
    if (!todoDesc) {
      return;
    }
    this.store.dispatch(TodoActions.addTodo({ desc: todoDesc }));
  }

  filterTodos(value: FilterEnum): void {
    this.store.dispatch(TodoActions.setFilter({ filter: value }));
  }
}
