import { Component } from '@angular/core';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskService } from './task.service';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [TasksListComponent, AddEditTaskComponent, CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  taskList: any[] = [];
  searchTaskList: any[] = [];
  isVisible: boolean = true;
  selectedTask: any = {};
  isDeletePopUpShow: boolean = false;
  searchText: string = '';
  page: number = 0;
  
  constructor(protected taskService: TaskService) {
  }

  onEdit(event: string) {
    this.selectedTask = this.taskService.taskList.find(item => item.id === event)
    this.taskService.isVisible = true;
  }
  addNewTask() {
    this.selectedTask = {}
    this.taskService.isVisible = true;
  }

  searchTask(event: any) {
    if (this.searchText != '') {
      this.taskList = this.taskService.getPaginationList(this.taskService.taskList.filter(item => item.description.includes(this.searchText) === true));
    } else {
      this.searchText = '';
      this.searchTaskList = [];
      this.taskList = this.taskService.getPaginationList(this.taskService.taskList);
    }
  }

  saveTask() {
    this.taskList = this.taskService.getPaginationList(this.taskService.taskList);
  }

  nextPreviousPage(isNext: boolean) {
    if (isNext && this.taskList[this.page + 1].length > 0) {
      ++this.page;
    } else if (this.page > 0 && this.taskList[this.page - 1].length > 0) {
      --this.page;
    }
  }

  getFirstLastPageTask(isFirstPage: boolean) {
    if (isFirstPage) {
      this.page = 0;
    } else {
      this.page = this.taskList.length - 1 >= 0 ? this.taskList.length - 1 : 0;
    }
  }

  onDelete() {
    this.taskList = this.taskService.getPaginationList(this.taskService.taskList);
    if (this.page > 0 && this.taskList[this.page] != undefined && this.taskList[this.page].length === 0) {
      --this.page;
    }
  }
}
