import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// RELATED
import { ListsComponent } from './lists.component';
import { ListsCreateModule } from './create/create.module';
import { ListsTileModule } from './tile/tile.module';
import { ListsSingleModule } from './single/single.module';

// BOOTSTRAP
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ListsCreateModule,
		ListsTileModule,
		ListsSingleModule,
		BsDropdownModule.forRoot()
	],
	declarations: [
		ListsComponent
	],
	exports: [
		ListsComponent
	]
})
export class ListsModule { }
