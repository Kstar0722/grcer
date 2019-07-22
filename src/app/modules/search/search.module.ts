import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { SearchComponent } from './search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SortComponent } from '../../../../shared/widgets/sort/sort.component';
import { SidebarModule } from '../../shared/widgets/sidebar/sidebar.module';
import { SortModule } from '../../shared/widgets/sort/sort.module';

// CHILD
import { ItemModule } from '../../shared/components/item/item.module';

// MODULES
import { Modules } from '../../shared/widgets/widgets.module';
import { NgxPaginationModule } from 'ngx-pagination';

// ADSENSE
import { AdsenseModule } from 'ng2-adsense';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		SidebarModule,
		SortModule,

		// MODULES
		Modules,
		ItemModule,
		NgxPaginationModule,

		// ADSENSE
		AdsenseModule.forRoot()
	],
	declarations: [
		SearchComponent,
		// SortComponent
	],
	exports: [
		SearchComponent,
		// SortComponent
	]
})
export class SearchModule { }
