import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { DashboardViewedComponent } from './viewed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule
	],
	declarations: [
		DashboardViewedComponent
	],
	exports: [
		DashboardViewedComponent
	]
})
export class DashboardViewedModule { }
