import { Injectable } from '@angular/core';
import { GlobalConfig } from '../config/global.var.config'; 
import { PouchDBService } from './pouchdb.service'; 

@Injectable()
export class TaskService
{

	constructor()
	{

	}

	public getAll(): any 
	{}

	public get(id: string): any  
	{}

	public add(obj: Object): any 
	{}

	public delete(id: string): any
	{}
}