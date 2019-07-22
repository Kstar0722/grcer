import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, Inject } from '@angular/core';

// ROUTER
import { Router } from '@angular/router';

// SEO
import { Meta, Title } from '@angular/platform-browser';

// FORMGROUP
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// SERVICES
import { AuthService } from '../../../shared/services';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit {

	// FORMGROUP
	public login: FormGroup;

	// TOGGLE SNIPPER
	public submit: boolean;

	// PASSWORD
	public show: boolean;

	// ARRAY
	message: Array<object> = [];
	items: Array<object> = [];

	// ELEMENT REF
	@ViewChild('email') email: ElementRef;
	@ViewChild('pass') pass: ElementRef;

	constructor(
		private router: Router,
		private meta: Meta,
		private title: Title,
		private AS: AuthService,
		private fb: FormBuilder,
		private renderer: Renderer) {
		this.submit = false;
		this.show = false;

		this.items = [
			{
				title: 'Diet Congruence',
				desc: 'Based on your dietary needs and restrictions, approve or deny any product you view.'
			},
			{
				title: 'Diet & Analysis',
				desc: 'Different diet categorical charts to analyze your product lists.'
			},
			{
				title: 'Food Analytics',
				desc: 'Chart analysis of recommended daily intake and any incongruences from your product lists.'
			}
		]
	}

	ngOnInit() {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('Log In - grceri');

		this._form();
	}

	ngAfterViewInit() {
		// EMAIL FOCUS
		this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
	}

	private _form() {
		return this.login = this.fb.group({
			email: ['', Validators.email],
			password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
			rememberme: ['']
		});
	}

	click(email, password, rememberme) {
		this.submit = true;

		this.AS.login(email, password, rememberme).subscribe(
			(res) => {
				if (res['status'] !== 200) {
					this._alert('danger', res['error_description']);
					this.submit = false;
				}
			},
			(err) => {
				this._alert('danger', err['error_description']);
				this.submit = false;
			}
		);
	}

	url(i) {
		let a = i.toString();
		return a.toLowerCase();
	}

	password() {
		this.show = !this.show;
		this.renderer.invokeElementMethod(this.pass.nativeElement, 'focus');
	}

	private _alert(a, b) {
		this.message.push({
			type: a,
			value: b
		})
	}

	private _close(a: AlertComponent) {
		this.message = this.message.filter((i) => i !== a);
	}
}
