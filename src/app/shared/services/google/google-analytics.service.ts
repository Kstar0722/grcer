import { Injectable } from '@angular/core';

declare const ga: Function; // Declare ga as a function

@Injectable()
export class GoogleAnalyticsService {
	constructor() { }

	event(EC: string,	EA: string,	EL: string = null,	EV: number = null) {
		ga('send', 'event', {
			eventCategory: EC,
			eventLabel: EL,
			eventAction: EA,
			eventValue: EV
		});
	}

	commerce(type: string, data: Object) {
		ga('event', `${type}`, data);
	}
}
