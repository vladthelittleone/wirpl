/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate'];

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $state, $ionicSlideBoxDelegate) {

	// Called each time the slide changes
	$scope.slideChanged = function (index) {

		$scope.slideIndex = index;

	};

}
