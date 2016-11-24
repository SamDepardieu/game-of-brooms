import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class GroupService
{
	private apiUrl = 'http://10.176.50.45/www/brooms/api.php/group';
	constructor(private http: Http)
	{

	}

	public getGroups(): any
	{
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((error:any) => 'Server error'); 
	}

	public addGroup(name: string): any
	{
		let data = JSON.stringify({"name": ""+name+""});
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.post(this.apiUrl, data, options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));
	}
}