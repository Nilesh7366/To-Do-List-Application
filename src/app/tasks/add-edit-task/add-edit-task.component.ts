import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css'
})

export class AddEditTaskComponent implements OnInit {
  @Input() selectedTask: any = {};
  @Output() saveTask: EventEmitter<string> = new EventEmitter<string>();

  assignedTo: string = '';
  status: string = '';
  dueDate: string = '';
  priority: string = '';
  description: string = ''
  isDeletePopUpShow: boolean = false;

  constructor(protected taskService: TaskService) { }

  ngOnInit(): void {
    if (this.selectedTask.id) {
      this.assignedTo = this.selectedTask.assignedTo;
      this.status = this.selectedTask.status;
      this.dueDate = this.selectedTask.dueDate;
      this.priority = this.selectedTask.priority;
      this.description = this.selectedTask.description;
    }
  }

  close(): void {
    this.taskService.isVisible = false;
  }

  generateUniqueId() {
    const timestamp = Date.now();
    return `task-${timestamp}`;
  }

  onSubmit() {
    const saveTaskObj = {
      id: this.generateUniqueId(),
      assignedTo: this.assignedTo,
      status: this.status,
      dueDate: this.dueDate,
      priority: this.priority,
      description: this.description
    }
    if (this.selectedTask.id) {
      let index = this.taskService.taskList.findIndex(item => item.id === this.selectedTask.id)
      saveTaskObj.id = this.selectedTask.id;
      this.taskService.saveUpdateTask(saveTaskObj, false, index);
    } else {
      this.taskService.saveUpdateTask(saveTaskObj, true, 0);
    }
    this.saveTask.emit();
    this.taskService.isVisible = false;
  }
  
}
