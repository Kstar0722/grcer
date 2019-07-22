import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// CHILDREN
import { DashboardAverageModule } from './average/average.module';
import { DashboardOverviewModule } from './overview/overview.module';
import { DashboardViewedModule } from './viewed/viewed.module';
import { DashboardRecommendationsModule } from './recommendations/recommendations.module';

// NG4 CHARTS
import { ChartsModule } from 'ng4-charts/ng4-charts';

// BOOTSTRAP
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// ADSENSE
import { AdsenseModule } from 'ng2-adsense';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		ChartsModule,
		BsDropdownModule.forRoot(),
		DashboardAverageModule,
		DashboardOverviewModule,
		DashboardRecommendationsModule,
		DashboardViewedModule,
		AdsenseModule.forRoot()
	],
	declarations: [
		DashboardComponent
	],
	exports: [
		DashboardComponent
	]
})
export class DashboardModule { }
