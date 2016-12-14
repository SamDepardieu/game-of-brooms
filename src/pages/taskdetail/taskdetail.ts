// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

// Import Services
import { LogService } from '../../services/log.service';
import { PouchDBService } from '../../services/pouchdb.service';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';

// Import Pages
import { Tasklist } from '../tasklist/tasklist';
import { HomePage } from '../home/home';
import { ConnectselectPage } from '../connectselect/connectselect';

@Component({
    selector: 'page-taskdetail',
    templateUrl: 'taskdetail.html'
})
/**
 * The Taskdetail Class / Component
 * @type{Taskdetail}
 */
export class Taskdetail implements OnInit{

	/**
	 * The complete task info
	 * @type {[type]}
	 */
	public taskInfo;

	/**
	 * Is User Owner
	 * @type {boolean}
	 */
	public isOwner: boolean;

	/**
	 * Is Task Reserved
	 * @type {boolean}
	 */
	public isReserved: boolean;

	/**
	 * Is User Maker
	 * @type {boolean}
	 */
	public isMaker: boolean;

	/**
	 * Is Validate Button visible
	 * @type {boolean}
	 */
	public isValidateButton: boolean;

	/**
	 * Is Update Button Visible
	 * @type {boolean}
	 */
	public isUpdateButton: boolean;

	/**
	 * Is Reservate Button Visible
	 * @type {boolean}
	 */
	public isReservateButton: boolean;

	/**
	 * Is Done Button Visible
	 * @type {boolean}
	 */
	public isDoneButton: boolean;

	/**
	 * Is Task Done
	 * @type {boolean}
	 */
	public isDone: boolean;

	/**
	 * The task detail constructor
	 * @param {UserService}    private userService    The service use to manipulate user
	 * @param {PouchDBService} private pouchdbService The service use to call pouchdb
	 * @param {LogService}     private logService     The service use to have user logs
	 * @param {TaskService}    private taskService    The service use to manipulate tasks 
	 * @param {NavController}  public  navCtrl        The controller for routing 
	 * @param {NavParams}      public  navParams      The params for data bindings 
	 * @param {ToastController} public toastCtrl  The controller to call toasts 
	 */
	constructor(private userService: UserService, private pouchdbService: PouchDBService, private logService: LogService, private taskService: TaskService, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) 
	{
		this.taskInfo = navParams.data.data.doc;
		this.taskInfo.deadline = new Date(this.taskInfo.deadline).toISOString();
		this.isValidateButton = false;
		this.isUpdateButton = false;
		this.isReservateButton = false;
		this.isDoneButton = false;
		this.isDone = false;
	}

	/**
	 * The private method for checking data
	 */
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

	/**
	 * Angular OnInit function
	 */
	ngOnInit()
	{
		this._checkData();
		if(this.isDone)
		{
				this.isValidateButton = false;
				this.isUpdateButton = false;
				this.isReservateButton = false;
				this.isDoneButton = false;
		}
		else if(this.isOwner)
		{
			if(!this.isDone)
			{
				if(this.isReserved)
				{
					this.isValidateButton = true;
				}
				else
				{
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
					this.isDoneButton = true;
				}
			}
			else
			{
				this.isReservateButton = true;
			}
		}
	}

	/**
	 * The private method to change page
	 */
	private _goToTaskList(): void
	{
		this.navCtrl.push(Tasklist);
	}

	/**
	 * Reservate a task method
	 */
	public reservate(): void
	{
		// Get the task and update it
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

	/**
	 * Update a task method
	 */
	public update(): void
	{
		// Get the task and update it
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

	/**
	 * Done a task method
	 */
	public done(): void
	{
		// Get the task and update it
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

	/**
	 * Delete a task method
	 */
	public delete(): void
	{
		// Remove the task
		this.taskService.remove(this.taskInfo).then(() =>
		{
			console.log('Task delete');
			this._goToTaskList();

		}).catch((error) =>
		{
			console.error(error);
		})
	}

	/**
	 * Validate a task method
	 */
	public validate(): void
	{
		let maker;

		// Get the task and update it
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
	}

	/**
	 * Method to add points for the user maker
	 * @param {number} points The points to add
	 * @param {string} user   The user to add points
	 */
	private _addPointsToMaker(points: number, user: string)
	{
		// Get the user and add points, update it
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
		});
	}

	/**
	 * Show the user profile information 
	 */
	public showProfile(): void 
	{
		let msg = 'Your profile information, your group is :'+this.logService.userLog.groupid+', your id is :'+this.logService.userLog._id+' and you have : '+this.logService.userLog.points+' point(s)';
		let toast = this.toastCtrl.create(
		{
			message: msg,
			duration: 5000
		});

		toast.present(); 
	}

	/**
	 * Log out and return to the connect select page 
	 */
	public logout(): void
	{
		this.navCtrl.push(ConnectselectPage); 
	}

	/**
	 * Return to the main menu 
	 */
	public returnMenu(): void
	{
		this.navCtrl.push(HomePage); 
	}
}
