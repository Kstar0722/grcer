import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// SERVICES
import { CMSService, SeoService } from '../../shared/services';

// SEO
import { Meta } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'policies',
	templateUrl: 'policies.component.html',
})

// CLASS
export class PoliciesComponent implements OnInit {
	title: any;
	url: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private CMS: CMSService,
		private SS: SeoService,
		private meta: Meta
	) {
	}

	ngOnInit(): void {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

		this.route.firstChild.url.subscribe((urlPath) => {
			this.url = urlPath[urlPath.length - 1].path;

			this.CMS.post('policy', this.url).then((r) => {
				let a = r[0].data;

				// TITLE
				this.title = a.title[0].text

				// SEO
				this.SS.generateTags({
					title: this.title + ' - grceri'
				});

			});
		});
	}

}
