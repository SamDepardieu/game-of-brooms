import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home'
import { UserService } from '../../services/user.service';
import { PouchDBService } from '../../services/pouchdb.service'; 
// Import classes 
// import { Member } from '../classes/member';
// import { Group } from '../classes/group';

@Component({
  selector: 'page-connectselect',
  templateUrl: 'connectselect.html'
})
export class ConnectselectPage {

  constructor(private pouchDBService: PouchDBService, private userService: UserService, public navCtrl: NavController, public navParams: NavParams) {}

  public users; 
  public userSelectors;

  ngOnInit()
  {
  	// console.log('Initialize');
  	// this.getUsers(); 
  }

  public connect(data): void
  {
  	this.navCtrl.push(HomePage, 
  		{
  			userParams: data 
  		});
  }

  public getUsers(): void
	{
		this.userService.getUsers()
			.subscribe(	
				users => this.users = users,
				err => console.log(err),
				() => 
				{
					console.log(this.users);
					this.userSelectors = this.users.member.records;
				}
			);
	}

  public testDb(): void 
  {
    console.log('test');

    this.pouchDBService.createDb();
  }

  public syncDb()
  {
    console.log('syncDb');
    this.pouchDBService.syncDb();
  }

  public postData(): void
  {
    console.log('post'); 
    console.log(this.pouchDBService.postDb()); 
  }

  public getData()
  {
    console.log('get'); 
    console.log(this.pouchDBService.getDb());
  }

  public getOne()
  {
    console.log('get one'); 
    this.pouchDBService.getOne();
  }
}
