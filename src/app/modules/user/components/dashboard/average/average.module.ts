import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { DashboardAverageComponent } from './average.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG4 CHARTS
import { ChartsModule } from 'ng4-charts/ng4-charts';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		ChartsModule
	],
	declarations: [
		DashboardAverageComponent
	],
	exports: [
		DashboardAverageComponent
	]
})
export class DashboardAverageModule { }
