'use strict';

UserService.$inject = ['connection'];

module.exports = UserService;

function UserService (connection) {

	var t = {};

	t.getUsers = getUsers;

	return t;

	function getUsers(success, error) {

		connection.findRandomUser(success, error);

	}

}
