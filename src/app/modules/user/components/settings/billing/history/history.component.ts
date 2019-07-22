import { Component } from '@angular/core';

// SEO
import { Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'history',
	templateUrl: 'history.component.html'
})

// CLASS
export class BillingHistoryComponent {

	constructor(
		title: Title) {
		title.setTitle('History - grceri');
	}
}
