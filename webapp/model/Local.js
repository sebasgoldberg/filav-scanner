sap.ui.define([
    'sap/ui/base/Object',
    'iamsoft/socket/model/Socket'
], function (Object, Socket) {
    'use strict';

    return Object.extend('iamsoft.filav.scanner.model.Local', {
        
        constructor: function (idLocal) {
            this._id = idLocal;
            this._socket = new Socket('/scanner/');
            this._socket.listen( () => {
            });
        },

        enviarFilas: function(qrcode){
            this._socket.send({
                message: 'SCAN',
                data: {
                    qrcode: qrcode,
                    local: this._id,
                },
            });
        },

    });

});
