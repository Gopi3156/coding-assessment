import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {ITodo} from '../interfaces';
import {ITodosState} from '../state/todos.reducer';
import {FILTER_MODES} from '../constants/filter-modes';
import * as TodoActions from '../state/todo.actions';
import * as todoSelectors from '../state/todo.selectors';

@Injectable()
export class TodosService {

  allTodos$: Observable<ITodo[]>;
  private todos$ = new BehaviorSubject<ITodo[]>([]); // Initialize with empty todo array.
  private todoStore: ITodo[] = []; // store our todos in memory.
  todos = this.todos$.asObservable();

  constructor(private store: Store<ITodosState>) {
    this.allTodos$ = this.store.select(todoSelectors.allTodos);
  }

  addTodo(text: string): void {
    this.todoStore.push({text});
    this.todos$.next([...this.todoStore]);
  }

  get AllTodos(): Observable<ITodo[]> {
    return this.todos$.asObservable();
  }

  removeTodo(index: number): void {
    this.store.dispatch(TodoActions.removeTodo({index}));
  }

  toggleComplete(index: number): void {
    if (this.todoStore[index] ['completed']) {
      this.todoStore[index] ['completed'] = false;
    } else {
      this.todoStore[index] ['completed'] = true;
    }
    this.todos$.next(this.todoStore);
    // this.store.dispatch(TodoActions.toggleCompleted({index}));
  }

  toggleAllCompleted(): void {
    this.store.dispatch(TodoActions.toggleAllCompleted());
  }

  updateTodo(index: number, text: string): void {
    this.store.dispatch(TodoActions.updateTodo({index, text}));
  }

  changeFilterMode(mode: FILTER_MODES): void {
    this.todos$.next(this.todoStore);
    // this.store.dispatch(TodoActions.changeFilterMode({mode}));
  }

  deleteTodo(id: number): void {
    this.todoStore.splice(id, 1);
    this.todos$.next(this.todoStore);
  }

  clearCompleted(): void {
    this.todoStore = this.todoStore.filter(todo => !todo['completed']);
    this.todos$.next([...this.todoStore]);
    // this.store.dispatch(TodoActions.clearCompleted());
  }
}
