import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import { GlobalConfig } from '../config/global.var.config'; 

@Injectable()
export class TaskService
{
	private apiUrl = GlobalConfig.API_URL+'/task';
	constructor(private http: Http)
	{
		
	}

	public getTasks()
	{
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((error:any) => 'Server error');
	}

	public addTask()
	{
		let dataString = JSON.stringify({"name": "leetchi","color": "maroon"});
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.apiUrl, dataString, options)
		.map((res:Response) => res.json())
		.catch((error:any) => 'Server error');
	}
}