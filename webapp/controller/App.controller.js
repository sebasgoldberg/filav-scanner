/*global Instascan*/
sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/m/MessageToast',
    'iamsoft/filav/scanner/model/Local',
    'sap/ui/model/json/JSONModel',
], function(Controller, MessageToast, Local, JSONModel) {
    'use strict';

    return Controller.extend('iamsoft.filav.scanner.controller.App', {

        onInit: function () {

            let oModelLocales = new JSONModel([]);
            this.getView().setModel(oModelLocales, 'locais');
            this.getView().bindElement({path:'/', model:'locais'});

            let oModelForm = new JSONModel({local:''});
            this.getView().setModel(oModelForm, 'form');
            this.getView().bindElement({path:'/', model:'form'});

            let oModelView = new JSONModel({scanning:false});
            this.getView().setModel(oModelView, 'view');
            this.getView().bindElement({path:'/', model:'view'});

            this.loadForm();
            this.initScan();
        },

        get: function(uri){

            return new Promise((resolve, reject) => {

                jQuery.ajax(uri,
                    {
                        type : 'GET',
                        contentType : 'application/json',
                        dataType : 'json',
                        success : function(data) {
                            resolve(data);
                        }
                    }
                ).fail(function( jqXHR ) {
                    reject(jqXHR);
                });
                
            });
        },

        getLocaisDisponiveis: function(){
            return this.get('/api/locais/');
        },

        loadForm: function(){
            this.getLocaisDisponiveis()
                .then( locais => {
                    let oModelLocales = this.getView().getModel('locais');
                    oModelLocales.setData(locais);
                    oModelLocales.refresh();
                })
                .catch( reason => console.error(reason) );
        },

        getLocalSelecionado: function(){
            let oModelForm = this.getView().getModel('form');
            let oForm = oModelForm.getData();
            return oForm.local;
        },

        setScanningMode: function(scanning=true){
            let oModelView = this.getView().getModel('view');
            oModelView.getData().scanning = scanning;
            oModelView.refresh();
        },

        onScan: function(){
            let localSelecionado = this.getLocalSelecionado();
            this._local = new Local(localSelecionado);
            this.scan();
            this.setScanningMode();
        },

        scan: function(){

            Instascan.Camera.getCameras().then( cameras => {
                if (cameras.length > 0) {
                    this._scanner.start(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
            }).catch( e => console.error(e) );
        },

        qrCodeLido: function(qrcode){
            this._local.enviarFilas(qrcode);
            MessageToast.show('Codigo QR lido e enviado para validar. Por favor verifique seu dispositivo.');
        },

        initScan: function(){

            this.getView().byId('preview')
                .attachAfterRendering(this, () => {

                    let previewElement = this.getView().byId('preview')
                        .getDomRef();

                    this._scanner = new Instascan.Scanner({ 
                        video: previewElement,
                    });

                    this._scanner.addListener('scan', qrcode => {
                        this.qrCodeLido(qrcode);
                    });

                }, this);

        },

        onCancelar: function(){
            this._scanner.stop();
            this.setScanningMode(false);
        }

    });
});
