(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6025a612"],{"13d5":function(t,e,r){"use strict";var n=r("23e7"),o=r("d58f").left,a=r("a640"),i=r("ae40"),s=a("reduce"),c=i("reduce",{1:0});n({target:"Array",proto:!0,forced:!s||!c},{reduce:function(t){return o(this,t,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,a,i){try{var s=t[a](i),c=s.value}catch(l){return void r(l)}s.done?e(c):Promise.resolve(c).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function s(t){n(i,o,a,s,c,"next",t)}function c(t){n(i,o,a,s,c,"throw",t)}s(void 0)}))}}},"737d":function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r("fd3a"),o=r("49ef"),a=r("fbb4");function i(t,e){if(arguments.length<1)throw new TypeError("1 argument required, but only ".concat(arguments.length," present"));var r=Object(n["a"])(t);if(!Object(o["a"])(r))throw new RangeError("Invalid time value");var i=e||{},s=null==i.format?"extended":String(i.format),c=null==i.representation?"complete":String(i.representation);if("extended"!==s&&"basic"!==s)throw new RangeError("format must be 'extended' or 'basic'");if("date"!==c&&"time"!==c&&"complete"!==c)throw new RangeError("representation must be 'date', 'time', or 'complete'");var l="",d="",u="extended"===s?"-":"",f="extended"===s?":":"";if("time"!==c){var h=Object(a["a"])(r.getDate(),2),p=Object(a["a"])(r.getMonth()+1,2),v=Object(a["a"])(r.getFullYear(),4);l="".concat(v).concat(u).concat(p).concat(u).concat(h)}if("date"!==c){var m=r.getTimezoneOffset();if(0!==m){var g=Math.abs(m),y=Object(a["a"])(Math.floor(g/60),2),b=Object(a["a"])(g%60,2),w=m<0?"+":"-";d="".concat(w).concat(y,":").concat(b)}else d="Z";var x=Object(a["a"])(r.getHours(),2),I=Object(a["a"])(r.getMinutes(),2),_=Object(a["a"])(r.getSeconds(),2),T=""===l?"":"T",k=[x,I,_].join(f);l="".concat(l).concat(T).concat(k).concat(d)}return l}},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch($){c=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var o=e&&e.prototype instanceof m?e:m,a=Object.create(o.prototype),i=new C(n||[]);return a._invoke=k(t,r,i),a}function d(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch($){return{type:"throw",arg:$}}}t.wrap=l;var u="suspendedStart",f="suspendedYield",h="executing",p="completed",v={};function m(){}function g(){}function y(){}var b={};b[a]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(L([])));x&&x!==r&&n.call(x,a)&&(b=x);var I=y.prototype=m.prototype=Object.create(b);function _(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function T(t,e){function r(o,a,i,s){var c=d(t[o],t,a);if("throw"!==c.type){var l=c.arg,u=l.value;return u&&"object"===typeof u&&n.call(u,"__await")?e.resolve(u.__await).then((function(t){r("next",t,i,s)}),(function(t){r("throw",t,i,s)})):e.resolve(u).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,s)}))}s(c.arg)}var o;function a(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}this._invoke=a}function k(t,e,r){var n=u;return function(o,a){if(n===h)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw a;return P()}r.method=o,r.arg=a;while(1){var i=r.delegate;if(i){var s=O(i,r);if(s){if(s===v)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===u)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=h;var c=d(t,e,r);if("normal"===c.type){if(n=r.done?p:f,c.arg===v)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function O(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,O(t,r),"throw"===r.method))return v;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var o=d(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,v;var a=o.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,v):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function C(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function L(t){if(t){var r=t[a];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:P}}function P(){return{value:e,done:!0}}return g.prototype=I.constructor=y,y.constructor=g,g.displayName=c(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===g||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,c(t,s,"GeneratorFunction")),t.prototype=Object.create(I),t},t.awrap=function(t){return{__await:t}},_(T.prototype),T.prototype[i]=function(){return this},t.AsyncIterator=T,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new T(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},_(I),c(I,s,"Generator"),I[a]=function(){return this},I.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=L,C.prototype={constructor:C,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(E),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],s=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:L(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),v}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},d58f:function(t,e,r){var n=r("1c0b"),o=r("7b0b"),a=r("44ad"),i=r("50c4"),s=function(t){return function(e,r,s,c){n(r);var l=o(e),d=a(l),u=i(l.length),f=t?u-1:0,h=t?-1:1;if(s<2)while(1){if(f in d){c=d[f],f+=h;break}if(f+=h,t?f<0:u<=f)throw TypeError("Reduce of empty array with no initial value")}for(;t?f>=0:u>f;f+=h)f in d&&(c=r(c,d[f],f,l));return c}};t.exports={left:s(!1),right:s(!0)}},fb55:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",{attrs:{justify:"center"}},[r("material-card",{attrs:{width:"1500px",icon:"mdi-cellphone-dock",color:"primary",title:"Inversiones",text:"Tabla resumen de inversiones propias"}},[r("v-data-table",{attrs:{"no-results-text":"No se encontraron resultados",search:t.search,"hide-default-footer":"",headers:t.headers,items:t.filteredTools,"sort-by":"calories",page:t.page,"items-per-page":t.$store.state.itemsPerPage},on:{"page-count":function(e){t.pageCount=e},"update:page":function(e){t.page=e}},scopedSlots:t._u([{key:"top",fn:function(){return[r("v-container",[r("span",{staticClass:"font-weight-bold"},[t._v("Filtrar por nombre: "+t._s(t.search))]),r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-text-field",{attrs:{dense:"","hide-details":"","append-icon":"search",placeholder:"Escribe el nombre de la inversión","single-line":"",outlined:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-dialog",{attrs:{"max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[r("v-btn",t._g({staticClass:"mb-2",attrs:{color:"primary",dark:""}},n),[t._v("Agregar inversión")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("v-card",[r("v-card-title",[r("v-icon",{staticClass:"mr-1",attrs:{color:"primary"}},[t._v("mdi-update")]),r("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])],1),r("v-divider"),r("v-container",{staticClass:"pa-5",attrs:{fluid:""}},[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"12",md:"12"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Fecha:")]),r("v-text-field",{staticClass:"date-width",attrs:{outlined:"",dense:"","hide-details":"","prepend-icon":"event",type:"date"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),r("v-col",{attrs:{cols:"12",sm:"12"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Nombre")]),r("v-text-field",{attrs:{dense:"","hide-details":"",outlined:"",placeholder:"Nombre de la inversión"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),r("v-col",{attrs:{cols:"12",sm:"4"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Tipo")]),r("v-select",{attrs:{placeholder:"Selecciona un Tipo","item-text":"name","item-valur":"_id",dense:"","hide-details":"",items:t.toolsTypes,"item-value":"_id",outlined:""},model:{value:t.editedItem.toolsTypeId,callback:function(e){t.$set(t.editedItem,"toolsTypeId",e)},expression:"editedItem.toolsTypeId"}})],1),r("v-col",{attrs:{cols:"12",sm:"4"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Cantidad")]),r("v-text-field",{attrs:{suffix:"unidades",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:t.editedItem.stock,callback:function(e){t.$set(t.editedItem,"stock",e)},expression:"editedItem.stock"}})],1),r("v-col",{attrs:{cols:"12",sm:"4"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Costo")]),r("v-text-field",{attrs:{prefix:"S/.",dense:"","hide-details":"",outlined:"",type:"number"},model:{value:t.editedItem.purchasePrice,callback:function(e){t.$set(t.editedItem,"purchasePrice",e)},expression:"editedItem.purchasePrice"}})],1),r("v-col",{attrs:{cols:"12",sm:"12"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Descripción")]),r("v-textarea",{attrs:{"hide-details":"",placeholder:"Ingresa una descripción",outlined:""},model:{value:t.editedItem.description,callback:function(e){t.$set(t.editedItem,"description",e)},expression:"editedItem.description"}})],1)],1)],1),r("v-card-actions",{attrs:{"rd-actions":""}},[r("div",{staticClass:"flex-grow-1"}),r("v-btn",{attrs:{outlined:"",color:"error",text:""},on:{click:t.close}},[t._v("Cancelar")]),r("v-btn",{attrs:{loading:t.loadingButton,color:"success"},on:{click:t.save}},[t._v("Guardar")])],1)],1)],1)],1),r("v-col",{attrs:{cols:"12",sm:"4"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Filtrar por tipo:")]),r("v-select",{attrs:{clearable:"","hide-details":"",dense:"",placeholder:"Selecciona un tipo",items:t.toolsTypes,"item-text":"name","item-value":"_id",outlined:""},on:{"click:clear":function(e){return t.showAllTypes()}},model:{value:t.selectedType,callback:function(e){t.selectedType=e},expression:"selectedType"}})],1),r("v-col",{attrs:{cols:"12",sm:"4"}},[r("span",{staticClass:"font-weight-bold"},[t._v("Total de inversión:")]),r("h1",[t._v("S/"+t._s(t.totalInvestment))])])],1)],1)]},proxy:!0},{key:"item.date",fn:function(e){var r=e.item;return[t._v(t._s(t._f("formatDate")(r.date)))]}},{key:"item.toolsTypeId",fn:function(e){var r=e.item;return[t._v(t._s(r.toolsTypeId?r.toolsTypeId.name:"Sin tipo"))]}},{key:"item.action",fn:function(e){var n=e.item;return[r("v-btn",{staticClass:"mr-3",attrs:{small:"",color:"secondary"},on:{click:function(e){return t.editItem(n)}}},[t._v("Editar")]),r("v-btn",{attrs:{small:"",color:"error"},on:{click:function(e){return t.deleteItem(n)}}},[t._v("Eliminar")])]}},{key:"no-data",fn:function(){return[r("v-alert",{attrs:{type:"error",value:!0}},[t._v("Aún no cuentas con inversiones")])]},proxy:!0}])}),r("v-col",{attrs:{cols:"12",sm:"12"}},[r("span",[r("strong",[t._v("Mostrando:")]),t._v(" "+t._s(t.$store.state.itemsPerPage>t.tools.length?t.tools.length:t.$store.state.itemsPerPage)+" de "+t._s(t.tools.length)+" registros ")])]),r("div",{staticClass:"text-center pt-2"},[r("v-pagination",{attrs:{length:t.pageCount},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1)],1)],1)},o=[],a=(r("4de4"),r("c975"),r("13d5"),r("a434"),r("96cf"),r("1da1")),i=r("b166"),s=r("737d"),c=function(){return{name:"",toolsTypeId:null,stock:0,purchasePrice:0,description:"",date:Object(s["a"])(new Date,{representation:"date"})}},l={components:{},filters:{formatDate:function(t){return t?Object(i["a"])(new Date(t),"dd/MM/yyyy"):"Sin fecha"}},data:function(){return{date:Object(s["a"])(new Date,{representation:"date"}),page:1,pageCount:0,selectedType:null,loadingButton:!1,validateError:!1,search:"",dialog:!1,headers:[{text:"Fecha",align:"left",sortable:!1,value:"date"},{text:"Nombre",align:"left",sortable:!1,value:"name"},{text:"Cantidad",align:"left",sortable:!0,value:"stock"},{text:"Costo",align:"left",sortable:!0,value:"purchasePrice"},{text:"Tipo",align:"left",sortable:!0,value:"toolsTypeId"},{text:"Descripción",align:"left",sortable:!0,value:"description"},{text:"Acciones",value:"action",sortable:!1}],tools:[],toolsTypes:[],editedIndex:-1,editedItem:c(),defaultItem:c()}},computed:{formTitle:function(){return-1===this.editedIndex?"Nueva inversión":"Editar inversión"},filteredTools:function(){var t=this;return this.selectedType?this.tools.filter((function(e){return e.toolsTypeId?e.toolsTypeId._id===t.selectedType:null})):this.tools},totalInvestment:function(){return this.filteredTools.reduce((function(t,e){return t+e.purchasePrice*e.stock}),0)}},watch:{dialog:function(t){t||this.close()}},mounted:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.$store.dispatch("loadingModule/showLoading"),e.next=3,t.initialize();case 3:t.$store.dispatch("loadingModule/showLoading",!1);case 4:case"end":return e.stop()}}),e)})))()},methods:{initialize:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("toolsModule/list");case 2:return e.next=4,t.$store.dispatch("toolsTypesModule/list");case 4:t.tools=t.$deepCopy(t.$store.state.toolsModule.tools),t.toolsTypes=t.$deepCopy(t.$store.state.toolsTypesModule.toolsTypes);case 6:case"end":return e.stop()}}),e)})))()},editItem:function(t){this.editedIndex=this.tools.indexOf(t),t.date?this.date=Object(s["a"])(new Date(t.date),{representation:"date"}):this.date=null,this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){var n,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=e.tools.indexOf(t),o=e.tools[n]._id,r.next=4,e.$confirm("¿Realmente deseas eliminar este registro?");case 4:if(!r.sent){r.next=8;break}return r.next=7,e.$store.dispatch("toolsModule/delete",o);case 7:e.tools.splice(n,1);case 8:case"end":return r.stop()}}),r)})))()},close:function(){var t=this;this.dialog=!1,setTimeout((function(){t.date=Object(s["a"])(new Date,{representation:"date"}),t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}),300)},save:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var r,n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.editedItem.date=new Date(t.date),t.editedItem.date=new Date(t.editedItem.date.getTime()- -6e4*t.editedItem.date.getTimezoneOffset()),t.loadingButton=!0,!(t.editedIndex>-1)){e.next=16;break}return r=t.tools[t.editedIndex]._id,e.prev=5,e.next=8,t.$store.dispatch("toolsModule/update",{id:r,data:t.editedItem});case 8:n=e.sent,Object.assign(t.tools[t.editedIndex],n),t.close();case 11:return e.prev=11,t.loadingButton=!1,e.finish(11);case 14:e.next=25;break;case 16:return e.prev=16,e.next=19,t.$store.dispatch("toolsModule/create",t.editedItem);case 19:o=e.sent,t.tools.push(o),t.close();case 22:return e.prev=22,t.loadingButton=!1,e.finish(22);case 25:case"end":return e.stop()}}),e,null,[[5,,11,14],[16,,22,25]])})))()},showAllTypes:function(){this.selectedType=null}}},d=l,u=r("2877"),f=r("6544"),h=r.n(f),p=r("0798"),v=r("8336"),m=r("b0af"),g=r("99d9"),y=r("62ad"),b=r("a523"),w=r("8fea"),x=r("169a"),I=r("ce7e"),_=r("132d"),T=r("891e"),k=r("0fd9"),O=r("b974"),j=r("8654"),E=r("a844"),C=Object(u["a"])(d,n,o,!1,null,"78d28e4f",null);e["default"]=C.exports;h()(C,{VAlert:p["a"],VBtn:v["a"],VCard:m["a"],VCardActions:g["b"],VCardTitle:g["e"],VCol:y["a"],VContainer:b["a"],VDataTable:w["a"],VDialog:x["a"],VDivider:I["a"],VIcon:_["a"],VPagination:T["a"],VRow:k["a"],VSelect:O["a"],VTextField:j["a"],VTextarea:E["a"]})}}]);
//# sourceMappingURL=chunk-6025a612.c6125461.js.map