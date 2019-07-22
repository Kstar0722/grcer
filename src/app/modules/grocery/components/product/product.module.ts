import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// ROUTER
import { RouterModule } from '@angular/router';

// FORMS
import { ReactiveFormsModule } from '@angular/forms';

// RELATED
import { ProductComponent } from './product.component';

// MODULES
import { Modules } from '../../../../shared/widgets/widgets.module';
import { ItemModule } from '../../../../shared/components/item/item.module';

// CHILD
import { ItemComponent } from '../../../../shared/components/item/item.component';

// RATING
import { BarRatingModule } from 'ngx-bar-rating';

// CHILDREN
import { ProductModuleModule } from './components/module.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		BrowserAnimationsModule,
		BarRatingModule,
		ReactiveFormsModule,

		Modules,
		ItemModule,
		ProductModuleModule
	],
	declarations: [
		ProductComponent
	],
	exports: [
		ProductComponent
	],
	providers: [
		ItemComponent
	]
})
export class ProductModule { }
