import { Component } from '@angular/core';

// SEO
import { Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'payment',
	templateUrl: 'info.component.html'
})

// CLASS
export class BillingInfoComponent {

	constructor(
		title: Title) {
			title.setTitle('Payment - grceri');
		}
}
