import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { UserComponent } from './user.component';

// CHILDREN
import { SettingsModule } from './components/settings/settings.module';
import { ReportsModule } from './components/reports/reports.module';
import { ListsModule } from './components/lists/lists.module';
import { HistoryModule } from './components/history/history.module';
import { FavoritesModule } from './components/favorites/favorites.module';
import { DashboardModule } from './components/dashboard/dashboard.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,

		// CHILDREN
		SettingsModule,
		ListsModule,
		HistoryModule,
		ReportsModule,
		FavoritesModule,
		DashboardModule
	],
	declarations: [
		UserComponent
	],
	exports: [
		UserComponent,

		// CHILDREN
		SettingsModule,
		ListsModule,
		HistoryModule,
		ReportsModule,
		FavoritesModule,
		DashboardModule
	]
})
export class UserModule { }
