import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  selectedTodo?: Todo;

  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.todoService.todos.subscribe((todos) => (this.todos = todos));
  }

  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
    this.messageService.add(`TodosComponent: Selected todo id=${todo.id}`);
  }

  delete(todo: Todo): void {
    this.messageService.add(`TodoService: deleting todo id=${todo.id}`);
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  complete(todo: Todo): void {
    this.messageService.add(`TodoService: completing todo id=${todo.id}`);
    this.todoService
      .completeTodo(todo)
      .subscribe(() => this.todoService.executeFilterTodos());
  }
}
