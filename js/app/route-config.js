/**
 * Created by as on 18.11.2014.
 */
(function (ng) {
	"use strict";

	ng
		.module("todo")
		.config(config);

	function config($routeProvider, $logProvider) {
		$logProvider.debugEnabled(true);

		$routeProvider
			.when('/', {
				redirectTo: function () {
					return "/home";
				}
			})
			.when('/home', {
				templateUrl: 'partials/home/index.html',
				controller: 'HomeCtrl',
				controllerAs: "vm"
			})
			.otherwise({
				redirectTo: '/error'
			});
	}

})(angular);
