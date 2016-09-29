/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$http', '$state'];

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $http, $state) {


	$scope.authenticate = authenticate;
	$scope.slideChanged = slideChanged;

	// Called each time the slide changes
	function slideChanged(index) {

		$scope.slideIndex = index;

	}

	function authenticate () {

		$http.get('/login/vk', function (data) {

			console.log(data);

		});

		$state.go('main.wirpl');

	}

}
