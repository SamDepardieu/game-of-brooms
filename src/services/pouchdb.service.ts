import { Injectable } from '@angular/core';

import { GlobalConfig } from '../config/global.var.config'; 
import * as PouchDB from 'pouchdb';

@Injectable()
export class PouchDBService
{
	// Put a check if a db already exists 
	private _db; 
	private _remoteDb; 
	private _dbSync;

	constructor()
	{
		this._db = new PouchDB('broom_db');
		console.log('db created'); 
		this._remoteDb = new PouchDB(GlobalConfig.API_URL);
		console.log('db remote created');
	}

	public get db() 
	{
		return this._db;
	}

	public create()
	{
		
	}

	public sync()
	{
		this._dbSync = this._db.sync(this._remoteDb, 
		{
			live: true,
			retry: true
		});

		this._dbSync.on("change", function(info) {
		    // La réplication a créé ou modifié un document
		    console.log("On change");
		    console.log(info);
		  }).on("complete", function(info) {
		    // La réplication a été terminée ou annulée
		    console.log("On complete");
		    console.log(info);
		  }).on("paused", function(error) {
		    // La réplication est en pause (la base de données est à jour ou l'utilisateur est offline)
		    console.log("On paused");
		    console.log(error);
		  }).on("active", function() {
		    // La réplication reprend (nouvelles modifications de réplication ou l'utilisateur est de retour online)
		    console.log("On active");
		    console.log("active");
		  }).on("denied", function(error) {
		    // Un document n'a pas réussi à se répliquer
		    console.log("On denied");
		    console.log(error);
		  }).on("error", function(error) {
		    // La réplication s'est arrêtée en raison d'une erreur irrécupérable
		    console.log("On error");
		    console.log(error);
		  })
	}




	// TEST AND DEBUG 
	public getDb()
	{
			return this._db.allDocs({include_docs: true}).catch((error) => 
		{
			console.error(error);
		});
	}
	public postDb()
	{
		this._db.put(
		{
			_id:"ameliapcarpenter@dayrep.com",
			type:"user",
			name:"Amelia P. Carpenter",
			created:Date.now(),
			updated:Date.now(),
			points:0, 
			isAdmin:true 

		}).then((response) => 
		{
			console.log('response', response);
		})
		.catch((error) => 
		{
			console.error(error);
		});
	}
	public getOne() 
	{
		this._db.get('ameliapcarpenter@dayrep.com').then((doc) => 
		{
			console.log(doc);
		}).catch((err) =>
		{
			console.log(err); 
		});
	}
}
