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

  public showFooter = false;

  constructor(private todoService: TodosService) {
  }

  ngOnInit() {
    this.todoService.AllTodos.subscribe(data => {
      this.todos$ = data;
      if (this.todos$.length === 0) {
        this.showFooter = false;
      }
    });
  }

  public addTodo(event): void {
    const text = event.target.value;
    if (text.trim().length === 0) {
      return;
    }
    this.todoService.addTodo(text);
    this.showFooter = true;
    event.target.value = null;
  }

  public updateToDos(event): void {
    this.todos$ = event;
  }

}
