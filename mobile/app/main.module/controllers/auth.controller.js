/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate', 'connection'];

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $state, $ionicSlideBoxDelegate, connection) {

	// Called each time the slide changes
	$scope.slideChanged = function (index) {

		$scope.slideIndex = index;

	};

	$scope.authenticate = function () {

    connection.authentication(function (result) {

      console.log(result);

    })
  }

}
