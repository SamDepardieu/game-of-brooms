import { Group } from './group'

export class Member
{
	id: number;
	group: Group; 
	name: string;
	points: number;
	isAdmin: number;

	constructor(id: number, group: Group, name: string, points: number, isAdmin: number)
	{
		this.id = id;
		this.group = group;
		this.name = name; 
		this.points = points; 
		this.isAdmin = isAdmin;
	}
}