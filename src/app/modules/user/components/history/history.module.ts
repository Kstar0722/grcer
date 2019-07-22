import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// RELATED
import { HistoryComponent } from './history.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		HistoryComponent
	],
	exports: [
		HistoryComponent
	]
})
export class HistoryModule { }
