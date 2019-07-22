import { Component, OnInit } from '@angular/core';

// SERVICES
import { CategoryService, SeoService, GoogleAnalyticsService } from '../../shared/services';

// ROUTER
import { Router } from '@angular/router';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'grocery',
	templateUrl: 'grocery.component.html',
})

// CLASS
export class GroceryComponent implements OnInit {

	public lists: any;

	constructor(
		public GS: GoogleAnalyticsService,
		private router: Router,
		private CS: CategoryService,
		private SS: SeoService) {
		// SEO
		this.SS.generateTags({
			title: 'All Groceries - grceri',
			description: 'See all the groceries sold online today, choose any of the available categories below to get started.',
			url: this.router.url
		});
	}

	ngOnInit() {
		// If no default value in Status input, set filter to empty array
		this.list();
	}

	list() {
		this.CS.getCat().then((r) => {
			this.lists = r && r[0] && r[0]['categories'] ? r[0]['categories'] : null;
		}).catch(err => {
			// promise rejection ==> need to handle the erro here
		});
	}

	gEvent(name) {
		this.GS.event('link', `Groceries - ${name} (Category)`, 'click', 1);
	}

	private url(i) {
		return i['name'].toLowerCase().replace(/(?:( and )|(&)|(,)|(\s)|[/])+/g, '-');
	}
}
