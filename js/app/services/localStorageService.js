/**
 * Created by as on 19.11.2014.
 */
(function (ng) {
	"use strict";

	ng
		.module("todo")
		.factory("$localStorageService", localStorageService);

	localStorageService.$inject = [
		"$window"
	];

	function localStorageService($window) {
		var $storage = $window.localStorage;
		initStorage();

		return {
			saveTodoItem: saveTodoItem,
			getAllItems: getAllItems,
			clearAll: clearAll,
			deleteItem: deleteItem,
			changeItemStatus: changeItemStatus
		};

		function initStorage() {
			if (!_checkRecords()) {
				return _setItems([]);
			}
		}

		function saveTodoItem(item) {
			var items = getAllItems();
			items.push(item);
			return _setItems(items);
		}

		function clearAll() {
			_setItems([]);
		}

		function getAllItems() {
			return JSON.parse($storage.getItem(KEY));
		}

		function deleteItem(itemId) {
			var items = getAllItems(),
				reloadedItems = [];

			items.forEach(function (item) {
				if (item.id === itemId) return;
				this.push(item);
			}, reloadedItems);
			_setItems(reloadedItems);
		}

		function changeItemStatus(items) {
			_setItems(items);
		}

		function _checkRecords() {
			return $storage.hasOwnProperty(KEY);
		}

		function _setItems(items) {
			return $storage.setItem(KEY, JSON.stringify(items));
		}
	}
})(angular);
