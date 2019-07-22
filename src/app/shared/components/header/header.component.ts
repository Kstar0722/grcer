import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// SERVICES
import { AuthService, CategoryService, GoogleAnalyticsService } from '../../../shared/services';

// ROUTER
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'header-app',
	templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
	// OBJECT
	lists: any;
	profile: any;
	classList: any[] = [];

	// BOOLEAN
	other = false;
	clear = false;
	navIsFixed = false;
	expanded: boolean;
	isCategoriesDropdownHidden = true;

	// STRING
	currentUrl: any = '';
	searchInputText: string;

	constructor(
		public GS: GoogleAnalyticsService,
		private AS: AuthService,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		public sanitizer: DomSanitizer,
		private CS: CategoryService
	) {
		this.searchInputText = '';
	}

	onNewInput(input) {
		if (input === this.searchInputText) {
			this.searchInputText = input + '*##1*1##*';
		} else {
			this.searchInputText = input;
		}
	}

	logOut() {
		this.AS.logout();
	}

	login() {
		return this.AS.isAuthenticated();
	}

	isUser(value: string): boolean {
		return /^\/user(\/|$)/.test(value);
	}

	private url(i) {
		return i['name'].toLowerCase().replace(/(?:( and )|(&)|(,)|(\s)|[/])+/g, '-');
	}

	photoURL(i) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(i);
	}

	ngOnInit() {
		this.list();
		if (this.AS.userProfile) {
			this.profile = this.AS.userProfile;
		} else {
			if (this.AS.isAuthenticated()) {
				this.AS.getProfile((err, profile) => {
					this.profile = profile;

					if (err) {
						this.router.navigate(['/login']);
					}
				});
			}
		}
	}

	isStripe(value: string): boolean {
		let boolean: boolean;
		if (
			value === '/'
		) {
			boolean = true;
		} else {
			boolean = false;
		}

		return boolean;
	}

	list() {
		this.CS.getCat().then((r) => {
			this.lists = r[0]['categories'];
		}).catch(err => {
			// promise rejection ==> need to handle the erro here
		});
	}

	gEvent(name) {
		this.GS.event('link', `Header - ${name} (Category)`, 'click', 1);
	}
}
