import { Group } from './group'

export class Member
{
	id: number;
	groupId: number; 
	name: string;
	points: number;
	isAdmin: number;

	constructor(id: number, groupId: number, name: string, points: number, isAdmin: number)
	{
		this.id = id;
		this.groupId = groupId;
		this.name = name; 
		this.points = points; 
		this.isAdmin = isAdmin;
	}
}