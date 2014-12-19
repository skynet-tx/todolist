/**
 * Created by as on 18.11.2014.
 */
(function (ng) {
	"use strict";

	ng
		.module("todo")
		.controller("HomeCtrl", homeCtrl);

	homeCtrl.$inject = [
		"$log",
		"$scope",
		"$localStorageService"
	];

	function homeCtrl($log, $scope, $localStorageService) {
		var vm = this;
		$scope.reloadTodoItems = reloadTodoItems;
		$scope.lang = En_en;

		vm.listItems = $localStorageService.getAllItems();
		vm.onChangeItemStatus = onChangeItemStatus;
		vm.onDeleteItem = onDeleteItem;
		vm.onDeleteItems = onDeleteItems;

		function onChangeItemStatus() {
			$localStorageService.changeItemStatus(vm.listItems);
		}

		function reloadTodoItems() {
			vm.listItems = $localStorageService.getAllItems();
		}

		function onDeleteItem(id) {
			var isConfirm = confirm("Are you sure to delete this item?");
			if (isConfirm) {
				$localStorageService.deleteItem(id);
				reloadTodoItems();
			}
		}

		function onDeleteItems() {
			var isConfirm = confirm("Are you sure to delete all items?");
			if (isConfirm) {
				$localStorageService.clearAll();
				reloadTodoItems();
			}
		}
	}


})(angular);
