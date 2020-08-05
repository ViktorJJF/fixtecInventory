(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-06e09c96"],{"79e0":function(t,e,a){"use strict";var r=a("bcbb"),s=a.n(r);s.a},bcbb:function(t,e,a){},f32d:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("custom-card",{attrs:{title:"Realizar Compra",icon:"mdi-plus"},scopedSlots:t._u([{key:"content",fn:function(){return[a("v-container",[a("v-alert",{directives:[{name:"show",rawName:"v-show",value:t.historyMode,expression:"historyMode"}],attrs:{prominent:"",type:"error"}},[a("v-col",{staticClass:"grow"},[t._v("Aviso: Estás en el modo de compras históricas, por lo que las compras que registres no modificarán tu stock actual.")])],1),a("v-row",{attrs:{align:"center"}},[a("p",{staticClass:"body-1 font-weight-bold d-inline mx-3"},[t._v("Fecha:")]),a("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,s=e.attrs;return[a("v-text-field",t._g(t._b({staticClass:"date-width",attrs:{"persistent-hint":"","prepend-inner-icon":"event",readonly:"",outlined:"",dense:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},"v-text-field",s,!1),r))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":""},on:{input:function(e){t.menu=!1}},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),a("v-spacer"),a("v-switch",{attrs:{label:"Modo histórico: "+(t.historyMode?"Activo":"Inactivo")},model:{value:t.historyMode,callback:function(e){t.historyMode=e},expression:"historyMode"}})],1),a("v-btn",{staticClass:"my-3",attrs:{tile:"",color:"primary"}},[a("v-icon",{attrs:{left:""}},[t._v("search")]),t._v("Búsqueda ")],1),a("v-autocomplete",{staticClass:"search-field mr-3",attrs:{placeholder:"Escribe el nombre del producto",loading:t.productsLoading,items:t.products,"item-text":"name","item-value":"_id","return-object":!0,dense:"",outlined:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addPurchase(t.selectedProduct)},click:t.productsList,change:function(e){return t.addPurchase(t.selectedProduct)}},scopedSlots:t._u([{key:"no-data",fn:function(){return[t.productsLoading?a("v-container",{staticClass:"text-center",attrs:{fluid:""}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):t._e()]},proxy:!0}]),model:{value:t.selectedProduct,callback:function(e){t.selectedProduct=e},expression:"selectedProduct"}}),a("v-btn",{attrs:{outlined:"",color:"primary",to:{name:"historyPurchase"}}},[a("v-icon",{attrs:{left:""}},[t._v("mdi-format-list-checks")]),t._v("Ver historial ")],1),a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[a("span",[t._v("Producto")])]),a("th",{staticClass:"text-left"},[a("span",[t._v("Cantidad")])]),a("th",{staticClass:"text-left"},[a("span",[t._v("Precio")])]),a("th",{staticClass:"text-left"},[a("span",[t._v("Subtotal")])]),a("th",{staticClass:"text-left"},[a("span",[t._v("Eliminar producto")])])])]),a("tbody",t._l(t.purchases,(function(e,r){return a("tr",{key:"b"+r},[a("td",[t._v(t._s(e.productDetails.name))]),a("td",[a("v-text-field",{staticClass:"inputs-width",attrs:{suffix:"unidades",type:"number"},model:{value:e.qty,callback:function(a){t.$set(e,"qty",a)},expression:"product.qty"}})],1),a("td",[a("v-text-field",{staticClass:"inputs-width",attrs:{prefix:"S/.",type:"number"},model:{value:e.purchasePrice,callback:function(a){t.$set(e,"purchasePrice",a)},expression:"product.purchasePrice"}})],1),a("td",[t._v("S/."+t._s(e.purchasePrice*e.qty))]),a("td",[a("v-btn",{attrs:{small:"",color:"error"},on:{click:function(e){return t.deletePurchase(r)}}},[t._v("Eliminar")])],1)])})),0)]},proxy:!0}])}),a("v-alert",{directives:[{name:"show",rawName:"v-show",value:0==t.purchases.length,expression:"purchases.length==0"}],staticClass:"my-5",attrs:{type:"warning",text:""}},[t._v("Aún no agregaste productos a esta compra")]),a("v-row",{staticClass:"mr-3 mb-3",attrs:{justify:"end"}},[a("v-card",{staticClass:"pa-3",attrs:{dark:"",outlined:"",color:"info"}},[a("strong",{staticClass:"text--white"},[t._v("Total:")]),t._v(" "),a("span",{staticClass:"total"},[t._v("S/."+t._s(t.getTotal))])])],1),a("v-btn",{attrs:{loading:t.loadingButton,color:"success"},on:{click:function(e){return t.savePurchase(t.purchases,t.date)}}},[t._v("Terminar Compra")])],1)]},proxy:!0}])})},s=[],n=(a("13d5"),a("a434"),a("b85c")),o=(a("96cf"),a("1da1")),c={data:function(){return{historyMode:!1,selectedProduct:null,date:(new Date).toISOString().substr(0,10),menu:!1,purchases:[],total:0,productsLoading:!1,loadingButton:!1}},methods:{deletePurchase:function(t){this.purchases.splice(t,1)},addPurchase:function(t){t&&this.purchases.push({productDetails:t,productId:t._id,qty:1,purchasePrice:t.price,history:this.historyMode})},savePurchase:function(t,e){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function r(){var s,o,c,i,u,l,d,p,h,f,v,m,y,b,w,x,g,_;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:a.loadingButton=!0,t=a.$deepCopy(t),s=Object(n["a"])(t);try{for(s.s();!(o=s.n()).done;)c=o.value,delete c["productDetails"]}catch(k){s.e(k)}finally{s.f()}if(a.historyMode){i=Object(n["a"])(t);try{for(i.s();!(u=i.n()).done;)l=u.value,l.history=!0}catch(k){i.e(k)}finally{i.f()}}else{d=Object(n["a"])(t);try{for(d.s();!(p=d.n()).done;)h=p.value,h.history=!1}catch(k){d.e(k)}finally{d.f()}}return f=new Date,v=f.getDate(),m=f.getHours(),y=f.getMinutes(),b=f.getSeconds(),w=new Date(e),w=new Date(w.setDate(v)),w=new Date(w.setHours(m)),w=new Date(w.setMinutes(y)),w=new Date(w.setSeconds(b)),r.prev=15,r.next=18,a.$store.dispatch("purchasesModule/create",{products:t,date:w});case 18:x=Object(n["a"])(t);try{for(x.s();!(g=x.n()).done;)_=g.value,_.history||a.$store.commit("productsModule/updateStock",{productId:_.productId,qty:parseInt(_.qty)})}catch(k){x.e(k)}finally{x.f()}a.purchases=[];case 21:return r.prev=21,a.loadingButton=!1,r.finish(21);case 24:case"end":return r.stop()}}),r,null,[[15,,21,24]])})))()},productsList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(0!==t.products.length){e.next=8;break}return t.productsLoading=!0,e.prev=2,e.next=5,t.$store.dispatch("productsModule/list");case 5:return e.prev=5,t.productsLoading=!1,e.finish(5);case 8:case"end":return e.stop()}}),e,null,[[2,,5,8]])})))()}},computed:{products:function(){return this.$store.state.productsModule.products},getTotal:function(){return this.purchases.reduce((function(t,e){return t+e.purchasePrice*e.qty}),0)}}},i=c,u=(a("79e0"),a("2877")),l=a("6544"),d=a.n(l),p=a("0798"),h=a("c6a6"),f=a("8336"),v=a("b0af"),m=a("62ad"),y=a("a523"),b=a("2e4b"),w=a("132d"),x=a("e449"),g=a("490a"),_=a("0fd9"),k=a("1f4f"),C=a("2fa4"),P=a("b73d"),M=a("8654"),S=Object(u["a"])(i,r,s,!1,null,"87798ca8",null);e["default"]=S.exports;d()(S,{VAlert:p["a"],VAutocomplete:h["a"],VBtn:f["a"],VCard:v["a"],VCol:m["a"],VContainer:y["a"],VDatePicker:b["a"],VIcon:w["a"],VMenu:x["a"],VProgressCircular:g["a"],VRow:_["a"],VSimpleTable:k["a"],VSpacer:C["a"],VSwitch:P["a"],VTextField:M["a"]})}}]);
//# sourceMappingURL=chunk-06e09c96.24a88733.js.map