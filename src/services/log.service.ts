// Angular import
import { Injectable } from '@angular/core'

import { Member } from '../classes/member';

@Injectable()
export class LogService {

	private _userLog;

	constructor() {

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
