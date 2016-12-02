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
		this._db.get(id).then((doc) =>
		{
			console.log(doc);
		}).catch((error) =>
		{
			console.error(error);
		});
	}

	public add(obj: Object): any
	{
		this._db.put(JSON.stringify(obj)).then((response) => 
		{
			console.log(response);
		}).catch((error) =>
		{
			console.error(error); 
		});
	}

	public delete(id: string): any
	{
	}
}
