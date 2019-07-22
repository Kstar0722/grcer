import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// RELATED
import { CartComponent } from './cart.component';
import { ItemModule } from '../../shared/components/item/item.module';

// PROVIDERS
import { ItemComponent } from '../../shared/components/item/item.component';

// MODULES
import { Modules } from '../../shared/widgets/widgets.module';

// ADSENSE
import { AdsenseModule } from 'ng2-adsense';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		Modules,
		ItemModule,

		// ADSENSE
		AdsenseModule.forRoot()
	],
	declarations: [
		CartComponent,
	],
	exports: [
		CartComponent,
	],
	providers: [
		ItemComponent
	]
})
export class CartModule { }
