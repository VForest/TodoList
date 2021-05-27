import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  selected = '';

  add(todoDesc: string): void {
    todoDesc = todoDesc.trim();
    if (!todoDesc) {
      return;
    }
    this.todoService.addTodo(todoDesc).subscribe();
  }

  filterTodos(value: string): void {
    this.todoService.filterTodos(value).subscribe();
  }
}
