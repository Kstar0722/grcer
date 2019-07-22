import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// RELATED
import { ListsCreateComponent } from './create.component';

// KENDO
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		BrowserAnimationsModule
	],
	declarations: [
		ListsCreateComponent
	],
	exports: [
		ListsCreateComponent
	]
})
export class ListsCreateModule { }
