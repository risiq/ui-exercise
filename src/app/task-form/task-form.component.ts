import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,
    MatButton
  ],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent {
  model: Omit<Task, 'id'> = { title: '', status: 'todo', dueDate: '' };
  editMode = false;
  taskId?: number;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const task = this.taskService.getTask(id);
    if (task) {
      this.model = { ...task };
      this.taskId = id;
      this.editMode = true;
    }
  }

  save() {
    if (this.editMode && this.taskId !== undefined) {
      this.taskService.updateTask(this.taskId, { ...this.model, id: this.taskId });
    } else {
      this.taskService.addTask(this.model);
    }
    this.router.navigate(['/']);
  }
}
