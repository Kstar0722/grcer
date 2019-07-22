import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';

// RATING
import { BarRatingModule } from 'ngx-bar-rating';

// LINE-CLAMP
// import { LineTruncationLibModule, LineTruncationDirective } from 'ngx-line-truncation';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		BarRatingModule,
		// LineTruncationLibModule
	],
	declarations: [
		ItemComponent
	],
	exports: [
		ItemComponent,
		// LineTruncationDirective
	],
	providers: [
		DecimalPipe
	]
})
export class ItemModule { }
