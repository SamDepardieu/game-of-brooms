import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PouchDBService } from '../../services/pouchdb.service'

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) 
  	{

	}

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
    
