// Angular Import 
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages Import 
import { HomePage } from '../home/home';

// Services Import 
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service'; 
import { PouchDBService } from '../../services/pouchdb.service'; 
import { LogService } from '../../services/log.service'; 

@Component({
	selector: 'page-connectselect',
	templateUrl: 'connectselect.html'
})
/**
 * The ConnectselectPage class / component 
 * @type {ConnectselectPage}
 */
export class ConnectselectPage 
{
	/**
	 * The login user mail 
	 * @type {string}
	 */
	public userMail: string; 

	/**
	 * The signup user mail
	 * @type {string}
	 */
	public newUserMail: string;

	/**
	 * The signup user name 
	 * @type {string}
	 */
	public newUserName: string; 

	/**
	 * The new group name 
	 * @type {string}
	 */
	public groupName: string;

	public groupList; 
	public groupListChoice;

	/**
	 * The ConnectselectPage constructor 
	 * @param {LogService}	   private lgoService     Service use to call LogService methods
	 * @param {PouchDBService} private pouchdbService Service use to call pouchDB methods
	 * @param {UserService}    private userService    Service use to manipulate user data 
	 * @param {GroupService}   private groupService	  Service use to manipulate group data 
	 * @param {NavController}  public  navCtrl        Nav controller for routing 
	 * @param {NavParams}      public  navParams      Nav params for data bindings in routing
	 */
	constructor(private logService: LogService,private pouchdbService: PouchDBService, private groupService: GroupService, private userService: UserService, public navCtrl: NavController, public navParams: NavParams) {}

	/**
	 * Angular onInit function 
	 */
	ngOnInit()
	{
		// Launch the sync for the remote and local dbs
		this.pouchdbService.sync();
	}

	/**
	 * The connect function map to the connect button 
	 */
	public connect(): void
	{
		let connect = this.userService.get(this.userMail).then((response) => 
		{
			console.log('Connection', response);
			this.logService.userLog = response; 
			console.log(this.logService.userLog); 
			this.navCtrl.push(HomePage, 
			{
				userParams: this.userMail
			});
		})
		.catch((error) => 
		{
			console.error(error);
		});
	}

	/**
	 * The signup function map to the signup button
	 */
	public signup(): void
	{
		let newUser = 
		{ 
			_id: this.newUserMail,
			type: 'user',
			name: this.newUserName,
			created: Date.now(),
			updated: Date.now(),
			points: 0, 
			isAdmin: false
		};

		this.userService.add(newUser).then((response) => 
		{
			console.log('User added', response);
		}).catch((error) =>
		{
			console.error(error); 
		});
	}

	public createNewGroup(): void
	{
		let newGroup = 
		{
			_id: this.groupName,
			type: 'group',
			name: this.groupName,
			created: Date.now(),
			updated: Date.now(),
			adminIp: '',
			users: []
		};

		this.groupService.add(newGroup).then((response) =>
		{
			console.log('Group added', response);
		}).catch((error) => 
		{
			console.error(error); 
		});
	}

}