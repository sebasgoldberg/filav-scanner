/* global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"iamsoft/filav/scanner/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"iamsoft/filav/scanner/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "iamsoft.filav.scanner.view."
	});

	sap.ui.require([
		"iamsoft/filav/scanner/test/integration/navigationJourney"
	], function () {
		QUnit.start();
	});
});