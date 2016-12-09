import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { LogService } from '../../services/log.service'; 
import { PouchDBService } from '../../services/pouchdb.service';
import { UserService } from '../../services/user.service'; 
import { TaskService } from '../../services/task.service';
import { Tasklist } from '../tasklist/tasklist';

@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html'
})
export class Taskdetail implements OnInit{

	public taskInfo; 
	public isOwner: boolean; 
	public isReserved: boolean; 
	public isMaker: boolean; 

	public isValidateButton: boolean;
	public isUpdateButton: boolean;
	public isReservateButton: boolean;
	public isDoneButton: boolean;
	public isDone: boolean;

	constructor(private userService: UserService, private pouchdbService: PouchDBService, private logService: LogService, private taskService: TaskService, public navCtrl: NavController, public navParams: NavParams) {
		this.taskInfo = navParams.data.data.doc;
		this.taskInfo.deadline = new Date(this.taskInfo.deadline).toISOString();
		this.isValidateButton = false; 
		this.isUpdateButton = false; 
		this.isReservateButton = false; 
		this.isDoneButton = false; 
		this.isDone = false;
	}

	private _checkData(): void
	{
		if(this.taskInfo.owner === this.logService.userLog._id)
		{
			this.isOwner = true;
		}
		else
		{
			this.isOwner = false; 
		}

		if(this.taskInfo.maker)
		{
			this.isReserved = true;
		}
		else
		{
			this.isReserved = false; 
		}

		if(this.taskInfo.maker === this.logService.userLog._id)
		{
			this.isMaker = true;
		}
		else
		{
			this.isMaker = false; 
		}

		if(this.taskInfo.state === 'done')
		{
			this.isDone = true;
		}
	}

	ngOnInit()
	{  
		this._checkData();
		console.log(this.isOwner, this.isReserved, this.isMaker);
		if(this.isOwner)
		{	
			if(!this.isDone)
			{			
				if(this.isReserved)
				{
					// ya button validate
					this.isValidateButton = true; 

				}
				else
				{
					// ya button edit 
					this.isUpdateButton = true; 
				}
			}
		}
		else
		{
			if(this.isReserved)
			{
				if(this.isMaker)
				{
					// button ask validate 
					this.isDoneButton = true; 
				}
				else
				{
					// y a nothing 
					// this.isReservateButton = false;
					// this.isDoneButton = false;
					// this.isValidateButton = false; 
					// this.isUpdateButton = false; 
				}
			}
			else
			{
				// y a button reservate 
				this.isReservateButton = true; 
			}
		}
	}

	// Après appuie ya reload des infos et changement de page 

	private _goToTaskList()
	{
		this.navCtrl.push(Tasklist);
	}

	public reservate()
	{
		this.taskService.get(this.taskInfo._id).then((doc) =>
		{
			doc.updated = Date.now();
			doc.maker = this.logService.userLog._id;
			doc.state = 'reserved';
			return this.pouchdbService.db.put(doc);
		}).then(() =>
		{
			console.log('Task reservate'); 
			this._goToTaskList();
		}).catch((error) =>
		{
			console.error(error); 
		});
	}

	public update()
	{
		this.taskService.get(this.taskInfo._id).then((doc) =>
		{
			doc.updated = Date.now();
			doc.name = this.taskInfo.name;
			doc.points = this.taskInfo.points;
			doc.description = this.taskInfo.description;
			doc.deadline = Date.parse(this.taskInfo.deadline);

			return this.pouchdbService.db.put(doc);
		}).then(() =>
		{
			console.log('Task updated');
			this._goToTaskList(); 
		}).catch((error) =>
		{
			console.error(error); 
		});
	}

	public done() // ask validate 
	{
		this.taskService.get(this.taskInfo._id).then((doc) =>
		{
			doc.updated = Date.now();
			doc.state = 'ask validate';
			return this.pouchdbService.db.put(doc);
		}).then(() =>
		{
			console.log('Task done');
			this._goToTaskList(); 
		}).catch((error) =>
		{
			console.error(error); 
		});
	}

	public delete()
	{
		this.taskService.remove(this.taskInfo).then(() =>
		{
			console.log('Task delete');
			this._goToTaskList();

		}).catch((error) =>
		{
			console.error(error);
		})
	}
	public validate()
	{
		let maker;
		this.taskService.get(this.taskInfo._id).then((doc) =>
		{
			doc.updated = Date.now();
			doc.checker.push(this.logService.userLog._id);
			doc.state = 'done'
			maker = doc.maker;
			this.isValidateButton = false; 
			this._addPointsToMaker(this.taskInfo.points, maker);
			return this.pouchdbService.db.put(doc);
		}).then(() =>
		{
			console.log('Task validate'); 
			
		}).catch((error) =>
		{
			console.error(error); 
		});

		// 
	}

	private _addPointsToMaker(points: number, user: string)
	{
		this.userService.get(user).then((doc) =>
		{
			doc.points += points; 
			return this.pouchdbService.db.put(doc); 
		}).then(() =>
		{
			console.log('Points add to user');
			this._goToTaskList();
		}).catch((error) =>
		{
			console.error(error);
		})
	}

}


