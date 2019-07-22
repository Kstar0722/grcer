import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// RELATED
import { NotFoundComponent } from './404.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		NotFoundComponent
	],
	exports: [
		NotFoundComponent
	]
})
export class NotFoundModule { }
