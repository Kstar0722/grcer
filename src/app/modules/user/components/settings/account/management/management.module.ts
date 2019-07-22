import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// CHILD
import { ManagementComponent } from './management.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		ManagementComponent
	],
	exports: [
		ManagementComponent
	]
})
export class ManagementModule { }
