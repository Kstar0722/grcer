import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';

// ROUTER
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// SEO
import { Meta, Title } from '@angular/platform-browser';

// FORMGROUP
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// SERVICES
import { AuthService } from '../../../shared/services';

// BOOTSTRAP
import { AlertComponent } from 'ngx-bootstrap';

@Component({
	selector: 'forgot-password',
	templateUrl: 'forgot-password.component.html'
})

export class ForgotPasswordComponent implements OnInit, AfterViewInit {

	// FORMGROUP
	public forgot: FormGroup;

	// TOGGLE SNIPPER
	public submit: boolean;

	// BUTTON
	disabled: boolean;

	// MESSAGE
	message: Array<object> = [];

	// ELEMENT REF
	@ViewChild('email') email: ElementRef;

	constructor(
		public router: Router,
		private meta: Meta,
		private title: Title,
		private AS: AuthService,
		private fb: FormBuilder,
		private http: HttpClient,
		private renderer: Renderer) {
		this.submit = false;
	}

	ngOnInit() {
		this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
		this.title.setTitle('Forgot Password - grceri');
		this._form();
	}


	ngAfterViewInit() {
		// EMAIL FOCUS
		this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
	}

	private _form() {
		return this.forgot = this.fb.group({
			email: ['', Validators.email]
		});
	}

	reset(email) {
		this.submit = true;

		this.http.get(`/api/user/email/${email}`).subscribe(
			(res) => {
				this.AS.resetPassword(email).then(r => {
					this._alert('success', r);
					this.submit = false;
					this.disabled = true;
				});
			},
			(err) => {
				this._alert('danger', 'Opps, we couldn`t find that email address in our system, please try again!')
				this.submit = false;
			}
		)
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
