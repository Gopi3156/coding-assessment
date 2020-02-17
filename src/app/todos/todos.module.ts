import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {CompleteAllComponent} from './components/complete-all/complete-all.component';
import {TodosListComponent} from './components/todo-list/todo-list.component';
import {TodosService} from './services/todos.service';
import {todosReducer} from './state/todos.reducer';
import {TodosWrapperComponent} from './components/todos-wrapper/todos-wrapper.component';
import {TodosFooterComponent} from './components/todos-footer/todos-footer.component';
import {TodoItemComponent} from './components/todo-item/todo-item.component';

const DECLARATIONS = [
  CompleteAllComponent,
  TodosListComponent,
  TodosWrapperComponent,
  TodosFooterComponent,
  TodoItemComponent
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  exports: [
    ...DECLARATIONS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('todos', todosReducer),
  ],
  providers: [
    TodosService,
  ],
})
export class TodosModule {}
