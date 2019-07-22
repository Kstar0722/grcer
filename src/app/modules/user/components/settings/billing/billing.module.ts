import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// CHILDREN
import { BillingHistoryComponent } from './history/history.component';
import { BillingInfoComponent } from './info/info.component';
import { BillingSubscriptionComponent } from './subscription/subscription.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		BillingHistoryComponent,
		BillingInfoComponent,
		BillingSubscriptionComponent
	],
	exports: [
		BillingHistoryComponent,
		BillingInfoComponent,
		BillingSubscriptionComponent
	]
})
export class BillingModule { }
