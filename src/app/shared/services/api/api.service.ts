import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// RXJS
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

const api = `${environment.host}/api/`;
const search = `${environment.host}/api/search`;

@Injectable()
export class API {
	constructor(private http: HttpClient) { }

	// PRODUCTS
	getProducts(id: string, cat: number, filter: string = '', order: string = '', pag: number) {
		return this.http.get(`${api}products?id=${id}&cat=${cat}&filter=${filter}&order=${order}&pag=${pag}`).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* Sidebar filter API request
	*/
	getSidebarFilters(id: string, cat: number) {
		return this.http.get(`${api}products/sidebarFilters?id=${id}&cat=${cat}`).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* API call for search page sidebar
	*/
	getSearchPageSidebar(id: number, text: string) {
		return this.http.get(`${api}search/sidebar?id=${id}&text=${text}`).map((res: any) => res).catch(this._errorHandler);
	}

	/**
	* API call for search page content
	*/
	getSearchPageContent(id: number, filter: string = '', order: string = '', text: string, page: number = 1) {
		return this.http.get(`${api}search/content?id=${id}&filter=${filter}&order=${order}&text=${text}&page=${page}`).map((res: any) => res).catch(this._errorHandler);
	}

	getProduct(upc: number) {
		return this.http.get(`${api}products/${upc}`).map((res: any) => res).catch(this._errorHandler);
	}

	getProductDetails(product_id: number) {
		return this.http.get(`${api}products/product/details/${product_id}`).map((res: any) => res).catch(this._errorHandler);
	}

	getProductImages(product_id: number) {
		return this.http.get(`${api}products/product/images/${product_id}`).map((res: any) => res).catch(this._errorHandler);
	}

	getProductNutrition(product_id: number) {
		return this.http.get(`${api}products/product/nutrition/${product_id}`).map((res: any) => res).catch(this._errorHandler);
	}

	getProductVendors(product_id: number) {
		return this.http.get(`${api}products/product/vendors/${product_id}`).map((res: any) => res).catch(this._errorHandler);
	}

	getProductOverview(product_id: number) {
		return this.http.get(`${api}products/product/overview/${product_id}`).map((res: any) => res).catch(this._errorHandler);
	}

	postFeedback(obj: any) {
		return this.http.post(`${api}/feedback/`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	// CART
	postSaved(upc: any) {
		return this.http.post(`${api}/saved/`, upc).map((res: any) => res).catch(this._errorHandler);
	}

	removeSaved(upc: any) {
		return this.http.delete(`${api}/saved/${upc}`).map((res: any) => res).catch(this._errorHandler);
	}

	// TRANSACTIONS
	getTransactions(pid: any) {
		return this.http.get(`${api}/profile/${pid}/transactions`).map((res: any) => res).catch(this._errorHandler);
	}

	getTransaction(pid: any, tid: any) {
		return this.http.get(`${api}/profile/${pid}/transactions/${tid}`).map((res: any) => res).catch(this._errorHandler);
	}

	postTransaction(tid: any, obj: any) {
		return this.http.post(`${api}/profile/transactions/${tid}`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	updateTransaction(pid: any, tid: any, obj: any) {
		return this.http.put(`${api}/profile/${pid}/transactions/${tid}`, obj).map((res: any) => res).catch(this._errorHandler);
	}

	// SIGNUP
	getEmail(val: string) {
		return this.http.get(api + 'users/email/' + val).map((res: any) => res).catch(this._errorHandler);
	}

	// USER
	getUser(uid: number) {
		return this.http.get(`https://grceri-api-prod.azurewebsites.net/api/users/${uid}/`).map((res: any) => res).catch(this._errorHandler);
	}

	deleteList(pid: any, id: any) {
		return this.http.delete(`${api}/profile/${pid}/lists/${id}`).map((res: any) => res).catch(this._errorHandler);
	}

	getList(uid: number, id: number) {
		return this.http.get(`${api}/user/${uid}/lists/${id}`).map((res: any) => res).catch(this._errorHandler);
	}

	getLists(uid: number) {
		return this.http.get(`${api}/user/${uid}/shoppinglist/`).map((res: any) => res).catch(this._errorHandler);
	}

	getWatchlists(uid: number) {
		return this.http.get(`${api}/user/${uid}/watchlist`).map((res: any) => res).catch(this._errorHandler);
	}

	getViewed(uid: number) {
		return this.http.get(`${api}/user/${uid}/viewed`).map((res: any) => res).catch(this._errorHandler);
	}

	getSaved(uid: number) {
		return this.http.get(`${api}/user/${uid}/saved`).map((res: any) => res).catch(this._errorHandler);
	}

	// SEARCH
	searchProducts(val: any) {
		return this.http.get(`${search}/${val}`).map((res: any) => res).catch(this._errorHandler);
	}

	private _errorHandler(error: Response) {
		console.error(error);
		return Observable.throw(error || 'Server Error');
	}
}
