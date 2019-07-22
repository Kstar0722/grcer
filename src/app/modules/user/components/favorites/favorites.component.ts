import { Component, OnInit } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'favorites',
	templateUrl: 'favorites.component.html',
})

// CLASS
export class FavoritesComponent implements OnInit {
	constructor(
		private meta: Meta,
		private title: Title) {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('My Favorites - grceri');
	}


	ngOnInit() {
		// If no default value in Status input, set filter to empty array
	}


}
