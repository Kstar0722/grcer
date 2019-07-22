import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// RELATED
import { PoliciesComponent } from './policies.component';
import { PoliciesSidebarModule } from './components/sidebar/sidebar.module';

// CHILDREN
import { PoliciesPageModule } from './components/page/page.module';

// PROVIDERS
import { CMSService } from '../../shared/services/cms/cms.service';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		PoliciesPageModule,
		PoliciesSidebarModule
	],
	declarations: [
		PoliciesComponent
	],
	exports: [
		PoliciesComponent
	],
	providers: [
		CMSService
	]
})
export class PoliciesModule { }
