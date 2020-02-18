import {Component, Input} from '@angular/core';
import {TodosService} from '@app/todos/services/todos.service';
import {ITodo} from '@app/todos/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input() todo: ITodo;

  @Input() index: number;

  public editing = false;

  public sub: Subscription;

  constructor(private todosService: TodosService) {
  }

  public completeTodo(id: number) {
    this.todosService.toggleComplete(id);
    this.updateDOM();
  }

  public editTodo() {
    this.editing = true;
  }

  public DeleteTodo(id: number) {
    this.todosService.deleteTodo(id);
    this.updateDOM();
  }

  private updateDOM(): void {
    this.sub = this.todosService.AllTodos.subscribe();
  }

  public onBlur() {
    this.editing = false;
  }

}
