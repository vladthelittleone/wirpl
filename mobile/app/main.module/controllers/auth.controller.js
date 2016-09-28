/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$state', '$ionicSlideBoxDelegate', 'kudagoService'];

module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController ($scope, $state, $ionicSlideBoxDelegate, kudagoService) {

	// Called each time the slide changes
	$scope.slideChanged = function (index) {

		$scope.slideIndex = index;

    kudagoService.getAllEvents();

	};

}
