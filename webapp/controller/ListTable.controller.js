sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/json/JSONModel',
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("listtable.controller.ListTable", {
            onInit: function () {
                this.onReadProductData();
               
            },


            onReadProductData: function(){

                var oModel = this.getOwnerComponent().getModel();
               var oJSONModel = new sap.ui.model.json.JSONModel();
               var that=this;
                oModel.read("/ProductSet",{
                            success: function(response)
                            {
                                debugger;
                              //  oJSONModel.setData(oresponse);
                                oJSONModel.setData(response.results);
                                that.getView().setModel(oJSONModel);
                                //that.getView().setModel(oJSONModel);
                            }.bind(that),
                            error: function(error){
                                debugger;
                            }

                })

        },
        // onSelectionChange: function (oEvent) {
        //     debugger;
		// 	var oList = oEvent.getSource();
		// 	var oLabel = this.byId("idFilterLabel");
		// 	var oInfoToolbar = this.byId("idInfoToolbar");

		// 	// With the 'getSelectedContexts' function you can access the context paths
		// 	// of all list items that have been selected, regardless of any current
		// 	// filter on the aggregation binding.
		// 	var aContexts = oList.getSelectedContexts(true);

		// 	// update UI
		// 	var bSelected = (aContexts && aContexts.length > 0);
		// 	var sText = (bSelected) ? aContexts.length + " selected" : null;
		// 	oInfoToolbar.setVisible(bSelected);
		// 	oLabel.setText(sText);
		// },

               
        onLiveSearchData: function(oEvent){
            debugger;
            	// add filter for search

            var sValue = oEvent.getParameter("newValue");
            var oBinding = this.byId('ProductList').getBinding("items");
            if(sValue)
            {
           
            var oFilters = [new Filter({
                filters: [
                  
                    new Filter("ProductID", FilterOperator.Contains, sValue),            
                    new Filter("TypeCode", FilterOperator.Contains, sValue)
                ],
                and: false // or
            })];
            }
            else{
                oFilters=[];
            }
            oBinding.filter(oFilters);               
               
        },

        onliveChange: function(oEvent)
        {
            debugger;
            var sValue = oEvent.getParameter("newValue");
            var oBinding = this.byId('ProductList').getBinding("items");
            if(sValue)
            {
           
            var oFilters = [new Filter({
                filters: [
                  
                    new Filter("ProductID", FilterOperator.Contains, sValue),            
                    new Filter("TypeCode", FilterOperator.Contains, sValue)
                ],
                and: false // or
            })];
            }
            else{
                oFilters=[];
            }
            oBinding.filter(oFilters);               
               
        },
        onUpdateFinish: function(evt){
            debugger;
           var title =  this.getOwnerComponent().getModel('i18n').getResourceBundle().getText('title');
           var count = evt.getParameter("total");
           this.byId('ProductList').setHeaderText(title+"("+count+")");
                    
        }
    });
});