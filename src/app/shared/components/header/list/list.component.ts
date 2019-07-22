import { Component, OnInit } from '@angular/core';

// RXJS
import { Observable } from 'rxjs/Observable';

// SERVICES
import { CartService, LocalStorage, GoogleAnalyticsService } from '../../../services';

@Component({
	selector: 'shopping-list',
	templateUrl: './list.component.html'
})
export class ShoppingListComponent implements OnInit {

	constructor(
		public GS: GoogleAnalyticsService,
		private CS: CartService,
		protected LS: LocalStorage) {
	}

	ngOnInit() {
	}

	public totalQuantity(): Observable<number> {
		return this.CS.getTotalQuantity();
	}
}
