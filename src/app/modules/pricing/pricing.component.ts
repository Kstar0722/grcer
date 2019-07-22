import { Component, OnInit } from '@angular/core';

// SERVICES
import { AuthService, SeoService, GoogleAnalyticsService } from '../../shared/services';

// ROUTER
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'pricing',
	templateUrl: 'pricing.component.html'
})
export class PricingComponent implements OnInit {

	constructor(
		public GS: GoogleAnalyticsService,
		private AS: AuthService,
		private SS: SeoService,
		private router: Router) {
		// SEO
		this.SS.generateTags({
			title: 'Our Pricing - grceri',
			description: 'Simple Monthly pricing plans to start saving money over time with our advanced grocery search. Buy groceries, Beverages, Fresh Food, Breakfast & Cereal Online.',
			url: this.router.url
		});

		// IF LOGGED IN
		if (this.AS.isAuthenticated()) {
			// REDIRECT TO GROCERIES PAGE
			this.router.navigate(['/user']);
		}
	}

	ngOnInit() {

	}

	login() {
		return this.AS.isAuthenticated();
	}
}
