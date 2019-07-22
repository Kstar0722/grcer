import { Component, OnInit } from '@angular/core';

// ROUTER
import { Router } from '@angular/router';

// COMPONENT
import { ItemComponent } from '../../shared/components/item/item.component';

// SERVICES
import { AuthService, CMSService, CategoryService, SeoService, GoogleAnalyticsService } from '../../shared/services';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'home-app',
	templateUrl: 'home.component.html',
})

// CLASS
export class HomeComponent implements OnInit {
	moreC = false;

	howListOne: boolean;
	howListTwo: boolean;
	howListThree: boolean;
	howListFour: boolean;

	items: any;
	category: any;

	// CMS
	latest: any;

	// S - DATA
	schema = {
		'@context': 'http://schema.org',
		'@type': 'WebSite',
		'url': 'https://grceri.com/',
		'potentialAction': {
			'@type': 'SearchAction',
			'target': 'https://grceri.com/search?cat_id=&query={search_term_string}',
			'query-input': 'required name=search_term_string'
		}
	}

	constructor(
		public GS: GoogleAnalyticsService,
		public router: Router,
		private AS: AuthService,
		private IC: ItemComponent,
		private CMS: CMSService,
		private CS: CategoryService,
		private SS: SeoService) {
		// SEO
		this.SS.generateTags({
			title: 'Online Grocery Shopping Store | Online Grocery Database - grceri',
			description: 'Shop Online for best Grocery products like Baking, beverages, coffee, frozen food, Condiments, Sauces & spices, Gift baskets, Gluten Free, International, and kosher foods.',
			url: this.router.url
		});

		// IF LOGGED IN
		if (this.AS.isAuthenticated()) {
			// REDIRECT TO GROCERIES PAGE
			this.router.navigate(['/user']);
		}
	}

	ngOnInit() {
		this.list();
		this.products();
	}

	login() {
		return this.AS.isAuthenticated();
	}

	list() {
		this.CS.getCat().then(r => {
			this.category = r && r[0] && r[0]['categories'] ? r[0]['categories'] : null;
		}).catch(err => {
			// promise rejection ==> need to handle the erro here
		})
	}

	products() {
		this.CS.getProducts().subscribe(data => {
			if (data && data !== undefined) {
				this.items = data;
			}
		});
	}

	url(i) {
		return i['name'].toLowerCase().replace(/(?:( and )|(&)|(,)|(\s)|[/])+/g, '-');
	}

	moreCat() {
		this.moreC = !this.moreC;
	}

	lower(i) {
		return i.toLowerCase();
	}

	product(i) {
		return this.IC.product(i);
	}

	gEvent(name) {
		this.GS.event('image', `Home - ${name} (Category)`, 'click', 1);
	}
}
