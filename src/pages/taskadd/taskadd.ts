import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TaskService } from '../../services/task.service';
import { LogService } from '../../services/log.service'; 

@Component({
  selector: 'page-taskadd',
  templateUrl: 'taskadd.html'
})
export class Taskadd {

	public taskName: string;  
	public taskDescription: string; 
	public taskPoints: number; 
	public taskDeadline;

	constructor(private logService: LogService, private taskService: TaskService, public navCtrl: NavController) {

	}


	// private generateId(): string 
	// {
	// 	function s4()
	// 	{
	// 		return Math.floor((1 + Math.random()) * 0x10000)
	// 		.toString(16)
	// 		.substring(1);
	// 	}
	// 	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	// }

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