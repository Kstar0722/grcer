import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { FavoritesComponent } from './favorites.component';

// BOOTSTRAP
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BsDropdownModule.forRoot()
	],
	declarations: [
		FavoritesComponent
	],
	exports: [
		FavoritesComponent
	]
})
export class FavoritesModule { }
