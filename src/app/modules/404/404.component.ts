import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SeoService } from '../../shared/services';
import { Meta } from '@angular/platform-browser';
@Component({
	moduleId: module.id,
	selector: 'not-found',
	templateUrl: '404.component.html'
})
export class NotFoundComponent {
	constructor(
		private SS: SeoService,
		private meta: Meta,
		private router: Router) {
		// SEO
		this.SS.generateTags({
			title: '404 | Grceri',
			description: 'Looks like this page you have written doesn`t exist, please try again',
			url: this.router.url
		});
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
	}
}
