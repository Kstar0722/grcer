import { Component, OnInit } from '@angular/core';

// ROUTER
import { Router, ActivatedRoute } from '@angular/router';

// INTERFACES
import { IHeader } from '../../interfaces/blog.interface';

// SERVICES
import { CMSService, SeoService } from '../../../../shared/services';

@Component({
	moduleId: module.id,
	selector: 'blog-category',
	templateUrl: 'category.component.html'
})
export class BlogCategoryComponent implements OnInit {
	b: IHeader;
	newA: any;

	constructor(
		private route: ActivatedRoute,
		public router: Router,
		private CMS: CMSService,
		private SS: SeoService) {
		this.route.params.subscribe(r => {
			let a = r.cat;

			if (a === 'new-at-grceri') {
				this.b = {
					title: 'New at Grceri',
					desc: 'Announcements, updates, releases, and more'
				}
			} else if (a === 'tips-tricks') {
				this.b = {
					title: 'Tips & Tricks',
					desc: 'Know-how to help you get more out of Grceri'
				}
			} else if (a === 'healthier-decisions') {
				this.b = {
					title: 'Healthier Decisions',
					desc: 'Food Tips for a healthier lifestyle'
				}
			}

			// SEO
			this.SS.generateTags({
				title: this.b.title + ' | The Official Grceri Blog',
				description: this.b.desc,
				url: this.router.url
			});

			this.CMS.posts(a).then((res) => {
				this.newA = res;
			});
		})
	}

	ngOnInit() { }

	private lower(i) {
		return i.toLowerCase();
	}
}
