sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "iamsoft/filav/scanner/model/Local",
], function(Controller, MessageToast, Local) {
	"use strict";

	return Controller.extend("iamsoft.filav.scanner.controller.App", {

		onInit: function () {

            this._local = new Local(1);

            this.getView().byId('preview').attachAfterRendering(this, () => {

                let previewElement = this.getView().byId('preview').getDomRef();

                let scanner = new Instascan.Scanner({ 
                    video: previewElement,
                });

                scanner.addListener('scan', qrcode => {
                    this._local.enviarFilas(qrcode);
                    MessageToast.show(content);
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

            }, this)

		}
	});
});
