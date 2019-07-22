import { Component } from '@angular/core';

// SEO
import { Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'subscription',
	templateUrl: 'subscription.component.html'
})

// CLASS
export class BillingSubscriptionComponent {

	constructor(
		title: Title) {
			title.setTitle('Subscription - grceri');
	}
}
