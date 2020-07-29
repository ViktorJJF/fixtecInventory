(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07446970"],{"08ef":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ValidationProvider",{attrs:{name:e.$attrs.label,rules:e.rules},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[a("v-text-field",e._g(e._b({class:e.customClasses,attrs:{clearable:"",dense:"","single-line":"",outlined:"","hide-details":"auto","error-messages":n},model:{value:e.innerValue,callback:function(t){e.innerValue=t},expression:"innerValue"}},"v-text-field",e.$attrs,!1),e.$listeners))]}}])})},r=[],i=a("7bb1"),s={components:{ValidationProvider:i["b"]},props:{rules:{type:[Object,String],default:""},value:{type:null},customClasses:{type:String,default:""}},data:function(){return{innerValue:""}},watch:{innerValue:function(e){this.$emit("input",e)},value:function(e){this.innerValue=e}},created:function(){this.value&&(this.innerValue=this.value)}},o=s,c=a("2877"),l=a("6544"),d=a.n(l),u=a("8654"),f=Object(c["a"])(o,n,r,!1,null,null,null);t["a"]=f.exports;d()(f,{VTextField:u["a"]})},"56a5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",{attrs:{justify:"center"}},[a("material-card",{attrs:{width:"700px",icon:"mdi-cellphone-dock",color:"primary",title:"Marca de producto",text:"Tabla resumen de marcas de productos"}},[a("v-data-table",{attrs:{"no-results-text":"No se encontraron resultados",search:e.search,"hide-default-footer":"",headers:e.headers,items:e.brands,"sort-by":"calories",page:e.page,"items-per-page":e.itemsPerPage},on:{"page-count":function(t){e.pageCount=t},"update:page":function(t){e.page=t}},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-container",[a("span",{staticClass:"font-weight-bold"},[e._v("Filtrar por nombre: "+e._s(e.search))]),a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-text-field",{attrs:{dense:"","hide-details":"","append-icon":"search",placeholder:"Escribe el nombre de la marca","single-line":"",outlined:""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-col",{attrs:{cols:"12",sm:"6"}},[a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-btn",e._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},n),[e._v("Agregar Marca")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("v-icon",{staticClass:"mr-1",attrs:{color:"primary"}},[e._v("mdi-update")]),a("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])],1),a("v-divider"),a("ValidationObserver",{ref:"obs",scopedSlots:e._u([{key:"default",fn:function(t){var n=t.passes;return[a("v-container",{staticClass:"pa-5"},[a("v-alert",{attrs:{text:"",type:"error",value:e.validateError}},[e._v("Es necesario colocar el nombre de la marca")]),a("v-row",{attrs:{dense:""}},[a("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[a("p",{staticClass:"body-1 font-weight-bold"},[e._v("Nombre")]),a("VTextFieldWithValidation",{attrs:{rules:"required",label:"Nombre de la marca"},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",{staticClass:"font-weight-bold"},[e._v("Descripción")]),a("v-textarea",{attrs:{"hide-details":"",placeholder:"Ingresa una descripción",outlined:""},model:{value:e.editedItem.description,callback:function(t){e.$set(e.editedItem,"description",t)},expression:"editedItem.description"}})],1)],1)],1),a("v-card-actions",{attrs:{"rd-actions":""}},[a("div",{staticClass:"flex-grow-1"}),a("v-btn",{attrs:{outlined:"",color:"error",text:""},on:{click:e.close}},[e._v("Cancelar")]),a("v-btn",{attrs:{loading:e.loadingButton,color:"success"},on:{click:function(t){return n(e.save)}}},[e._v("Guardar")])],1)]}}])})],1)],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(t){var n=t.item;return[a("v-btn",{staticClass:"mr-3",attrs:{small:"",color:"secondary"},on:{click:function(t){return e.editItem(n)}}},[e._v("Editar")]),a("v-btn",{attrs:{small:"",color:"error"},on:{click:function(t){return e.deleteItem(n)}}},[e._v("Eliminar")])]}},{key:"no-data",fn:function(){return[a("v-alert",{attrs:{type:"error",value:!0}},[e._v("Aún no cuentas con marcas de productos")])]},proxy:!0},{key:"item.createdAt",fn:function(t){var a=t.item;return[e._v(e._s(e._f("formatDate")(a.createdAt)))]}},{key:"item.status",fn:function(t){var n=t.item;return[n.status?a("v-chip",{attrs:{color:"success"}},[e._v("Activo")]):a("v-chip",{attrs:{color:"error"}},[e._v("Inactivo")])]}}])}),a("v-col",{attrs:{cols:"12",sm:"12"}},[a("span",[a("strong",[e._v("Total de marcas:")]),e._v(" "+e._s(e.brands.length)+" ")])]),a("div",{staticClass:"text-center pt-2"},[a("v-pagination",{attrs:{length:e.pageCount},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)],1)],1)],1)},r=[],i=(a("c975"),a("a434"),a("b0c0"),a("96cf"),a("1da1")),s=a("b166"),o=a("08ef"),c=function(){return{name:"",description:"",status:!0}},l=a("5952"),d={components:{VTextFieldWithValidation:o["a"]},filters:{formatDate:function(e){return Object(s["a"])(new Date(e),"dd/MM/yyyy")}},data:function(){return{page:1,pageCount:0,itemsPerPage:10,loadingButton:!1,validateError:!1,search:"",dialog:!1,headers:[{text:"Tipo",align:"left",sortable:!1,value:"name"},{text:"Agregado",align:"left",sortable:!0,value:"createdAt"},{text:"Acciones",value:"action",sortable:!1}],brands:[],editedIndex:-1,editedItem:c(),defaultItem:c()}},computed:{formTitle:function(){return-1===this.editedIndex?"Nueva marca":"Editar marca"}},watch:{dialog:function(e){e||this.close()}},mounted:function(){this.initialize()},methods:{initialize:function(){this.brands=this.$deepCopy(this.$store.state.brandsModule.brands)},validateForm:function(){return this.editedItem.name?(this.validateError=!1,!0):(this.validateError=!0,!1)},editItem:function(e){this.editedIndex=this.brands.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},deleteItem:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=t.brands.indexOf(e),a.next=3,t.$confirm("¿Realmente deseas eliminar este registro?");case 3:if(!a.sent){a.next=5;break}t.brands.splice(n,1);case 5:case"end":return a.stop()}}),a)})))()},close:function(){var e=this;this.dialog=!1,setTimeout((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}),300)},save:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.validateForm()){t.next=2;break}return t.abrupt("return",!1);case 2:if(e.loadingButton=!0,!(e.editedIndex>-1)){t.next=8;break}a=e.brands[e.editedIndex]._id,Object(l["a"])("put","/api/brands/update/"+a,e.editedItem,(function(t){if(t)return e.loadingButton=!1;Object.assign(e.brands[e.editedIndex],e.editedItem),e.loadingButton=!1,e.close()})),t.next=17;break;case 8:return t.prev=8,t.next=11,e.$store.dispatch("brandsModule/create",e.editedItem);case 11:n=t.sent,e.brands.push(n),e.close();case 14:return t.prev=14,e.loadingButton=!1,t.finish(14);case 17:case"end":return t.stop()}}),t,null,[[8,,14,17]])})))()}}},u=d,f=a("2877"),m=a("6544"),v=a.n(m),p=a("0798"),h=a("8336"),b=a("b0af"),g=a("99d9"),x=a("cc20"),_=a("62ad"),k=a("a523"),V=a("8fea"),y=a("169a"),I=a("ce7e"),w=a("132d"),C=a("891e"),O=a("0fd9"),A=a("8654"),E=a("a844"),T=Object(f["a"])(u,n,r,!1,null,"2ac85097",null);t["default"]=T.exports;v()(T,{VAlert:p["a"],VBtn:h["a"],VCard:b["a"],VCardActions:g["b"],VCardTitle:g["e"],VChip:x["a"],VCol:_["a"],VContainer:k["a"],VDataTable:V["a"],VDialog:y["a"],VDivider:I["a"],VIcon:w["a"],VPagination:C["a"],VRow:O["a"],VTextField:A["a"],VTextarea:E["a"]})},5952:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a("4360"),r=a("bc3a"),i=a.n(r),s=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};i.a[e](t,a).then((function(e){console.log(e.data),n["a"].dispatch("showSnackbar",{text:e.data.message,color:"success"}),e.data.ok&&r(null,e.data.payload)})).catch((function(e){console.log("hubo un error en la llamada a la api"),"ECONNABORTED"===e.code&&(console.log("se excedio el tiempo limite"),n["a"].dispatch("showSnackbar",{text:"Algo salió mal",color:"error"})),n["a"].dispatch("showSnackbar",{text:e.response.data.message,color:"error"}),console.error(e),r(e)}))}},c975:function(e,t,a){"use strict";var n=a("23e7"),r=a("4d64").indexOf,i=a("a640"),s=a("ae40"),o=[].indexOf,c=!!o&&1/[1].indexOf(1,-0)<0,l=i("indexOf"),d=s("indexOf",{ACCESSORS:!0,1:0});n({target:"Array",proto:!0,forced:c||!l||!d},{indexOf:function(e){return c?o.apply(this,arguments)||0:r(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-07446970.340afff4.js.map