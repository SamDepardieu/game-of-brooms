import { Injectable } from '@angular/core';
import { GlobalConfig } from '../config/global.var.config'; 
import { PouchDBService } from './pouchdb.service'; 

@Injectable()
export class UserService
{
	private _db;

	constructor(private pouchdbService: PouchDBService)
	{
		this._db = this.pouchdbService.db;
	}

	public get(id: string): any
	{
		return this._db.get(id).then((response) => 
		{
			return response;
		}).catch((error) =>
		{
			throw error; 
		});;
	}

	public add(obj: Object): any
	{
		this._db.put(obj).then((response) => 
		{
			return response;
		}).catch((error) =>
		{
			throw error; 
		});
	}

	public delete(id: string): any
	{
	}
}
