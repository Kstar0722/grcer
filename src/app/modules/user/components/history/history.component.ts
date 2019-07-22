import { Component } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'history',
	templateUrl: 'history.component.html',
})

// CLASS
export class HistoryComponent {
	constructor(
		private meta: Meta,
		private title: Title) {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('My History - grceri');
	}
}
