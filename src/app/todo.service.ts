import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { MessageService } from './message.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, tap, filter, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>(this._todos);
  todos = this.todosSubject.asObservable();
  filtervalue: string = '';

  static count = 0;

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }

  private todosUrl = 'api/todos';
  private serverUrl = 'http://localhost:3000/todos';

  getTodos(): Observable<Todo[]> {
    this.messageService.add('TodoService: fetching todos');
    return this.http.get<Todo[]>(this.serverUrl).pipe(
      tap((todos) => {
        this.log('fetched todos');
        this._todos = todos;
        TodoService.count = this._todos.length;
        this.todosSubject.next(this._todos);
      }),
      catchError((e)=>this.handleError(e))
    );
  }

  addTodo(todoDesc: string): Observable<Todo> {
    let todo: Todo = {
      order: ++TodoService.count,
      desc: todoDesc,
    };
    return this.http.post<Todo>(this.serverUrl, todo, this.httpOptions).pipe(
      tap(() => {
        this.log(`added todo with order=${todo.order}`);
      }),
      catchError((e) => this.handleError(e))
    );
  }

  deleteTodo(id: string): Observable<unknown> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete(url, this.httpOptions).pipe(
      map(() => {
        this.log(`deleted todo id=${id}`);
        return id;
      }),
      catchError((e) => this.handleError(e))
    );
  }

  completeTodo(id: string, value: boolean): Observable<string> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.patch(url, { isCompleted: value }, this.httpOptions).pipe(
      map((_) => {
        this.log(`Completed todo id=${id}`);
        return id;
      }),
      catchError((e) => this.handleError(e))
    );
  }

  filterTodos(value: string) {
    this.filtervalue = value;
    this.executeFilterTodos();
  }

  executeFilterTodos() {
    if (this.filtervalue === 'completed') {
      this.messageService.add(
        'TodoService: filtering todos: ' + this.filtervalue
      );
      this.http
        .get<Todo[]>(this.todosUrl)
        .pipe(
          map((todos) => todos.filter((todo) => todo.isCompleted === true)),
          tap((todos) => {
            this.log('filtered todos');
            this._todos = todos;
            this.todosSubject.next(this._todos);
          }),
          catchError((e) => this.handleError(e))
        )
        .subscribe();
    } else if (this.filtervalue === 'uncompleted') {
      this.messageService.add(
        'TodoService: filtering todos: ' + this.filtervalue
      );
      this.http
        .get<Todo[]>(this.todosUrl)
        .pipe(
          map((todos) => todos.filter((todo) => todo.isCompleted === false)),
          tap((todos) => {
            this.log('filtered todos');
            this._todos = todos;
            this.todosSubject.next(this._todos);
          }),
          catchError((e) => this.handleError(e))
        )
        .subscribe();
    } else {
      this.messageService.add('TodoService: filtering todos: All');
      this.http
        .get<Todo[]>(this.todosUrl)
        .pipe(
          tap((todos) => {
            this.log('filtered todos');
            this._todos = todos;
            TodoService.count = this._todos.length;
            this.todosSubject.next(this._todos);
          }),
          catchError((e) => this.handleError(e))
        )
        .subscribe();
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      //Client side error
      console.error(error.error);
    } else {
      //server side error
      console.error(
        `Server error status: ${error.status}. Error message:  ${error.error}`
      );
    }
    this.dialog.open(ErrorMessageDialogComponent, {
      data: {errorStatus: error.status, errorError: error.error}
    });
    return throwError('Your request did not work, please try again');
  }
}
