// Angular Import
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

// Import Services
import { TaskService } from '../../services/task.service';
import { LogService } from '../../services/log.service';

// Import pages component
import { Tasklist } from '../tasklist/tasklist';
import { HomePage } from '../home/home';
import { ConnectselectPage } from '../connectselect/connectselect';

@Component({
    selector: 'page-taskadd',
    templateUrl: 'taskadd.html'
})
/**
 * The TaskAdd Class / Component
 * @type{Class}
 */
export class Taskadd {

	/**
	 * The task name
	 * @type {string}
	 */
	public taskName: string;

	/**
	 * The complete description of task
	 * @type {string}
	 */
	public taskDescription: string;

	/**
	 * The points for the task
	 * @type {number}
	 */
	public taskPoints: number;

	/**
	 * The deadline of the task
	 * @type {string}
	 */
	public taskDeadline: string;

	/**
	 * The Taskadd constructor 
	 * @param {LogService}    private logService  The Log service for getting user data 
	 * @param {TaskService}   private taskService The task service to manipulate tasks 
	 * @param {NavController} public  navCtrl     The nav controller use for routing 
	 * @param {ToastController} public toastCtrl  The controller to call toasts 
	 */
	constructor(private logService: LogService, private taskService: TaskService, public navCtrl: NavController, public toastCtrl: ToastController) 
	{

	}

	/**
	 * Add a new task function
	 */
	public add(): void
	{
		// Create the task object
		let obj =
		{
			_id: this.logService.userLog.groupid+'-'+Date.now(),
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

		// Add the task
		this.taskService.add(obj).then((response) =>
		{
			console.log('Task added', response);
			this.navCtrl.push(Tasklist);
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
