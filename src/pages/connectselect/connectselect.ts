// Angular Import 
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Pages Import 
import { HomePage } from '../home/home';

// Services Import 
import { UserService } from '../../services/user.service';
import { PouchDBService } from '../../services/pouchdb.service'; 

@Component({
	selector: 'page-connectselect',
	templateUrl: 'connectselect.html'
})
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
	 * the signup user name 
	 * @type {string}
	 */
	public newUserName: string; 

	/**
	 * The ConnectselectPage constructor 
	 * @param {PouchDBService} private pouchdbService [description]
	 * @param {UserService}    private userService    [description]
	 * @param {NavController}  public  navCtrl        [description]
	 * @param {NavParams}      public  navParams      [description]
	 */
	constructor(private pouchdbService: PouchDBService, private userService: UserService, public navCtrl: NavController, public navParams: NavParams) {}

	/**
	 * Angular onInit function 
	 */
	ngOnInit()
	{
		this.pouchdbService.sync(); 
		console.log()
	}

	/**
	 * The connect function map to the connect button 
	 */
	public connect(): void
	{
		let connect = this.userService.get(this.userMail).then((response) => 
		{
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
			console.log(response);
		}).catch((error) =>
		{
			console.error(error); 
		});
	}
}