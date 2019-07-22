import { Component, Input } from '@angular/core';

// SERVICE
import { SocialService } from '../../../../../../shared/services';

// INTERFACES
import { IProductDetails } from '../../../../../../shared/interfaces';

// ROUTER
import { Router } from '@angular/router';

@Component({
	selector: 'product-social',
	templateUrl: 'social.component.html',
})
export class ProductSocialComponent {
	@Input() meta: IProductDetails;

	constructor(
		private router: Router,
		private SS: SocialService) {
	}

	social(a) {
		return this.SS.social(a, this.meta, 'product', this.router.url);
	}
}
