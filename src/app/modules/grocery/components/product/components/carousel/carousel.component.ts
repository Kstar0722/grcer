import {
	Component, Input, Output, OnInit,
	OnDestroy, AfterViewInit,
	EventEmitter, ElementRef, ViewChild, Renderer2
} from '@angular/core';

// SERVICES
import { API } from '../../../../../../shared/services/api/api.service';

// INTERFACES
import { IProductImages } from '../../../../../../shared/interfaces/product/product-images.interface';

// rxjs
import { Subject, Subscription } from 'rxjs';

// DOM
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'product-carousel',
	templateUrl: 'carousel.component.html',
})
export class ProductCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
	// INPUT
	@Input() productID: number;

	// OUTPUT
	@Output() getCarouselImagesOutput: EventEmitter<any> = new EventEmitter<any>();

	// PAGINATION
	@ViewChild('pag') UL: ElementRef;
	@ViewChild('item') ITEM: ElementRef;

	// CLICK HANDLERS
	@ViewChild('left') leftC: ElementRef;
	@ViewChild('right') rightC: ElementRef;

	// INTERFACES
	product: IProductImages;

	// PRODUCT
	activeProduct: any;

	// CALCULATIONS
	shownItems: number;
	length: number;
	item: number;
	totalWidth: number;
	marginLeft: number;

	// ARROWS
	left: boolean;
	right: boolean;

	// SUBJECTS
	private productImages$ = new Subject<IProductImages>();

	// SUBSCRIPTIONS
	productImagesSubscription: Subscription;

	constructor(private api: API, private renderer: Renderer2, public sanitizer: DomSanitizer) {
		this.shownItems = 5;
	}

	ngOnInit() {
		this.processProductCarouselSubscription();
	}

	ngAfterViewInit() {
		if (this.product && this.product.count > 1 && this.UL) {
			this._calculateItems();
		}
	}

	ngOnDestroy() {
		if (this.productImagesSubscription) {
			this.productImagesSubscription.unsubscribe();
		}
	}

	/**
	* Process product carousel data from API
	*/
	private processProductCarouselSubscription(){
		// this.api.getProductImages(this.productID).then((res) => {
		// 	this.productImages$.next(res);
		// }).catch((error) => error);

		// this.renderProductImagesSubscriptionDataToComponent();

		this.api.getProductImages(this.productID).subscribe(res => {
			this.product = res;

			this.getCarouselImagesOutput.emit(this.product.images);

			this.activeProduct = this.product['images'] ? this.product['images'][0]['original'] : undefined;

			this.resetULUponHavingImages();
		});
	}

	/**
	* Get product images subscription data and render to component
	*/
	private renderProductImagesSubscriptionDataToComponent(){
		// this.productImagesSubscription = this.productImages$.subscribe(res => {
		// 	console.log('Product Images', res);

		// 	this.product = res;

		// 	this.getCarouselImagesOutput.emit(this.product.images);

		// 	this.activeProduct = this.product['images'] ? this.product['images'][0]['original'] : undefined;

		// 	this.resetULUponHavingImages();
		// });
	}

	/**
	* Reset thumbnail ul element upon having images for carousel
	*/
	private resetULUponHavingImages() {
		// RESET UL
		if (this.product.count > 1 && this.UL) {
			this.renderer.removeStyle(this.UL.nativeElement, 'margin-top');

			if (this.leftC || this.rightC) {
				// RESET PAG
				this._resetPag();
			}
		}
	}

	_rightHandler = this.carouselRight.bind(this);
	_leftHandler = this.carouselLeft.bind(this);

	carouselLeft() {
		this.marginLeft += this.item;
		this._movePag(this.marginLeft);
		this._calculatePag();
	}

	carouselRight() {
		this.marginLeft -= this.item;
		this._movePag(this.marginLeft);
		this._calculatePag();
	}

	private _calculateItems() {
		// BASIC CONFIGURATION
		this.item = this.ITEM.nativeElement.offsetHeight;

		// RESET PAG
		this._resetPag();
	}

	private _resetPag() {
		this.length = this.product.count;
		this.totalWidth = (this.length * this.item) - (this.item * this.shownItems);
		this.marginLeft = 0;

		if (this.length > this.shownItems) {
			this.renderer.addClass(this.rightC.nativeElement, 'active');
			this.renderer.removeClass(this.leftC.nativeElement, 'active');
			this.rightC.nativeElement.addEventListener('click', this._rightHandler);
		}
	}

	private _activeProducts(i) {
		this.activeProduct = i;
	}

	private _calculatePag() {
		if (Math.abs(this.marginLeft) !== this.totalWidth) {
			this.renderer.addClass(this.rightC.nativeElement, 'active');
			this.rightC.nativeElement.addEventListener('click', this._rightHandler);

			if (this.marginLeft !== 0) {
				this.renderer.addClass(this.leftC.nativeElement, 'active');
				this.leftC.nativeElement.addEventListener('click', this._leftHandler);
			} else {
				this.renderer.removeClass(this.leftC.nativeElement, 'active');
				this.leftC.nativeElement.removeEventListener('click', this._leftHandler);
			}
		} else {
			this.renderer.removeClass(this.rightC.nativeElement, 'active');
			this.rightC.nativeElement.removeEventListener('click', this._rightHandler);

			if (this.marginLeft === 0) {
				this.renderer.removeClass(this.leftC.nativeElement, 'active');
				this.leftC.nativeElement.removeEventListener('click', this._leftHandler);
			} else {
				this.renderer.addClass(this.leftC.nativeElement, 'active');
				this.leftC.nativeElement.addEventListener('click', this._leftHandler);
			}
		}
	}

	private _movePag(i) {
		this.renderer.setStyle(this.UL.nativeElement, 'margin-top', i + 'px');
	}
}
