import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      { id: 1, desc: 'Faire la vaisselle', isCompleted: false },
      { id: 2, desc: `Faire l'épicerie`, isCompleted: false },
      { id: 3, desc: 'Faire le ménage', isCompleted: false },
      { id: 4, desc: 'Mettre les poubelles au chemin', isCompleted: false },
    ];
    return { todos };
  }
}
