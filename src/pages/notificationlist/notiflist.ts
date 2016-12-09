// Angular Import
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-notif',
    templateUrl: 'notiflist.html'
})
/**
 * Notiflist Class / Component
 * @type {Class}
 */
export class Notiflist
{
	/**
	 * The Notiflist constructor
	 * @param {NavController} public navCtrl use for routing
	 */
	constructor(public navCtrl: NavController)
	{

	}
}
