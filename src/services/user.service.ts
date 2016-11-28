import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import { GlobalConfig } from '../config/global.var.config'; 



@Injectable()
export class UserService
{
	private apiUrl = GlobalConfig.API_URL+'/member';
	constructor(private http: Http)
	{

	}

	public getUsers(): any
	{
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((err:any) => 'Server error'); 
	}

	public addUser(obj: Object): any
	{
		let data = JSON.stringify(obj);
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.apiUrl, data, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));

	}
}