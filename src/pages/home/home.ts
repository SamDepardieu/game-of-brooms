// Angular Import
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Services Import
import { PouchDBService } from '../../services/pouchdb.service'

// Import pages
import { Tasklist }   from '../tasklist/tasklist';
import { Notiflist }  from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
 * The HomePage class / component
 * @type {HomePage}
 */
export class HomePage implements OnInit {

	/**
	 * The HomePage Constructor
	 * @param {NavController} public  navCtrl       Nav controller for routing pages
	 * @param {NavParams}     public  navParams     Nav params for data bindings
	 */
  	constructor(public navCtrl: NavController, public navParams: NavParams)
  	{
    }

	/**
	 * Angular OnInit function
	 */
	ngOnInit()
	{

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
}
