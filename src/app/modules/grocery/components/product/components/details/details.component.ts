import {
	Component, OnInit, OnChanges, Inject, PLATFORM_ID,
	EventEmitter, Input, Output, OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// BOOTSTRAP MODAL
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// COMPONENT
import { CartModalComponent } from '../cart-modal/cart-modal.component';

// ROUTER
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// INTERFACES
import { IProductDetails } from '../../../../../../shared/interfaces/product/product-details.interface';

// SERVICES
import { API, CartService, AuthService, UserService, LocalStorage, GoogleAnalyticsService } from '../../../../../../shared/services';

// RXJS
import { Subject, Subscription } from 'rxjs';

@Component({
	selector: 'product-details',
	templateUrl: 'details.component.html',
})
export class ProductDetailsComponent implements OnInit, OnChanges, OnDestroy {
	// INPUT
	@Input() productID: number;
	@Input() productVendors: any[];
	@Input() productImages: object;

	// OUTPUT
	@Output() getProductDetailsOutput: EventEmitter<any> = new EventEmitter<any>();

	// SUBSCRIPTIONS
	productDetailsSubscription: Subscription;
	userInformationSubscription: Subscription;
	cartListModalSubscription: Subscription;

	product: IProductDetails;
	vendorsPrice: number[];

	// SAVE
	saved: boolean;
	watched0: boolean;
	compared = [];
	comparedO = [];

	// SUBJECT
	private productDetails$ = new Subject<IProductDetails>();
	private userInformation$ = new Subject<any>();

	bsModalRef: BsModalRef;
	savings: number;
	addToListButtonText: string;
	productAddedToList: boolean;

	constructor(
		public GS: GoogleAnalyticsService,
		private router: Router,
		private route: ActivatedRoute,
		private urlSerializer: UrlSerializer,
		private api: API,
		private CS: CartService,
		private http: HttpClient,
		private AS: AuthService,
		private LS: LocalStorage,
		private US: UserService,
		private modalService: BsModalService,
		public sanitizer: DomSanitizer,
		@Inject(PLATFORM_ID) private platform: any) {
		this.addToListButtonText = 'Add to List';
		this.productAddedToList = false;
		this.vendorsPrice = [];
	}

	ngOnInit() {
		this.assignImagesToProduct();
		this.checkProductIsAddedToCart();
		this.processProductDetailsSubscription();
		this.processUserInformationSubscription();
	}

	ngOnChanges() {
		this.assignImagesToProduct();
		this.checkProductIsAddedToCart();
		this.processProductSavingsFromVendors();
	}

	ngOnDestroy() {
		if (this.productDetailsSubscription) {
			this.productDetailsSubscription.unsubscribe();
		}
		if (this.userInformationSubscription) {
			this.userInformationSubscription.unsubscribe();
		}
	}

	gEvent(is: string, type: string) {
		this.GS.event(`${type}`, `Product ${is} - ${this.product.title} (${this.product.product_id})`, 'click', 1);

		if (is === 'Add to List') {
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

			this.GS.commerce('add_to_cart', productF);
		}
	}

	/**
	* Assign product images to popup modal
	*/
	private assignImagesToProduct() {
		if (this.product && this.productImages) {
			this.product.images = this.productImages['images'];
		}
	}

	/**
	* Get vendors information from API and store calculated savings information
	*/
	private processProductSavingsFromVendors() {
		if (this.productVendors !== undefined) {
			if (this.productVendors.length <= 0) {
				this.savings = 0;
				return false;
			}

			let vendors: object[] = this.productVendors;
			let vendorsLength = vendors.length;

			for (let i = 0; i < vendorsLength; i++) {
				this.vendorsPrice.push(vendors[i]['vendorPrice']);
			}

			this.calculateSavings(this.vendorsPrice);
		}
	}

	/**
	* Calculate savings from vendors information
	*/
	private calculateSavings(vendorsPrice: number[]) {
		let minPrice = Math.min(...vendorsPrice);
		let maxPrice = Math.max(...vendorsPrice);

		if (this.product) {
			this.savings = maxPrice - this.product.vendorPrice;
			this.savings = Math.round(this.savings * 100) / 100;

			this.product['vendorsPrice'] = vendorsPrice;
			this.product['savings'] = this.savings;
		}
	}

	/**
	* Check product is already added to cart and change button status
	*/
	private checkProductIsAddedToCart() {
		let cartList = this.LS.get('cart');
		if (cartList && cartList.length > 0) {
			cartList.forEach((product) => {
				if (product.productId === this.productID) {
					this.productAddedToList = true;
					this.addToListButtonText = 'Added to List';
				}
			});
		}
	}

	/**
	* Process product details data from API
	*/
	private processProductDetailsSubscription() {
		// this.api.getProductDetails(this.productID).then((res) => {
		// 	this.productDetails$.next(res);
		// }).catch((error) => error);

		// this.renderProductDetailsSubscriptionDataToComponent();

		this.api.getProductDetails(this.productID).subscribe(res => {
			this.product = res;

			if (this.savings !== undefined && (this.savings >= 0)) {
				this.product['vendorsPrice'] = this.vendorsPrice;
				this.product['savings'] = this.savings;
			} else {
				this.processProductSavingsFromVendors();
			}

			this.assignImagesToProduct();

			this.getProductDetailsOutput.emit(this.product);
		});
	}

	/**
	* Process user information from API
	*/
	private processUserInformationSubscription() {
		if (this.AS.isAuthenticated()) {
			let user_id = this.LS.get('user_id');
			if (user_id) {
				this.US.getUserInformation(user_id).subscribe((res) => {
					this.userInformation$.next(res);
				})

				this.renderUserInformationSubscriptionDataToComponent();
			}
		}
	}

	/**
	* Get product details subscription data and render to component
	*/
	private renderProductDetailsSubscriptionDataToComponent() {
		// this.productDetailsSubscription = this.productDetails$.subscribe(res => {
		// 	console.log('Product Details', res);

		// 	this.product = res;

		// 	if (this.savings !== undefined && (this.savings >= 0)) {
		// 		this.product['vendorsPrice'] = this.vendorsPrice;
		// 		this.product['savings'] = this.savings;
		// 	} else {
		// 		this.processProductSavingsFromVendors();
		// 	}

		// 	this.assignImagesToProduct();

		// 	this.getProductDetailsOutput.emit(this.product);
		// });
	}

	/**
	* Get user information from API and set whether product is saved
	* or added to watchlist
	*/
	private renderUserInformationSubscriptionDataToComponent() {
		this.userInformationSubscription = this.userInformation$.subscribe(res => {
			let data = JSON.parse(res._body);
			let savedDataList: number[] = data.saved;
			let watchDataList: number[] = data.watchlist;

			console.log('Saved', savedDataList);
			console.log('Watched', watchDataList);

			if (savedDataList && savedDataList.length > 0) {
				savedDataList.forEach((value) => {
					if (value === this.productID) {
						this.saved = true;
					}
				});
			}

			if (watchDataList && watchDataList.length > 0) {
				watchDataList.forEach((value) => {
					if (value === this.productID) {
						this.watched0 = true;
					}
				});
			}
		});
	}

	/**
	* After product is added to cart, render popup to show cart product list
	*/
	private cartListModal() {
		let cartList = this.LS.get('cart');
		let initialState: object = {};

		initialState = cartList ? { list: cartList, productID: this.productID } : { list: [], productID: this.productID };

		this.bsModalRef = this.modalService.show(CartModalComponent, { initialState });
		this.cartListModalSubscription = this.modalService.onHide.subscribe((reason: string) => {
			this.manuallyUnsubscribeModalService();
		});
		this.bsModalRef.content.closeBtnName = 'Close';

		this.productAddedToList = true;
		this.addToListButtonText = 'Added to List';
	}

	/**
	* Unsubscribe modal service
	*/
	private manuallyUnsubscribeModalService() {
		this.cartListModalSubscription.unsubscribe();
	}

	/**
	* Add a product to cart list
	*/
	public addToList(product: IProductDetails) {
		if (product && !this.productAddedToList) {
			this.CS.addToCart(product);
			this.removeSaveAndWatchlist();
			this.cartListModal();
			// this.getProductDetailsOutput.emit(true);
		}
	}

	login(a, b) {
		if (b === 'save') {
			if (isPlatformBrowser(this.platform)) {
				localStorage.setItem('authRedirect', a + '?save' + this.product.product_id);
			}
			this.router.navigate(['/login']);
		}
		if (b === 'login') {
			if (isPlatformBrowser(this.platform)) {
				localStorage.setItem('authRedirect', a);
			}
			this.router.navigate(['/login']);
		}
		if (b === 'watchlist') {
			if (isPlatformBrowser(this.platform)) {
				localStorage.setItem('authRedirect', a + '?watchlist=' + this.product.product_id);
			}
			this.router.navigate(['/login']);
		}
	}

	/**
	* Save/Remove a product from Save for later
	*/
	save(i) {
		let user_id = this.LS.get('user_id');
		if (user_id) {
			let productObject = {
				uid: user_id,
				productID: i.productId
			};

			if (this.saved) {
				this.US.deleteProduct(productObject).subscribe((res) => {
					console.log('Product Deleted', res);
					if (res.status === 200) {
						this.saved = false;
					}
				})
			} else {
				this.US.saveProduct(productObject).subscribe((res) => {
					console.log('Product Saved', res);
					if (res.status === 200) {
						this.saved = true;
						this.removeCurrentProductFromCart();
					}
				})
			}
		}
	}

	/**
	* Upon clicking "Save for later" or "Add to watchlist" remove the item from
	* cart and enable "Add to list" button
	*/
	private removeCurrentProductFromCart() {
		let itemRemoved = this.CS.removeItemFromCart(this.productID);

		console.log('Item Removed', itemRemoved);

		if (itemRemoved) {
			this.addToListButtonText = 'Add to List';
			this.productAddedToList = false;
		}
	}

	/**
	* Upon clicking "Add to list" button
	* enable "Save for later" or "Add to watchlist"
	*/
	private removeSaveAndWatchlist() {
		let user_id = this.LS.get('user_id');
		if (user_id) {
			let productObject = {
				uid: user_id,
				productID: this.productID
			};

			if (this.saved) {
				this.US.deleteProduct(productObject).subscribe((res) => {
					console.log('Product Deleted', res);
					if (res.status === 200) {
						this.saved = false;
					}
				})
			}

			if (this.watched0) {
				this.US.removeFromWatchList(productObject).subscribe((res) => {
					console.log('Removed from watchlist', res);
					if (res.status === 200) {
						this.watched0 = false;
					}
				});
			}
		}
	}

	compare(item) {
		let e = this.comparedO.find(r => r.product_id === item.product_id);
		let i = this.comparedO.findIndex(r => r.product_id === item.product_id);

		if (e) {
			this.compared.splice(i, 1);
			this.comparedO.splice(i, 1);
		} else {
			this.compared.push(item.product_id);
			this.comparedO.push(item);
		}
		this.LS.set('compare', this.comparedO);
	}

	productqty(i) {
		this.product.quantity = i;
	}

	comparedF(item): boolean {
		let e = this.comparedO.find(r => r.product_id === item);
		if (e) {
			return true;
		} else {
			return false;
		}
	}

	/**
	* Add/Remove product from watchlist
	*/
	watchlist(i) {
		let user_id = this.LS.get('user_id');
		if (user_id) {
			let productObject = {
				uid: user_id,
				productID: i.productId
			};

			if (this.watched0) {
				this.US.removeFromWatchList(productObject).subscribe((res) => {
					console.log('Removed from watchlist', res);
					if (res.status === 200) {
						this.watched0 = false;
					}
				});
			} else {
				this.US.saveToWatchList(productObject).subscribe((res) => {
					console.log('Added to watchlist', res);
					if (res.status === 200) {
						this.watched0 = true;
						this.removeCurrentProductFromCart();
					}
				});
			}
		}
	}

	/**
	* Create router link for Brand filter query parameters
	*/
	routeCatagoryPageRouterLink(category, subCategory) {
		let categoryURL: any[] = ['/groceries'];

		if (category) {
			categoryURL.push(this.url(category));
		}
		if (subCategory) {
			categoryURL.push(this.url(subCategory));
		}

		return categoryURL;
	}

	/**
	* Create Brand filter query parameters
	*/
	routeCatagoryPageQueryParameters(brand) {
		let categoryURLParams: object = {};

		if (brand) {
			let brandArray: string[] = [];
			brandArray.push(brand);
			let brandString: string = encodeURIComponent(JSON.stringify(brandArray));
			categoryURLParams = {
				Brand: brandString
			};
		}

		return categoryURLParams;
	}

	/**
	* Create url route from given string
	*/
	private url(i) {
		return i.toLowerCase().replace(/(?:( and )|(&)|(,)|(\s)|[/])+/g, '-');
	}
}
