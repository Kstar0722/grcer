import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// RELATED
import { ListsTileComponent } from './tile.component';

// BOOTSTRAP
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BsDropdownModule.forRoot()
	],
	declarations: [
		ListsTileComponent
	],
	exports: [
		ListsTileComponent
	]
})
export class ListsTileModule { }
