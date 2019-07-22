import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { WatchlistComponent } from './watchlist.component';

// TILE
import { WatchlistTileModule } from './tile/tile.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		WatchlistTileModule
	],
	declarations: [
		WatchlistComponent

	],
	exports: [
		WatchlistComponent
	]
})
export class WatchlistModule { }
