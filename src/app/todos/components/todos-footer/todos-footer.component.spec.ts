import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {TodosFooterComponent} from './todos-footer.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TodosService} from '@app/todos/services/todos.service';

describe('TodosFooterComponent', () => {
  let component: TodosFooterComponent;
  let fixture: ComponentFixture<TodosFooterComponent>;
  let injector;
  let service: TodosService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodosFooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [TodosService]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(TodosFooterComponent);
      component = fixture.componentInstance;
      injector = getTestBed();
      service = injector.get(TodosService);
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('testing onInit Function by testing the inner function', () => {
    component.selectedFilter = 'All';
    component.ngOnInit();
    service.addTodo('frist');
    service.addTodo('second');
    service.toggleAllCompleted();
    service.AllTodos.subscribe(data => {
      expect(component.todosCompleted).toEqual(2);
      expect(component.todosRemanining).toEqual('0 items left');
    });
  });

});
