(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8366404c"],{"08ef":function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ValidationProvider",{attrs:{name:t.$attrs.label,rules:t.rules},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.errors;return[r("v-text-field",t._g(t._b({class:t.customClasses,attrs:{clearable:"",dense:"","single-line":"",outlined:"","hide-details":"auto","error-messages":n},model:{value:t.innerValue,callback:function(e){t.innerValue=e},expression:"innerValue"}},"v-text-field",t.$attrs,!1),t.$listeners))]}}])})},a=[],i=r("7bb1"),o={components:{ValidationProvider:i["b"]},props:{rules:{type:[Object,String],default:""},value:{type:null},customClasses:{type:String,default:""}},data:function(){return{innerValue:""}},watch:{innerValue:function(t){this.$emit("input",t)},value:function(t){this.innerValue=t}},created:function(){this.value&&(this.innerValue=this.value)}},s=o,c=r("2877"),l=r("6544"),u=r.n(l),d=r("8654"),f=Object(c["a"])(s,n,a,!1,null,null,null);e["a"]=f.exports;u()(f,{VTextField:d["a"]})},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("d3b7");function n(t,e,r,n,a,i,o){try{var s=t[i](o),c=s.value}catch(l){return void r(l)}s.done?e(c):Promise.resolve(c).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,i){var o=t.apply(e,r);function s(t){n(o,a,i,s,c,"next",t)}function c(t){n(o,a,i,s,c,"throw",t)}s(void 0)}))}}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch($){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,i=Object.create(a.prototype),o=new C(n||[]);return i._invoke=I(t,r,o),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch($){return{type:"throw",arg:$}}}t.wrap=l;var d="suspendedStart",f="suspendedYield",h="executing",p="completed",v={};function m(){}function g(){}function y(){}var b={};b[i]=function(){return this};var x=Object.getPrototypeOf,w=x&&x(x(j([])));w&&w!==r&&n.call(w,i)&&(b=w);var _=y.prototype=m.prototype=Object.create(b);function k(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(a,i,o,s){var c=u(t[a],t,i);if("throw"!==c.type){var l=c.arg,d=l.value;return d&&"object"===typeof d&&n.call(d,"__await")?e.resolve(d.__await).then((function(t){r("next",t,o,s)}),(function(t){r("throw",t,o,s)})):e.resolve(d).then((function(t){l.value=t,o(l)}),(function(t){return r("throw",t,o,s)}))}s(c.arg)}var a;function i(t,n){function i(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function I(t,e,r){var n=d;return function(a,i){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw i;return q()}r.method=a,r.arg=i;while(1){var o=r.delegate;if(o){var s=V(o,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===d)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=u(t,e,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function V(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,V(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var a=u(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,v;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function j(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:q}}function q(){return{value:e,done:!0}}return g.prototype=_.constructor=y,y.constructor=g,g.displayName=c(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},k(E.prototype),E.prototype[o]=function(){return this},t.AsyncIterator=E,t.async=function(e,r,n,a,i){void 0===i&&(i=Promise);var o=new E(l(e,r,n,a),i);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},k(_),c(_,s,"Generator"),_[i]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(O),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,v):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},c2d2:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",{attrs:{justify:"center"}},[r("material-card",{attrs:{width:"700px",icon:"mdi-cellphone-dock",color:"primary",title:"Calidades de productos",text:"Tabla resumen de calidades de productos"}},[r("v-data-table",{attrs:{"no-results-text":"No se encontraron resultados",search:t.search,"hide-default-footer":"",headers:t.headers,items:t.qualities,"sort-by":"calories",page:t.page,"items-per-page":t.$store.state.itemsPerPage},on:{"page-count":function(e){t.pageCount=e},"update:page":function(e){t.page=e}},scopedSlots:t._u([{key:"top",fn:function(){return[r("v-container",[r("span",{staticClass:"font-weight-bold"},[t._v("Filtrar por nombre: "+t._s(t.search))]),r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-text-field",{attrs:{dense:"","hide-details":"","append-icon":"search",placeholder:"Escribe el nombre de la calidad","single-line":"",outlined:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},n),[t._v("Agregar calidad")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",[r("v-icon",{staticClass:"mr-1",attrs:{color:"primary"}},[t._v("mdi-update")]),r("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])],1),r("v-divider"),r("ValidationObserver",{ref:"obs",scopedSlots:t._u([{key:"default",fn:function(e){var n=e.passes;return[r("v-container",{staticClass:"pa-5"},[r("v-alert",{attrs:{text:"",type:"error",value:t.validateError}},[t._v("Es necesario colocar el nombre de la calidad")]),r("v-row",{attrs:{dense:""}},[r("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[r("p",{staticClass:"body-1 font-weight-bold"},[t._v("Nombre")]),r("VTextFieldWithValidation",{attrs:{rules:"required",label:"Nombre de la calidad"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),r("v-col",{attrs:{cols:"12",sm:"12"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Descripción")]),r("v-textarea",{attrs:{"hide-details":"",placeholder:"Ingresa una descripción",outlined:""},model:{value:t.editedItem.description,callback:function(e){t.$set(t.editedItem,"description",e)},expression:"editedItem.description"}})],1)],1)],1),r("v-card-actions",{attrs:{"rd-actions":""}},[r("div",{staticClass:"flex-grow-1"}),r("v-btn",{attrs:{outlined:"",color:"error",text:""},on:{click:t.close}},[t._v("Cancelar")]),r("v-btn",{attrs:{loading:t.loadingButton,color:"success"},on:{click:function(e){return n(t.save)}}},[t._v("Guardar")])],1)]}}])})],1)],1)],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(e){var n=e.item;return[r("v-btn",{staticClass:"mr-3",attrs:{small:"",color:"secondary"},on:{click:function(e){return t.editItem(n)}}},[t._v("Editar")]),r("v-btn",{attrs:{small:"",color:"error"},on:{click:function(e){return t.deleteItem(n)}}},[t._v("Eliminar")])]}},{key:"no-data",fn:function(){return[r("v-alert",{attrs:{type:"error",value:!0}},[t._v("Aún no cuentas con calidades de productos")])]},proxy:!0},{key:"item.createdAt",fn:function(e){var r=e.item;return[t._v(t._s(t._f("formatDate")(r.createdAt)))]}},{key:"item.status",fn:function(e){var n=e.item;return[n.status?r("v-chip",{attrs:{color:"success"}},[t._v("Activo")]):r("v-chip",{attrs:{color:"error"}},[t._v("Inactivo")])]}}])}),r("v-col",{attrs:{cols:"12",sm:"12"}},[r("span",[r("strong",[t._v("Mostrando:")]),t._v(" "+t._s(t.$store.state.itemsPerPage>t.qualities.length?t.qualities.length:t.$store.state.itemsPerPage)+" de "+t._s(t.qualities.length)+" registros ")])]),r("div",{staticClass:"text-center pt-2"},[r("v-pagination",{attrs:{length:t.pageCount},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1)],1)],1)},a=[],i=(r("c975"),r("a434"),r("96cf"),r("1da1")),o=r("b166"),s=r("08ef"),c=function(){return{name:"",description:"",status:!0}},l={components:{VTextFieldWithValidation:s["a"]},filters:{formatDate:function(t){return Object(o["a"])(new Date(t),"dd/MM/yyyy")}},data:function(){return{page:1,pageCount:0,loadingButton:!1,validateError:!1,search:"",dialog:!1,headers:[{text:"calidad",align:"left",sortable:!1,value:"name"},{text:"Agregado",align:"left",sortable:!0,value:"createdAt"},{text:"Acciones",value:"action",sortable:!1}],qualities:[],editedIndex:-1,editedItem:c(),defaultItem:c()}},computed:{formTitle:function(){return-1===this.editedIndex?"Nueva calidad":"Editar calidad"}},watch:{dialog:function(t){t||this.close()}},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("qualitiesModule/list");case 3:t.initialize(),e.next=9;break;case 6:e.prev=6,e.t0=e["catch"](0),console.log("algo salio mal...");case 9:case"end":return e.stop()}}),e,null,[[0,6]])})))()},methods:{initialize:function(){this.qualities=this.$deepCopy(this.$store.state.qualitiesModule.qualities)},editItem:function(t){this.editedIndex=this.qualities.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var n,a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.qualities.indexOf(t),a=e.qualities[n]._id,r.next=4,e.$confirm("¿Realmente deseas eliminar este registro?");case 4:if(!r.sent){r.next=8;break}return r.next=7,e.$store.dispatch("qualitiesModule/delete",a);case 7:e.qualities.splice(n,1);case 8:case"end":return r.stop()}}),r)})))()},close:function(){var t=this;this.dialog=!1,setTimeout((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},save:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.loadingButton=!0,!(t.editedIndex>-1)){e.next=13;break}return r=t.qualities[t.editedIndex]._id,e.prev=3,e.next=6,t.$store.dispatch("qualitiesModule/update",{id:r,data:t.editedItem});case 6:Object.assign(t.qualities[t.editedIndex],t.editedItem),t.close();case 8:return e.prev=8,t.loadingButton=!1,e.finish(8);case 11:e.next=22;break;case 13:return e.prev=13,e.next=16,t.$store.dispatch("qualitiesModule/create",t.editedItem);case 16:n=e.sent,t.qualities.push(n),t.close();case 19:return e.prev=19,t.loadingButton=!1,e.finish(19);case 22:case"end":return e.stop()}}),e,null,[[3,,8,11],[13,,19,22]])})))()}}},u=l,d=r("2877"),f=r("6544"),h=r.n(f),p=r("0798"),v=r("8336"),m=r("b0af"),g=r("99d9"),y=r("cc20"),b=r("62ad"),x=r("a523"),w=r("8fea"),_=r("169a"),k=r("ce7e"),E=r("132d"),I=r("891e"),V=r("0fd9"),L=r("8654"),O=r("a844"),C=Object(d["a"])(u,n,a,!1,null,"d10b7796",null);e["default"]=C.exports;h()(C,{VAlert:p["a"],VBtn:v["a"],VCard:m["a"],VCardActions:g["b"],VCardTitle:g["e"],VChip:y["a"],VCol:b["a"],VContainer:x["a"],VDataTable:w["a"],VDialog:_["a"],VDivider:k["a"],VIcon:E["a"],VPagination:I["a"],VRow:V["a"],VTextField:L["a"],VTextarea:O["a"]})}}]);
//# sourceMappingURL=chunk-8366404c.0592b5bc.js.map