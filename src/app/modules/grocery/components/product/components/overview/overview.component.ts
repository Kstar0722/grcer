import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

// COMPONENT
import { ProductComponent } from '../../product.component';

// SERVICES
import { API } from '../../../../../../shared/services/api/api.service';

// INTERFACES
import { IProductOverview } from '../../../../../../shared/interfaces/product/product-overview.interface';

// rxjs
import { Subject, Subscription } from 'rxjs';

@Component({
	selector: 'product-overview',
	templateUrl: 'overview.component.html',
})
export class ProductOverviewComponent implements OnInit, OnDestroy, OnDestroy {
	@Input() productID: number;

	// OUTPUT
	@Output() getOverview: EventEmitter<any> = new EventEmitter<any>();

	private productOverview$ = new Subject<IProductOverview>();

	productOverviewSubscription: Subscription;

	data: IProductOverview;

	constructor(private PC: ProductComponent, private api: API) {
	}

	ngOnInit(): void {
		this.processProductOverviewSubscription();
	}

	ngOnDestroy(): void {
		if (this.productOverviewSubscription) {
			this.productOverviewSubscription.unsubscribe();
		}
	}

	/**
	* Process product carousel data from API
	*/
	private processProductOverviewSubscription() {
		this.api.getProductOverview(this.productID).subscribe((res) => {
			this.productOverview$.next(res);
		});

		this.renderProductOverviewSubscriptionDataToComponent();
	}

	/**
	* Get product overview subscription data and render to component
	*/
	private renderProductOverviewSubscriptionDataToComponent() {
		this.productOverviewSubscription = this.productOverview$.subscribe(res => {
			console.log('Product Overview', res);

			this.data = res;

			this.emitOutputDataToParentComponent();
		});
	}

	/**
	* When subscription is done output data to parent component
	*/
	private emitOutputDataToParentComponent() {
		let outputData = {
			brand: this.data.brand,
			description: this.data.description
		}

		this.getOverview.emit(this.data);
	}

	scrollReview() {
		return this.PC.scrollReview();
	}

	urlPart(i) {
		if (i) {
			return i.toString().toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-{2,}/g, '-')
		}
	}

}
