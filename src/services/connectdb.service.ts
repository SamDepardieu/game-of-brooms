import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ConnectDBService
{
	private url = 'http://localhost:3000/api/fruits';
	constructor(private http: Http)
	{

	}

	public doTheJob(): void
	{
		console.log('hello Im a service !');
	}

	public doQuery()
	{
		return this.http.get(this.url)
		.map((res:Response) => res.json())
		.catch((error:any) => 'Server error');
	}

	public addTaskQuery()
	{
		let data = {"name": "leetchi","color": "maroon"}; 
		let dataString = JSON.stringify(data);
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.url, dataString, options)
		.map((res:Response) => res.json())
		.catch((error:any) => 'Server error');
	}

	public updateTaskQuery()
	{
		console.log('update a task');
	}

	public deleteTaskQuery()
	{
		console.log('delete task');
	}

	public getTasks()
	{
		console.log('get tasks');
	}

	public getTaskById()
	{
		console.log('get tasks by id');
	}
}