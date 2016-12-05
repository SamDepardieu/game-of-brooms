// Angular Import 
import { Injectable } from '@angular/core';

// Services import 
import { PouchDBService } from './pouchdb.service'; 

@Injectable()
/**
 * The TaskService class / service 
 * @type {TaskService}
 */
export class TaskService
{
	/**
	 * The local db var 
	 * @type {PouchDB}
	 */
	private _db; 

	/**
	 * The TaskService constructor 
	 * @param {PouchDBService} private pouchdbService Service use to call pouchDB methods 
	 */
	constructor(private pouchdbService: PouchDBService)
	{
		this._db = this.pouchdbService.db; 
	}


	public getAll(): any 
	{

	}

	public validate(): any 
	{}

	/**
	 * Get a task function 
	 * @param  {string} id The id of a task 
	 * @return {any}       Object with the docs 
	 */
	public get(id: string): any  
	{
		return this._db.get(id).then((response) => 
		{
			return response;
		}).catch((error) =>
		{
			throw error; 
		});
	}

	/**
	 * Add a task function 
	 * @param  {Object} obj The task to add 
	 * @return {any}        Object with the docs 
	 */
	public add(obj: Object): any 
	{
		return this._db.put(obj).then((response) => 
		{
			return response;
		}).catch((error) =>
		{
			throw error; 
		});
	}

	/**
	 * Remove a task function 
	 * @param  {string} doc The task to remove
	 * @return {any}        Object with the docs 
	 */
	public remove(doc: string): any
	{
		return this._db.remove(doc).then((response) => 
		{
			return response;
		}).catch((error) =>
		{
			throw error; 
		});
	}
}

// task
// {
//     "_id":"text hash autogen", // on a un truc pertinant ? le nomgroupe + timestamp mili ?
//     "type":"task",
//     "name":"text",
//     "description":"text",
//     "state":"text list(todo,doing,redo,done)", // etat de la tache
//     "created":1234, // int / timestamp
//     "updated":1234, // int / timestamp, last modif
//     "deadline":1234, // int / timestamp
//     "points":1234, // int / value of task
//     // @TODO userId create &co

//     "group":"groupe name _id",
//     "owner":"address mail _id",
//     "maker":"address mail _id",
//     "checker":"address mail _id", // on fait un array là ?

// }