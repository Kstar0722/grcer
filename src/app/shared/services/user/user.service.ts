import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';

// RXJS
import { Observable } from 'rxjs/Observable';

// ROUTER
import { Router } from '@angular/router';

// HTTP
import { Http } from '@angular/http';

const api = '/api/';

@Injectable()
export class UserService {
	constructor(
		@Inject(PLATFORM_ID) private platform: any,
		private router: Router,
		private http: Http) {
	}

	/**
	* Set product status as viewed
	*/
	setProductStatusViewed(obj: any = {}) {
		return this.http.post(`${api}users/setProductStatusViewed`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Save product for later
	*/
	saveProduct(obj: any = {}) {
		return this.http.post(`${api}users/saveProduct`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Delete product from list
	*/
	deleteProduct(obj: any = {}) {
		return this.http.delete(`${api}users/${obj.uid}/deleteProduct/${obj.productID}`).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Save product to watchlist
	*/
	saveToWatchList(obj: any = {}) {
		return this.http.post(`${api}users/saveToWatchList`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Save product to watchlist
	*/
	removeFromWatchList(obj: any = {}) {
		return this.http.delete(`${api}users/${obj.uid}/removeFromWatchList/${obj.productID}`).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Save product to shopping list
	*/
	saveToShoppingList(obj: any = {}) {
		return this.http.post(`${api}users/saveToShoppingList`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Get user information
	*/
	getUserInformation(product_id: number) {
		return this.http.get(`${api}users/getUserInformation/${product_id}`).map((res: any) => res).catch(this._errorHandler);
	}

	private _errorHandler(error: Response) {
		console.error(error);
		return Observable.throw(error || 'Server Error');
	}
}
