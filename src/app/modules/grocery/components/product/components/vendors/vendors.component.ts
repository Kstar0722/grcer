import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

// SERVICES
import { GoogleAnalyticsService, API } from '../../../../../../shared/services';

// INTERFACES
import { IProductVendors } from '../../../../../../shared/interfaces/product/product-vendors.interface';

// RXJS
import { Subject, Subscription } from 'rxjs';

@Component({
	selector: 'product-vendors',
	templateUrl: 'vendors.component.html',
})
export class ProductVendorsComponent implements OnInit, OnDestroy {
	// INPUT
	@Input() productID: number;

	// OUTPUT
	@Output() getProductVendorsOutput: EventEmitter<any> = new EventEmitter<any>();

	// BOOLEAN
	moreVendor = false;

	// SUBJECTS
	private productVendors$ = new Subject<IProductVendors>();

	// SUBSCRIPTIONS
	productVendorsSubscription: Subscription;

	vendors: IProductVendors;

	constructor(
		public GS: GoogleAnalyticsService,
		private api: API) {
	}

	ngOnInit() {
		this.processProductVendorsSubscription();
	}

	ngOnDestroy() {
		if (this.productVendorsSubscription) {
			this.productVendorsSubscription.unsubscribe();
		}
	}

	gEvent(is: any) {
		this.GS.event('button', `Vendor Offer - ${is.vendor} (${is.websiteName})`, 'click', 1);
	}

	private processProductVendorsSubscription() {
		// this.api.getProductVendors(this.productID).then((res) => {
		// 	this.productVendors$.next(res);
		// }).catch((error) => error);

		// this.renderProductVendorsSubscriptionDataToComponent();

		this.api.getProductVendors(this.productID).subscribe(res => {
			this.vendors = res;

			this.getProductVendorsOutput.emit(this.vendors);
		});
	}

  /**
	* Get product vendors subscription data and render to component
	*/
	private renderProductVendorsSubscriptionDataToComponent() {
		this.productVendorsSubscription = this.productVendors$.subscribe(res => {
			this.vendors = res;

			this.getProductVendorsOutput.emit(this.vendors);

			console.log('Product Vendors', res);
		});
	}

	private checkVendorFreeShipping(shippingCost: any) {
		if (!shippingCost || isNaN(shippingCost)) {
			return true;
		} else {
			return false;
		}
	}
}
