import {Component, OnInit} from '@angular/core';
import {ITodo} from '@app/todos/interfaces';
import {TodosService} from '@app/todos/services/todos.service';

@Component({
  selector: 'app-todos-wrapper',
  templateUrl: './todos-wrapper.component.html',
  styleUrls: ['./todos-wrapper.component.scss']
})
export class TodosWrapperComponent implements OnInit {

  public todos$: ITodo[];

  constructor(private todoService: TodosService) {
  }

  ngOnInit() {
    this.todoService.AllTodos.subscribe(data => {
      this.todos$ = data;
    });
  }

  public addTodo(event): void {
    const text = event.target.value;
    if (text.trim().length === 0) {
      return;
    }
    this.todoService.addTodo(text);
    event.target.value = null;
  }

  public updateToDos(event): void {
    this.todos$ = event;
  }

}
