import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// RELATED
import { HomeComponent } from './home.component';

// ROUTING
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// SLIDER
import { Modules } from '../../shared/widgets/widgets.module';
import { ItemModule } from '../../shared/components/item/item.module';
import { ItemComponent } from '../../shared/components/item/item.component';

// Import library module
import { NgxJsonLdModule } from '@ngx-lite/json-ld';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		Modules,
		ItemModule,
		NgxJsonLdModule
	],
	declarations: [
		HomeComponent

	],
	exports: [
		HomeComponent
	],
	providers: [
		ItemComponent
	]
})
export class HomeModule { }
