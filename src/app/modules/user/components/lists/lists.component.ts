import { Component, OnInit } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';


@Component({
	moduleId: module.id,
	selector: 'lists',
	templateUrl: 'lists.component.html'
})

// CLASS
export class ListsComponent implements OnInit {
	COpened = false;

	constructor(
		private meta: Meta,
		private title: Title) {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('My Lists - grceri');
	}

	ngOnInit() {

	}
}
