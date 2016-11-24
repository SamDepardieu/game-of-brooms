import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService
{
	private apiUrl = 'http://10.176.50.45/www/brooms/api.php/member';
	constructor(private http: Http)
	{

	}

	public getUsers()
	{
		return this.http.get(this.apiUrl)
		.map((res:Response) => res.json())
		.catch((err:any) => 'Server error'); 
	}
}