(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-415b8554"],{bdba:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("custom-card",{attrs:{title:"Consulta de inventario",icon:"mdi-magnify"},scopedSlots:e._u([{key:"content",fn:function(){return[a("v-card",[a("v-tabs",{attrs:{"background-color":"primary",centered:"",dark:"","icons-and-text":""},on:{change:e.checkTab},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tabs-slider"),a("v-tab",{attrs:{href:"#tab-1"}},[e._v(" Listado de productos "),a("v-icon",[e._v("mdi-format-list-checks")])],1),a("v-tab",{attrs:{href:"#tab-2"}},[e._v(" Agregar producto (modelo) "),a("v-icon",[e._v("mdi-plus-circle-outline")])],1)],1),a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab-item",{attrs:{value:"tab-1"}},[a("v-card",{attrs:{flat:""}},[a("products",{key:e.rerenderComponent})],1)],1),a("v-tab-item",{attrs:{value:"tab-2"}},[a("v-card",{attrs:{flat:""}},[a("add-product")],1)],1)],1)],1)]},proxy:!0}])})},s=[],n=a("d101"),r=a("1fb6"),o={components:{products:n["a"],addProduct:r["default"]},data:function(){return{tab:null,rerenderComponent:0}},methods:{checkTab:function(e){"tab-1"===e&&this.rerenderComponent++}}},d=o,l=a("2877"),c=a("6544"),u=a.n(c),m=a("b0af"),v=a("132d"),p=a("71a3"),f=a("c671"),b=a("fe57"),h=a("aac8"),g=a("9a96"),x=Object(l["a"])(d,i,s,!1,null,"506ad405",null);t["default"]=x.exports;u()(x,{VCard:m["a"],VIcon:v["a"],VTab:p["a"],VTabItem:f["a"],VTabs:b["a"],VTabsItems:h["a"],VTabsSlider:g["a"]})},d101:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-data-table",{attrs:{"no-results-text":"No se encontraron resultados",search:e.search,"hide-default-footer":"",headers:e.headers,items:e.filteredProducts,page:e.page,"items-per-page":e.$store.state.itemsPerPage},on:{"page-count":function(t){e.pageCount=t},"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por modelo: "+e._s(e.search))]),a("v-text-field",{attrs:{dense:"","hide-details":"","append-icon":"search",placeholder:"Escribe el nombre del producto","single-line":"",outlined:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por tipo:")]),a("v-select",{attrs:{clearable:"","hide-details":"",dense:"",placeholder:"Selecciona un tipo",items:e.types,"item-text":"name","item-value":"_id",outlined:""},on:{"click:clear":function(t){return e.showAllTypes()}},model:{value:e.selectedType,callback:function(t){e.selectedType=t},expression:"selectedType"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por marca:")]),a("v-select",{attrs:{clearable:"","hide-details":"",dense:"",placeholder:"Selecciona una marca",items:e.brands,"item-text":"name","item-value":"_id",outlined:""},on:{"click:clear":function(t){return e.showAllBrands()}},model:{value:e.selectedBrand,callback:function(t){e.selectedBrand=t},expression:"selectedBrand"}})],1)],1)],1),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}})]},proxy:!0},{key:"item.action",fn:function(t){var i=t.item;return[a("v-btn",{directives:[{name:"show",rawName:"v-show",value:!e.selectButton,expression:"!selectButton"}],staticClass:"mr-3 mb-2",attrs:{small:"",color:"secondary"},on:{click:function(t){return e.editItem(i)}}},[e._v("Editar")]),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:!e.selectButton,expression:"!selectButton"}],staticClass:"mb-2",attrs:{small:"",color:"error"},on:{click:function(t){return e.deleteItem(i)}}},[e._v("Eliminar")]),a("v-btn",{directives:[{name:"show",rawName:"v-show",value:e.selectButton,expression:"selectButton"}],attrs:{color:"info"},on:{click:function(t){return e.$emit("add-product",i)}}},[e._v("Agregar")])]}},{key:"item.stock",fn:function(t){var i=t.item;return[e._v(" "+e._s(i.stock)+" "),a("v-icon",{directives:[{name:"show",rawName:"v-show",value:i.stock>=i.minStock,expression:"item.stock>=item.minStock"}],attrs:{color:"green"}},[e._v("mdi-checkbox-marked-circle")]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on;return[a("v-icon",e._g({directives:[{name:"show",rawName:"v-show",value:i.stock<i.minStock,expression:"item.stock<item.minStock"}],attrs:{color:"error"}},s),[e._v("mdi-alert-circle")])]}}],null,!0)},[a("span",[e._v("Stock por agotarse")])])]}},{key:"item.createdAt",fn:function(t){var a=t.item;return[e._v(e._s(e._f("formatDate")(a.createdAt)))]}},{key:"item.purchasePrice",fn:function(t){var a=t.item;return[e._v("S/."+e._s(a.purchasePrice))]}},{key:"item.price",fn:function(t){var a=t.item;return[e._v("S/."+e._s(a.price))]}},{key:"item.brandId",fn:function(t){var a=t.item;return[e._v(e._s(a.brandId?a.brandId.name:"Sin marca"))]}},{key:"item.typeId",fn:function(t){var a=t.item;return[e._v(e._s(a.typeId?a.typeId.name:"Sin tipo"))]}},{key:"item.colorId",fn:function(t){var a=t.item;return[e._v(e._s(a.colorId?a.colorId.name:"Sin color"))]}},{key:"no-data",fn:function(){return[a("v-alert",{attrs:{type:"error",value:!0}},[e._v("No se encontraron datos")])]},proxy:!0}])}),a("div",{staticClass:"text-center pt-2"},[a("v-pagination",{attrs:{length:e.pageCount},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1),a("v-dialog",{attrs:{"max-width":"800px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])]),a("v-divider"),a("v-container",{staticClass:"pa-5"},[a("v-alert",{attrs:{text:"",type:"error",value:e.validateError}},[e._v("Es necesario colocar el nombre del modelo")]),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Nombre")]),a("v-text-field",{attrs:{dense:"","hide-details":"",outlined:"",placeholder:"Nombre del modelo"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Negocio")]),a("v-select",{attrs:{items:e.commerce,label:"Selecciona el negocio",outlined:"",dense:""},model:{value:e.editedItem.commerce,callback:function(t){e.$set(e.editedItem,"commerce",t)},expression:"editedItem.commerce"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Tipo")]),a("v-select",{attrs:{dense:"","hide-details":"",items:e.types,"item-text":"name","item-value":"_id",outlined:""},model:{value:e.editedItem.typeId,callback:function(t){e.$set(e.editedItem,"typeId",t)},expression:"editedItem.typeId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Marca")]),a("v-select",{attrs:{dense:"","hide-details":"",items:e.brands,"item-text":"name","item-value":"_id",outlined:""},model:{value:e.editedItem.brandId,callback:function(t){e.$set(e.editedItem,"brandId",t)},expression:"editedItem.brandId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Color")]),a("v-select",{attrs:{dense:"","hide-details":"",items:e.colors,"item-text":"name","item-value":"_id",outlined:""},model:{value:e.editedItem.colorId,callback:function(t){e.$set(e.editedItem,"colorId",t)},expression:"editedItem.colorId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Calidad")]),a("v-select",{attrs:{dense:"","hide-details":"",placeholder:"Selecciona una calidad","item-text":"name","item-value":"_id",items:e.qualities,loading:e.qualitiesLoading,outlined:""},on:{click:e.getQualities},scopedSlots:e._u([{key:"no-data",fn:function(){return[e.qualitiesLoading?a("v-container",{staticClass:"text-center",attrs:{fluid:""}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"primary"}})],1):e._e()]},proxy:!0}]),model:{value:e.editedItem.qualityId,callback:function(t){e.$set(e.editedItem,"qualityId",t)},expression:"editedItem.qualityId"}})],1),a("v-col",{attrs:{cols:"12",sm:"4"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Género")]),a("v-select",{attrs:{dense:"","hide-details":"",placeholder:"Selecciona un género","item-text":"name","item-value":"value",items:e.genders,outlined:""},model:{value:e.editedItem.gender,callback:function(t){e.$set(e.editedItem,"gender",t)},expression:"editedItem.gender"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Precio de Compra")]),a("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.purchasePrice,callback:function(t){e.$set(e.editedItem,"purchasePrice",t)},expression:"editedItem.purchasePrice"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Precio de venta")]),a("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.price,callback:function(t){e.$set(e.editedItem,"price",t)},expression:"editedItem.price"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Stock")]),a("v-text-field",{attrs:{suffix:"unidades",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.stock,callback:function(t){e.$set(e.editedItem,"stock",t)},expression:"editedItem.stock"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Stock mínimo")]),a("v-text-field",{attrs:{suffix:"unidades",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:e.editedItem.minStock,callback:function(t){e.$set(e.editedItem,"minStock",t)},expression:"editedItem.minStock"}})],1),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Descripción")]),a("v-textarea",{attrs:{dense:"","hide-details":"",placeholder:"Ingresa una descripción",outlined:""},model:{value:e.editedItem.description,callback:function(t){e.$set(e.editedItem,"description",t)},expression:"editedItem.description"}})],1)],1)],1),a("v-card-actions",[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{outlined:"",color:"error",text:""},on:{click:e.close}},[e._v("Cancelar")]),a("v-btn",{attrs:{loading:e.loadingButton,color:"success"},on:{click:e.save}},[e._v("Guardar")])],1)],1)],1)],1)},s=[],n=(a("4de4"),a("c975"),a("a434"),a("96cf"),a("1da1")),r=a("b166"),o=a("631d"),d={props:{selectButton:{type:Boolean,default:!1}},filters:{formatDate:function(e){return Object(r["a"])(new Date(e),"dd/MM/yyyy")}},data:function(){return{genders:[{id:1,name:"Masculino",value:"M"},{id:2,name:"Femenino",value:"F"}],page:1,pageCount:0,loadingButton:!1,qualitiesLoading:!1,validateError:!1,search:"",dialog:!1,selectedType:null,selectedBrand:null,headers:[{text:"Nombre",value:"name"},{text:"Tipo",value:"typeId",filterable:!1},{text:"Marca",value:"brandId",filterable:!1},{text:"Color",value:"colorId",filterable:!1},{text:"Stock",value:"stock",filterable:!1},{text:"Precio de compra",value:"purchasePrice",filterable:!1},{text:"Precio de venta",value:"price",filterable:!1},{text:"Agregado",align:"left",sortable:!0,value:"createdAt"},{text:"Acciones",value:"action",sortable:!1}],products:[],editedIndex:-1,editedItem:Object(o["a"])(),defaultItem:Object(o["a"])()}},computed:{formTitle:function(){return"Editar producto"},brands:function(){return this.$store.state.brandsModule.brands},types:function(){return this.$store.state.typesModule.types},colors:function(){return this.$store.state.colorsModule.colors},qualities:function(){return this.$store.state.qualitiesModule.qualities},filteredProducts:function(){var e=this;return this.selectedType||this.selectedBrand?this.products.filter((function(t){return(!e.selectedType||(t.typeId?t.typeId._id===e.selectedType:null))&&(!e.selectedBrand||(t.brandId?t.brandId._id===e.selectedBrand:null))})):this.products},commerce:function(){return this.$store.state.commerce}},watch:{dialog:function(e){e||this.close()}},created:function(){this.initialize()},methods:{initialize:function(){this.products=this.$deepCopy(this.$store.state.productsModule.products)},showAllTypes:function(){this.selectedType=null},showAllBrands:function(){this.selectedBrand=null},editItem:function(e){this.editedIndex=this.products.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=t.products.indexOf(e),s=t.products[i]._id,a.next=4,t.$confirm("¿Realmente deseas eliminar este registro?");case 4:if(!a.sent){a.next=8;break}return a.next=7,t.$store.dispatch("productsModule/delete",s);case 7:t.products.splice(i,1);case 8:case"end":return a.stop()}}),a)})))()},close:function(){var e=this;this.dialog=!1,setTimeout((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}),300)},validateForm:function(){return this.editedItem.model?(this.validateError=!1,!0):(this.validateError=!0,!1)},save:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.loadingButton=!0,!(e.editedIndex>-1)){t.next=12;break}return a=e.products[e.editedIndex]._id,t.prev=3,t.next=6,e.$store.dispatch("productsModule/update",{id:a,data:e.editedItem});case 6:i=t.sent,Object.assign(e.products[e.editedIndex],i),e.close();case 9:return t.prev=9,e.loadingButton=!1,t.finish(9);case 12:case"end":return t.stop()}}),t,null,[[3,,9,12]])})))()},getQualities:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0!==e.qualities.length){t.next=8;break}return e.qualitiesLoading=!0,t.prev=2,t.next=5,e.$store.dispatch("qualitiesModule/list");case 5:return t.prev=5,e.qualitiesLoading=!1,t.finish(5);case 8:case"end":return t.stop()}}),t,null,[[2,,5,8]])})))()}}},l=d,c=a("2877"),u=a("6544"),m=a.n(u),v=a("0798"),p=a("8336"),f=a("b0af"),b=a("99d9"),h=a("62ad"),g=a("a523"),x=a("8fea"),I=a("169a"),k=a("ce7e"),_=a("132d"),y=a("891e"),w=a("490a"),C=a("0fd9"),S=a("b974"),T=a("8654"),$=a("a844"),V=a("3a2f"),B=Object(c["a"])(l,i,s,!1,null,"abf77812",null);t["a"]=B.exports;m()(B,{VAlert:v["a"],VBtn:p["a"],VCard:f["a"],VCardActions:b["b"],VCardTitle:b["e"],VCol:h["a"],VContainer:g["a"],VDataTable:x["a"],VDialog:I["a"],VDivider:k["a"],VIcon:_["a"],VPagination:y["a"],VProgressCircular:w["a"],VRow:C["a"],VSelect:S["a"],VTextField:T["a"],VTextarea:$["a"],VTooltip:V["a"]})}}]);
//# sourceMappingURL=chunk-415b8554.ea8328be.js.map