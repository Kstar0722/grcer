import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ROUTER
import { RouterModule } from '@angular/router';

// RELATED
import { LoginComponent } from './login.component';

// BOOTSTRAP
import { AlertModule } from 'ngx-bootstrap';

// SLIDER
import { Modules } from '../../../shared/widgets/widgets.module';

// SERVICES
import { AuthService } from '../../../shared/services';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule,
		AlertModule,
		Modules
	],
	declarations: [
		LoginComponent
	],
	exports: [
		LoginComponent
	],
	providers: [
		AuthService
	]
})
export class LoginModule { }
