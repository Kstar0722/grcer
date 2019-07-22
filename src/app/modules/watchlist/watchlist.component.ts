import { Component, OnInit } from '@angular/core';

// SEO
import { Meta, Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'watchlist',
	templateUrl: 'watchlist.component.html'
})
export class WatchlistComponent implements OnInit {

	constructor(
		private meta: Meta,
		private title: Title) {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('My Watchlists - grceri');
	}

	ngOnInit() {}

}
