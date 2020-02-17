import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TodosService} from '@app/todos/services/todos.service';
import {ITodo} from '@app/todos/interfaces';
import {FILTER_MODES} from '@app/todos/constants/filter-modes';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './todos-footer.component.html',
  styleUrls: ['./todos-footer.component.scss']
})
export class TodosFooterComponent implements OnInit {

  public todos$$: ITodo[];
  public filterModes: FILTER_MODES[] = ['All', 'Active', 'Completed'];
  public selectedFilter = 'All';
  @Output() emitTodos = new EventEmitter<ITodo[]>();

  public todosCompleted: number;
  public todosRemanining: string;

  constructor(private todosService: TodosService) {
  }

  ngOnInit() {
    this.todosService.AllTodos.subscribe(data => {
      this.todos$$ = data;
      this.filterTodos();
      this.todosCompleted = this.todos$$.filter(todo => todo['completed']).length;
      this.todosRemanining = `${this.todos$$.length - this.todosCompleted} items left`;
    });
  }

  public clear() {
    this.todosService.clearCompleted();
  }

  public selecteFilterType(filterType: FILTER_MODES): void {
    this.selectedFilter = filterType;
    this.todosService.changeFilterMode(filterType);
  }

  private filterTodos(): void {
    if (this.selectedFilter === 'Active') {
      this.todos$$ = this.todos$$.filter(todo => !todo['completed']);
    } else if (this.selectedFilter === 'Completed') {
      this.todos$$ = this.todos$$.filter(todo => todo['completed']);
    }
    this.emitTodos.emit(this.todos$$);
  }

}
