import {getTestBed, TestBed} from '@angular/core/testing';

import {TodosService} from '@app/todos/services/todos.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ITodo} from '@app/todos/interfaces';
import {FILTER_MODES} from '@app/todos/constants/filter-modes';

describe('TodosService', () => {
  let injector;
  let service: TodosService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    });
    injector = getTestBed();
    service = injector.get(TodosService);
    httpMock = injector.get(HttpClientTestingModule);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing AllTodos are returning the todos correctly', () => {
    service['todoStore'] = [];
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    const todo: ITodo[] = [{'text': 'testing all todos'}];
    service.AllTodos.subscribe(data => expect(data).toEqual([]));
    service['todos$'] = new BehaviorSubject<ITodo[]>(todo);
    service.AllTodos.subscribe(data => expect(data).toEqual(todo));
  });

  it('Verifying the todos are succesfully added to todoStore by calling addTodo method', () => {
    service['todoStore'] = [];
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    const mockTodo: ITodo[] = [{text: 'hello'}];
    service.addTodo('hello');
    expect(service['todoStore'].length).toBeGreaterThan(0);
    expect(service['todoStore']).toEqual(mockTodo);
    expect(service['todoStore']).not.toEqual([{text: 'hello world'}]);
    service['todos$'].subscribe(data => expect(data).toEqual(mockTodo));
  });

  it('clearCompleted should clear all the completed todos', () => {
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    service['todoStore'] = [{text: 'first', completed: false}, {text: 'second', completed: true}];
    service.clearCompleted();
    service.AllTodos.subscribe(data => expect(data.length === 1 ));
    service.AllTodos.subscribe(data => expect(data).toEqual([{text: 'first', completed: false}]));
    service.AllTodos.subscribe(data => expect(data).not.toEqual([{text: 'second', completed: true}]));
  });

  it('deleteTodo should clear all the completed todos', () => {
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    service['todoStore'] = [{text: 'first', completed: false}, {text: 'second', completed: true}];
    service.deleteTodo(1);
    service.AllTodos.subscribe(data => expect(data.length === 1 ));
    service.AllTodos.subscribe(data => expect(data).toEqual([{text: 'first', completed: false}]));
  });

  it('changeFilterMode should trigger one of the Filter Type Completed', () => {
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    service['todoStore'] = [{text: 'first', completed: false}, {text: 'second', completed: true}];
    const filterType: FILTER_MODES = 'Completed';
    service.changeFilterMode(filterType);
    service.AllTodos.subscribe(data => expect(data.length === 2 ));
  });

  it('toggleAllCompleted should toggle the completed flag', () => {
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    service['todoStore'] = [{text: 'first', completed: true}, {text: 'second', completed: true}];
    service.toggle = false;
    service.toggleAllCompleted();
    service.AllTodos.subscribe(data => expect(data.length === 2 ));
    service.AllTodos.subscribe(data => expect(data[0].completed).toEqual(true));
    service.AllTodos.subscribe(data => expect(data[1].completed).toEqual(true));
  });


});
