var myApp = angular.module('myApp',['ngResource', 'ngRoute', 'ui.router', 'ngCart']);

//settings
var shopURL = 'http://localhost/prestashop_1.6.0.9/';
var WS_KEY = '1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU';
var WS_SOURCE = shopURL+'/api';

myApp.config(function($stateProvider, $urlRouterProvider, $routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'partials/catalog.html',
			controller: 'CatalogController'
		})
		.when('/product/:productId', {
			templateUrl: 'partials/product.html',
			controller: 'ProductController'
		})
		.when('/cart', {
			templateUrl: 'partials/cart.html',
			controller: 'CartController'
		})
		.otherwise({
			templateUrl: 'partials/catalog.html',
			controller: 'CatalogController'
		});
});



/*------------------------------------------------------------------------------------------------
-------------------CONTROLLERS
------------------------------------------------------------------------------------------------*/
myApp.controller('CartController', ['$scope', '$http', 'ProductsFactory', 'ImagesFactory', '$routeParams', 'Cart', function ($scope, $http, ProductsFactory, ImagesFactory, $routeParams, Cart) {
	console.log("CartController");
		
	$scope.cart = Cart
	
}]);

myApp.controller('ProductController', ['$scope', '$http', 'ProductsFactory', 'ImagesFactory', '$routeParams', 'Cart', 'StockAvailablesFactory', '$location', function ($scope, $http, ProductsFactory, ImagesFactory, $routeParams, Cart, StockAvailablesFactory, $location) {
	console.log("ProductController");
	StockAvailablesFactory.query({stockId: 1}).$promise.then(function ($data) {
		$scope.q = parseInt($data.stock_available.quantity);
		$scope.qtyOpt =  [];
		if ($data.stock_available.quantity > 10) {
			var quantityMax = 10
		} else {
			var quantityMax = $data.stock_available.quantity;
		}
		
		for (var i = 1; i <= quantityMax; i++) {
			$scope.qtyOpt.push(i);
		}
	},function () {
		console.log("NOOOOOOOOON");
	});
	
	ProductsFactory.query({productId: $routeParams.productId}).$promise.then(function ($data) {
		if ($data != undefined) {
			var id = $data.product.id;
			var idImage = $data.product.associations.images[0].id;
			var newURL = "http://localhost/prestashop_1.6.0.9/api/images/products/" + id + "/" + idImage + "?ws_key=1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU";
			$data.product.urlImg = newURL;
			
			$scope.product = $data.product;
			console.log("ID du stock : " + $data.product.associations.stock_availables[0].id);
			if($data.product.associations.stock_availables[0].id != undefined) {
			} 
		}
	},function () {
		console.log("NOOOOOOOOON");
	});
	
	$scope.addCart = function (item) {
		Cart.add(item);
		$location.url("/cart");
	}
}]);

myApp.controller('CatalogController', ['$scope', '$http', 'ProductsFactory', function ($scope, $http, ProductsFactory) {
	ProductsFactory.getAll().$promise.then(function ($data) {
		if ($data != undefined) {
			for (var i = 0; i < $data.products.length; i++) {
				var id = $data.products[i].id;
				var idImage = $data.products[i].associations.images[0].id;
				var newURL = "http://localhost/prestashop_1.6.0.9/api/images/products/" + id + "/" + idImage + "?ws_key=1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU";
				$data.products[i].urlImg = newURL;
			}
		$scope.prestashop = $data.products;
		}
	},function () {
		console.log("NOOOOOOOOON");
	});
}]);