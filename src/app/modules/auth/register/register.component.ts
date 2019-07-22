import { Component, OnInit, Renderer, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// ROUTER
import { Router, ActivatedRoute } from '@angular/router';

// FORMGROUP
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

// ALERT
import { AlertComponent } from 'ngx-bootstrap';

// SERVICES
import { AuthService, API, SeoService, GoogleAnalyticsService } from '../../../shared/services';

@Component({
	selector: 'register',
	templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit, AfterViewInit {
	// SPINNER
	show: boolean;
	details: boolean;
	member: boolean;

	// SHOW FORMS
	showRegister: boolean;
	showPayment: boolean;
	submit: boolean;
	passwordRequirements: boolean;

	// FORMGROUP
	register: FormGroup;
	payment: FormGroup;

	// STRING
	plan: string;
	pType: string;

	// ELEMENTS
	@ViewChild('email') email: ElementRef;
	@ViewChild('pass') pass: ElementRef;

	// OBJECT
	message: Array<object> = [];
	access: Object = {};
	features: Object = []

	// VALIDATERS
	lowercase: boolean;
	uppercase: boolean;
	number: boolean;
	special: boolean;
	eight: boolean;
	plus50: boolean;

	constructor(
		private GS: GoogleAnalyticsService,
		public router: Router,
		private AS: AuthService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private api: API,
		private SS: SeoService,
		private renderer: Renderer) {

		// SEO
		this.SS.generateTags({
			title: 'Sign Up | Grceri',
			description: 'Get Started today! Start shopping for the best pricing groceries you love.',
			url: this.router.url
		});

		// BOOLEAN
		this.submit = false;
		this.show = false;
		this.showRegister = true;

		// PARAMS
		this.route.params.subscribe(params => {
			this.plan = params['plan'];
			if (this.plan) {
				this.member = true;

				if (this.plan === 'basic') {
					this.pType = 'For individuals using this service to save on multiple food purchases based on moderate online shopping.'
					this.features = [
						'Able to search by barcode, isnb, or upc.',
						'Create up to 5 shopping lists.',
						'Add up to 500 products to follow price changes.'
					]
				}
				if (this.plan === 'elite') {
					this.pType = 'For individuals to take advantage of every online purchase based on heavy online shopping.'
					this.features = [
						'Able to search by barcode, isnb, or upc.',
						'Create up to 50 shopping lists.',
						'Add up to 5,000 products to follow price changes.'
					]
				}
			} else {
				this.plan = 'free';
				this.pType = `For individuals wanting to use the service but wouldn't make a lot of online food purchases.`
				this.features = [
					'Create up to 1 shopping list.',
					'Add up to 10 products to follow price changes.'
				]
			};
		});
	}

	ngOnInit() {
		this._credentials();
		this._gEvent();
	}

	ngAfterViewInit() {
		// EMAIL FOCUS
		this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
	}

	private _credentials() {
		return this.register = this.fb.group({
			email: ['',
				[
					Validators.email,
					this._validateEmailNotTaken.bind(this)
				]
			],
			password: ['',
				[
					Validators.maxLength(49),
					Validators.minLength(8),
					this._validatePattern
				]
			]
		});
	}

	signup() {
		if (this.register.get('email').errors || this.register.get('password').errors) {
			return false;
		}

		this.submit = true;

		// VALUES
		let email = this.register.get('email').value;
		let password = this.register.get('password').value;

		if (this.plan === 'free') {
			this._access(20, false, true, 1, 10, true, true, true, true, false, false, false, false, '1 MB', 'standard', false, false);
			this.AS.signup(email, password, this.plan, this.access).subscribe(() => {
					this._alert('success', 'Your "' + this.plan + '"' + ' has been successfully created!');
					this.router.navigate(['/login']);
				},
				(err) => {
					this.submit = false;
					this._alert('danger', err['status'] + ' - ' + err['statusText'])
				}
			);
		} else {
			this.showPayment = true;
			this.showRegister = false;
		}
	}

	_password() {
		this.show = !this.show;
		this.renderer.invokeElementMethod(this.pass.nativeElement, 'focus');
	}

	_passwordChange(i) {
		let l = i.match('[a-z]');
		let u = i.match('[A-Z]');
		let n = i.match('[0-9]');
		let s = i.match('[!@#$%^&*()]');
		let e = i.length >= 8;
		let f = i.length === 50;

		if (l) {
			this.lowercase = true;
		} else {
			this.lowercase = false;
		}
		if (u) {
			this.uppercase = true;
		} else {
			this.uppercase = false;
		}
		if (n) {
			this.number = true;
		} else {
			this.number = false;
		}
		if (s) {
			this.special = true;
		} else {
			this.special = false;
		}
		if (e) {
			this.eight = true;
		} else {
			this.eight = false;
		}
		if (f) {
			this.plus50 = true;
		} else {
			this.plus50 = false;
		}
	}

	private _access(hi: number, bc: boolean, rec: boolean, pl: number, ps: number, ni: boolean, pc: boolean, rr: boolean, ap: boolean, fa: boolean, da: boolean, sn: boolean, dc: boolean, ud: string, s: string, na: boolean, de: boolean) {
		this.access = [
			{
			'Search & Intelligence': {
				'History': hi,
				'Barcode': bc,
				'Recommendations': rec
			},
			'Information Allowance': {
				'Product Lists': pl,
				'Products Saved': ps,
				'Nutritional Information': ni,
				'Product Comparison': pc,
				'Ratings & Reviews': rr,
				'Automated Pricing': ap
			},
			'User Insights': {
				'Food Analytics': fa,
				'Diet & Analysis': da,
				'Smart Notifications': sn,
				'Diet Congruence': dc
			},
			'Other benefits': {
				'User Data': ud,
				'Support': s
			},
			'Add Ons': {
				'No Advertisements': na,
				'Data Export': de
			}}
		]
	}

	private _alert(a: string, b: string) {
		this.message.push({
			type: a,
			value: b
		});
	}

	private _close(a: AlertComponent) {
		this.message = this.message.filter((i) => i !== a);
	}

	private _validateEmailNotTaken(control: AbstractControl) {
		let emailValidated = this.validateEmail(control.value);

		if (!emailValidated) {
			return { emailTaken: false };
		}

		return this.api.getEmail(control.value).subscribe((res: any) => {
			console.log('res', res);

			if (res.user) {
				control.setErrors({emailTaken: 'Oh noes, this email is already taken! Try another one.'});
				return { emailTaken: res.user };
			} else {
				control.setErrors(null);
				return { emailTaken: false }
			}
		});
	}

	private validateEmail(email) {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	private _validatePattern(c: AbstractControl) {
		let a = c.value;
		let l = a.match('[a-z]');
		let u = a.match('[A-Z]');
		let n = a.match('[0-9]');
		let s = a.match('[!@#$%^&*()]');

		return (l && u && n && s) ? null : {
			emailTaken: {
				valid: false
			}
		};
	}

	private _gEvent() {
		// ECOMMERCE
		let plan = {
			'items': [
				{
					'name': this.plan
				}
			]
		}

		let option = {
			'checkout_step': 1
		}

		this.GS.commerce('begin_checkout', plan);
		this.GS.commerce('set_checkout_option', option);
	}
}
