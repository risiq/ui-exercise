import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../task.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [
    FormsModule
  ],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  readonly taskService = inject(TaskService);
  readonly router = inject(Router);

  tasks = this.taskService.getTasks();
  filter: 'all' | 'todo' | 'done' = 'all';

  get filteredTasks() {
    return this.filter === 'all' ? this.tasks : this.tasks.filter(t => t.status === this.filter);
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  edit(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
