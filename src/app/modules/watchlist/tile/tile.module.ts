import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// RELATED
import { WatchlistTileComponent } from './tile.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		WatchlistTileComponent
	],
	exports: [
		WatchlistTileComponent
	]
})
export class WatchlistTileModule { }
