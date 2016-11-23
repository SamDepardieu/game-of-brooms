import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';
import {AboutPage} from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  	constructor(public navCtrl: NavController, storage: Storage) {

	  	/*
	  	 * Storage sample 
	  	 */
	  	// storage.set('id', 'François');
	  	// storage.get('id').then((data) =>
	  	// {
	  	// 	console.log('Your name is', data);
	  	// });
	  	/**
	  	 * End of storage sample
	  	 */
	}

	public goToPage(): void
	{
		this.navCtrl.push(AboutPage); 
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
    
