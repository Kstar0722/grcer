import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { HeaderComponent } from './header.component';

// COMPONENTS
import { ShoppingListComponent } from './list/list.component';

// BOOTSTRAP
import { BsDropdownModule } from 'ngx-bootstrap';

// WIDGETS
import { Modules } from '../../../shared/widgets/widgets.module';

// SERVICES
import { WINDOW_PROVIDERS, CategoryService } from '../../../shared/services';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		Modules,
		BsDropdownModule.forRoot()
	],
	declarations: [
		HeaderComponent,
		ShoppingListComponent

	],
	exports: [
		HeaderComponent,
		ShoppingListComponent
	],
	providers: [
		WINDOW_PROVIDERS,
		CategoryService
	]
})
export class HeaderModule { }
