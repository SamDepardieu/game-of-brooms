import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { LogService } from '../../services/log.service';
import { PouchDBService } from '../../services/pouchdb.service'

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	// public groups;
	// public users; 
  	constructor(private pouchdbService: PouchDBService ,public navCtrl: NavController, public navParams: NavParams, storage: Storage) 
  	{


	}

	ngOnInit()
	{
		// let userData = this.navParams.get('userParams').split(',');
		// this.logService.setData(userData);
		this.pouchdbService.sync();
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
    
