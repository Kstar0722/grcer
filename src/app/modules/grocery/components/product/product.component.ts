import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// ROUTER
import { ActivatedRoute, Router } from '@angular/router';

// INTERFACES
import { IProductDetails, IProductImages, IProductOverview, IProductSocial, IProductVendors } from '../../../../shared/interfaces';

// SERVICES
import { LocalStorage, SeoService, UserService, AuthService, GoogleAnalyticsService } from '../../../../shared/services';

// RXJS
import { Subscription } from 'rxjs';

@Component({
	selector: 'product',
	templateUrl: 'product.component.html',
})
export class ProductComponent implements OnInit, OnDestroy {
	public product: IProductDetails;
	public Cproduct: IProductImages;
	public Oproduct: IProductOverview;
	public Sproduct: IProductSocial;
	public Vproduct: IProductVendors;

	// REVIEW
	@ViewChild('review') Review: ElementRef;

	// QTY
	public qty: Array<number> = [2, 3, 4, 5, 6, 7];
	public qtyDefault: Array<number> = [1];

	// DIALOG
	addedO: boolean;
	feedbackO: boolean;
	watchedO: boolean;
	feedbackSO = [];

	// SLIDERS
	items: any;

	// PRODUCT
	currentProductId: number;

	// DIET
	dietMinus: boolean;
	dietPlus: boolean;

	// SUBSCRIPTIONS
	routerSubscription: Subscription;
	productCompareSubscription: Subscription;

	constructor(
		private GS: GoogleAnalyticsService,
		private route: ActivatedRoute,
		private router: Router,
		private http: HttpClient,
		private AS: AuthService,
		private LS: LocalStorage,
		private SS: SeoService,
		private US: UserService,
		@Inject(PLATFORM_ID) private platform: any
	) {
		// this.products();

		this.addedO = false;
		this.feedbackO = false;
		this.watchedO = false;

		this.Sproduct = {};
		// this.Cproduct = {};
		this.Oproduct = {};

		// this.productCompareSubscription = this.LS.get('compare').subscribe((r) => {
		// 	if (r) {
		// 		this.comparedO = r;
		// 	} else {
		// 		this.comparedO = [];
		// 	}
		// });
	}

	ngOnDestroy() {
		if (this.routerSubscription) {
			this.routerSubscription.unsubscribe();
		}
		if (this.productCompareSubscription) {
			this.productCompareSubscription.unsubscribe();
		}
	}

	ngOnInit() {
		this.processRouterSubscription();
	}


	/**
	* Get carousel images as Output from Images API request
	*/
	getCarouselComponent(data) {
		this.Cproduct = {}
		this.Cproduct['images'] = data;
		this.Sproduct['images'] = data;

		if (this.product) {
			this._setMetaTag();
		}
	}

	/**
	* Get Overview component data as Output after API request
	*/
	// getOverviewComponent(data) {
	// 	if (this.product && this.Cproduct.images) {
	// 		this.setMetaTag();
	// 	}
	// }

	/**
	* Get details component data as Output after API request
	*/
	getProductDetailsComponent(data) {
		this.product = data;

		this.Sproduct['title'] = this.product.title;
		this.Sproduct['category'] = this.product.category;
		this.Sproduct['brand'] = this.product.brand;

		if (this.Cproduct && this.Cproduct.images) {
			this.product['images'] = this.Cproduct.images;
			this._setMetaTag();
			this._gEvent();
		}
	}

	/**
	* Get vendors component data as Output after API request
	*/
	getProductVendorsComponent(data){
		this.Vproduct = data;
	}

	private _gEvent() {
		// GOALS
		this.GS.event('event', `Product Viewed - ${this.product.title} (${this.product.product_id})`, 'none', 1);

		// ECOMMERCE
		let productF = {
			'items': [
				{
					'id': this.product.product_id,
					'name': this.product.title,
					'brand': this.product.brand,
					'category': this.product.category,
					'price': this.product.price,
				}
			]
		}

		this.GS.commerce('view_item', productF);
	}

	/**
	* Set meta tag after required subscriptions are done
	*/
	private _setMetaTag() {
		// SEO
		this.SS.generateTags({
			title: 'Buy Online ' + this.product.title + ' - grceri',
			description: 'Shop online ' + this.product.title + 'at affordable rates from Grceri' + this.Sproduct['category'] + 'Store',
			card: 'summary_large_image',
			image: this.Cproduct['images'][0]['original'],
			type: 'product',
			url: this.router.url
		});
	}

	/**
	* Process router subscription to get url parameter and process API requests
	*/
	private processRouterSubscription() {
		this.routerSubscription = this.route.params.subscribe(params => {
			this.currentProductId = params['product_id'];
			this.changeProductViewedStatus();
		});
	}

	/**
	* If user is logged in save the product as viewed
	*/
	private changeProductViewedStatus() {
		if (this.AS.isAuthenticated()) {
			let user_id = this.LS.get('user_id');
			let productObject = {
				uid: user_id,
				productID: this.currentProductId
			};

			this.US.setProductStatusViewed(productObject).subscribe((res) => {
				console.log('Product Viewed', res.ok);
			})
		}
	}

	/**
	* Separate product.title parameter and merge with new object
	*/
	private processProductTitleToMerge() {
		let productTitle: object = {};

		if (this.product !== undefined) {
			productTitle = {
				title: this.product.title
			};
		}

		return productTitle;
	}

	/**
	* Check objects set and merge them to one object
	*/
	private mergeObjects(obj, src) {
		if (obj === undefined) {
			return src;
		}
		if (src === undefined) {
			return obj;
		}

		Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
		return obj;
	}

	added(v): boolean {
		return this.addedO = v;
	}

	popup(i) {
		if (i === 'feedback') {
			this.feedbackO = true;
		}
	}

	feedback(a, b) {
		if (b === 'open') {
			this.feedbackO = a;
		} else {
			this.feedbackSO.push(a);
		}
	}

	feedbackS(item): boolean {
		let e = this.feedbackSO.find(r => r === item);
		if (e) {
			return true;
		} else {
			return false;
		}
	}

	watchedF(v): boolean {
		return this.addedO = v;
	}

	scrollReview() {
		this.Review.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
