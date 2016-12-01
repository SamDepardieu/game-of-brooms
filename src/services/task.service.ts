import { Injectable } 															from '@angular/core';
import { Headers, Http, Response, RequestOptions } 	from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { GlobalConfig } from '../config/global.var.config';

@Injectable()
export class TaskService {
	private apiUrl = GlobalConfig.API_URL + '/task';
	public headers = new Headers({ 'Content-Type': 'application/json' });
	public options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http)
	{ }

	public getTasks(): any {
		return this.http.get(this.apiUrl)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	public addTask(obj: Object): any {
		let dataString = JSON.stringify(obj);

		return this.http.post(this.apiUrl, dataString, this.options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}

	public deleteTask(id: string): any {
		return this.http.delete(this.apiUrl + '/' + id, this.options)
			.map((res: Response) => res.json())
			.catch((error: any) => Observable.throw(error.json() || 'Server error'));
	}
}
