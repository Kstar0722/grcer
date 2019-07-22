import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// RXJS
import { Observable } from 'rxjs';

// HTTP
import { HttpClient } from '@angular/common/http';

// SERVICES
import { LocalStorage } from '../local-storage/local-storage.service';

// INTERFACES
import { IProduct } from '../../../shared/interfaces';

@Injectable()
export class CartService {
	private cartObj = [];

	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		protected LS: LocalStorage,
		private http: HttpClient) {
		if (isPlatformBrowser(this.platform)) {
			if (localStorage.getItem('cart') !== null) {
				this.cartObj = JSON.parse(localStorage.getItem('cart'));
			}
		}
	}

	public saveItem(item: IProduct) {
		this.removeFromCart(item);

		// this.http.post('', item).subscribe();
	}

	public addToCart(item: IProduct) {
		this.updateCartList();

		let e = this.cartObj.find(r => r.productId === item.productId);
		let i = this.cartObj.indexOf(item);

		if (e) {
			// e.quantity = e.quantity + item.quantity;
			e.quantity = 1;
			if(i >= 0)
				this.cartObj[i] = e;
			// this.cartObj[i].savings = this.getSavings(e);
		} else {
			item.quantity = 1;
			// item.savings = this.getSavings(item);
			this.cartObj.push(item);
		}

		this.LS.set('cart', this.cartObj);
	}

	public updateCartList(){
		let currentCartList = this.LS.get('cart');

		this.cartObj = currentCartList == null ? [] : currentCartList;
	}

	public removeFromCart(item: IProduct) {
		this.updateCartList();

		let a = this.cartObj.filter(i => i.productId != item.productId);
		let b: any[];

		if (this.cartObj.length === 1) {
			b = [];
			this.cartObj = b;
		} else {
			b = a;
			this.cartObj = b;
		}

		this.LS.set('cart', b);
	}

	public updateCart(item: IProduct) {
		let e = this.cartObj.find(r => r.sem3_id === item.sem3_id)
		let i = this.cartObj.findIndex(r => r.sem3_id === item.sem3_id);

		if (e) {
			this.cartObj[i] = e;
			this.cartObj[i].savings = this.getSavings(e);

			this.LS.set('cart', this.cartObj);
		}
	}

	public updateQty(item: IProduct) {
		let e = this.cartObj.find(r => r.sem3_id === item.sem3_id)
		let i = this.cartObj.findIndex(r => r.sem3_id === item.sem3_id);

		if (e) {
			e.quantity += 1;
			this.cartObj[i] = e;
			this.cartObj[i].savings = this.getSavings(e);

			this.LS.set('cart', this.cartObj);
		}
	}

	public getItems(): Observable<IProduct> {
		return this.LS.get('cart');
	}

	public getTotalQuantity() {
		let cartList = this.LS.get('cart');
		let cartQuantity: any;

		if (isPlatformBrowser(this.platform)) {
			if (cartList) {
				cartQuantity = cartList.map(i => i.quantity).reduce((prev, next) => prev + next, 0);
			} else {
				cartQuantity = null;
			}

			return cartQuantity;
		}
	}

	public getTotalAmount() {
		let cartList = this.LS.get('cart');
		let	d;

		if(cartList){
			let b = cartList.map(i => Math.ceil(i.vendorPrice * 100) / 100).reduce((prev, next) => prev + next, 0);
			let c = 1;
			d = Math.ceil((b * c) * 100) / 100;
		}

		return d;
	}

	public getTotalSavings() {
		let cartList = this.LS.get('cart');
		let cartSavings: any;
		if(cartList) {
			if (cartList.length === 1) {
				cartSavings = cartList[0].savings;
			} else {
				cartSavings = cartList
										  .filter(i => i.savings > 0)
											.map(i => Math.round(i.savings * 100) / 100)
											.reduce((prev, next) => prev + next, 0);

				cartSavings = Math.round(cartSavings * 100) / 100;
			}
		}

		return cartSavings;
	}

	public removeItemFromCart(productID: number): boolean{
		let cartList = this.LS.get('cart');
		if(cartList) {
			let newCartList = cartList.filter(i => i.productId != productID);

			if(cartList.length > newCartList.length){
				this.LS.set('cart', newCartList);
				return true;
			}
		}

		return false;
	}

	public getSavings(item) {
		let b: any;
		let c: any;
		let e: any;
		let f: number;
		let g: any;
		let h: any;

		g = item.vendorPrice;
		b = item.quantity;
		c = item.savings;

		// e = Math.max.apply(Math, c);

		f = Math.ceil((e - g) * 100) / 100;
		h = (f * b).toFixed(2);

		return h;
	}

	public getHighestSavings(item): Observable<any> {
		let b: any;
		let c: any;
		let e: any;
		let f: any;

		b = item.quantity;
		c = item.savings;

		// e = Math.max.apply(null, c);

		f = c * b;

		return f;
	}

	public getAmount(item) {
		let a: any;
		let b: any;
		let c: any;

		a = item.quantity;
		b = item.vendorPrice;
		c = Math.ceil((a * b) * 100) / 100;

		return c;
	}
}
