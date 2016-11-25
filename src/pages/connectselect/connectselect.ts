import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-connectselect',
  templateUrl: 'connectselect.html'
})
export class ConnectselectPage {

  constructor(private userService: UserService, public navCtrl: NavController) {}

  public users; 
  public userSelectors;

  ngOnInit()
  {
  	console.log('Initialize');
  	this.getUsers(); 
  }

  public connect(click): void
  {
  	console.log(click);
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
