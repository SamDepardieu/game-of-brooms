import { Injectable } from '@angular/core';
import { Member } from '../pages/classes/member';


@Injectable()
export class LogService
{

	private member: Member; 

	constructor()
	{

	}

	public setData(data): void 
	{
		this.member = new Member(parseInt(data[0]), parseInt(data[1]), data[2], parseInt(data[3]), parseInt(data[4]));
	}

	public getData(): Member
	{
		return this.member; 
	}
}