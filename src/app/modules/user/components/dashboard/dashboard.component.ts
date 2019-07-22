import { Component } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

// SERVICES
import { AuthService } from '../../../../shared/services';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'dashboard',
	templateUrl: 'dashboard.component.html',
})

// CLASS
export class DashboardComponent {
	profile: any;

	constructor(
		private meta: Meta,
		private title: Title,
		private AS: AuthService) {
		// TITLE
		this.title.setTitle('My Dashboard - grceri');
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

		if (this.AS.userProfile) {
			this.profile = this.AS.userProfile;
		} else {
			this.AS.getProfile((err, profile) => {
				this.profile = profile;
			});
		}

	}

}
