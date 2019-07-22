import { Component, AfterViewInit, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, NgZone, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl, SelectMultipleControlValueAccessor, NgForm } from '@angular/forms';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from "ngx-stripe";

// SERVICES
import { GoogleAnalyticsService } from '../../../../../shared/services';


@Component({
	selector: 'credit-card',
	templateUrl: 'credit-card.component.html'
})

export class CreditCardComponent implements AfterViewInit, OnInit, OnDestroy {
	// SIGN UP
	@Input('email') email: string;
	@Input('password') password: string;

	// STRIPE
	@ViewChild('form') Form: ElementRef
	@ViewChild('cardInfo') cardInfo: ElementRef

	// AUTOCOMPLETE
	@ViewChild('city') private city: ElementRef
	@ViewChild('state') private state: ElementRef
	@ViewChild('zip') private zip: ElementRef


	billing: FormGroup;

	express: any;
	paymentRequest: any;
	cardHandler = this.onChange.bind(this);
	error: string;
	amount: string;
	name: string;

	// STRIPE
	elements: Elements;
	card: StripeElement;

	// STRIPE - optional parameters
	elementsOptions: ElementsOptions = {
		locale: 'es'
	};

	constructor(
		private GS: GoogleAnalyticsService,
		private fb: FormBuilder,
		private cd: ChangeDetectorRef,
		private route: ActivatedRoute,
		private stripeService: StripeService,
		private ngZone: NgZone) {
	}

	ngOnInit() {
		this.billing = this.fb.group({
			name: ['', Validators.required],
			address: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			zip: ['', Validators.required],
		});

		this.stripeService.elements(this.elementsOptions)
			.subscribe(elements => {
				this.elements = elements;
				// Only mount the element the first time
				if (!this.card) {
					this.card = this.elements.create('card', {
						style: {
							base: {
								iconColor: '#666EE8',
								color: '#31325F',
								lineHeight: '40px',
								fontWeight: 300,
								fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
								fontSize: '18px',
								'::placeholder': {
									color: '#CFD7E0'
								}
							}
						}
					});
					this.card.mount('#card-element');
				}
			});

		this._gEvent();
	}

	ngAfterViewInit() {

		// let style = {
		// 	base: {
		// 		color: '#32325d',
		// 		lineHeight: '20px',
		// 		padding: '0 15px',
		// 		height: '52px',
		// 		border: '2px solid #d0d0d0',
		// 		margin: '0 0 24px 0',
		// 		fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
		// 		fontSmoothing: 'antialiased',
		// 		fontSize: '16px',
		// 		'::placeholder': {
		// 			color: '#aab7c4'
		// 		}
		// 	},
		// 	invalid: {
		// 		color: '#fa755a',
		// 		iconColor: '#fa755a'
		// 	}
		// };
		//
		//
		// this.card = elements.create('card', {style: style});
		// this.card.mount(this.cardInfo.nativeElement);
		//
		// this.card.addEventListener('change', this.cardHandler);
		//
		//
		// this.paymentRequest = stripe.paymentRequest({
		// 	currency: 'usd',
		// 	country: 'US',
		// 	total: {
		// 		amount:  this.amount,
		// 		label: this.plan.toUpperCase()
		// 	},
		// 	requestPayerEmail: true,
		// 	requestPayerName: true,
		//
		// });
		//
		// this.paymentRequest.on('token', function (result) {
		// 	let FORM = document.querySelector('.billing');
		// 	FORM.classList.add('submitted');
		// 	result.complete('success');
		// });
		//
		// this.express = elements.create('paymentRequestButton', {
		// 	paymentRequest: this.paymentRequest,
		// 	style: {
		// 		paymentRequestButton: {
		// 			theme: 'light'
		// 		}
		// 	}
		// });
		//
		// this.mountButton()
	}

	buy() {
		const name = this.billing.get('name').value;
		this.stripeService
			.createToken(this.card, { name })
			.subscribe(result => {
				if (result.token) {
					// Use the token to create a charge or a customer
					// https://stripe.com/docs/charges
					console.log(result.token);
				} else if (result.error) {
					// Error creating the token
					console.log(result.error.message);
				}
			});
	}

	async mountButton() {
		const result = await this.paymentRequest.canMakePayment();

		if (result) {
			this.express.mount('#express');
		} else {
			console.error('https support only for express payment');
		}

	}

	ngOnDestroy() {
		// this.card.removeEventListener('change', this.cardHandler);
		// this.card.destroy();
	}

	onChange({ error }) {
		if (error) {
			this.error = error.message;
		} else {
			this.error = null;
		}
		this.cd.detectChanges();
	}

	async click(form) {
		const { token, error } = await stripe.createToken(this.card);

		if (error) {
			console.log('Something is wrong:', error);
		} else {
			console.log('Success!', token);
			// ...send the token to the your backend to process the charge
		}
	}

	private _gEvent() {
		let option = {
			'checkout_step': 2
		}

		this.GS.commerce('set_checkout_option', option);
	}
}
