// Angular Import 
import { Injectable } from '@angular/core';

// Services import 
import { PouchDBService } from './pouchdb.service'; 

// Declare emit for map reduce 
declare var emit: any;

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

	/**
	 * Get all the tasks for the page 
	 * @return {any} [description]
	 */
	public getAll(): any 
	{
		function mapFunction(doc)
		{
			emit(doc.type);
		}

		this._db.query(mapFunction, 
		{
			key: 'task',
			include_docs: true
		}).then((result) =>
		{
			console.log(result);
		}).catch((err) =>
		{
			console.error(err);
		});
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
