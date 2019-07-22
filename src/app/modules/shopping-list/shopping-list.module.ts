import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { ShoppingListComponent } from './shopping-list.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule
	],
	declarations: [
		ShoppingListComponent

	],
	exports: [
		ShoppingListComponent
	]
})
export class ShoppingListModule { }
