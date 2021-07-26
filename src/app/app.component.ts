import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { BehaviorSubject } from 'rxjs';
import {InMemoryDataService} from './in-memory-data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Todo list';


  constructor(private todoService: TodoService) {}


  ngOnInit() {
    //this.todoService.getTodos().subscribe();

  }
}
