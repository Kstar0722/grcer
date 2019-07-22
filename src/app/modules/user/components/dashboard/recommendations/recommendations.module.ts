import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { DashboardRecommendationsComponent } from './recommendations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule
	],
	declarations: [
		DashboardRecommendationsComponent
	],
	exports: [
		DashboardRecommendationsComponent
	]
})
export class DashboardRecommendationsModule { }
