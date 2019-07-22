import { Component, Input, OnDestroy, ViewChild, OnInit } from '@angular/core';

// CHILDREN
import { SortComponent } from '../../shared/widgets/sort/sort.component';

// INTERFACES
import { IProduct } from '../../shared/interfaces/product/product.interface';

// SERVICES
import { API, CategoryService, SeoService } from '../../shared/services';

// SEO
import { ActivatedRoute, Router } from '@angular/router';

// SIDEBAR
import { SidebarComponent }
from '../../shared/widgets/sidebar/sidebar.component';

// RXJS
import { Subject, Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'search',
	templateUrl: 'search.component.html'
})

export class SearchComponent implements OnDestroy, OnInit {
	// VIEWCHILD
	@ViewChild(SortComponent) sort: SortComponent;
	@ViewChild('searchpagesidebar') sidebarComponent: SidebarComponent;

	// SIDEBAR
	private sections$ = new Subject<any[]>();
	sections: any[] = [];
	categories: any;

	// SORT
	total: number;
	count: number;
	page = 1;

	// PAGINATION
	pagination$ = new Subject<number>();

	// FEED
	@Input() items: IProduct[] = [];
	nitems = Array(50).fill(1);

	// CURRENT
	cat: number;
	id: string;
	filterResult: string;
	orderResult: string;
	sidebarData: object = {};

	// SUBJECT
	private products$ = new Subject<IProduct[]>();

	// SUBSCRIPTION
	productsSubscription: Subscription;
	sectionsSubscription: Subscription;
	bothSearchForkJoinSubscription: Subscription;

	// SORT BY
	sortBy: any = null;

	// SIDEBAR FILTERS
	isFirstCategoriesURLParam: boolean;
	isFirstBrandURLParam: boolean;
	isFirstSizeURLParam: boolean;
	isFirstCountURLParam: boolean;
	isFirstWeightURLParam: boolean;
	isFirstDietURLParam: boolean;
	isFirstRatingURLParam: boolean;

	// No PRODUCTS FOUND
	noProductFound: boolean;

	//PROCESS SEARCH PAGE URL QUERYPARAMS
	categoryID: number;
	queryText: string;

	constructor(
		private api: API,
		private router: Router,
		private route: ActivatedRoute,
		protected CS: CategoryService,
		private SS: SeoService
	) {
		// refreshes route
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;

		this.isFirstCategoriesURLParam = true;
		this.isFirstBrandURLParam = true;
		this.isFirstSizeURLParam = true;
		this.isFirstWeightURLParam = true;
		this.isFirstCountURLParam = true;
		this.isFirstDietURLParam = true;
		this.isFirstRatingURLParam = true;
		this.filterResult = '';
		this.orderResult = '';

		this.noProductFound = false;
	}

	ngOnInit() {
		this.getFiltersQueryParameters();
	}

	/**
	* Get filter query parameters from URL
	*/
	private getFiltersQueryParameters(){
		this.route.queryParamMap
      .subscribe((params: any) => {
				let orderObj = {...params.keys, ...params};
				let parameters: object = orderObj.params;
				this.processFiltersQueryParameters(parameters);
      });
	}

	/**
	* Process query parameters, parse json string to oData Parameters and
	* render result to search page
	*/
	private processFiltersQueryParameters(params: any){
		let queryParamsObject: object = {};

		if(params.Category){
			queryParamsObject['Category'] =
			this.processQueryParameterForFilterResult(params.Category);
		}
		if(params.Brand){
			queryParamsObject['Brand'] =
			this.processQueryParameterForFilterResult(params.Brand);
		}
		if(params.Size){
			queryParamsObject['Size'] =
			this.processQueryParameterForFilterResult(params.Size);
		}
		if(params.Weight){
			queryParamsObject['Weight'] =
			this.processQueryParameterForFilterResult(params.Weight);
		}
		if(params.Count){
			queryParamsObject['Count'] =
			this.processQueryParameterForFilterResult(params.Count);
		}
		if(params.Diet){
			queryParamsObject['Diet'] =
			this.processQueryParameterForFilterResult(params.Diet);
		}
		if(params.Rating){
			queryParamsObject['Rating'] =
			this.processQueryParameterForFilterResult(params.Rating);
		}
		if(params.Price){
			queryParamsObject['Price'] =
			this.processPriceQueryParameterForFilterResult(params.Price);
		}

		if(!this.checkEmptyObject(queryParamsObject)){
			this.sidebarData = queryParamsObject;
			this.filterDataToOdata(queryParamsObject);
		}

		this._init();
	}

	/**
	* Check Object is empty
	*/
	private checkEmptyObject(obj: object){
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	/**
	* Parse sections(except Price) JSON string to oData parameter
	*/
	private processQueryParameterForFilterResult(paramData: string){
		let queryParam;
		queryParam = decodeURIComponent(paramData);
		queryParam = JSON.parse(queryParam);
		return queryParam;
	}

	/**
	* Parse Price section JSON string to oData parameter
	*/
	private processPriceQueryParameterForFilterResult(paramData: string){
		let queryParam: any[] = [];
		let priceRange = decodeURIComponent(paramData);
		priceRange = JSON.parse(priceRange);
		queryParam[0] = {
			minPrice: priceRange[0],
			maxPrice: priceRange[1]
		};
		return queryParam;
	}

	ngOnDestroy() {
		if(this.productsSubscription)
			this.productsSubscription.unsubscribe();
		if(this.sectionsSubscription)
			this.sectionsSubscription.unsubscribe();
		if(this.bothSearchForkJoinSubscription)
			this.bothSearchForkJoinSubscription.unsubscribe();
	}

	/**
	* Process subscription result observable,
	* render product listing with pagination
	* and generate tags
	*/
	setPagination(page: number) {
		// PAGINATION
		this.page = page;

		// RESET ITEMS
		this.items = [];

		let productsObservable$ = this.api.getSearchPageContent(this.categoryID,
			this.filterResult, this.orderResult, this.queryText, this.page);

		let sectionsObservable$ = this.api.getSearchPageSidebar(this.categoryID,
			this.queryText);

		let observables$ = forkJoin([productsObservable$, sectionsObservable$]);

		this.bothSearchForkJoinSubscription = observables$.subscribe(([products,
			sections]) => {
			this.products$.next(products);
			this.sections$.next(sections);
		});
	}

	/**
	* Process filterResult variable for query
	*/
	private processFilterResultForQuery() {
		this.filterResult = this.filterResult.replace(' and ', '');
	}

	/**
	* Component engine fn to start creating subscriptions and generate
	* products/sections listings
	*/
	private _init() {
		this._setIProducts();

		this.processProductsSubscription();
		this.processSectionsSubscription();
	}

	/**
	* Process products subscription, initialize product listing variables
	*/
	private processProductsSubscription(){
		this.productsSubscription = this.products$.subscribe(res => {
			// PRODUCTS
			this.items = res['result'];

			this.noProductFound = this.items.length <= 0 ? true : false;

			this.sidebarComponent.productsLoaded();

			// SORT
			this.count = res['count'];
			this.page = res['page'];
			this.total = res['total'];

			this._setMeta();
		});
	}

	/**
	* Process sections subscription, initialize section listing variables
	*/
	private processSectionsSubscription(){
		this.sectionsSubscription = this.sections$.subscribe(res => {
			// SIDEBAR
			this.sections = res['sidebar'];
		});
	}

	/**
	* Get search page information and render products listing
	*/
	private _setIProducts() {
		this.route.queryParamMap.subscribe(params => {
			let paramsObj = { ...params.keys, ...params };

			this.categoryID = paramsObj['params']['cat_id'];
			this.queryText = paramsObj['params']['query'];
		});

		// SET PAGINATION
		this.setPagination(1);
	}

	/**
	* Genrate meta tags for search results page
	*/
	private _setMeta() {
		// SEO
		this.SS.generateTags({
			title: 'Search results for: ' + this.queryText + ' - grceri',
			description: 'We found ' + this.total + ' search results for ' +
			this.queryText + '.',
			url: this.router.url
		});
	}

	/**
  * Get sidebar informarion and process to make query
  * string and regenerate IProduct listing
  */
	public getSidebarData(eventData) {
		this.noProductFound = false;

		if (this.sidebarComponent.productsNotLoaded !== undefined) {
			this.sidebarComponent.productsNotLoaded();
		}

		this.sidebarData = eventData;
		this.filterResult = '';
		this.filterDataToOdata(eventData);
		this._init();
	}

	/**
	* Escape special character in oData param
	*/
	private escapeoDataQueryParam(param: string){
		param = encodeURIComponent(param.replace(/'/g, "''"));
		param = encodeURIComponent(param.replace(/&/g, "%26"));

		return param;
	}

	/**
  * Get sidebar data and create query string
  */
	private encodeDataURI(property, dataArray) {
		let parameters = [];
		if (Array.isArray(dataArray) && dataArray.length > 0) {
			let dataArrayLength: number = dataArray.length;

			for (let data in dataArray) {
				/**
				* This part can be used later for a complete $filter parameter
				*/
				if (typeof dataArray[data] === 'object') {
					parameters.push(' and Lowest_recorded_price ge ' +
					dataArray[data].minPrice);
					parameters.push(' and Highest_recorded_price le ' +
					dataArray[data].maxPrice);
				} else {
					let currentIndex: number = parseInt(data) + 1;

					if (property === 'Brand') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstBrandURLParam === true ?
						' and (' : ' or ';

						this.isFirstBrandURLParam = false;

						parameters.push(firstParamPrefix + property + ' eq ' + '\'' +
						this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Size (Ounces)') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstSizeURLParam === true ?
						' and (' : ' or ';

						this.isFirstSizeURLParam = false;

						parameters.push(firstParamPrefix + 'Size' + ' eq ' + '\'' +
						this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Count') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstCountURLParam === true ?
						' and (' : ' or ';

						this.isFirstCountURLParam = false;

						parameters.push(firstParamPrefix + property + ' eq ' +
						dataArray[data]);

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Weight') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstWeightURLParam === true ?
						' and (' : ' or ';

						this.isFirstWeightURLParam = false;

						parameters.push(firstParamPrefix + property + ' eq ' + '\'' +
						this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Diet') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstDietURLParam === true ?
						' and (' + property + '/any(d: ' : ' or ';

						this.isFirstDietURLParam = false;

						parameters.push(firstParamPrefix + 'd eq ' + '\'' +
						this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push('))');
						}
					} else if (property === 'Rating') {
						let lowerRating: number = parseInt(dataArray[data]);
						let upperRating = lowerRating + 1;

						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstRatingURLParam === true ?
						' and (' : ' or ';

						this.isFirstRatingURLParam = false;

						parameters.push(firstParamPrefix + '(' + property + ' ge ' +
						lowerRating + ' and ' + property + ' le ' + upperRating + ')');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else {
						parameters.push(' and ' + property + ' eq ' + '\'' +
						this.escapeoDataQueryParam(dataArray[data]) + '\'');
					}
				}
			}

			let encodedUrl = parameters.join('');
			return encodedUrl;
		}

		return false;
	}

	/**
  * Summ up all sidebar data and append to create
  * final query string
  */
	private filterDataToOdata(dataObject) {
		if (dataObject !== undefined || typeof dataObject === 'object') {
			this.isFirstCategoriesURLParam = true;
			this.isFirstBrandURLParam = true;
			this.isFirstSizeURLParam = true;
			this.isFirstCountURLParam = true;
			this.isFirstWeightURLParam = true;
			this.isFirstDietURLParam = true;
			this.isFirstRatingURLParam = true;

			for (let property in dataObject) {
				if (dataObject.hasOwnProperty(property)) {
					let encodedData = this.encodeDataURI(property, dataObject[property]);

					if (encodedData !== false) {
						this.filterResult = this.filterResult + encodedData;
					}
				}
			}

			if (this.filterResult !== '') {
				this.processFilterResultForQuery();
			}
		}
	}

	/**
	* Get sort component data and process to HTTP request
	*/
	sortDataChange(eventData) {
		this.sortBy = eventData;

		this.noProductFound = false;

		this.orderResult = '$orderby=' + this.sortBy;

		if (this.sidebarComponent.productsNotLoaded !== undefined) {
			this.sidebarComponent.productsNotLoaded();
		}

		this._init();
	}
}
