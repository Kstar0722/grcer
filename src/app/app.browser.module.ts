import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// COMPONENT
import { AppComponent } from './app.component';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'

// PAGES
import {
	HomeModule,
	CartModule,
	GroceryModule,
	NotFoundModule,
	UserModule,
	PricingModule,
	SearchModule,
	AuthModule,
	PoliciesModule,
	BlogModule,
	SolutionsModule,
	WatchlistModule
} from './modules'

// SHARED
import {
	HeaderModule,
	FooterModule
} from './shared/components';

// SERVICES
import {
	CartService,
	AuthGuardService,
	LoggedInService,
	AuthService,
	SearchService,
	LocalStorage,
	UserService,
	SeoService,
	LinkTagService,
	GoogleAnalyticsService
} from './shared/services';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'app-root' }),
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,

		// PAGES
		HomeModule,
		CartModule,
		GroceryModule,
		NotFoundModule,
		UserModule,
		PricingModule,
		SearchModule,
		AuthModule,
		PoliciesModule,
		BlogModule,
		SolutionsModule,
		WatchlistModule,

		// SHARED
		HeaderModule,
		FooterModule
	],
	providers: [
		AuthGuardService,
		LoggedInService,
		AuthService,
		CartService,
		LocalStorage,
		UserService,
		SearchService,
		SeoService,
		LinkTagService,
		GoogleAnalyticsService
	],
	bootstrap: [AppComponent]
})

export class AppBrowserModule { }
