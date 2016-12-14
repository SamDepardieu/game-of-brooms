// Angular Import 
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

// Import Pages Component
import { Taskadd } from '../taskadd/taskadd';
import { Taskdetail } from '../taskdetail/taskdetail';
import { HomePage } from '../home/home';
import { ConnectselectPage } from '../connectselect/connectselect';

// Import Services 
import { TaskService } from '../../services/task.service';
import { LogService } from '../../services/log.service'; 

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
/**
 * Tasklist Class / Component 
 */
export class Tasklist implements OnInit{

	public taskArray; 

	/**
	 * The Tasklist constructor 
	 * @param {LogService}    private logService  The service use to call log infos
	 * @param {TaskService}   private taskService The service use to manipulate tasks 
	 * @param {NavController} public  navCtrl     The controller for routing 
	 * @param {NavParams}     public  navParams   The params for data binding 
	 * @param {ToastController} public toastCtrl  The controller to call toasts 
	 */
	constructor(private logService: LogService, private taskService: TaskService, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) 
	{

	}

	/**
	 * Angular Init function 
	 */
	ngOnInit()
	{
		console.log(this.logService.userLog);
		this.taskService.getByGroup(this.logService.userLog.groupid).then((response) =>
		{
			this.taskArray = response.rows;
			console.log(this.taskArray);
		}).catch((error) =>
		{
			console.error(error); 
		})
	}


	/**
	* go to taskadd page
	*/
	public goToTaskAdd(): void
	{
		this.navCtrl.push(Taskadd); 
	}

	/**
	* function when you click on item 
	* @param {item} item item
	*/
	public clickOnItem(item): void
	{
		this.navCtrl.push(Taskdetail, 
		{
			data: item
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
