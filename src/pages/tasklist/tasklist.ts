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

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.items = [{title: 'dede', data:'cocuouc'}, {title: 'eded', data:'sdfsqdf'}];
  }
  public goToTaskAdd(): void
  {
  	this.navCtrl.push(Taskadd); 
  }
  public clickOnItem(item): void
  {
  	this.navCtrl.push(Taskdetail, 
  	{
  		data: item
  	});
  }

}
