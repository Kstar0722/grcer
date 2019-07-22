import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// MODULES
import { sliderComponent, sliderItemElement } from './slider/slider.component';
import { sliderItemDirective } from './slider/slider.directive';
import { SearchComponent } from './search/search.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
		ReactiveFormsModule
	],
	declarations: [
		sliderComponent,
		sliderItemDirective,
		sliderItemElement,
		SearchComponent,
		BreadcrumbComponent
	],
	exports: [
		SearchComponent,
		sliderComponent,
		sliderItemDirective,
		sliderItemElement,
		BreadcrumbComponent
	]
})
export class Modules { }
