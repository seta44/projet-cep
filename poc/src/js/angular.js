var myApp = angular.module('myApp',['ngResource', 'ngRoute', 'ui.router', 'ngCart']);

//settings
var shopURL = 'http://localhost/prestashop_1.6.0.9/';
var WS_KEY = '1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU';
var WS_SOURCE = shopURL+'/api';

myApp.config(function($stateProvider, $urlRouterProvider, $routeProvider) {
	$routeProvider
		.when('/cart/:productId', {
			templateUrl: 'cart.html',
			controller: 'CartController'
		})
		.when('/product/:productId', {
			templateUrl: 'product.html',
			controller: 'ProduitController'
		})
		.when('/home', {
			templateUrl: 'test.html',
			controller: 'ProductController'
		}).otherwise({
			templateUrl: 'test.html',
			controller: 'ProductController'
		});
		//}).otherwise({redirectTo: '/home'});
    
	/*
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'test.html',
			controller: 'ProductController'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('productDetail', {
            url: '/product/:productId',
            templateUrl: 'product.html',  
			controller: 'ProduitController'
        });
        */
});



/*------------------------------------------------------------------------------------------------
-------------------CONTROLLERS
------------------------------------------------------------------------------------------------*/
myApp.controller('CartController', ['$scope', '$http', 'ProductsFactory', 'ImagesFactory', '$routeParams', 'ngCart', function ($scope, $http, ProductsFactory, ImagesFactory, $routeParams, ngCart) {
	console.log("CartController");
	console.log("ID PRODUCT : " + $routeParams.productId);
	console.log(ngCart);
	console.log(ngCart.getCart().items);
	
	ngCart.addItem($routeParams.productId, 'toto', '12', 1, null);
	console.log(ngCart);
	//$scope.ngCart = ngCart;
	//$scope.ngCart = ngCart.getCart;
	/*
	if ($myCart != undefined) {
	
	} else {
		$myCart = new Object();
	}
	console.log("myCart : " + myCart);
	if ( $routeParams.productId != undefined) {
		$myCart.associations.cart_rows.id_product = $routeParams.productId;
	} */
}]);

myApp.controller('ProduitController', ['$scope', '$http', 'ProductsFactory', 'ImagesFactory', '$routeParams', 'ngCart', 'StockAvailablesFactory', function ($scope, $http, ProductsFactory, ImagesFactory, $routeParams, ngCart, StockAvailablesFactory) {
	console.log("ProduitController");
	console.log("ID PRODUCT : " + $routeParams.productId);
	
	$scope.ngCart = ngCart;
	
	/*
	$scope.attrs = attrs;
	$scope.inCart = function(){
		return  ngCart.getItemById(attrs.id);
	};

	if ($scope.inCart()){
		$scope.q = ngCart.getItemById(attrs.id).getQuantity();
	} else {
		$scope.q = parseInt($scope.quantity);
	}

	$scope.qtyOpt =  [];
	for (var i = 1; i <= $scope.quantityMax; i++) {
		$scope.qtyOpt.push(i);
	}
	*/
	
	StockAvailablesFactory.query({stockId: 1}).$promise.then(function ($data) {
		console.log($data);
		console.log($data.stock_available);
		console.log($data.stock_available.quantity);
		
		$scope.q = parseInt($data.stock_available.quantity);
		console.log($scope.q);
		
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
	
	//ProductsFactory.query({productId : $stateParams.productId}).$promise.then(function ($data) {
	ProductsFactory.query({productId: $routeParams.productId}).$promise.then(function ($data) {
		console.log("OK");
		console.log($data);
		if ($data != undefined) {
			var id = $data.product.id;
			//console.log(id);
			var idImage = $data.product.associations.images[0].id;
			//console.log(idImage);
			
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
	
	
	
	
}]);

myApp.controller('ProductController', ['$scope', '$http', 'ProductsFactory', 'ImagesFactory', function ($scope, $http, ProductsFactory, DataSource, ImagesFactory) {
	//var shopData = function(data) {$scope.prestashop = data;};
	//DataSource.get(WS_SOURCE,WS_KEY,shopData);
	/*
	var req = {
		method: 'GET',
		url: shopURL + 'api/products/',
		params: {
			ws_key: WS_KEY,
			output_format: 'JSON',
			display: 'full'
		}
	};
	
	$http(req).success(function(data, status, headers, config) {
		//console.log(data);
		//console.log(status);
		//console.log(headers);
		//console.log(config);
		
		for (var i = 0; i < data.products.length; i++) {
			//console.log(data.products[i].associations.images[0].id);
			var id = data.products[i].id;
			//console.log(id);
			var idImage = data.products[i].associations.images[0].id;
			//console.log(idImage);
			
			var newURL = "http://localhost/prestashop_1.6.0.9/api/images/products/" + id + "/" + idImage + "?ws_key=1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU";
			data.products[i].urlImg = newURL;
		}
		
		$scope.prestashop = data.products;
	}).error(function(data, status, headers, config) {
		console.log(data);
		console.log(status);
		console.log(headers);
		console.log(config);
	});
	*/
	
	
	
	/*var productList = JSON.parse($data);
	console.log(productList);
	
	for (var iter = 0; iter < productList.length; iter++) {
		var id = productList[i].id;
			//console.log(id);
			var idImage = productList[i].associations.images[0].id;
			//console.log(idImage);
			
			var newURL = "http://localhost/prestashop_1.6.0.9/api/images/products/" + id + "/" + idImage + "?ws_key=1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU";
			productList[i].urlImg = newURL;
	}*/
	
	/*
	$data = ProductsFactory.getAll();
	console.log($data);
	
	$data.$promise.then(function () {
		console.log("OK");
		if ($data != undefined) {
			for (var iter = 0; iter < $data.length; iter++) {
				var id = $data[i].id;
				//console.log(id);
				var idImage = $data[i].associations.images[0].id;
				//console.log(idImage);
				
				var newURL = "http://localhost/prestashop_1.6.0.9/api/images/products/" + id + "/" + idImage + "?ws_key=1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU";
				$data[i].urlImg = newURL;
			}
		$scope.prestashop = $data;
		}
		
	},function () {
		console.log("NOOOOOOOOON");
	})
	*/
	
	ProductsFactory.getAll().$promise.then(function ($data) {
		console.log("OK");
		if ($data != undefined) {
			for (var i = 0; i < $data.products.length; i++) {
				var id = $data.products[i].id;
				//console.log(id);
				var idImage = $data.products[i].associations.images[0].id;
				//console.log(idImage);
				
				var newURL = "http://localhost/prestashop_1.6.0.9/api/images/products/" + id + "/" + idImage + "?ws_key=1YAFAHJNHFC6MJPHWYK77C2BX58HRAVU";
				$data.products[i].urlImg = newURL;
			}
		$scope.prestashop = $data.products;
		}
		
	},function () {
		console.log("NOOOOOOOOON");
	});
	
	
}]);

/*------------------------------------------------------------------------------------------------
--------------------FACTORY
------------------------------------------------------------------------------------------------*/

myApp.factory('ProductsFactory', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
  var data = $resource(WS_SOURCE+'/products/:productId', {ws_key:WS_KEY},{
    getAll: {method:'GET', params:{display:'full', output_format: 'JSON'}},
    query: {method:'GET', params:{output_format: 'JSON', productId:'@productId'}}
  });
  return data;
}]);

myApp.factory('ImagesFactory', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
  var data = $resource(WS_SOURCE+'/images/product/:imageId', {ws_key:WS_KEY},{
    getAll: {method:'GET', params:{display:'full', output_format: 'JSON'}},
    query: {method:'GET', params:{display:'full', output_format: 'JSON', imageId:'@imageId'}}
  });
  return data;
}]);

myApp.factory('CartsFactory', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
  var data = $resource(WS_SOURCE+'/carts/:cartId', {ws_key:WS_KEY},{
    getAll: {method:'GET', params:{display:'full', output_format: 'JSON'}},
    query: {method:'GET', params:{output_format: 'JSON', imageId:'@cartId'}},
    add: {method:'POST', params:{output_format: 'JSON', imageId:'@cartId'}},
    update: {method:'PUT', params:{output_format: 'JSON', imageId:'@cartId'}},
    delete: {method:'DELETE', params:{output_format: 'JSON', imageId:'@cartId'}}
  });
  return data;
}]);

myApp.factory('OrdersFactory', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
  var data = $resource(WS_SOURCE+'/orders/:orderId', {ws_key:WS_KEY},{
    getAll: {method:'GET', params:{display:'full', output_format: 'JSON'}},
    query: {method:'GET', params:{display:'full', output_format: 'JSON', imageId:'@orderId'}},
    add: {method:'POST', params:{output_format: 'JSON', imageId:'@orderId'}},
    update: {method:'PUT', params:{output_format: 'JSON', imageId:'@orderId'}},
    delete: {method:'DELETE', params:{output_format: 'JSON', imageId:'@orderId'}}
  });
  return data;
}]);

myApp.factory('StockAvailablesFactory', ['$http', '$resource', '$routeParams', function($http, $resource, $routeParams) {
  var data = $resource(WS_SOURCE+'/stock_availables/:stockId', {ws_key:WS_KEY},{
    getAll: {method:'GET', params:{display:'full', output_format: 'JSON'}},
    query: {method:'GET', params:{output_format: 'JSON', stockId:'@stockId'}}
  });
  return data;
}]);
