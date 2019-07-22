import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { SecurityComponent } from './security.component';

// CHILDREN
import { EmailComponent } from './email/email.component';
import { PasswordComponent } from './password/password.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		SecurityComponent,
		EmailComponent,
		PasswordComponent
	],
	exports: [
		SecurityComponent
	]
})
export class SecurityModule { }
