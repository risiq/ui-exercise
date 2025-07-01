import {Injectable} from '@angular/core';
import {Task} from './task.model';

@Injectable({providedIn: 'root'})
export class TaskService {
  private tasks: Task[] = [{
    "title": "Wäsche machen",
    "status": "todo",
    "dueDate": "2025-07-03",
    "id": 1
  }, {"title": "Mit dem Hund spazieren", "status": "todo", "dueDate": "2025-07-04", "id": 2}, {
    "title": "Rasen mähen",
    "status": "todo",
    "dueDate": "2025-07-05",
    "id": 3
  },
    {"title": "Auto zur Werkstatt bringen", "status": "todo", "dueDate": "2025-07-09", "id": 4}];
  private nextId = 1;

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Omit<Task, 'id'>): void {
    this.tasks.push({...task, id: this.nextId++});
  }

  updateTask(id: number, updated: Task): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) this.tasks[index] = updated;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }
}
