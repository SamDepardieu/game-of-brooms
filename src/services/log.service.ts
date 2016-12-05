import { Injectable } from '@angular/core'


@Injectable()
export class LogService
{

	private _userLog: Object; 

	constructor()
	{

	}

	public get userLog(): Object 
	{
		return this._userLog; 
	}

	public set userLog(newLog: Object)
	{
		this._userLog = newLog; 
	}

}