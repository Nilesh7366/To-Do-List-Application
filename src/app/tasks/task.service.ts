import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: any[] = [];
  isVisible: boolean = false;
  constructor() {

  }

  saveUpdateTask(task: any, isNew: boolean, taskIndex: number) {
    if (isNew) {
      this.taskList.push(task)
    } else {
      this.taskList[taskIndex] = task;
    }
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
  }

  getPaginationList(list: any[]) {
    let chunkSize = 5;
    let resultArray = [];
    for (let i = 0; i < list.length; i += chunkSize) {
      const chunk = list.slice(i, i + chunkSize);
      resultArray.push(chunk);
    }
    return resultArray;
  }



}
