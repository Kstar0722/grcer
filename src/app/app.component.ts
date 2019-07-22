import { Component, ViewEncapsulation, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// SEO
import { Meta } from '@angular/platform-browser';

// ROUTER
import { Router, NavigationEnd } from '@angular/router';

// SERVICES
import { LinkTagService, AuthService } from './shared/services';

// declare ga as a function to set and sent the events
declare let ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		@Inject(PLATFORM_ID) private platformId: Object,
		public router: Router,
		private TS: LinkTagService,
		public AS: AuthService,
		private meta: Meta
	) {
		this.meta.addTags([{ name: 'author', content: 'Grceri' }]);

		this._analytics();
	}

	ngOnInit() {
		this._meta();
	}

	isHeaderURLS(value: string): boolean {
		let boolean: boolean;
		if (
			value.startsWith('/callback') !== true &&
			value !== '/sign-up' &&
			value !== '/sign-up/basic' &&
			value !== '/sign-up/elite' &&
			value !== '/login' &&
			value !== '/forgot-password'
		) {
			boolean = true;
		} else {
			boolean = false;
		}

		return boolean;
	}

	isFooterURLS(value: string): boolean {
		let boolean: boolean;
		if (
			value.startsWith('/callback') !== true &&
			value !== '/sign-up' &&
			value !== '/sign-up/basic' &&
			value !== '/sign-up/elite' &&
			value !== '/register' &&
			value !== '/login' &&
			value !== '/forgot-password'
		) {
			boolean = true;
		} else {
			boolean = false;
		}

		return boolean;
	}

	private _meta() {
		this.router.events.filter(event => event instanceof NavigationEnd).subscribe((res: NavigationEnd) => {
			if (isPlatformBrowser(this.platform)) {
				window.scrollTo(0, 0);
			}

			this.TS.updateTag({ rel: 'canonical', href: `https://grceri.com${res.url}` });
		});
	}

	private _analytics() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd && isPlatformBrowser(this.platformId)) {
				ga('set', 'page', event.urlAfterRedirects);
				ga('send', 'pageview');
			}
		});
	}
}
