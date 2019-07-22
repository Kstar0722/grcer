import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// FORMS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// CHILDREN
import { ProductDetailsComponent } from './details/details.component';
import { ProductFeedbackComponent } from './feedback/feedback.component';
import { ProductAddedComponent } from './added/added.component';
import { ProductCompareComponent } from './compare/compare.component';
import { ProductComparePageComponent } from './compare/page/page.component';
import { ProductCarouselComponent } from './carousel/carousel.component';
import { ProductSocialComponent } from './social/social.component';
import { ProductNutritionComponent } from './nutrition/nutrition.component';
import { ProductVendorsComponent } from './vendors/vendors.component';
import { ProductOverviewComponent } from './overview/overview.component';
import { ProductDietComponent } from './diet/diet.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

// MODULES
import { ItemComponent } from '../../../../../shared/components/item/item.component';
import { Modules } from '../../../../../shared/widgets/widgets.module';
import { ItemModule } from '../../../../../shared/components/item/item.module';

// PROVIDERS
import { SocialService } from '../../../../../shared/services';

// RATING
import { BarRatingModule } from 'ngx-bar-rating';
import { ModalModule } from 'ngx-bootstrap/modal';

// ADSENSE
import { AdsenseModule } from 'ng2-adsense';

// IMPORT MODULES, DECLARE COMPONENTS
@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,

		// MODULES
		Modules,
		ItemModule,
		BarRatingModule,
		ModalModule.forRoot(),

		// ADSENSE
		AdsenseModule.forRoot()
	],
	declarations: [
		ProductDetailsComponent,
		ProductFeedbackComponent,
		ProductAddedComponent,
		ProductCompareComponent,
		ProductComparePageComponent,
		ProductCarouselComponent,
		ProductSocialComponent,
		ProductNutritionComponent,
		ProductVendorsComponent,
		ProductOverviewComponent,
		ProductDietComponent,
		CartModalComponent

	],
	entryComponents: [CartModalComponent],
	exports: [
		ProductDetailsComponent,
		ProductFeedbackComponent,
		ProductAddedComponent,
		ProductCompareComponent,
		ProductComparePageComponent,
		ProductCarouselComponent,
		ProductSocialComponent,
		ProductNutritionComponent,
		ProductVendorsComponent,
		ProductOverviewComponent,
		ProductDietComponent,
		CartModalComponent
	],
	providers: [
		ItemComponent,
		SocialService
	]
})
export class ProductModuleModule { }
