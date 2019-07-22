import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { SecurityModule } from './security/security.module';
import { ProfileModule } from './profile/profile.module';
import { ManagementModule } from './management/management.module';
import { NotificationsModule } from './notifications/notifications.module';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SecurityModule,
		ProfileModule,
		ManagementModule,
		NotificationsModule
	],
	exports: [
		SecurityModule,
		ProfileModule,
		ManagementModule,
		NotificationsModule
	]
})
export class AccountModule { }
