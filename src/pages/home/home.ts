import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public groups;
	public users; 
  	constructor(private groupService: GroupService, private userService: UserService, public navCtrl: NavController, storage: Storage) 
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

	public getGroups(): void
	{
		this.groupService.getGroups()
			.subscribe(
				groups => this.groups = groups,
				err => console.log(err),
				() => console.log(this.groups)
			);
	}

	public addGroup(name: string): void
	{
		this.groupService.addGroup(name)
			.subscribe(
				groups => this.groups = groups,
				err => console.log(err),
				() => console.log('Group added')
			);
	}

	public getUsers(): void
	{
		this.userService.getUsers()
			.subscribe(	
				users => this.users = users,
				err => console.log(err),
				() => console.log(this.users)
			);
	}

	public addUser(name: string, groupId: string, isAdmin: string): void
	{
		// console.log(name, groupId, isAdmin);
		this.userService.addUser(name, parseInt(groupId), parseInt(isAdmin))
		.subscribe(
				users => this.users = users,
				err => console.log(err),
				() => console.log('User added')
			);
	}
}
    
