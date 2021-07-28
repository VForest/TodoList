import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo';
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos: Todo[] = [
      { id: uuid(), order: 1, desc: 'Faire la vaisselle', isCompleted: false },
      { id: uuid(), order: 2, desc: `Faire l'épicerie`, isCompleted: false },
      { id: uuid(), order: 3, desc: 'Faire le ménage', isCompleted: false },
      { id: uuid(), order: 4, desc: 'Mettre les poubelles au chemin', isCompleted: false },
    ];
    return { todos };
  }
}
