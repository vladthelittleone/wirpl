'use strict';

/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$http', '$state'];

var parser = require('./../parsers/kudago/events');

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $http, $state) {


	$scope.authenticate = authenticate;
	$scope.slideChanged = slideChanged;

	// Called each time the slide changes
	function slideChanged(index) {

    parser.getAllEvents(1, 'spb',Date.now(), function(error, result){

      console.log(result);

    });
    
		$scope.slideIndex = index;

	}

	function authenticate () {

		$http.get('/login/vk', function (data) {

			console.log(data);

		});

		$state.go('main.wirpl');

	}

}
