import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { LogService } from '../../services/log.service'; 

import { TaskService } from '../../services/task.service';

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

	constructor(private logService: LogService, private taskService: TaskService, public navCtrl: NavController, public navParams: NavParams) {
		this.taskInfo = navParams.data.data.doc;
		this.taskInfo.deadline = new Date(this.taskInfo.deadline).toISOString();
		this.isValidateButton = false; 
		this.isUpdateButton = false; 
		this.isReservateButton = false; 
		this.isDoneButton = false; 
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
	}

	ngOnInit()
	{  
		this._checkData();
		console.log(this.isOwner, this.isReserved, this.isMaker);
		if(this.isOwner)
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
				}
			}
			else
			{
				// y a button reservate 
				this.isReservateButton = true; 
			}
		}
	}

}


