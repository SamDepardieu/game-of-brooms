import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConnectDBService } from '../../services/connectdb.service';

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ConnectDBService]
})
export class HomePage {
  	constructor(private connectdb: ConnectDBService,public navCtrl: NavController, storage: Storage) {

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

	/**
	 * Go to the taskl list page 
	 */
	public goToTaskList(): void
	{
		this.navCtrl.push(Tasklist);
		// this.connectdb.doTheJob();
	}

	/**
	 * Go to the notif list page 
	 */
	public goToNotifList(): void
	{
		this.navCtrl.push(Notiflist); 
	}
}
    
