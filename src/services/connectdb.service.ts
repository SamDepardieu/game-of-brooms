import { Injectable } from '@angular/core';

@Injectable()
export class ConnectDBService
{
	public foods
	constructor()
	{

	}

	public doTheJob(): void
	{
		console.log('hello Im a service !');
	}
}