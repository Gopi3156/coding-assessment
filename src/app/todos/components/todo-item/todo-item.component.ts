import {Component, Input} from '@angular/core';
import {TodosService} from '@app/todos/services/todos.service';
import {ITodo} from '@app/todos/interfaces';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  public isEditable = false;

  @Input() todo: ITodo;

  @Input() index: number;

  constructor(private todosService: TodosService) {
  }

  public completeTodo(id: number) {
    this.todosService.toggleComplete(id);
    this.todosService.AllTodos.subscribe(data => console.log(data));
  }

  public editTodo() {
    this.isEditable = true;
  }

  public DeleteTodo(id: number) {
    this.todosService.deleteTodo(id);
    this.todosService.AllTodos.subscribe(data => console.log(data));
  }

  public updateTodo(id: number) {
  }

}
