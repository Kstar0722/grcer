import { Component, Input, OnDestroy, ViewChild, OnInit } from '@angular/core';

// CHILDREN
import { SortComponent } from '../../../../shared/widgets/sort/sort.component';

// INTERFACES
import { IProduct }	from '../../../../shared/interfaces/product/product.interface';

// SERVICES
import { API, CategoryService, SeoService, GoogleAnalyticsService } from '../../../../shared/services';

// SEO
import { ActivatedRoute, Router } from '@angular/router';

// SIDEBAR
import { SidebarComponent }	from '../../../../shared/widgets/sidebar/sidebar.component';

// RXJS
import { Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Rx';

// COMPONENT
@Component({
	moduleId: module.id,
	selector: 'category',
	templateUrl: 'category.component.html'
})

export class CategoryComponent implements OnDestroy, OnInit {
	// VIEWCHILD
	@ViewChild(SortComponent) sort: SortComponent;
	@ViewChild('categorysidebar') sidebarComponent: SidebarComponent;

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
	routerParamSubscription: Subscription;
	bothCategoryForkJoinSubscription: Subscription;

	// SORT BY
	sortBy: any = null;

	// SIDEBAR FILTERS
	sidebarFilterCategories: any[];
	isCategorySectionLoaded: boolean;
	isFirstCategoriesURLParam: boolean;
	isFirstBrandURLParam: boolean;
	isFirstSizeURLParam: boolean;
	isFirstCountURLParam: boolean;
	isFirstWeightURLParam: boolean;
	isFirstDietURLParam: boolean;
	isFirstRatingURLParam: boolean;

	// No PRODUCTS FOUND
	noProductFound: boolean;

	// CATEGORY PAGE META TAG
	currentCategoryName: string;

	constructor(
		private GS: GoogleAnalyticsService,
		private api: API,
		private router: Router,
		private route: ActivatedRoute,
		protected CS: CategoryService,
		private SS: SeoService
	) {
		// refreshes route
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;

		this.isCategorySectionLoaded = false;
		this.isFirstCategoriesURLParam = true;
		this.isFirstBrandURLParam = true;
		this.isFirstSizeURLParam = true;
		this.isFirstCountURLParam = true;
		this.isFirstWeightURLParam = true;
		this.isFirstDietURLParam = true;
		this.isFirstRatingURLParam = true;
		this.filterResult = '';
		this.orderResult = '';

		this.currentCategoryName = '';

		this.noProductFound = false;
	}

	ngOnInit() {
		this.getFiltersQueryParameters();
	}

	ngOnDestroy() {
		if (this.productsSubscription) {
			this.productsSubscription.unsubscribe();
		}
		if (this.sectionsSubscription) {
			this.sectionsSubscription.unsubscribe();
		}
		if (this.routerParamSubscription) {
			this.routerParamSubscription.unsubscribe();
		}
		if (this.bothCategoryForkJoinSubscription) {
			this.bothCategoryForkJoinSubscription.unsubscribe();
		}
	}

	/**
	* Get filter query parameters from URL
	*/
	private getFiltersQueryParameters() {
		this.route.queryParamMap
			.subscribe((params: any) => {
				let orderObj = { ...params.keys, ...params };
				let parameters: object = orderObj.params;
				this.processFiltersQueryParameters(parameters);
			});
	}

	/**
	* Process query parameters, parse json string to oData Parameters and
	* render result to search page
	*/
	private processFiltersQueryParameters(params: any) {
		let queryParamsObject: object = {};

		if (params.Category) {
			queryParamsObject['Category'] =	this.processQueryParameterForFilterResult(params.Category);
		}
		if (params.Brand) {
			queryParamsObject['Brand'] =	this.processQueryParameterForFilterResult(params.Brand);
		}
		if (params.Size) {
			queryParamsObject['Size'] =	this.processQueryParameterForFilterResult(params.Size);
		}
		if (params.Weight) {
			queryParamsObject['Weight'] =	this.processQueryParameterForFilterResult(params.Weight);
		}
		if (params.Count) {
			queryParamsObject['Count'] =	this.processQueryParameterForFilterResult(params.Count);
		}
		if (params.Diet) {
			queryParamsObject['Diet'] =	this.processQueryParameterForFilterResult(params.Diet);
		}
		if (params.Rating) {
			queryParamsObject['Rating'] =	this.processQueryParameterForFilterResult(params.Rating);
		}
		if (params.Price) {
			queryParamsObject['Price'] =	this.processPriceQueryParameterForFilterResult(params.Price);
		}

		if (!this.checkEmptyObject(queryParamsObject)) {
			this.sidebarData = queryParamsObject;
			this.setQueryCategories(queryParamsObject);
		} else {
			this._init();
		}
	}

	/**
	* Check Object is empty
	*/
	private checkEmptyObject(obj) {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	/**
	* Get categories information and assign to Category query parameter
	*/
	private setQueryCategories(queryData: object) {
		// URL SYNTAX
		let cat: string;
		let subCat: string;
		let subSubCat: string;

		this.routerParamSubscription = this.route.params.subscribe(params => {
			cat = params['cat'];
			subCat = params['sub'];
			subSubCat = params['sub-sub'];
		});

		this.CS.getCat().then((res) => {

			let categories_array = [];
			categories_array = res[0]['categories'];

			if (categories_array.length > 0) {
				for (let i = 0; i < categories_array.length; i++) {
					// CATEGORIES
					const a = res[0]['categories'];

					if (this.CS.formatted(a[i]['name']) === cat) {
						if (cat !== '' && (subCat === undefined &&
							subSubCat === undefined)) {
							// SET VARIABLES
							this.id = 'Cat_id3';
							this.cat = a[i]['id'];

							if (this.isCategorySectionLoaded === false) {
								// SET SIDEBAR FILTER CATEGORIES
								this._setSidebarFilterCategories(a[i]);

								this.filterDataToOdata(queryData);

								// RESET IProductS
								this._init();
							}
						}

						// SUB - CATEGORY
						const b: string[] = a[i]['category'] !== undefined ?
							a[i]['category'] : [];

						if (b.length > 0) {
							for (let x = 0; x < b.length; x++) {
								if (this.CS.formatted(b[x]['name']) === subCat) {
									if (subCat !== '' && (cat !== '' &&
										subSubCat === undefined)) {
										// SET VARIABLES
										this.id = 'Cat_id4';
										this.cat = b[x]['id'];

										this.currentCategoryName = b[x]['name'];

										this.filterDataToOdata(queryData);

										// RESET IProductS
										this._init();
									}
								}
							}
						}
					}
				}
			}
		}).catch(err => {
			// promise rejection ==> need to handle the erro here
		});
	}

	/**
	* Parse sections(except Price) JSON string to oData parameter
	*/
	private processQueryParameterForFilterResult(paramData: string) {
		let queryParam;
		queryParam = decodeURIComponent(paramData);
		queryParam = JSON.parse(queryParam);
		return queryParam;
	}

	/**
	* Parse Price section JSON string to oData parameter
	*/
	private processPriceQueryParameterForFilterResult(paramData: string) {
		let queryParam: any[] = [];
		let priceRange = decodeURIComponent(paramData);
		priceRange = JSON.parse(priceRange);
		queryParam[0] = {
			minPrice: priceRange[0],
			maxPrice: priceRange[1]
		};
		return queryParam;
	}

	setPagination(page: number) {
		// PAGINATION
		this.page = page;

		// RESET ITEMS
		this.items = [];

		// NEXT
		let productsObservable$ = this.api.getProducts(this.id,
			this.cat, this.filterResult, this.orderResult, page);

		let sectionsObservable$ = this.api.getSidebarFilters(this.id, this.cat);

		let observables$ = forkJoin([productsObservable$,
			sectionsObservable$]).pipe(
				catchError(error => of(error)));

		this.bothCategoryForkJoinSubscription =
			observables$.subscribe(([products, sections]) => {
				this.products$.next(products);
				this.sections$.next(sections);
			});

	}

	private _init() {
		this._setIProducts();

		this.productsSubscription = this.products$.subscribe(res => {
			// PRODUCTS
			this.items = res['result'];

			if (this.items.length <= 0) {
				this.noProductFound = true;
			} else {
				this.noProductFound = false;
			}

			this.sidebarComponent.productsLoaded();

			// SORT
			this.count = res['count'];
			this.page = res['page'];
			this.total = res['total']

			this._addCategories(this.items);

			this._setMeta();
			this._gEvent();
		});

		this.sectionsSubscription = this.sections$.subscribe(res => {
			// SIDEBAR
			this.sections = [];

			if (this.sidebarFilterCategories !== undefined &&
				this.sidebarFilterCategories.length > 0) {
				let categoriesName: any[] =
					this.fetchSidebarFilterCategoriesText(this.sidebarFilterCategories);

				let sectionObject = this.categoriesSectionObject(categoriesName);

				this.sections.push(sectionObject);

				this.sections = this.sections.concat(res['sidebar']);
			} else {
				this.sections = res['sidebar'];
			}
		});
	}

	private _setIProducts() {
		// URL SYNTAX
		let cat: string;
		let subCat: string;
		let subSubCat: string;

		this.routerParamSubscription = this.route.params.subscribe(params => {
			cat = params['cat'];
			subCat = params['sub'];
			subSubCat = params['sub-sub'];
		});

		this.CS.getCat().then((res) => {

			let categories_array = [];
			categories_array = res[0]['categories'];

			if (categories_array.length > 0) {
				for (let i = 0; i < categories_array.length; i++) {
					// CATEGORIES
					const a = res[0]['categories'];

					if (this.CS.formatted(a[i]['name']) === cat) {
						if (cat !== '' && (subCat === undefined &&
							subSubCat === undefined)) {
							// SET VARIABLES
							this.id = 'Cat_id3';
							this.cat = a[i]['id'];

							if (this.isCategorySectionLoaded === false) {
								// SET SIDEBAR FILTER CATEGORIES
								this._setSidebarFilterCategories(a[i]);
							}

							this.currentCategoryName = a[i]['name'];

							// SET META
							// this._setMeta(a[i]);

							// SET CATEGORIES
							this._setCategory(a[i]);

							// SET PAGINATION
							this.setPagination(1);
						}

						// SUB - CATEGORY
						const b: string[] = a[i]['category'] !== undefined ?
							a[i]['category'] : [];

						if (b.length > 0) {
							for (let x = 0; x < b.length; x++) {
								if (this.CS.formatted(b[x]['name']) === subCat) {
									if (subCat !== '' && (cat !== '' &&
										subSubCat === undefined)) {
										// SET VARIABLES
										this.id = 'Cat_id4';
										this.cat = b[x]['id'];

										this.currentCategoryName = b[x]['name'];

										// SET META
										// this._setMeta(b[x]);

										// SET PAGINATION
										this.setPagination(1);
									}
								}
							}
						}
					}
				}
			}
		}).catch(err => {
			// promise rejection ==> need to handle the erro here
		});
	}

	/**
	* Set meta tag after category page product listing
	*/
	private _setMeta() {
		let t = this.currentCategoryName;

		// SEO
		this.SS.generateTags({
			title: 'Buy ' + t + ' Online - groceri',
			description: 'Shop online the best quality ' + t +
			' items at the best price, search over 100\'s of online retailers for your favorite branded ' + t + ' products.',
			url: this.router.url
		});
	}

	private _gEvent() {
		this.GS.event('event', `Category Viewed - ${this.currentCategoryName} `, 'none', 1);
	}

	/**
	* Process item categories for sidebar filters
	*/
	private _setSidebarFilterCategories(cat: object) {
		this.isCategorySectionLoaded = true;

		// CLEAR CATEGORY
		let a = [];

		// SET IF EXISTS
		a = cat['category'] !== undefined ? cat['category'] : [];

		if (this.sections.length > 0) {
			let categoriesName: any[] = this.fetchSidebarFilterCategoriesText(a);

			let sectionObject = this.categoriesSectionObject(categoriesName);

			let apiSections: any[] = this.sections;
			let sectionsArray: any[] = [];

			sectionsArray.push(sectionObject);

			this.sections = sectionsArray.concat(apiSections);
		} else {
			// FILL CATEGORY OBJECT
			this.sidebarFilterCategories = a;
		}
	}

	private renameArrayKeys(arrayValue) {
		let newArray = arrayValue.map((value, key) => ({ value: value }));

		return newArray
	}

	/**
	* Process categories section object
	*/
	private categoriesSectionObject(categoriesName) {
		categoriesName = this.renameArrayKeys(categoriesName);

		let sectionObject = {
			Name: 'Category',
			Type: 'Checkbox',
			Value: categoriesName
		};

		return sectionObject;
	}

	/**
	* Get categories name from categories array of object
	*/
	private fetchSidebarFilterCategoriesText(categories) {
		let categoriesName: any[] = [];

		for (let a of categories) {
			categoriesName.push(a.name);
		}

		return categoriesName;
	}

	private _setCategory(cat: object) {
		// CLEAR CATEGORY
		let a = [];

		// SET IF EXISTS
		a = cat['category'] !== undefined ? cat['category'] : [];

		// FILL CATEGORY OBJECT
		this.categories = a;
	}

	private _findIProductsInCategory(catI: number, itemI: number) {
		if (catI === itemI) {
			return true;
		}

		return false;
	}

	private _addCategories(item) {
		if (this.categories !== undefined && this.categories.length > 0) {
			this.categories.forEach(c => {
				// ONLY ADD IF CAT3
				if (item['Cat_id3']) {
					// ADD CATEGORIES SIDEBAR
					if (this._findIProductsInCategory(Number(c.id),	Number(item['Cat_id4']))) {
						// ONLY ADD IF DOESNT EXISTS
						(c.num === undefined || c.num == null) ? c.num = 1 : c.num++;
					}
				}
			});
		}
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
	private escapeoDataQueryParam(param: string) {
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
					parameters.push(' and Price ge ' + dataArray[data].minPrice);
					parameters.push(' and Price le ' + dataArray[data].maxPrice);
				} else {
					let currentIndex: number = parseInt(data) + 1;

					if (property === 'Category') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstCategoriesURLParam === true ? ' and (' : ' or ';

						this.isFirstCategoriesURLParam = false;

						let categoryID: number = this.getCategoryIDFromName(dataArray[data]);
						parameters.push(firstParamPrefix + 'Cat_id4 eq ' + categoryID);

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Brand') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstBrandURLParam === true ?	' and (' : ' or ';

						this.isFirstBrandURLParam = false;

						parameters.push(firstParamPrefix + property + ' eq ' + '\'' + this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Size (Ounces)') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstSizeURLParam === true ? ' and (' : ' or ';

						this.isFirstSizeURLParam = false;

						parameters.push(firstParamPrefix + 'Size' + ' eq ' + '\'' + this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Count') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstCountURLParam === true ? ' and (' : ' or ';

						this.isFirstCountURLParam = false;

						parameters.push(firstParamPrefix + property +	' eq ' + dataArray[data]);

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Weight') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstWeightURLParam === true ? ' and (' : ' or ';

						this.isFirstWeightURLParam = false;

						parameters.push(firstParamPrefix + property + ' eq ' + '\'' +	this.escapeoDataQueryParam(dataArray[data]) + '\'');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else if (property === 'Diet') {
						let firstParamPrefix: string;

						firstParamPrefix = this.isFirstDietURLParam === true ? ' and (' + property + '/any(d: ' : ' or ';

						this.isFirstDietURLParam = false;

						parameters.push(firstParamPrefix + 'd eq ' + '\'' +	this.escapeoDataQueryParam(dataArray[data]) + '\'');

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

						parameters.push(firstParamPrefix + '(' + property +	' ge ' + lowerRating + ' and ' + property + ' le ' +	upperRating + ')');

						if (currentIndex === dataArrayLength) {
							parameters.push(')');
						}
					} else {
						parameters.push(' and ' + property + ' eq ' + '\'' +	this.escapeoDataQueryParam(dataArray[data]) + '\'');
					}
				}
			}

			let encodedUrl = parameters.join('');
			return encodedUrl;
		}

		return false;
	}

	/**
	* Get category id from category name
	*/
	private getCategoryIDFromName(categoryName) {
		let categoryID = 0;

		if (this.sidebarFilterCategories.length > 0) {
			for (let categoryObject of this.sidebarFilterCategories) {
				if (categoryObject.name === categoryName) {
					categoryID = categoryObject.id;
					break;
				}
			}
		}

		return categoryID;
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
			this.isFirstWeightURLParam = true;
			this.isFirstCountURLParam = true;
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
