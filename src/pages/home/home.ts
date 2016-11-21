import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController, storage: Storage) {

	  	/*
	  	 * Storage sample 
	  	 */
	  	storage.set('id', 'François');
	  	storage.get('id').then((data) =>
	  	{
	  		console.log('Your name is', data);
	  	});
	  	/**
	  	 * End of storage sample
	  	 */

	}
}
    
