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
