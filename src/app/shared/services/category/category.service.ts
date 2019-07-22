import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { environment } from '../../../../environments/environment';

// ROUTER
import { Response } from '@angular/http';


@Injectable()
export class CategoryService {
	constructor(
		private http: HttpClient
	) { }

	getCat() {
		return new Promise((resolve, reject) => {
			let url = 'misc/assets/category';
			return this.http.get(environment.host + '/api/' + url).subscribe(
				(res) => {
					resolve(res);
				}, error => {
					reject(error);
				})
		})
	}

	formatted(i) {
		if (i) {
			return i.toString().toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-{2,}/g, '-');
		}
	}

	getProducts(): Observable<any> {
		return this.http.get(environment.host + '/assets/json/products.json')
			.do(data => {
				return data;
				// JSON.stringify(data);
			})
			.catch(this.handleError);
	}
	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof Error) {
			errorMessage = `An error occurred: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		// console.error(errorMessage);
		return of(null);
	}
}
