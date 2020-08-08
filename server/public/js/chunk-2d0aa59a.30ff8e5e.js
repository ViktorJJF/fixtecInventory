(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aa59a"],{1148:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("custom-card",{attrs:{title:"Historial de ventas",icon:"mdi-format-list-checks"},scopedSlots:e._u([{key:"content",fn:function(){return[a("div",{staticClass:"text-center pt-2"},[a("v-pagination",{attrs:{length:e.totalPages},on:{input:function(t){return e.initialData(e.page)}},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{loading:!e.isDataReady,headers:e.headers,items:e.sales,options:e.pagination,"items-per-page":5,"server-items-length":e.totalItems,"hide-default-footer":"","footer-props":{"items-per-page-text":"yarita","items-per-page-options":[5,10,25]}},on:{"update:options":function(t){e.pagination=t}},scopedSlots:e._u([{key:"no-data",fn:function(){return[a("v-alert",{attrs:{type:"error",value:!0}},[e._v("Aún no cuentas con un historial de ventas")])]},proxy:!0},{key:"item.userId",fn:function(t){var a=t.item;return[e._v(e._s(a.userId.email))]}},{key:"item.products",fn:function(t){var n=t.item;return[a("ul",e._l(n.products,(function(t){return a("li",{key:t._id},[e._v(e._s(t.productId?t.productId.name:"Producto eliminado")+" ("+e._s(t.qty)+" x S/."+e._s(t.salePrice)+")")])})),0)]}},{key:"item.amount",fn:function(t){var n=t.item;return[a("span",{staticClass:"ganancia"},[e._v("S/."+e._s(e.totalRevenue(n.products)))])]}},{key:"item.date",fn:function(t){var n=t.item;return[a("div",[a("v-text-field",{directives:[{name:"show",rawName:"v-show",value:e.editMode&&n._id==e.editedIndex,expression:"editMode && item._id==editedIndex"}],staticClass:"mt-4",attrs:{outlined:"",dense:"","prepend-icon":"event",type:"date"},model:{value:e.editedDate,callback:function(t){e.editedDate=t},expression:"editedDate"}}),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.editMode||n._id!=e.editedIndex,expression:"!editMode || item._id!=editedIndex"}]},[e._v(e._s(e._f("formatDate")(n.date)))]),a("v-chip",{directives:[{name:"show",rawName:"v-show",value:!!n.products[0]&&n.products[0].history,expression:"item.products[0]?item.products[0].history:false"}],staticClass:"ma-2",attrs:{color:"info",small:""}},[e._v("Histórico")])],1)]}},{key:"item.actions",fn:function(t){var n=t.item;return[a("v-btn",{directives:[{name:"show",rawName:"v-show",value:!e.editMode||n._id!=e.editedIndex,expression:"!editMode || item._id!=editedIndex"}],staticClass:"mr-2 my-2",attrs:{small:"",color:"info"},on:{click:function(t){e.editMode=!0,e.editedIndex=n._id,e.editedDate=new Date(n.date).toISOString().substr(0,10)}}},[e._v("Editar")]),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.editMode&&n._id==e.editedIndex,expression:"editMode && item._id==editedIndex"}],staticClass:"mr-2 my-2",attrs:{small:"",color:"success"},on:{click:function(t){e.saveSale(n),e.editMode=!1}}},[e._v("Guardar")]),a("v-btn",{staticClass:"mb-2 my-2",attrs:{small:"",color:"error"},on:{click:function(t){return e.deleteItem(n)}}},[e._v("Eliminar")])]}},{key:"item.createdAt",fn:function(t){var a=t.item;return[e._v(e._s(e._f("formatDate")(a.createdAt)))]}}])}),a("div",{staticClass:"text-center pt-2"},[a("v-pagination",{attrs:{length:e.totalPages},on:{input:function(t){return e.initialData(e.page)}},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)]},proxy:!0}])})},s=[],i=(a("c975"),a("13d5"),a("a434"),a("b680"),a("b85c")),r=(a("96cf"),a("1da1")),o=a("5530"),d=a("b166"),c=a("2f62"),l=a("fa7d"),u={filters:{formatDate:function(e){return Object(d["a"])(new Date(e),"dd/MM/yyyy")}},data:function(){return{editedDate:null,editedIndex:null,editMode:!1,page:1,pageCount:0,itemsPerPage:10,isDataReady:!1,selectedOrder:0,pagination:{},search:"",dialog:!1,editedSale:{_id:null,date:null},headers:[{text:"Fecha de venta",value:"date"},{text:"Vendedor",value:"userId"},{text:"Productos vendidos",value:"products"},{text:"Beneficio",value:"amount"},{text:"Acciones",value:"actions"}],sales:[],orderDetails:[]}},computed:Object(o["a"])({totalItems:function(){return this.$store.state.salesModule.totalSales},totalPages:function(){return this.$store.state.salesModule.totalPages}},Object(c["b"])({productById:"productsModule/productById"})),created:function(){this.initialData()},methods:{initialData:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,t.$store.dispatch("loadingModule/showLoading"),e=e||1,a.t0=t,a.next=6,t.$store.dispatch("salesModule/listWithProducts",Object(l["a"])({page:e,itemsPerPage:t.$store.state.itemsPerPage}));case 6:for(a.t1=a.sent,t.sales=a.t0.$deepCopy.call(a.t0,a.t1),n=0;n<t.sales.length;n++)for(s=0;s<t.sales[n].products.length;s++)t.sales[n].products[s].productId=t.productById(t.sales[n].products[s].productId);a.next=14;break;case 11:a.prev=11,a.t2=a["catch"](0),console.log("algo salio mal...:",a.t2);case 14:return a.prev=14,t.$store.dispatch("loadingModule/showLoading",!1),a.finish(14);case 17:t.isDataReady=!0;case 18:case"end":return a.stop()}}),a,null,[[0,11,14,17]])})))()},saveSale:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=new Date(t.editedDate),n=new Date(n.getTime()- -6e4*n.getTimezoneOffset()),e.date=n,a.next=5,t.$store.dispatch("salesModule/update",{id:e._id,data:{commerce:e.commerce,date:n}});case 5:case"end":return a.stop()}}),a)})))()},totalRevenue:function(e){return e?e.reduce((function(e,t){return e+t.salePrice*t.qty}),0).toFixed(2):"S/.0"},deleteItem:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var n,s,r,o,d,c;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.sales.indexOf(e),s=t.sales[n]._id,r=t.sales[n].products,a.next=5,t.$confirm("¿Seguro que deseas eliminar esta venta? Se sumará el stock a los productos del detalle");case 5:if(!a.sent){a.next=21;break}return a.prev=6,t.$store.dispatch("loadingModule/showLoading"),a.next=10,t.$store.dispatch("salesModule/delete",s);case 10:o=Object(i["a"])(r);try{for(o.s();!(d=o.n()).done;)c=d.value,console.log("este es el history: ",c.history),c.history||t.$store.commit("productsModule/updateStock",{productId:c.productId._id,qty:c.qty})}catch(l){o.e(l)}finally{o.f()}t.sales.splice(n,1),a.next=18;break;case 15:a.prev=15,a.t0=a["catch"](6),console.log(a.t0);case 18:return a.prev=18,t.$store.dispatch("loadingModule/showLoading",!1),a.finish(18);case 21:case"end":return a.stop()}}),a,null,[[6,15,18,21]])})))()}}},p=u,m=a("2877"),v=a("6544"),f=a.n(v),h=a("0798"),g=a("8336"),x=a("cc20"),y=a("8fea"),w=a("891e"),_=a("8654"),b=Object(m["a"])(p,n,s,!1,null,"312db927",null);t["default"]=b.exports;f()(b,{VAlert:h["a"],VBtn:g["a"],VChip:x["a"],VDataTable:y["a"],VPagination:w["a"],VTextField:_["a"]})}}]);
//# sourceMappingURL=chunk-2d0aa59a.30ff8e5e.js.map