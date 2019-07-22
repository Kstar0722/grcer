import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ROUTER
import { RouterModule } from '@angular/router';

// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { RegisterComponent } from './register.component';
import { CreditCardModule } from './components/credit-card/credit-card.module';

// ALERT
import { AlertModule } from 'ngx-bootstrap/alert';

// SERVICES
import { API } from '../../../shared/services';

// PIPES
import { KeysPipe } from '../../../shared/pipes';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		CreditCardModule,
		AlertModule.forRoot()
	],
	declarations: [
		RegisterComponent,
		KeysPipe
	],
	exports: [
		RegisterComponent
	],
	providers: [
		API
	]
})
export class RegisterModule { }
