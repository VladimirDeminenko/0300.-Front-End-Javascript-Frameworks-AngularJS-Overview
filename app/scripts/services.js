'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', '$http', 'baseURL', function ($resource, $http, baseURL) {
        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        // implement a function named getPromotion
        // that returns a selected promotion.    
        this.getPromotion = function () {
            return $resource(baseURL + "promotions/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

    }])
    .factory('corporateFactory', ['$resource', '$http', 'baseURL', function ($resource, $http, baseURL) {
        var corpfac = {};

        // Implement a function named getLeaders
        // that returns a selected promotion.  
        corpfac.getLeaders = function () {            
            return $resource(baseURL + "leadership/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        return corpfac;
    }])

;