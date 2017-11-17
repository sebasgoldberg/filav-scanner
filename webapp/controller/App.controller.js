sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("iamsoft.filav.scanner.controller.App", {

		onInit: function () {

            //let viewDivId = this.getView().createId("preview");
            //let previewElement = jQuery("#"+viewDivId)[0];
            let previewElement = this.getView().byId('preview').getDomRef();

            let scanner = new Instascan.Scanner({ 
                video: previewElement,
            });

            scanner.addListener('scan', function (content) {
                MessageToast.show(content);
                console.log(content);
            });

            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    scanner.start(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });

		}
	});
});
