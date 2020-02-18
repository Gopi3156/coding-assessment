import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {TodoItemComponent} from './todo-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TodosService} from '@app/todos/services/todos.service';

fdescribe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let injector;
  let service: TodosService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [TodosService]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(TodoItemComponent);
      component = fixture.componentInstance;
      injector = getTestBed();
      service = injector.get(TodosService);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('completeTodo and make sure the dom is updated', () => {
    spyOn(service, 'toggleComplete').and.returnValue(null);
    component.completeTodo(0);
    expect(service.toggleComplete).toHaveBeenCalledWith(0);
    service.AllTodos.subscribe();
  });

  it('edit Todo and enable the todo to update and verifying blur event', () => {
    component.editTodo();
    expect(component.editing).toEqual(true);
    component.onBlur();
    expect(component.editing).toEqual(false);
  });
});
