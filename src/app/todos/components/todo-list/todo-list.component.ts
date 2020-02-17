import {Component, Input} from '@angular/core';
import {ITodo} from '@app/todos/interfaces';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {

  @Input() todos: ITodo[];
}
