import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ITodo} from '../interfaces';
import {FILTER_MODES} from '../constants/filter-modes';

@Injectable()
export class TodosService {

  private todos$ = new BehaviorSubject<ITodo[]>([]); // Initialize with empty todo array.
  private todoStore: ITodo[] = []; // store our todos in memory.
  todos = this.todos$.asObservable();
  public toggle = false;

  constructor() {}

  addTodo(text: string): void {
    this.todoStore.push({text});
    this.todos$.next([...this.todoStore]);
  }

  get AllTodos(): Observable<ITodo[]> {
    return this.todos$.asObservable();
  }

  removeTodo(index: number): void {
  }

  toggleComplete(index: number): void {
    this.todoStore[index] ['completed'] = !this.todoStore[index] ['completed'];
    this.todos$.next(this.todoStore);
  }

  toggleAllCompleted(): void {
    this.toggle = !this.toggle;
    this.todoStore.forEach(todo => {
      todo['completed'] = this.toggle;
    });
    this.todos$.next(this.todoStore);
  }

  updateTodo(index: number, text: string): void {
  }

  changeFilterMode(mode: FILTER_MODES): void {
    this.todos$.next(this.todoStore);
  }

  deleteTodo(id: number): void {
    this.todoStore.splice(id, 1);
    this.todos$.next(this.todoStore);
  }

  clearCompleted(): void {
    this.todoStore = this.todoStore.filter(todo => !todo['completed']);
    this.todos$.next([...this.todoStore]);
  }
}
