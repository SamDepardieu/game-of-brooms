import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'page-taskadd',
  templateUrl: 'taskadd.html'
})
export class Taskadd {

	public taskName: string;  
	public taskDescription: string; 
	public taskPoints: number; 
	public taskDeadline;

	constructor(private taskService: TaskService, public navCtrl: NavController) {

	}

	public add():void 
	{
		let obj = 
		{
			_id: 'dde',
			type: 'task', 
			name: this.taskName,
			description: this.taskDescription,
			state: 'todo',
			created: Date.now(),
			updated: Date.now(),
			deadline: this.taskDeadline,
			points: this.taskPoints
		};

		console.log(this.taskDeadline);
		console.log(Date.parse(this.taskDeadline));

		// this.taskService.add(obj).then((response) =>
		// {
		// 	console.log('Task added', response);
		// }).catch((error) =>
		// {
		// 	console.error(error);
		// });
	}
}

// task
// {
//     "_id":"text hash autogen", // on a un truc pertinant ? le nomgroupe + timestamp mili ?
//     "type":"task",
//     "name":"text",
//     "description":"text",
//     "state":"text list(todo,doing,redo,done)", // etat de la tache
//     "created":1234, // int / timestamp
//     "updated":1234, // int / timestamp, last modif
//     "deadline":1234, // int / timestamp
//     "points":1234, // int / value of task
//     // @TODO userId create &co

//     "group":"groupe name _id",
//     "owner":"address mail _id",
//     "maker":"address mail _id",
//     "checker":"address mail _id", // on fait un array là ?

// }