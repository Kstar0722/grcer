import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { GroceryComponent } from './grocery.component';

// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RELATED
import { CategoryModule } from './components/category/category.module';
import { ProductModule } from './components/product/product.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		// CHILDREN
		CategoryModule,
		ProductModule
	],
	declarations: [
		GroceryComponent
	],
	exports: [
		GroceryComponent
	]
})
export class GroceryModule { }
