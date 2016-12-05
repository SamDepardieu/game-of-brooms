// Angular Import 
import { Injectable } from '@angular/core';

// Import Config 
import { GlobalConfig } from '../config/global.var.config'; 

// Import PouchDB 
import * as PouchDB from 'pouchdb';

@Injectable()
/**
 * The PouchDBService class / service 
 * @type {PouchDBService}
 */
export class PouchDBService
{
	// Put a check if a db already exists 
	/**
	 * The local db 
	 * @type {PouchDB}
	 */
	private _db; 

	/**
	 * The remote db 
	 * @type {PouchDB}
	 */
	private _remoteDb; 

	/**
	 * The dbsync object 
	 * @type {any}
	 */
	private _dbSync;

	/**
	 * The PouchDBService constructor 
	 */
	constructor()
	{
		this._db = new PouchDB('broom_db');
		console.log('db created'); 

		this._remoteDb = new PouchDB(GlobalConfig.API_URL);
		console.log('db remote created');
	}

	/**
	 * The _db getter 
	 */
	public get db(): any
	{
		return this._db;
	}

	/**
	 * The sync method for remote and local dbs 
	 */
	public sync(): void 
	{
		this._dbSync = this._db.sync(this._remoteDb, 
		{
			live: true,
			retry: true
		});

	// 	this._dbSync.on("change", function(info) {
	// 	    // La réplication a créé ou modifié un document
	// 	    console.log("On change");
	// 	    console.log(info);
	// 	  }).on("complete", function(info) {
	// 	    // La réplication a été terminée ou annulée
	// 	    console.log("On complete");
	// 	    console.log(info);
	// 	  }).on("paused", function(error) {
	// 	    // La réplication est en pause (la base de données est à jour ou l'utilisateur est offline)
	// 	    console.log("On paused");
	// 	    console.log(error);
	// 	  }).on("active", function() {
	// 	    // La réplication reprend (nouvelles modifications de réplication ou l'utilisateur est de retour online)
	// 	    console.log("On active");
	// 	    console.log("active");
	// 	  }).on("denied", function(error) {
	// 	    // Un document n'a pas réussi à se répliquer
	// 	    console.log("On denied");
	// 	    console.log(error);
	// 	  }).on("error", function(error) {
	// 	    // La réplication s'est arrêtée en raison d'une erreur irrécupérable
	// 	    console.log("On error");
	// 	    console.log(error);
	// 	  });
	// }
}
