import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TaskService } from '../../services/task.service';
import { LogService } from '../../services/log.service'; 

import { Tasklist } from '../tasklist/tasklist';

@Component({
  selector: 'page-taskadd',
  templateUrl: 'taskadd.html'
})
export class Taskadd {

	public taskName: string;  
	public taskDescription: string; 
	public taskPoints: number; 
	public taskDeadline: string;

	constructor(private logService: LogService, private taskService: TaskService, public navCtrl: NavController) {

	}

	public add():void 
	{
		let obj = 
		{
			_id: this.logService.userLog.groupid+Date.now(),
			type: 'task', 
			name: this.taskName,
			description: this.taskDescription,
			state: 'todo',
			created: Date.now(),
			updated: Date.now(),
			deadline: Date.parse(this.taskDeadline),
			points: this.taskPoints,
			group: this.logService.userLog.groupid,
			owner: this.logService.userLog._id,
			maker: '',
			checker: []
		};

		console.log(obj);
		this.taskService.add(obj).then((response) =>
		{
			console.log('Task added', response);
			this.navCtrl.push(Tasklist);
		}).catch((error) =>
		{
			console.error(error);
		});
	}

	public getAll()
	{
		this.taskService.getAll()
	}
}