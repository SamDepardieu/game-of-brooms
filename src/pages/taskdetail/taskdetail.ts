import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-taskdetail',
    templateUrl: 'taskdetail.html'
})
export class Taskdetail {
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log(navParams.data);
    }
}
