(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c676c890","chunk-b744b916"],{"1fb6":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Modelo")]),a("v-text-field",{attrs:{dense:"","hide-details":"",outlined:"",placeholder:"Nombre del modelo"},model:{value:e.newProduct.model,callback:function(t){e.$set(e.newProduct,"model",t)},expression:"newProduct.model"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Tipo")]),a("v-select",{attrs:{placeholder:"Selecciona un Tipo","item-text":"name","item-valur":"_id",dense:"","hide-details":"",items:e.types,"item-value":"_id",outlined:""},model:{value:e.newProduct.typeId,callback:function(t){e.$set(e.newProduct,"typeId",t)},expression:"newProduct.typeId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Marca")]),a("v-select",{attrs:{placeholder:"Selecciona una Marca","item-text":"name","item-valur":"_id",dense:"","hide-details":"",items:e.brands,"item-value":"_id",outlined:""},model:{value:e.newProduct.brandId,callback:function(t){e.$set(e.newProduct,"brandId",t)},expression:"newProduct.brandId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Color")]),a("v-select",{attrs:{dense:"","hide-details":"",placeholder:"Selecciona un color","item-text":"name","item-value":"_id",items:e.colors,outlined:""},model:{value:e.newProduct.colorId,callback:function(t){e.$set(e.newProduct,"colorId",t)},expression:"newProduct.colorId"}})],1),a("v-col",{attrs:{cols:"12",sm:"3"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Stock")]),a("v-text-field",{attrs:{suffix:"unidades",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.newProduct.stock,callback:function(t){e.$set(e.newProduct,"stock",t)},expression:"newProduct.stock"}})],1),a("v-col",{attrs:{cols:"12",sm:"3"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Stock Mínimo")]),a("v-text-field",{attrs:{suffix:"unidades",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.newProduct.minStock,callback:function(t){e.$set(e.newProduct,"minStock",t)},expression:"newProduct.minStock"}})],1),a("v-col",{attrs:{cols:"12",sm:"3"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Precio Compra")]),a("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.newProduct.price,callback:function(t){e.$set(e.newProduct,"price",t)},expression:"newProduct.price"}})],1),a("v-col",{attrs:{cols:"12",sm:"3"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Precio Venta")]),a("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.newProduct.purchasePrice,callback:function(t){e.$set(e.newProduct,"purchasePrice",t)},expression:"newProduct.purchasePrice"}})],1),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Descripción")]),a("v-textarea",{attrs:{"hide-details":"",placeholder:"Ingresa una descripción",outlined:""},model:{value:e.newProduct.description,callback:function(t){e.$set(e.newProduct,"description",t)},expression:"newProduct.description"}})],1)],1),a("v-btn",{attrs:{loading:e.loadingButton,color:"success"},on:{click:function(t){return e.saveProduct(e.newProduct)}}},[e._v("Guardar cambios")])],1)},s=[],i=a("631d"),n=a("660d"),r=a("5952"),d={data:function(){return{loadingButton:!1,newProduct:Object(n["a"])(i["a"])}},mounted:function(){},computed:{brands:function(){return this.$store.getters.getBrands},types:function(){return this.$store.getters.getTypes},colors:function(){return this.$store.getters.getColors}},methods:{saveProduct:function(e){var t=this;this.loadingButton=!0,Object(r["a"])("post","/api/products/create",e,(function(e,a){if(e)return t.loadingButton=!1;t.$store.dispatch("addProduct",a),t.loadingButton=!1,t.newProduct=Object(n["a"])(i["a"])}))}}},c=d,l=a("2877"),u=a("6544"),m=a.n(u),p=a("8336"),v=a("62ad"),f=a("a523"),b=a("0fd9"),h=a("b974"),g=a("8654"),x=a("a844"),I=Object(l["a"])(c,o,s,!1,null,"983e2ce6",null);t["default"]=I.exports;m()(I,{VBtn:p["a"],VCol:v["a"],VContainer:f["a"],VRow:b["a"],VSelect:h["a"],VTextField:g["a"],VTextarea:x["a"]})},5952:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var o=a("4360"),s=a("bc3a"),i=a.n(s),n=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};i.a[e](t,a).then((function(e){console.log(e.data),o["a"].dispatch("showSnackbar",{text:e.data.message,color:"success"}),e.data.ok&&s(null,e.data.payload)})).catch((function(e){console.log("hubo un error en la llamada a la api"),"ECONNABORTED"===e.code&&(console.log("se excedio el tiempo limite"),o["a"].dispatch("showSnackbar",{text:"Algo salió mal",color:"error"})),o["a"].dispatch("showSnackbar",{text:e.response.data.message,color:"error"}),console.error(e),s(e)}))}},"631d":function(e,t,a){"use strict";t["a"]={model:"",typeId:"",brandId:"",colorId:"",stock:0,minStock:5,purchasePrice:0,price:0,description:""}},"660d":function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var o=function(e){return JSON.parse(JSON.stringify(e))}},bdba:function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("custom-card",{attrs:{title:"Consulta de inventario",icon:"mdi-magnify"},scopedSlots:e._u([{key:"content",fn:function(){return[a("v-card",[a("v-tabs",{attrs:{"background-color":"primary",centered:"",dark:"","icons-and-text":""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tabs-slider"),a("v-tab",{attrs:{href:"#tab-1"}},[e._v(" Listado de productos "),a("v-icon",[e._v("mdi-format-list-checks")])],1),a("v-tab",{attrs:{href:"#tab-2"}},[e._v(" Agregar producto (modelo) "),a("v-icon",[e._v("mdi-plus-circle-outline")])],1)],1),a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab-item",{attrs:{value:"tab-1"}},[a("v-card",{attrs:{flat:""}},[a("v-data-table",{attrs:{"no-results-text":"No se encontraron resultados",search:e.search,"hide-default-footer":"",headers:e.headers,items:e.filteredProducts,page:e.page,"items-per-page":e.itemsPerPage},on:{"page-count":function(t){e.pageCount=t},"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por modelo: "+e._s(e.search))]),a("v-text-field",{attrs:{dense:"","hide-details":"","append-icon":"search",placeholder:"Escribe el modelo del producto","single-line":"",outlined:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por tipo: "+e._s(e.$store.getters.getTypeById(e.selectedType)))]),a("v-select",{attrs:{clearable:"","hide-details":"",dense:"",placeholder:"Selecciona un tipo",items:e.types,"item-text":"name","item-value":"_id",outlined:""},on:{"click:clear":function(t){return e.showAllTypes()}},model:{value:e.selectedType,callback:function(t){e.selectedType=t},expression:"selectedType"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por marca: "+e._s(e.$store.getters.getBrandById(e.selectedBrand)))]),a("v-select",{attrs:{clearable:"","hide-details":"",dense:"",placeholder:"Selecciona una marca",items:e.brands,"item-text":"name","item-value":"_id",outlined:""},on:{"click:clear":function(t){return e.showAllBrands()}},model:{value:e.selectedBrand,callback:function(t){e.selectedBrand=t},expression:"selectedBrand"}})],1)],1)],1),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}})]},proxy:!0},{key:"item.action",fn:function(t){var o=t.item;return[a("v-btn",{staticClass:"mr-3",attrs:{small:"",color:"success"},on:{click:function(t){return e.editItem(o)}}},[e._v("Editar")]),a("v-btn",{attrs:{small:"",color:"error"},on:{click:function(t){return e.deleteItem(o)}}},[e._v("Eliminar")])]}},{key:"item.stock",fn:function(t){var o=t.item;return[e._v(" "+e._s(o.stock)+" "),a("v-icon",{directives:[{name:"show",rawName:"v-show",value:o.stock>=5,expression:"item.stock>=5"}],attrs:{color:"green"}},[e._v("mdi-checkbox-marked-circle")]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[a("v-icon",e._g({directives:[{name:"show",rawName:"v-show",value:o.stock<5,expression:"item.stock<5"}],attrs:{color:"error"}},s),[e._v("mdi-alert-circle")])]}}],null,!0)},[a("span",[e._v("Stock por agotarse")])])]}},{key:"item.createdAt",fn:function(t){var a=t.item;return[e._v(e._s(e._f("formatDate")(a.createdAt)))]}},{key:"item.price",fn:function(t){var a=t.item;return[e._v("S/."+e._s(a.price))]}},{key:"item.brandId",fn:function(t){var a=t.item;return[e._v(e._s(e.$store.getters.getBrandById(a.brandId)))]}},{key:"item.typeId",fn:function(t){var a=t.item;return[e._v(e._s(e.$store.getters.getTypeById(a.typeId)))]}},{key:"item.colorId",fn:function(t){var a=t.item;return[e._v(e._s(e.$store.getters.getColorById(a.colorId)))]}},{key:"no-data",fn:function(){return[a("v-alert",{attrs:{type:"error",value:!0}},[e._v("No se encontraron datos")])]},proxy:!0}])}),a("div",{staticClass:"text-center pt-2"},[a("v-pagination",{attrs:{length:e.pageCount},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),a("v-divider"),a("v-container",{staticClass:"pa-5"},[a("v-alert",{attrs:{text:"",type:"error",value:e.validateError}},[e._v("Es necesario colocar el nombre del modelo")]),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Modelo")]),a("v-text-field",{attrs:{dense:"","hide-details":"",outlined:"",placeholder:"Nombre del modelo"},model:{value:e.editedItem.model,callback:function(t){e.$set(e.editedItem,"model",t)},expression:"editedItem.model"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Tipo")]),a("v-select",{attrs:{dense:"","hide-details":"",items:e.types,"item-text":"name","item-value":"_id",outlined:""},model:{value:e.editedItem.typeId,callback:function(t){e.$set(e.editedItem,"typeId",t)},expression:"editedItem.typeId"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Marca")]),a("v-select",{attrs:{dense:"","hide-details":"",items:e.brands,"item-text":"name","item-value":"_id",outlined:""},model:{value:e.editedItem.brandId,callback:function(t){e.$set(e.editedItem,"brandId",t)},expression:"editedItem.brandId"}})],1),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Color")]),a("v-select",{attrs:{dense:"","hide-details":"",items:e.colors,"item-text":"name","item-value":"_id",outlined:""},model:{value:e.editedItem.colorId,callback:function(t){e.$set(e.editedItem,"colorId",t)},expression:"editedItem.colorId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Precio de venta")]),a("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.price,callback:function(t){e.$set(e.editedItem,"price",t)},expression:"editedItem.price"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Precio de Compra")]),a("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.purchasePrice,callback:function(t){e.$set(e.editedItem,"purchasePrice",t)},expression:"editedItem.purchasePrice"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Stock mínimo")]),a("v-text-field",{attrs:{suffix:"unidades",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.minStock,callback:function(t){e.$set(e.editedItem,"minStock",t)},expression:"editedItem.minStock"}})],1),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Descripción")]),a("v-textarea",{attrs:{dense:"","hide-details":"",placeholder:"Ingresa una descripción",outlined:""},model:{value:e.editedItem.description,callback:function(t){e.$set(e.editedItem,"description",t)},expression:"editedItem.description"}})],1)],1)],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{outlined:"",color:"error",text:""},on:{click:e.close}},[e._v("Cancelar")]),a("v-btn",{attrs:{loading:e.loadingButton,color:"success"},on:{click:e.save}},[e._v("Guardar")])],1)],1)],1)],1)],1),a("v-tab-item",{attrs:{value:"tab-2"}},[a("v-card",{attrs:{flat:""}},[a("add-product")],1)],1)],1)],1)]},proxy:!0}])})},s=[],i=(a("4de4"),a("c975"),a("a434"),a("1fb6")),n=a("b166"),r=a("631d"),d=a("660d"),c=a("5952"),l={components:{addProduct:i["default"]},filters:{formatDate:function(e){return Object(n["a"])(new Date(e),"dd/MM/yyyy")}},data:function(){return{page:1,pageCount:0,itemsPerPage:10,loadingButton:!1,validateError:!1,tab:null,search:"",dialog:!1,selectedType:null,selectedBrand:null,headers:[{text:"Modelo",value:"model"},{text:"Tipo",value:"typeId",filterable:!1},{text:"Marca",value:"brandId",filterable:!1},{text:"Color",value:"colorId",filterable:!1},{text:"Stock",value:"stock",filterable:!1},{text:"Precio de venta",value:"price",filterable:!1},{text:"Agregado",align:"left",sortable:!0,value:"createdAt"},{text:"Acciones",value:"action",sortable:!1}],products:[],editedIndex:-1,editedItem:r["a"],defaultItem:Object(d["a"])(r["a"])}},computed:{formTitle:function(){return"Editar producto"},brands:function(){return this.$store.getters.getBrands},types:function(){return this.$store.getters.getTypes},colors:function(){return this.$store.getters.getColors},filteredProducts:function(){var e=this;return this.selectedType||this.selectedBrand?this.products.filter((function(t){return(!e.selectedType||t.typeId===e.selectedType)&&(!e.selectedBrand||t.brandId===e.selectedBrand)})):this.products}},watch:{dialog:function(e){e||this.close()}},created:function(){this.initialize()},methods:{initialize:function(){this.products=this.$store.state.products},showAllTypes:function(){this.selectedType=null},showAllBrands:function(){this.selectedBrand=null},editItem:function(e){this.editedIndex=this.products.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){var t=this.products.indexOf(e),a=this.products[t]._id;confirm("¿Seguro que deseas eliminar este elemento?")&&(Object(c["a"])("delete","/api/products/delete/"+a),this.products.splice(t,1))},close:function(){var e=this;this.dialog=!1,setTimeout((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}),300)},validateForm:function(){return this.editedItem.model?(this.validateError=!1,!0):(this.validateError=!0,!1)},save:function(){var e=this;if(!this.validateForm())return!1;var t=this.products[this.editedIndex]._id;this.loadingButton=!0,Object(c["a"])("put","/api/products/update/"+t,this.editedItem,(function(t){if(t)return e.loadingButton=!1;Object.assign(e.products[e.editedIndex],e.editedItem),e.loadingButton=!1,e.close()}))}}},u=l,m=a("2877"),p=a("6544"),v=a.n(p),f=a("0798"),b=a("8336"),h=a("b0af"),g=a("99d9"),x=a("62ad"),I=a("a523"),k=a("8fea"),w=a("169a"),_=a("ce7e"),y=a("132d"),P=a("891e"),C=a("0fd9"),S=a("b974"),T=a("71a3"),B=a("c671"),$=a("fe57"),V=a("aac8"),O=a("9a96"),A=a("8654"),E=a("a844"),j=a("3a2f"),M=Object(m["a"])(u,o,s,!1,null,"3ce1cb1f",null);t["default"]=M.exports;v()(M,{VAlert:f["a"],VBtn:b["a"],VCard:h["a"],VCardActions:g["b"],VCardTitle:g["e"],VCol:x["a"],VContainer:I["a"],VDataTable:k["a"],VDialog:w["a"],VDivider:_["a"],VIcon:y["a"],VPagination:P["a"],VRow:C["a"],VSelect:S["a"],VTab:T["a"],VTabItem:B["a"],VTabs:$["a"],VTabsItems:V["a"],VTabsSlider:O["a"],VTextField:A["a"],VTextarea:E["a"],VTooltip:j["a"]})},c975:function(e,t,a){"use strict";var o=a("23e7"),s=a("4d64").indexOf,i=a("a640"),n=a("ae40"),r=[].indexOf,d=!!r&&1/[1].indexOf(1,-0)<0,c=i("indexOf"),l=n("indexOf",{ACCESSORS:!0,1:0});o({target:"Array",proto:!0,forced:d||!c||!l},{indexOf:function(e){return d?r.apply(this,arguments)||0:s(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-c676c890.f0dfc59c.js.map