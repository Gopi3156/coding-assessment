import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {TodosWrapperComponent} from './todos-wrapper.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TodosService} from '@app/todos/services/todos.service';
import {ITodo} from '@app/todos/interfaces';
import {BehaviorSubject} from 'rxjs';
import {addTodo} from '@app/todos/state/todo.actions';

describe('TodosWrapperComponent', () => {
  let injector;
  let service: TodosService;
  let component: TodosWrapperComponent;
  let fixture: ComponentFixture<TodosWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosWrapperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [TodosService]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(TodosWrapperComponent);
      component = fixture.componentInstance;
      injector = getTestBed();
      service = injector.get(TodosService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('AllTodos should return all the todos', () => {
    service.AllTodos.subscribe(data => expect(data).toEqual([]));
    service['todoStore'] = [];
    service['todos$'] = new BehaviorSubject<ITodo[]>([]);
    service.addTodo('first');
    service.addTodo('second');
    service.AllTodos.subscribe(data => expect(data.length === 2));
    service.AllTodos.subscribe(data => expect(data).toEqual([{text: 'first'}, {text: 'second'}]));
  });

  it('add todo using addTodo function by sending empty value from input', () => {
    spyOn(service, 'addTodo').and.returnValue(null);
    const input = {'target': {'value': ''}};
    component.addTodo(input);
    expect(service.addTodo).not.toHaveBeenCalled();
  });

  it('add todo using addTodo function by sending a random string', () => {
    spyOn(service, 'addTodo').and.returnValue(null);
    const input = {'target': {'value': 'my first todo'}};
    component.addTodo(input);
    expect(service.addTodo).toHaveBeenCalled();
  });

  it('add todo using addTodo function and show footer and nullify the value after todo is added', () => {
    component.showFooter = false;
    spyOn(service, 'addTodo').and.returnValue(null);
    const input = {'target': {'value': 'my first todo'}};
    component.addTodo(input);
    expect(service.addTodo).toHaveBeenCalled();
    expect(component.showFooter).toEqual(true);
    expect(input.target.value).toEqual(null);
    expect(input.target.value).not.toEqual('my first todo');
  });

});
