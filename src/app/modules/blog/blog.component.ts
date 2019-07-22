import { Component, OnInit } from '@angular/core';

// ROUTER
import { Router } from '@angular/router';

// SERVICES
import { SeoService } from '../../shared/services';

@Component({
	moduleId: module.id,
	selector: 'blog',
	templateUrl: 'blog.component.html'
})
export class BlogComponent implements OnInit {
	focus: boolean;
	fixed: boolean;

	constructor(
		public router: Router,
		private SS: SeoService
	) {
		// SEO
		this.SS.generateTags({
			title: 'Pricing - grceri',
			description: 'The official Grceri blog. Read stories about collaboration, the future of work, and what’s new from the team at Grceri.',
			url: this.router.url
		});
	}

	ngOnInit() {
	}

	showS(i) {
		this.focus = true;
	}
	hideS(i) {
		this.focus = false;
	}

	search(i) {
		this.router.navigate(['/blog/search/' + i]);
	}

}
