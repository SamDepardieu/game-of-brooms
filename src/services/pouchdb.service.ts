import { Injectable } from '@angular/core';

import * as PouchDB from 'pouchdb';

@Injectable()
export class PouchDBService
{
	private db; 
	private remoteDb; 
	private dbSync;
	constructor()
	{

	}

	public createDb()
	{
		this.db = new PouchDB('test_db');
		console.log('db created'); 
		this.remoteDb = new PouchDB("http://192.168.43.190:8000/brooms");
		// this.remoteDb = new PouchDB("http://10.176.50.89:8000/brooms");
		console.log('db remote created');

		
	}

	public syncDb()
	{
this.dbSync = this.db.sync(this.remoteDb, 
		{
			live: true,
			retry: true
		});

		this.dbSync.on("change", function(info) {
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

	public getDb()
	{
			return this.db.allDocs({include_docs: true}).catch((error) => 
		{
			console.error(error);
		});
	}
	public postDb()
	{
		this.db.put(
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
		this.db.get('ameliapcarpenter@dayrep.com').then((doc) => 
		{
			console.log(doc);
		}).catch((err) =>
		{
			console.log(err); 
		});
	}
}

// user
// {
//     "_id":"address mail",
//     "type":"user",
//     "name":"text",
//     "created":1234, // int / timestamp
//     "updated":1234, // int / timestamp, last modif
//     "points":1234, // int
//     "isAdmin":true // bool
// }