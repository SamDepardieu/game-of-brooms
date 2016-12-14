// Angular Import 
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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
export class ConnectselectPage implements OnInit
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

	/**
	 * The list of groups 
	 * @type {Array<string>}
	 */
	public groupList: Array<string>; 

	/**
	 * The user choice of a group 
	 * @type {string}
	 */
	public groupListChoice;

	/**
	 * The ConnectselectPage constructor 
	 * @param {LogService}	   private logService     Service use to call LogService methods
	 * @param {PouchDBService} private pouchdbService Service use to call pouchDB methods
	 * @param {UserService}    private userService    Service use to manipulate user data 
	 * @param {GroupService}   private groupService	  Service use to manipulate group data 
	 * @param {NavController}  public  navCtrl        Nav controller for routing 
	 * @param {NavParams}      public  navParams      Nav params for data bindings in routing
	 * @param {ToastController} public toastCtrl	  Controller use to manipulate toast 
	 */
	constructor(private logService: LogService,private pouchdbService: PouchDBService, private groupService: GroupService, private userService: UserService, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {}

	/**
	 * Angular onInit function 
	 */
	ngOnInit()
	{
		// Launch the sync for the remote and local dbs
		this.pouchdbService.sync();
		this.updateListGroups();
	}

	/**
	 * Update the group list 
	 */
	public updateListGroups(): void
	{
		// Call the db 
		this.groupService.getAll().then((response) =>
		{
			console.log(response);
			this.groupList = response.rows;
		}).catch((error) =>
		{
			console.error(error);
		});
	}

	/**
	 * The connect function map to the connect button 
	 */
	public connect(): void
	{
		// Check if the user already exists 
		this.userService.get(this.userMail).then((response) => 
		{
			this.logService.userLog = response; 
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
		let access: boolean; 
		// Create the user object 
		let newUser = 
		{ 
			_id: this.newUserMail,
			type: 'user',
			name: this.newUserName,
			created: Date.now(),
			updated: Date.now(),
			points: 0, 
			isAdmin: false,
			groupid: this.groupListChoice
		};

		// Get user 
		this.userService.get(newUser._id).then((response) => 
		{
			access = false;
		}).catch((error) =>
		{
			access = true; 
		})

		if(access)
		{
			// Add the user 
			this.userService.add(newUser).then((response) => 
			{
				console.log('User added', response);
			}).catch((error) =>
			{
				console.error(error); 
			});

			// Update the group with the new user 
			this.groupService.get(this.groupListChoice).then((doc) =>
			{
				doc.users.push(newUser._id);
				doc.updated = Date.now();
				return this.pouchdbService.db.put(doc);
			}).then(() =>
			{
				console.log('Group updated'); 
				this._showToast('A new user added'); 
			}).catch((error) =>
			{
				console.error(error);
				this._showToast('An error occured'); 
			});
		}
		else
		{
			this._showToast('User already exists'); 
		}

		// Clean fields
		this.newUserMail = ''; 
		this.newUserName = ''; 
		this.groupListChoice = ''; 
	}

	/**
	 * Create a new group function 
	 */
	public createNewGroup(): void
	{
		// Create the group object 
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

		// Add the group 
		this.groupService.add(newGroup).then((response) =>
		{
			console.log('Group added', response);
			this._showToast('A new group being added');

		}).catch((error) => 
		{
			console.error(error); 
			this._showToast('An error occured'); 
		});

		// Update the group list 
		this.updateListGroups();

		// Clean field
		this.groupName = ''; 
	}

	/**
	 * Show a toast component 
	 * @param {string} msg Message to show in the toast 
	 */
	private _showToast(msg: string):  void 
	{
		let toast = this.toastCtrl.create(
		{
			message: msg,
			duration: 3000
		});
		toast.present(); 
	}
}