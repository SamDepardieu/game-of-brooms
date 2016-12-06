import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Taskadd } from '../taskadd/taskadd';
import { Taskdetail } from '../taskdetail/taskdetail';
import { TaskService } from '../../services/task.service';
import { LogService } from '../../services/log.service'; 

@Component({
  selector: 'page-tasklist',
  templateUrl: 'tasklist.html'
})
export class Tasklist {


	public items; 
  public taskArray; 
  public localDeadline;

  constructor(private logService: LogService, private taskService: TaskService, public navCtrl: NavController, public navParams: NavParams) {

   }

  ngOnInit()
  {
      
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
