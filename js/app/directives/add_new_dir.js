/**
 * Created by as on 19.11.2014.
 */
(function (ng) {
	"use strict";

	ng
		.module("todo")
		.directive("formAddNew", formAddNew);

	function formAddNew($templateCache, $localStorageService) {
		var directive = {
			link: link,
			replace: true,
			templateUrl: 'partials/form_add_new.html',
			restrict: 'EA'
		};
		return directive;

		function link(scope, $el) {
			scope.onFormSubmit = onFormSubmit;
			scope.todoItem = {
				$$hashKey: null,
				done: false,
				text: ""
			};

			function onFormSubmit() {
				saveTodoItem();
			}

			function saveTodoItem() {
				$el.find("input").attr("disabled");
				$el.find("button").attr("disabled");
				scope.todoItem.id = _getTimeStamp();
				scope.todoItem.$$hashKey = _getTimeStamp();
				$localStorageService.saveTodoItem(scope.todoItem);
				scope.reloadTodoItems();
				scope.todoItem.text = "";
				$el.find("input").removeAttr("disabled");
				$el.find("button").removeAttr("disabled");
			}

			function _getTimeStamp(){
				var d = new Date();
				return d.getTime();
			}
		}
	}

})(angular);
