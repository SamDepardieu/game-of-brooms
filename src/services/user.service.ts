// Angular Import 
import { Injectable } from '@angular/core';

// Services Import  
import { PouchDBService } from './pouchdb.service'; 

// Declare var emit for map reduce 
declare var emit: any;

@Injectable()
/**
 * The UserService class / service 
 * @type {UserService}
 */
export class UserService
{
	/**
	 * The local db var 
	 * @type {PouchDB}
	 */
	private _db;

	/**
	 * The UserService constructor 
	 * @param {PouchDBService} private pouchdbService Service use to call pouchDB methods
	 */
	constructor(private pouchdbService: PouchDBService)
	{
		this._db = this.pouchdbService.db;
	}

	/**
	 * Get a user function 
	 * @param  {string} id The mail of user 
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
	 * Add a user function 
	 * @param  {Object} obj The complete doc to send to db
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
	 * Remove a user function 
	 * @param  {Object} doc The complete doc to remove 
	 * @return {any}        Object with the docs 
	 */
	public remove(doc: Object): any 
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
