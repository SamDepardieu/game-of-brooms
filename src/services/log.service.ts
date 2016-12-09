// Angular Import 
import { Injectable } from '@angular/core'


@Injectable()
/**
 * The LogService class / service 
 * @type {[type]}
 */
export class LogService
{

	/**
	 * The user log data 
	 * @type {any}
	 */
	private _userLog; 

	/**
	 * The LogService constructor 
	 */
	constructor()
	{

	}

	/**
	 * _userLog getter
	 */
	public get userLog() 
	{
		return this._userLog; 
	}

	/**
	 * _userLog setter 
	 * @param {any} newLog The new user log 
	 */
	public set userLog(newLog)
	{
		this._userLog = newLog; 
	}

}