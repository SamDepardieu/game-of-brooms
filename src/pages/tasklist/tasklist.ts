import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Taskadd } from '../taskadd/taskadd';
import { Taskdetail } from '../taskdetail/taskdetail';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class Tasklist {


	public items; 

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	// Feed the items array
    this.items = [{title: 'Titre', deadline:'data', reward:'500xp', author:'Author', doneOrNot:'true'},
    {title: 'Titre', deadline:'data', reward:'500xp', author:'Author', doneOrNot:'true'}];
  }


  /**
   * go to taskadd page
   */
  public goToTaskAdd(): void
  {
  	this.navCtrl.push(Taskadd); 
  }

  /**
   * function when you click on item 
   * @param {item} item item
   */
  public clickOnItem(item): void
  {
  	this.navCtrl.push(Taskdetail, 
  	{
  		data: item
  	});
  }

}
