import { Injectable } 															from '@angular/core';
import { Headers, Http, Response, RequestOptions } 	from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable	} from 'rxjs/Rx';

import { GlobalConfig } from '../config/global.var.config';

@Injectable()
export class UserService
{
	private apiUrl = GlobalConfig.API_URL+'/member';
	public headers = new Headers({'Content-Type':'application/json'});
	public options = new RequestOptions({headers: this.headers});

	constructor(private http: Http)
	{ }

	public getUsers(): any
	{
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((err:any) => 'Server error');
	}

	public addUser(obj: Object): any
	{
		let data = JSON.stringify(obj);

		return this.http.post(this.apiUrl, data, this.options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));
	}

	public deleteUser(id: string): any
	{
		return this.http.delete(this.apiUrl+'/'+id, this.options)
		.map((res:Response) => res.json())
		.catch((error:any) => Observable.throw(error.json() || 'Server error'));
	}
}
