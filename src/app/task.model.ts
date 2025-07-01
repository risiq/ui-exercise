export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'done';
  dueDate?: string;
}
