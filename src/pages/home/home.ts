// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';
import { ConnectselectPage } from '../connectselect/connectselect'; 

// Import services
import { LogService } from '../../services/log.service'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * The HomePage class / component
 * @type {HomePage}
 */
export class HomePage implements OnInit {


	public userGroup;
	public userId;
	public userPoints; 
	/**
	 * The HomePage Constructor
	 * @param {NavController} public  navCtrl       Nav controller for routing pages
	 * @param {NavParams}     public  navParams     Nav params for data bindings
	 */
  	constructor(private logservice: LogService, public navCtrl: NavController, public navParams: NavParams)
  	{
    }

	/**
	 * Angular OnInit function
	 */
	ngOnInit()
	{
		this.userGroup = this.logservice.userLog.groupid;
		this.userId = this.logservice.userLog._id;
		this.userPoints = this.logservice.userLog.points; 
	}

	/**
	 * Go to the taskl list page
	 */
	public goToTaskList(): void
	{
		this.navCtrl.push(Tasklist);
	}

	/**
	 * Go to the notif list page
	 */
	public goToNotifList(): void
	{
		this.navCtrl.push(Notiflist);
	}

	public logout()
	{
		this.navCtrl.push(ConnectselectPage);
	}
}
