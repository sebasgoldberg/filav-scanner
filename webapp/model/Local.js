sap.ui.define([
	"sap/ui/base/Object",
    "iamsoft/socket/model/Socket"
], function (Object, Socket) {
	"use strict";

	return Object.extend("iamsoft.filav.scanner.model.Local", {
		
		constructor: function (idLocal) {
            this._id = idLocal;
			this._socket = new Socket('/fila/');
			this._socket.listen( data => {
			});
		},

		enviarFilas: function(qrcode){
			this._socket.send({
                message: 'ENVIAR_FILAS',
                data: {
                    qrcode: qrcode,
                    local: this._id,
                },
            })
		},

	});

});
