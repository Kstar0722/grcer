import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// RELATED
import { PricingComponent } from './pricing.component';
import { PricingEliteComponent } from './components/elite/elite.component';
import { PricingBasicComponent } from './components/basic/basic.component';
import { PricingFreeComponent } from './components/free/free.component';

// FORMS
import { FormsModule } from '@angular/forms';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule
	],
	declarations: [
		PricingComponent,
		PricingFreeComponent,
		PricingBasicComponent,
		PricingEliteComponent
	],
	exports: [
		PricingComponent,
		PricingFreeComponent,
		PricingBasicComponent,
		PricingEliteComponent
	]
})
export class PricingModule { }
