import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-connectselect',
  templateUrl: 'connectselect.html'
})
export class ConnectselectPage {

  constructor(private userService: UserService, public navCtrl: NavController, public navParams: NavParams) {}

  public users; 
  public userSelectors;

  ngOnInit()
  {
  	console.log('Initialize');
  	this.getUsers(); 
  }

  public connect(data): void
  {
  	console.log(data);

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
}
