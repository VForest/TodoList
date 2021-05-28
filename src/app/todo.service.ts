import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, filter } from 'rxjs/operators';

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
    private http: HttpClient
  ) {}

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }

  private todosUrl = 'api/todos';

  getTodos(): Observable<Todo[]> {
    this.messageService.add('TodoService: fetching todos');
    return this.http.get<Todo[]>(this.todosUrl).pipe(
      tap((todos) => {
        this.log('fetched todos');
        this._todos = todos;
        TodoService.count = this._todos.length;
        this.todosSubject.next(this._todos);
      }),
      catchError(this.handleError<Todo[]>('getTodos', []))
    );
  }

  addTodo(todoDesc: string): Observable<Todo> {
    TodoService.count++;
    let todo: Todo = {
      id: TodoService.count,
      desc: todoDesc,
      isCompleted: false,
    };
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap(() => {
        this.log(`added todo with id=${todo.id}`);
        this._todos = [...this._todos, todo];
        this.todosSubject.next(this._todos);
      }),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      tap((_) => {
        this.log(`deleted todo id=${id}`);
        this._todos = this._todos.filter((todo) => todo.id != id);
        this.todosSubject.next(this._todos);
      }),
      catchError(this.handleError<Todo>('deleteTodo'))
    );
  }

  completeTodo(todo: Todo): Observable<Todo> {
    todo.isCompleted = !todo.isCompleted;
    return this.http.put<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
      tap((_) => {
        this.log(`Completed todo id=${todo.id}`);
        this.todosSubject.next(this._todos);
      }),
      catchError(this.handleError<Todo>('completeTodo'))
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
          catchError(this.handleError<Todo[]>('filterTodos', []))
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
          catchError(this.handleError<Todo[]>('filterTodos', []))
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
          catchError(this.handleError<Todo[]>('filterTodos', []))
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
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
