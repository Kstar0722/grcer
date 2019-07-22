import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules, Routes } from '@angular/router';

// COMPONENTS
import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/404/404.component';
import { CartComponent } from './modules/cart/cart.component';
import { CallbackComponent } from './modules/auth/callback/callback.component';
import { PoliciesComponent } from './modules/policies/policies.component';
import { PoliciesPageComponent } from './modules/policies/components/page/page.component';
import { ProductComponent } from './modules/grocery/components/product/product.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { BlogComponent } from './modules/blog/blog.component';
import { BlogHomeComponent } from './modules/blog/components/home/home.component';
import { BlogSearchComponent } from './modules/blog/components/search/search.component';
import { BlogCategoryComponent } from './modules/blog/components/category/category.component';
import { BlogSingleComponent } from './modules/blog/components/single/single.component';
import { GroceryComponent } from './modules/grocery/grocery.component';
import { ProductComparePageComponent } from './modules/grocery/components/product/components/compare/page/page.component';
import { CategoryComponent } from './modules/grocery/components/category/category.component';
import { SearchComponent } from './modules/search/search.component';
import { PricingComponent } from './modules/pricing/pricing.component';
import { PricingFreeComponent } from './modules/pricing/components/free/free.component';
import { PricingBasicComponent } from './modules/pricing/components/basic/basic.component';
import { PricingEliteComponent } from './modules/pricing/components/elite/elite.component';
import { SolutionsComponent } from './modules/solutions/solutions.component';
import { SolutionsParentsComponent } from './modules/solutions/components/parents/parents.component';
import { SolutionsCooksComponent } from './modules/solutions/components/cooks/cooks.component';
import { SolutionsHostsComponent } from './modules/solutions/components/hosts/hosts.component';
import { SolutionsStudentsComponent } from './modules/solutions/components/students/students.component';
import { UserComponent } from './modules/user/user.component';
import { DashboardComponent } from './modules/user/components/dashboard/dashboard.component';
import { SettingsComponent } from './modules/user/components/settings/settings.component';
import { SecurityComponent } from './modules/user/components/settings/account/security/security.component';
import { ProfileComponent } from './modules/user/components/settings/account/profile/profile.component';
import { NotificationsComponent } from './modules/user/components/settings/account/notifications/notifications.component';
import { ManagementComponent } from './modules/user/components/settings/account/management/management.component';
import { HistoryComponent } from './modules/user/components/history/history.component';
import { FavoritesComponent } from './modules/user/components/favorites/favorites.component';
import { ListsComponent } from './modules/user/components/lists/lists.component';
import { ListsSingleComponent } from './modules/user/components/lists/single/single.component';
import { WatchlistComponent } from './modules/watchlist/watchlist.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { BillingInfoComponent } from './modules/user/components/settings/billing/info/info.component';
import { BillingHistoryComponent } from './modules/user/components/settings/billing/history/history.component';
import { BillingSubscriptionComponent } from './modules/user/components/settings/billing/subscription/subscription.component';

// SERVICES
import { AuthGuardService, LoggedInService } from './shared/services';

@NgModule({
	imports: [
		RouterModule.forRoot([
			{ path: '', component: HomeComponent, pathMatch: 'full' },
			{ path: '404', component: NotFoundComponent },
			{ path: 'cart', component: CartComponent },
			{ path: 'callback', component: CallbackComponent },
			{ path: 'policies', component: PoliciesComponent, children: [
					{ path: '', pathMatch: 'full', redirectTo: 'terms-of-use' },
					{ path: ':page', component: PoliciesPageComponent }
				]
			},
			{ path: 'grocery/:product/:product_id', children: [
					{ path: '', component: ProductComponent }
				]
			},
			{ path: 'login', component: LoginComponent, canActivate: [LoggedInService] },
			{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoggedInService] },
			{ path: 'sign-up', canActivate: [LoggedInService], children: [
					{ path: '', component: RegisterComponent },
					{ path: ':plan', component: RegisterComponent },
				]
			},
			// { path: 'blog', component: BlogComponent,
			// 	children: [
			// 		{ path: '', pathMatch: 'full', component: BlogHomeComponent },
			// 		{ path: 'search/:query', component: BlogSearchComponent },
			// 		{ path: ':cat', component: BlogCategoryComponent },
			// 		{ path: ':cat/:name', component: BlogSingleComponent },
			// 	]
			// },
			{ path: 'search', component: SearchComponent },
			{ path: 'watchlists', component: WatchlistComponent, canActivate: [AuthGuardService] },
			// { path: 'shopping-list', component: ShoppingListComponent },
			{ path: 'groceries',
				children: [
					{ path: '', component: GroceryComponent },
					{ path: 'compare', component: ProductComparePageComponent },
					{ path: ':cat', component: CategoryComponent },
					{ path: ':cat/:sub', component: CategoryComponent }
				]
			},
			{ path: 'pricing',
				children: [
					{ path: '', component: PricingComponent },
					{ path: 'free', component: PricingFreeComponent },
					{ path: 'basic', component: PricingBasicComponent },
					{ path: 'elite', component: PricingEliteComponent }
				]
			},
			// { path: 'solutions', component: SolutionsComponent,
			// 	children: [
			// 		{ path: '', pathMatch: 'full', redirectTo: 'parents' },
			// 		{ path: 'parents', component: SolutionsParentsComponent },
			// 		{ path: 'cooks', component: SolutionsCooksComponent },
			// 		{ path: 'hosts', component: SolutionsHostsComponent },
			// 		{ path: 'students', component: SolutionsStudentsComponent }
			// 	]
			// },
			{
				path: 'user', component: UserComponent, canActivate: [AuthGuardService],
				children: [
					{ path: '', component: DashboardComponent },
					{ path: 'settings', component: SettingsComponent,
						children: [
							{ path: '', pathMatch: 'full', redirectTo: 'account' },
							{ path: 'account',
								children: [
									{ path: '', pathMatch: 'full', redirectTo: 'profile' },
									{ path: 'management', component: ManagementComponent },
									{ path: 'notifications', component: NotificationsComponent },
									{ path: 'security', component: SecurityComponent },
									{ path: 'profile', component: ProfileComponent },
								]
							},
							{
								path: 'billing',
								children: [
									{ path: '', component: BillingInfoComponent },
									{ path: 'history', component: BillingHistoryComponent },
									{ path: 'payment', component: BillingInfoComponent },
									{ path: 'subscription', component: BillingSubscriptionComponent }
								]
							},
							// { path: 'extras', component: PasswordComponent,
							// 	children: [
							// 		{ path: 'rewards', component: PasswordComponent },
							// 	]
							// },
						]
					},
					{ path: 'history', component: HistoryComponent },
					{ path: 'favorites', component: FavoritesComponent },
					{
						path: 'lists',
						children: [
							{ path: '', component: ListsComponent },
							{ path: ':id', component: ListsSingleComponent },
						]
					}
				]
			}
		], { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
