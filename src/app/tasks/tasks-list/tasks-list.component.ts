import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TasksListComponent {
  @Input() taskList: any[] = []
  @Output() editTask: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  isDeletePopUpShow: boolean = false;
  selectedTask: any = {};
  
  constructor(private taskService: TaskService) { }

  showDeleteTaskNotification(event: any): void {
    if (event) {
      let index = this.taskList.findIndex(item => item.id === event);
      if (index !== -1) {
        this.selectedTask = this.taskList[index];
        this.isDeletePopUpShow = true;
      }
    }
  }

  deleteTask() {
    let index = this.taskList.findIndex(item => item.id === this.selectedTask.id);
    if (index !== -1) {
      this.taskService.deleteTask(index);
      this.selectedTask = {};
      this.isDeletePopUpShow = false;
      this.delete.emit();
    }
  }

  closeDeleteTaskNotification() {
    this.selectedTask = {};
    this.isDeletePopUpShow = false;
  }

  onEdit(event: any): void {
    this.editTask.emit(event);
  }

}
