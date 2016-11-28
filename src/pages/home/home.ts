import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskService } from '../../services/task.service';
import { GroupService } from '../../services/group.service';
import { UserService } from '../../services/user.service';
import { LogService } from '../../services/log.service';

// Import pages 
import { Tasklist } from '../tasklist/tasklist';
import { Notiflist } from '../notificationlist/notiflist';

// Import classes 
import { Member } from '../classes/member';
import { Group } from '../classes/group';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public groups;
	public users; 
  	constructor(private logService: LogService, private groupService: GroupService, private userService: UserService, public navCtrl: NavController, public navParams: NavParams, storage: Storage) 
  	{


	}

	ngOnInit()
	{
		let userData = this.navParams.get('userParams').split(',');
		this.logService.setData(userData);
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
		let data = { "name": name };
		this.groupService.addGroup(data)
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


	public addUser(name: string, groupId: number, isAdmin: number): void
	{
		let data = {"group_id": ""+groupId+"", "name":""+name+"", "points": 0, "is_admin":""+isAdmin+""};
		this.userService.addUser(data)
			.subscribe(
				users => this.users = users,
				err => console.error(err),
				() => console.log('User added')
			);
	}
}
    
