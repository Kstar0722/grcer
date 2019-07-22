import { Component } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'lists-single',
	templateUrl: 'single.component.html'
})

// CLASS
export class ListsSingleComponent {
	constructor(
		private meta: Meta,
		private title: Title) {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('List Title | Lists - grceri');
	}

}
