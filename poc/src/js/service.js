'use strict';

/* Services */

myApp.value('TVA', 19.6);

myApp.factory('Cart', ['TVA', function (TVA) {
    return {
        rows: {},
        add: function (product) {
            var row = this.rows[product.id];
            if (row) {
                row.qty++;
            } else {
                this.rows[product.ref] = {
                    product: product,
                    qty: 1
                };
            }
        },
        total: function () {
            var sum = 0;
            for (var i in this.rows) {
                sum += this.rows[i].qty * this.rows[i].product.price;
            }
            return sum;
        },
        totalHT: function () {
            return this.total() * 100 / (100 + TVA);
        },
        empty: function () {
            return Object.keys(this.rows).length == 0;
        }
    };
}]);