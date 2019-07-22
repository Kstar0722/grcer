import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// RXJS
import { Observable } from 'rxjs/Observable';

// ROUTER
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// SERVICES
import { CartService, AuthService, LocalStorage, UserService, SeoService } from '../../shared/services';

// INTERFACE
import { IProduct } from '../../shared/interfaces';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'cart',
	templateUrl: 'cart.component.html',
})

// CLASS
export class CartComponent implements OnInit {

	cartQty: Observable<number>;
	cartItems: IProduct;
	qty: any;
	items: any;
	recs: any;
	suggestedClick: boolean;

	quantity: Array<number> = [1, 2, 3, 4, 5, 6, 7];

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private CS: CartService,
		public AS: AuthService,
		private US: UserService,
		private LS: LocalStorage,
		private http: HttpClient,
		private SS: SeoService,
		private router: Router) {
		this.cartQty = this.totalQuantity();
		this.suggestedClick = true;

		this.userSaved();
	}

	ngOnInit() {
		this.meta();
	}

	public meta() {
		this.cartItems = this.LS.get('cart');

		if (this.cartItems == null) {
			this.SS.generateTags({
				title: 'Empty shopping list - grceri'
			});
		} else {
			if (this.totalQuantity() === 1) {
				this.SS.generateTags({
					title: this.cartQty + ' item in shopping list - grceri'
				});
			} else {
				this.SS.generateTags({
					title: this.cartQty + ' items in shopping list - grceri'
				});
			}
		};
	}

	public saveItem(i) {
		if(!this.AS.isAuthenticated()){
			this.router.navigate(['/login']);
			return false;
		}

		this.CS.saveItem(i);
		this.cartItems = this.LS.get('cart');

		let user_id = this.LS.get('user_id');
		if(user_id){
			let productObject = {
				uid: user_id,
				productID: i.productId
			};

			this.US.saveProduct(productObject).subscribe((res) => {
				if (res.status === 200) {
					console.log('Product saved');
				}
			})
		}
	}

	public product(i) {
		return i.toString().toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-{2,}/g, '-')
	}

	public qtyChange(i) {
		this.CS.updateCart(i);
		this.cartQty = this.totalQuantity();
		this.meta();
	}

	public removeItem(item: IProduct) {
		this.CS.removeFromCart(item);
		this.meta();
	}

	public totalQuantity() {
		return this.CS.getTotalQuantity();
	}

	public getTotalAmount() {
		return this.CS.getTotalAmount();
	}

	public getAmount(i) {
		return this.CS.getAmount(i);
	}

	public getTotalSavings() {
		return this.CS.getTotalSavings();
	}

	public getSavings(i) {
		return this.CS.getSavings(i);
	}

	public getHighestSavings(i) {
		return Math.max(...i);
	}

	public suggested(i) {
		this.suggestedClick = (i === 'saved') ? false : true;
		this.userSaved(i);
	}

	public userSaved(i?) {
		if (i == null) {
			this.http.get('/assets/json/products.json').subscribe(r => {
				this.items = r;
				this.recs = r;
			});
		}
		if (i === 'viewed') {
			this.http.get('/assets/json/products.json').subscribe(r => {
				this.items = r;
			});
		}
		if (i === 'saved') {
			if (this.AS.isAuthenticated()) {
				this.http.get('/assets/json/products.json').subscribe(r => {
					this.items = r;
				});
			}
		}
	}

	login(a) {
		if (isPlatformBrowser(this.platform)) {
			localStorage.setItem('authRedirect', a);
		}
		this.router.navigate(['/login']);
	}


	public addCart(i) {
		let a = this.items.filter(a => a.sem3_id !== i.sem3_id);
		let b;

		i.quantity = 1;

		if (this.items.length === 1) {
			b = [];
			this.items = b;
		} else {
			b = a;
			this.items = b;
		}

		this.CS.addToCart(i);
	}

}
