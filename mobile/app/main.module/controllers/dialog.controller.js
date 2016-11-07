'use strict';

DialogController.$inject = ['$scope', '$timeout', '$ionicScrollDelegate', '$stateParams'];

module.exports = DialogController;

/**
 * Created by vaimer on 07.10.16.
 */
function DialogController($scope, $timeout, $ionicScrollDelegate, $stateParams) {

	console.log($stateParams.id);

}
