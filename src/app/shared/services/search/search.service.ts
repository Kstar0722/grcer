import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

const products = '/api/products/';

@Injectable()
export class SearchService {
	constructor(private http: HttpClient) { }

	/**
  * Search products by category/UPC type
  */
	searchProducts(category: any, type: string, search: string) {
		return new Promise((resolve, reject) => {
			let request_url: string;

			request_url = (type !== '') ?
				`${products}search?type=${type}&search=${search}` :
				`${products}search?category=${category}&search=${search}`;

			this.http.get(request_url).subscribe(
				(res) => {
					resolve(res);
				},
				(err) => {
					reject(err);
				}
			);
		});
	}

	private _errorHandler(error: Response) {
		console.error(error);
		return Observable.throw(error || 'Server Error');
	}
}
