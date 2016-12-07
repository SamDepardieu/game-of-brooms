import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-taskdetail',
  templateUrl: 'taskdetail.html'
})
export class Taskdetail implements OnInit{

	public taskInfo; 

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	this.taskInfo = navParams.data.data.doc;
	this.taskInfo.deadline = new Date(this.taskInfo.deadline).toISOString();
	console.log('info', navParams.data.data.doc);
	}

	ngOnInit()
	{  

	}

}
