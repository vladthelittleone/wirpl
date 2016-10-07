'use strict';

/**
 * Created by vladthelittleone on 25.09.16.
 */
AuthController.$inject = ['$scope', '$state', 'authentication'];


module.exports = AuthController;

/**
 * Вьюха авторизации.
 */
function AuthController($scope, $state, authentication) {


  $scope.slideChanged = slideChanged;
  $scope.authenticate = authenticate;

  // Called each time the slide changes
  function slideChanged(index) {

    $scope.slideIndex = index;

  }

  function authenticate() {

    authentication.login(function (success, error) {

      if (success) {

        $state.go('main.wirpl');

      }

    })
  }

}
