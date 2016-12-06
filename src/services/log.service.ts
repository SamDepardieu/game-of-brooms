import { Injectable } from '@angular/core'


@Injectable()
export class LogService
{

	private _userLog; 

	constructor()
	{

	}

	public get userLog() 
	{
		return this._userLog; 
	}

	public set userLog(newLog)
	{
		this._userLog = newLog; 
	}

}