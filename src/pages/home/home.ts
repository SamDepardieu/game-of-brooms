import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ConnectDBService } from '../../services/connectdb.service';

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public fruits
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

	ngOnInit()
	{
		this.loadTasks();

	}

	/**
	 * Go to the taskl list page 
	 */
	public goToTaskList()
	{
		// this.navCtrl.push(Tasklist);
		// this.connectdb.doTheJob();
		this.loadTasks();
	
	}

	/**
	 * Go to the notif list page 
	 */
	public goToNotifList()
	{
		this.connectdb.addTaskQuery().subscribe();
		this.connectdb.getTasks().subscribe(
			fruits => this.fruits = fruits
			);
		// this.navCtrl.push(Notiflist); 
	}

	public loadTasks()
	{
		this.connectdb.getTasks().subscribe(
			fruits => this.fruits = fruits
		);
	}
}
    
