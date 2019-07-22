import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// ROUTER
import { ActivatedRoute, Router } from '@angular/router';

// SERVICE
import { CartService, AuthService, LocalStorage, UserService } from '../../../../../../shared/services';

// INTERFACE
import { IProduct } from '../../../../../../shared/interfaces';

@Component({
	selector: 'product-added',
	templateUrl: 'added.component.html',
})
export class ProductAddedComponent implements OnInit {
	// TOGGLE
	@Output() open = new EventEmitter<boolean>(true);

	@Input() added: IProduct;
	@Input() productID: number;

	addedToCart: boolean;
	product: any;
	cartQty: Observable<number>;

	items: any;

	constructor(
		private CS: CartService,
		private AS: AuthService,
		private LS: LocalStorage,
		private US: UserService,
		private http: HttpClient,
		private router: Router
	) { }

	ngOnInit(): void {
		// DIALOG
		this.cartQty = this.totalQuantity();

		this.product = this.added;
		// this.products();
	}

	public products() {
		this.http.get('/assets/json/products.json').subscribe(r => {
			this.items = r;
		});
	}

	dialog(i) {
		if (i === 'close') {
			this.open.emit(false);
		}
	}

	public totalQuantity(): Observable<number> {
		return this.CS.getTotalQuantity();
	}

	public getTotalAmount(): Observable<number> {
		return this.CS.getTotalAmount();
	}

	public getTotalSavings(): Observable<number> {
		return this.CS.getTotalSavings();
	}

	/**
	* If user is logged in add the product to shopping list else redirect to login
	*/
	createShoppingList(){
		if(!this.AS.isAuthenticated()){
			this.router.navigate(['/login']);
			this.open.emit(false);
		} else {
			this.saveToShoppingList();
		}
	}

	/**
	* Add current product to shopping list
	*/
	saveToShoppingList(){
		let user_id = this.LS.get('user_id');
		if (user_id) {

			let productObject = {
				uid: user_id,
				productID: this.productID
			};

			this.US.saveToShoppingList(productObject).subscribe((res) => {
				console.log('Added to Shopping List', res);

				this.open.emit(false);
			})
		}
	}
}
