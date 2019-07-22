import { Component } from '@angular/core';
import { Router } from '@angular/router';

// SERVICES
import { GoogleAnalyticsService } from '../../services';

@Component({
	moduleId: module.id,
	selector: 'footer-app',
	templateUrl: 'footer.component.html'
})
export class FooterComponent {
	constructor(
		public GS: GoogleAnalyticsService,
		public router: Router) {
	}
}
