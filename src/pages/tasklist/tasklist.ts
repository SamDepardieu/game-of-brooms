import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Taskadd } from '../taskadd/taskadd';
import { Taskdetail } from '../taskdetail/taskdetail';

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class Tasklist {

  constructor(public navCtrl: NavController) {
    
  }
  public goToTaskAdd(): void
  {
  	this.navCtrl.push(Taskadd); 
  }

}
