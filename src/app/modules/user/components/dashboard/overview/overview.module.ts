import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { DashboardOverviewComponent } from './overview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG4 CHARTS
import { ChartsModule } from 'ng4-charts/ng4-charts';

// BOOTSTRAP
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		ChartsModule,
		BsDropdownModule.forRoot()
	],
	declarations: [
		DashboardOverviewComponent
	],
	exports: [
		DashboardOverviewComponent
	]
})
export class DashboardOverviewModule { }
