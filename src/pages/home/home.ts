import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  	constructor(private groupService: GroupService,public navCtrl: NavController, storage: Storage) 
  	{


	}

	ngOnInit()
	{
	}

	/**
	 * Go to the taskl list page 
	 */
	public goToTaskList()
	{
		this.navCtrl.push(Tasklist);
	}

	/**
	 * Go to the notif list page 
	 */
	public goToNotifList()
	{
		this.navCtrl.push(Notiflist); 
	}
}
    
