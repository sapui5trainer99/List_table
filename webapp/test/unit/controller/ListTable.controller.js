/*global QUnit*/

sap.ui.define([
	"list_table/controller/ListTable.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ListTable Controller");

	QUnit.test("I should test the ListTable controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
