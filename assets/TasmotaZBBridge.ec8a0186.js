import{c as A,h as s,b as W,z as $t,Q as Me,j as I,a as f,r as j,ai as Y,x as Fe,aR as Mt,$ as E,ac as be,ad as me,l as N,aM as lt,d as at,v as Ft,q as Et,o as nt,C as Qt,D as We,g as ot,aB as Lt,aC as jt,aY as Nt,aZ as Ke,a_ as De,a$ as Ge,b0 as At,b1 as Ht,ag as Te,ar as Ut,Y as U,Z as F,W as R,V as p,X as z,ab as $,b2 as de,b3 as ve,_ as x,b4 as fe,ap as J,at as Xe,w as zt,ah as Zt,a0 as Z,b5 as It,as as Re,aq as Wt}from"./index.4a662faa.js";import{Q as Ye}from"./QBanner.8240f869.js";import{a as Kt,u as Gt,b as Xt,c as rt,Q as Yt,_ as Jt}from"./MqttConfig.e34c6f67.js";import{Q as el}from"./QPage.3a0e0c96.js";import{u as tl}from"./homeassistant.43b7deeb.js";import{g as ll}from"./position-engine.685912dd.js";function te(e,n=new WeakMap){if(Object(e)!==e)return e;if(n.has(e))return n.get(e);const l=e instanceof Date?new Date(e):e instanceof RegExp?new RegExp(e.source,e.flags):e instanceof Set?new Set:e instanceof Map?new Map:typeof e.constructor!="function"?Object.create(null):e.prototype!==void 0&&typeof e.prototype.constructor=="function"?e:new e.constructor;if(typeof e.constructor=="function"&&typeof e.valueOf=="function"){const c=e.valueOf();if(Object(c)!==c){const r=new e.constructor(c);return n.set(e,r),r}}return n.set(e,l),e instanceof Set?e.forEach(c=>{l.add(te(c,n))}):e instanceof Map&&e.forEach((c,r)=>{l.set(r,te(c,n))}),Object.assign(l,...Object.keys(e).map(c=>({[c]:te(e[c],n)})))}var $e=A({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:n,emit:l}){const c=I(),{proxy:{$q:r}}=c,u=a=>{l("click",a)};return()=>{if(e.props===void 0)return s("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:u},W(n.default));let a,o;const d=c.vnode.key;if(d){if(a=e.props.colsMap[d],a===void 0)return}else a=e.props.col;if(a.sortable===!0){const i=a.align==="right"?"unshift":"push";o=$t(n.default,[]),o[i](s(Me,{class:a.__iconClass,name:r.iconSet.table.arrowUp}))}else o=W(n.default);const m={class:a.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:a.headerStyle,onClick:i=>{a.sortable===!0&&e.props.sort(a),u(i)}};return s("th",m,o)}}}),Oe=A({name:"QTr",props:{props:Object,noHover:Boolean},setup(e,{slots:n}){const l=f(()=>"q-tr"+(e.props===void 0||e.props.header===!0?"":" "+e.props.__trClass)+(e.noHover===!0?" q-tr--no-hover":""));return()=>s("tr",{class:l.value},W(n.default))}}),Ve=A({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(e,{slots:n}){const l=I(),c=f(()=>"q-td"+(e.autoWidth===!0?" q-table--col-auto-width":"")+(e.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(e.props===void 0)return s("td",{class:c.value},W(n.default));const r=l.vnode.key,u=(e.props.colsMap!==void 0?e.props.colsMap[r]:null)||e.props.col;if(u===void 0)return;const{row:a}=e.props;return s("td",{class:c.value+u.__tdClass(a),style:u.__tdStyle(a)},W(n.default))}}}),al=A({name:"QPopupEdit",props:{modelValue:{required:!0},title:String,buttons:Boolean,labelSet:String,labelCancel:String,color:{type:String,default:"primary"},validate:{type:Function,default:()=>!0},autoSave:Boolean,cover:{type:Boolean,default:!0},disable:Boolean},emits:["update:modelValue","save","cancel","before-show","show","before-hide","hide"],setup(e,{slots:n,emit:l}){const{proxy:c}=I(),{$q:r}=c,u=j(null),a=j(""),o=j("");let d=!1;const m=f(()=>{const w={initialValue:a.value,validate:e.validate,set:i,cancel:b,updatePosition:q};return Y(w,"value",()=>o.value,T=>{o.value=T}),w});function i(){e.validate(o.value)!==!1&&(C()===!0&&(l("save",o.value,a.value),l("update:modelValue",o.value)),k())}function b(){C()===!0&&l("cancel",o.value,a.value),k()}function q(){Fe(()=>{u.value.updatePosition()})}function C(){return Mt(o.value,a.value)===!1}function k(){d=!0,u.value.hide()}function h(){d=!1,a.value=te(e.modelValue),o.value=te(e.modelValue),l("before-show")}function _(){l("show")}function O(){d===!1&&C()===!0&&(e.autoSave===!0&&e.validate(o.value)===!0?(l("save",o.value,a.value),l("update:modelValue",o.value)):l("cancel",o.value,a.value)),l("before-hide")}function V(){l("hide")}Object.assign(c,{set:i,cancel:b,show(w){u.value!==null&&u.value.show(w)},hide(w){u.value!==null&&u.value.hide(w)},updatePosition:q});function M(){const w=n.default!==void 0?[].concat(n.default(m.value)):[];return e.title&&w.unshift(s("div",{class:"q-dialog__title q-mt-sm q-mb-sm"},e.title)),e.buttons===!0&&w.push(s("div",{class:"q-popup-edit__buttons row justify-center no-wrap"},[s(E,{flat:!0,color:e.color,label:e.labelCancel||r.lang.label.cancel,onClick:b}),s(E,{flat:!0,color:e.color,label:e.labelSet||r.lang.label.set,onClick:i})])),w}return()=>{if(e.disable!==!0)return s(Kt,{ref:u,class:"q-popup-edit",cover:e.cover,onBeforeShow:h,onShow:_,onBeforeHide:O,onHide:V,onEscapeKey:b},M)}}}),nl=A({name:"QList",props:{...be,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean},setup(e,{slots:n}){const l=I(),c=me(e,l.proxy.$q),r=f(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(c.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>s("div",{class:r.value},W(n.default))}});const ol=["horizontal","vertical","cell","none"];var rl=A({name:"QMarkupTable",props:{...be,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>ol.includes(e)}},setup(e,{slots:n}){const l=I(),c=me(e,l.proxy.$q),r=f(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(c.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>s("div",{class:r.value},[s("table",{class:"q-table"},W(n.default))])}});function it(e,n){return s("div",e,[s("table",{class:"q-table"},n)])}const il={list:nl,table:rl},sl=["list","table","__qtable"];var ul=A({name:"QVirtualScroll",props:{...Gt,type:{type:String,default:"list",validator:e=>sl.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:{default:void 0}},setup(e,{slots:n,attrs:l}){let c;const r=j(null),u=f(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:a,localResetVirtualScroll:o,padVirtualScroll:d,onVirtualScrollEvt:m}=Xt({virtualScrollLength:u,getVirtualScrollTarget:k,getVirtualScrollEl:C}),i=f(()=>{if(u.value===0)return[];const V=(M,w)=>({index:a.value.from+w,item:M});return e.itemsFn===void 0?e.items.slice(a.value.from,a.value.to).map(V):e.itemsFn(a.value.from,a.value.to-a.value.from).map(V)}),b=f(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),q=f(()=>e.scrollTarget!==void 0?{}:{tabindex:0});N(u,()=>{o()}),N(()=>e.scrollTarget,()=>{_(),h()});function C(){return r.value.$el||r.value}function k(){return c}function h(){c=Qt(C(),e.scrollTarget),c.addEventListener("scroll",m,We.passive)}function _(){c!==void 0&&(c.removeEventListener("scroll",m,We.passive),c=void 0)}function O(){let V=d(e.type==="list"?"div":"tbody",i.value.map(n.default));return n.before!==void 0&&(V=n.before().concat(V)),ot(n.after,V)}return lt(()=>{o()}),at(()=>{h()}),Ft(()=>{h()}),Et(()=>{_()}),nt(()=>{_()}),()=>{if(n.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?it({ref:r,class:"q-table__middle "+b.value},O()):s(il[e.type],{...l,ref:r,class:[l.class,b.value],...q.value},O)}}});const cl={xs:2,sm:4,md:6,lg:10,xl:14};function Je(e,n,l){return{transform:n===!0?`translateX(${l.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var dl=A({name:"QLinearProgress",props:{...be,...Lt,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:n}){const{proxy:l}=I(),c=me(e,l.$q),r=jt(e,cl),u=f(()=>e.indeterminate===!0||e.query===!0),a=f(()=>e.reverse!==e.query),o=f(()=>({...r.value!==null?r.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),d=f(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),m=f(()=>Je(e.buffer!==void 0?e.buffer:1,a.value,l.$q)),i=f(()=>`q-linear-progress__track absolute-full q-linear-progress__track--with${e.instantFeedback===!0?"out":""}-transition q-linear-progress__track--${c.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),b=f(()=>Je(u.value===!0?1:e.value,a.value,l.$q)),q=f(()=>`q-linear-progress__model absolute-full q-linear-progress__model--with${e.instantFeedback===!0?"out":""}-transition q-linear-progress__model--${u.value===!0?"in":""}determinate`),C=f(()=>({width:`${e.value*100}%`})),k=f(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"}`);return()=>{const h=[s("div",{class:i.value,style:m.value}),s("div",{class:q.value,style:b.value})];return e.stripe===!0&&u.value===!1&&h.push(s("div",{class:k.value,style:C.value})),s("div",{class:d.value,style:o.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},ot(n.default,h))}}});let ee=0;const vl={fullscreen:Boolean,noRouteFullscreenExit:Boolean},fl=["update:fullscreen","fullscreen"];function gl(){const e=I(),{props:n,emit:l,proxy:c}=e;let r,u,a;const o=j(!1);Nt(e)===!0&&N(()=>c.$route.fullPath,()=>{n.noRouteFullscreenExit!==!0&&i()}),N(()=>n.fullscreen,b=>{o.value!==b&&d()}),N(o,b=>{l("update:fullscreen",b),l("fullscreen",b)});function d(){o.value===!0?i():m()}function m(){o.value!==!0&&(o.value=!0,a=c.$el.parentNode,a.replaceChild(u,c.$el),document.body.appendChild(c.$el),ee++,ee===1&&document.body.classList.add("q-body--fullscreen-mixin"),r={handler:i},Ke.add(r))}function i(){o.value===!0&&(r!==void 0&&(Ke.remove(r),r=void 0),a.replaceChild(c.$el,u),o.value=!1,ee=Math.max(0,ee-1),ee===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),c.$el.scrollIntoView!==void 0&&setTimeout(()=>{c.$el.scrollIntoView()})))}return lt(()=>{u=document.createElement("span")}),at(()=>{n.fullscreen===!0&&m()}),nt(i),Object.assign(c,{toggleFullscreen:d,setFullscreen:m,exitFullscreen:i}),{inFullscreen:o,toggleFullscreen:d}}function bl(e,n){return new Date(e)-new Date(n)}const ml={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function Sl(e,n,l,c){const r=f(()=>{const{sortBy:o}=n.value;return o&&l.value.find(d=>d.name===o)||null}),u=f(()=>e.sortMethod!==void 0?e.sortMethod:(o,d,m)=>{const i=l.value.find(C=>C.name===d);if(i===void 0||i.field===void 0)return o;const b=m===!0?-1:1,q=typeof i.field=="function"?C=>i.field(C):C=>C[i.field];return o.sort((C,k)=>{let h=q(C),_=q(k);return h==null?-1*b:_==null?1*b:i.sort!==void 0?i.sort(h,_,C,k)*b:De(h)===!0&&De(_)===!0?(h-_)*b:Ge(h)===!0&&Ge(_)===!0?bl(h,_)*b:typeof h=="boolean"&&typeof _=="boolean"?(h-_)*b:([h,_]=[h,_].map(O=>(O+"").toLocaleString().toLowerCase()),h<_?-1*b:h===_?0:b)})});function a(o){let d=e.columnSortOrder;if(At(o)===!0)o.sortOrder&&(d=o.sortOrder),o=o.name;else{const b=l.value.find(q=>q.name===o);b!==void 0&&b.sortOrder&&(d=b.sortOrder)}let{sortBy:m,descending:i}=n.value;m!==o?(m=o,i=d==="da"):e.binaryStateSort===!0?i=!i:i===!0?d==="ad"?m=null:i=!1:d==="ad"?i=!0:m=null,c({sortBy:m,descending:i,page:1})}return{columnToSort:r,computedSortMethod:u,sort:a}}const yl={filter:[String,Object],filterMethod:Function};function hl(e,n){const l=f(()=>e.filterMethod!==void 0?e.filterMethod:(c,r,u,a)=>{const o=r?r.toLowerCase():"";return c.filter(d=>u.some(m=>{const i=a(m,d)+"";return(i==="undefined"||i==="null"?"":i.toLowerCase()).indexOf(o)!==-1}))});return N(()=>e.filter,()=>{Fe(()=>{n({page:1},!0)})},{deep:!0}),{computedFilterMethod:l}}function _l(e,n){for(const l in n)if(n[l]!==e[l])return!1;return!0}function et(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const wl={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function ql(e,n){const{props:l,emit:c}=e,r=j(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:l.rowsPerPageOptions.length>0?l.rowsPerPageOptions[0]:5},l.pagination)),u=f(()=>{const i=l["onUpdate:pagination"]!==void 0?{...r.value,...l.pagination}:r.value;return et(i)}),a=f(()=>u.value.rowsNumber!==void 0);function o(i){d({pagination:i,filter:l.filter})}function d(i={}){Fe(()=>{c("request",{pagination:i.pagination||u.value,filter:i.filter||l.filter,getCellValue:n})})}function m(i,b){const q=et({...u.value,...i});if(_l(u.value,q)===!0){a.value===!0&&b===!0&&o(q);return}if(a.value===!0){o(q);return}l.pagination!==void 0&&l["onUpdate:pagination"]!==void 0?c("update:pagination",q):r.value=q}return{innerPagination:r,computedPagination:u,isServerSide:a,requestServerInteraction:d,setPagination:m}}function Cl(e,n,l,c,r,u){const{props:a,emit:o,proxy:{$q:d}}=e,m=f(()=>c.value===!0?l.value.rowsNumber||0:u.value),i=f(()=>{const{page:w,rowsPerPage:T}=l.value;return(w-1)*T}),b=f(()=>{const{page:w,rowsPerPage:T}=l.value;return w*T}),q=f(()=>l.value.page===1),C=f(()=>l.value.rowsPerPage===0?1:Math.max(1,Math.ceil(m.value/l.value.rowsPerPage))),k=f(()=>b.value===0?!0:l.value.page>=C.value),h=f(()=>(a.rowsPerPageOptions.includes(n.value.rowsPerPage)?a.rowsPerPageOptions:[n.value.rowsPerPage].concat(a.rowsPerPageOptions)).map(T=>({label:T===0?d.lang.table.allRows:""+T,value:T})));N(C,(w,T)=>{if(w===T)return;const le=l.value.page;w&&!le?r({page:1}):w<le&&r({page:w})});function _(){r({page:1})}function O(){const{page:w}=l.value;w>1&&r({page:w-1})}function V(){const{page:w,rowsPerPage:T}=l.value;b.value>0&&w*T<m.value&&r({page:w+1})}function M(){r({page:C.value})}return a["onUpdate:pagination"]!==void 0&&o("update:pagination",{...l.value}),{firstRowIndex:i,lastRowIndex:b,isFirstPage:q,isLastPage:k,pagesNumber:C,computedRowsPerPageOptions:h,computedRowsNumber:m,firstPage:_,prevPage:O,nextPage:V,lastPage:M}}const kl={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},Pl=["update:selected","selection"];function pl(e,n,l,c){const r=f(()=>{const k={};return e.selected.map(c.value).forEach(h=>{k[h]=!0}),k}),u=f(()=>e.selection!=="none"),a=f(()=>e.selection==="single"),o=f(()=>e.selection==="multiple"),d=f(()=>l.value.length>0&&l.value.every(k=>r.value[c.value(k)]===!0)),m=f(()=>d.value!==!0&&l.value.some(k=>r.value[c.value(k)]===!0)),i=f(()=>e.selected.length);function b(k){return r.value[k]===!0}function q(){n("update:selected",[])}function C(k,h,_,O){n("selection",{rows:h,added:_,keys:k,evt:O});const V=a.value===!0?_===!0?h:[]:_===!0?e.selected.concat(h):e.selected.filter(M=>k.includes(c.value(M))===!1);n("update:selected",V)}return{hasSelectionMode:u,singleSelection:a,multipleSelection:o,allRowsSelected:d,someRowsSelected:m,rowsSelectedNumber:i,isRowSelected:b,clearSelection:q,updateSelection:C}}function tt(e){return Array.isArray(e)?e.slice():[]}const Bl={expanded:Array},xl=["update:expanded"];function Tl(e,n){const l=j(tt(e.expanded));N(()=>e.expanded,a=>{l.value=tt(a)});function c(a){return l.value.includes(a)}function r(a){e.expanded!==void 0?n("update:expanded",a):l.value=a}function u(a,o){const d=l.value.slice(),m=d.indexOf(a);o===!0?m===-1&&(d.push(a),r(d)):m!==-1&&(d.splice(m,1),r(d))}return{isRowExpanded:c,setExpanded:r,updateExpanded:u}}const Rl={visibleColumns:Array};function Ol(e,n,l){const c=f(()=>{if(e.columns!==void 0)return e.columns;const o=e.rows[0];return o!==void 0?Object.keys(o).map(d=>({name:d,label:d.toUpperCase(),field:d,align:De(o[d])?"right":"left",sortable:!0})):[]}),r=f(()=>{const{sortBy:o,descending:d}=n.value;return(e.visibleColumns!==void 0?c.value.filter(i=>i.required===!0||e.visibleColumns.includes(i.name)===!0):c.value).map(i=>{const b=i.align||"right",q=`text-${b}`;return{...i,align:b,__iconClass:`q-table__sort-icon q-table__sort-icon--${b}`,__thClass:q+(i.headerClasses!==void 0?" "+i.headerClasses:"")+(i.sortable===!0?" sortable":"")+(i.name===o?` sorted ${d===!0?"sort-desc":""}`:""),__tdStyle:i.style!==void 0?typeof i.style!="function"?()=>i.style:i.style:()=>null,__tdClass:i.classes!==void 0?typeof i.classes!="function"?()=>q+" "+i.classes:C=>q+" "+i.classes(C):()=>q}})}),u=f(()=>{const o={};return r.value.forEach(d=>{o[d.name]=d}),o}),a=f(()=>e.tableColspan!==void 0?e.tableColspan:r.value.length+(l.value===!0?1:0));return{colList:c,computedCols:r,computedColsMap:u,computedColspan:a}}const ge="q-table__bottom row items-center",st={};rt.forEach(e=>{st[e]={}});var Vl=A({name:"QTable",props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{default:void 0},...st,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...be,...vl,...Rl,...yl,...wl,...Bl,...kl,...ml},emits:["request","virtual-scroll",...fl,...xl,...Pl],setup(e,{slots:n,emit:l}){const c=I(),{proxy:{$q:r}}=c,u=me(e,r),{inFullscreen:a,toggleFullscreen:o}=gl(),d=f(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),m=j(null),i=j(null),b=f(()=>e.grid!==!0&&e.virtualScroll===!0),q=f(()=>" q-table__card"+(u.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),C=f(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":q.value)+(u.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(a.value===!0?" fullscreen scroll":"")),k=f(()=>C.value+(e.loading===!0?" q-table--loading":""));N(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+C.value,()=>{b.value===!0&&i.value!==null&&i.value.reset()});const{innerPagination:h,computedPagination:_,isServerSide:O,requestServerInteraction:V,setPagination:M}=ql(c,G),{computedFilterMethod:w}=hl(e,M),{isRowExpanded:T,setExpanded:le,updateExpanded:ut}=Tl(e,l),Se=f(()=>{let t=e.rows;if(O.value===!0||t.length===0)return t;const{sortBy:v,descending:g}=_.value;return e.filter&&(t=w.value(t,e.filter,Q.value,G)),gt.value!==null&&(t=bt.value(e.rows===t?t.slice():t,v,g)),t}),Ee=f(()=>Se.value.length),H=f(()=>{let t=Se.value;if(O.value===!0)return t;const{rowsPerPage:v}=_.value;return v!==0&&(ne.value===0&&e.rows!==t?t.length>oe.value&&(t=t.slice(0,oe.value)):t=t.slice(ne.value,oe.value)),t}),{hasSelectionMode:K,singleSelection:ct,multipleSelection:Qe,allRowsSelected:dt,someRowsSelected:Le,rowsSelectedNumber:ye,isRowSelected:he,clearSelection:vt,updateSelection:ae}=pl(e,l,H,d),{colList:ft,computedCols:Q,computedColsMap:je,computedColspan:Ne}=Ol(e,_,K),{columnToSort:gt,computedSortMethod:bt,sort:_e}=Sl(e,_,ft,M),{firstRowIndex:ne,lastRowIndex:oe,isFirstPage:we,isLastPage:qe,pagesNumber:re,computedRowsPerPageOptions:mt,computedRowsNumber:ie,firstPage:Ce,prevPage:ke,nextPage:Pe,lastPage:pe}=Cl(c,h,_,O,M,Ee),St=f(()=>H.value.length===0),yt=f(()=>{const t={};return rt.forEach(v=>{t[v]=e[v]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function ht(){b.value===!0&&i.value.reset()}function _t(){if(e.grid===!0)return Vt();const t=e.hideHeader!==!0?Ze:null;if(b.value===!0){const g=n["top-row"],S=n["bottom-row"],y={default:B=>He(B.item,n.body,B.index)};if(g!==void 0){const B=s("tbody",g({cols:Q.value}));y.before=t===null?()=>B:()=>[t()].concat(B)}else t!==null&&(y.before=t);return S!==void 0&&(y.after=()=>s("tbody",S({cols:Q.value}))),s(ul,{ref:i,class:e.tableClass,style:e.tableStyle,...yt.value,scrollTarget:e.virtualScrollTarget,items:H.value,type:"__qtable",tableColspan:Ne.value,onVirtualScroll:qt},y)}const v=[Ct()];return t!==null&&v.unshift(t()),it({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},v)}function wt(t,v){if(i.value!==null){i.value.scrollTo(t,v);return}t=parseInt(t,10);const g=m.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(g!==null){const S=m.value.querySelector(".q-table__middle.scroll"),{offsetTop:y}=g,B=y<S.scrollTop?"decrease":"increase";S.scrollTop=y,l("virtual-scroll",{index:t,from:0,to:h.value.rowsPerPage-1,direction:B})}}function qt(t){l("virtual-scroll",t)}function Ae(){return[s(dl,{class:"q-table__linear-progress",color:e.color,dark:u.value,indeterminate:!0,trackColor:"transparent"})]}function He(t,v,g){const S=d.value(t),y=he(S);if(v!==void 0)return v(Ue({key:S,row:t,pageIndex:g,__trClass:y?"selected":""}));const B=n["body-cell"],P=Q.value.map(D=>{const ue=n[`body-cell-${D.name}`],ce=ue!==void 0?ue:B;return ce!==void 0?ce(kt({key:S,row:t,pageIndex:g,col:D})):s("td",{class:D.__tdClass(t),style:D.__tdStyle(t)},G(D,t))});if(K.value===!0){const D=n["body-selection"],ue=D!==void 0?D(Pt({key:S,row:t,pageIndex:g})):[s(Te,{modelValue:y,color:e.color,dark:u.value,dense:e.dense,"onUpdate:modelValue":(ce,Dt)=>{ae([S],[t],ce,Dt)}})];P.unshift(s("td",{class:"q-table--col-auto-width"},ue))}const L={key:S,class:{selected:y}};return e.onRowClick!==void 0&&(L.class["cursor-pointer"]=!0,L.onClick=D=>{l("RowClick",D,t,g)}),e.onRowDblclick!==void 0&&(L.class["cursor-pointer"]=!0,L.onDblclick=D=>{l("RowDblclick",D,t,g)}),e.onRowContextmenu!==void 0&&(L.class["cursor-pointer"]=!0,L.onContextmenu=D=>{l("RowContextmenu",D,t,g)}),s("tr",L,P)}function Ct(){const t=n.body,v=n["top-row"],g=n["bottom-row"];let S=H.value.map((y,B)=>He(y,t,B));return v!==void 0&&(S=v({cols:Q.value}).concat(S)),g!==void 0&&(S=S.concat(g({cols:Q.value}))),s("tbody",S)}function Ue(t){return Be(t),t.cols=t.cols.map(v=>{const g={...v};return Y(g,"value",()=>G(v,t.row)),g}),t}function kt(t){return Be(t),Y(t,"value",()=>G(t.col,t.row)),t}function Pt(t){return Be(t),t}function Be(t){Object.assign(t,{cols:Q.value,colsMap:je.value,sort:_e,rowIndex:ne.value+t.pageIndex,color:e.color,dark:u.value,dense:e.dense}),K.value===!0&&Y(t,"selected",()=>he(t.key),(v,g)=>{ae([t.key],[t.row],v,g)}),Y(t,"expand",()=>T(t.key),v=>{ut(t.key,v)})}function G(t,v){const g=typeof t.field=="function"?t.field(v):v[t.field];return t.format!==void 0?t.format(g,v):g}const X=f(()=>({pagination:_.value,pagesNumber:re.value,isFirstPage:we.value,isLastPage:qe.value,firstPage:Ce,prevPage:ke,nextPage:Pe,lastPage:pe,inFullscreen:a.value,toggleFullscreen:o}));function pt(){const t=n.top,v=n["top-left"],g=n["top-right"],S=n["top-selection"],y=K.value===!0&&S!==void 0&&ye.value>0,B="q-table__top relative-position row items-center";if(t!==void 0)return s("div",{class:B},[t(X.value)]);let P;if(y===!0?P=S(X.value).slice():(P=[],v!==void 0?P.push(s("div",{class:"q-table-control"},[v(X.value)])):e.title&&P.push(s("div",{class:"q-table__control"},[s("div",{class:["q-table__title",e.titleClass]},e.title)]))),g!==void 0&&(P.push(s("div",{class:"q-table__separator col"})),P.push(s("div",{class:"q-table__control"},[g(X.value)]))),P.length!==0)return s("div",{class:B},P)}const ze=f(()=>Le.value===!0?null:dt.value);function Ze(){const t=Bt();return e.loading===!0&&n.loading===void 0&&t.push(s("tr",{class:"q-table__progress"},[s("th",{class:"relative-position",colspan:Ne.value},Ae())])),s("thead",t)}function Bt(){const t=n.header,v=n["header-cell"];if(t!==void 0)return t(xe({header:!0})).slice();const g=Q.value.map(S=>{const y=n[`header-cell-${S.name}`],B=y!==void 0?y:v,P=xe({col:S});return B!==void 0?B(P):s($e,{key:S.name,props:P},()=>S.label)});if(ct.value===!0&&e.grid!==!0)g.unshift(s("th",{class:"q-table--col-auto-width"}," "));else if(Qe.value===!0){const S=n["header-selection"],y=S!==void 0?S(xe({})):[s(Te,{color:e.color,modelValue:ze.value,dark:u.value,dense:e.dense,"onUpdate:modelValue":Ie})];g.unshift(s("th",{class:"q-table--col-auto-width"},y))}return[s("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},g)]}function xe(t){return Object.assign(t,{cols:Q.value,sort:_e,colsMap:je.value,color:e.color,dark:u.value,dense:e.dense}),Qe.value===!0&&Y(t,"selected",()=>ze.value,Ie),t}function Ie(t){Le.value===!0&&(t=!1),ae(H.value.map(d.value),H.value,t)}const se=f(()=>{const t=[e.iconFirstPage||r.iconSet.table.firstPage,e.iconPrevPage||r.iconSet.table.prevPage,e.iconNextPage||r.iconSet.table.nextPage,e.iconLastPage||r.iconSet.table.lastPage];return r.lang.rtl===!0?t.reverse():t});function xt(){if(e.hideBottom===!0)return;if(St.value===!0){if(e.hideNoData===!0)return;const g=e.loading===!0?e.loadingLabel||r.lang.table.loading:e.filter?e.noResultsLabel||r.lang.table.noResults:e.noDataLabel||r.lang.table.noData,S=n["no-data"],y=S!==void 0?[S({message:g,icon:r.iconSet.table.warning,filter:e.filter})]:[s(Me,{class:"q-table__bottom-nodata-icon",name:r.iconSet.table.warning}),g];return s("div",{class:ge+" q-table__bottom--nodata"},y)}const t=n.bottom;if(t!==void 0)return s("div",{class:ge},[t(X.value)]);const v=e.hideSelectedBanner!==!0&&K.value===!0&&ye.value>0?[s("div",{class:"q-table__control"},[s("div",[(e.selectedRowsLabel||r.lang.table.selectedRecords)(ye.value)])])]:[];if(e.hidePagination!==!0)return s("div",{class:ge+" justify-end"},Rt(v));if(v.length>0)return s("div",{class:ge},v)}function Tt(t){M({page:1,rowsPerPage:t.value})}function Rt(t){let v;const{rowsPerPage:g}=_.value,S=e.paginationLabel||r.lang.table.pagination,y=n.pagination,B=e.rowsPerPageOptions.length>1;if(t.push(s("div",{class:"q-table__separator col"})),B===!0&&t.push(s("div",{class:"q-table__control"},[s("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||r.lang.table.recordsPerPage]),s(Yt,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:g,options:mt.value,displayValue:g===0?r.lang.table.allRows:g,dark:u.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":Tt})])),y!==void 0)v=y(X.value);else if(v=[s("span",g!==0?{class:"q-table__bottom-item"}:{},[g?S(ne.value+1,Math.min(oe.value,ie.value),ie.value):S(1,Ee.value,ie.value)])],g!==0&&re.value>1){const P={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(P.size="sm"),re.value>2&&v.push(s(E,{key:"pgFirst",...P,icon:se.value[0],disable:we.value,onClick:Ce})),v.push(s(E,{key:"pgPrev",...P,icon:se.value[1],disable:we.value,onClick:ke}),s(E,{key:"pgNext",...P,icon:se.value[2],disable:qe.value,onClick:Pe})),re.value>2&&v.push(s(E,{key:"pgLast",...P,icon:se.value[3],disable:qe.value,onClick:pe}))}return t.push(s("div",{class:"q-table__control"},v)),t}function Ot(){const t=e.gridHeader===!0?[s("table",{class:"q-table"},[Ze()])]:e.loading===!0&&n.loading===void 0?Ae():void 0;return s("div",{class:"q-table__middle"},t)}function Vt(){const t=n.item!==void 0?n.item:v=>{const g=v.cols.map(y=>s("div",{class:"q-table__grid-item-row"},[s("div",{class:"q-table__grid-item-title"},[y.label]),s("div",{class:"q-table__grid-item-value"},[y.value])]));if(K.value===!0){const y=n["body-selection"],B=y!==void 0?y(v):[s(Te,{modelValue:v.selected,color:e.color,dark:u.value,dense:e.dense,"onUpdate:modelValue":(P,L)=>{ae([v.key],[v.row],P,L)}})];g.unshift(s("div",{class:"q-table__grid-item-row"},B),s(Ut,{dark:u.value}))}const S={class:["q-table__grid-item-card"+q.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(S.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(S.onClick=y=>{l("RowClick",y,v.row,v.pageIndex)}),e.onRowDblclick!==void 0&&(S.onDblclick=y=>{l("RowDblclick",y,v.row,v.pageIndex)})),s("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(v.selected===!0?" q-table__grid-item--selected":"")},[s("div",S,g)])};return s("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},H.value.map((v,g)=>t(Ue({key:d.value(v),row:v,pageIndex:g}))))}return Object.assign(c.proxy,{requestServerInteraction:V,setPagination:M,firstPage:Ce,prevPage:ke,nextPage:Pe,lastPage:pe,isRowSelected:he,clearSelection:vt,isRowExpanded:T,setExpanded:le,sort:_e,resetVirtualScroll:ht,scrollTo:wt,getCellValue:G}),Ht(c.proxy,{filteredSortedRows:()=>Se.value,computedRows:()=>H.value,computedRowsNumber:()=>ie.value}),()=>{const t=[pt()],v={ref:m,class:k.value};return e.grid===!0?t.push(Ot()):Object.assign(v,{class:[v.class,e.cardClass],style:e.cardStyle}),t.push(_t(),xt()),e.loading===!0&&n.loading!==void 0&&t.push(n.loading()),s("div",v,t)}}});const Dl={key:1},$l=$("div",{class:"text-h5"},"Tasmota ZigBee Bridge",-1),Ml=$("span",null,"Bridge:",-1),Fl={key:0},El=$("div",null,[$("a",{href:"https://tasmota.github.io/docs/Commands/",target:"_blank"}," Tasmota Commands Documentation ")],-1),Ql=Z(" Configure MQTT topic for Zigbee devices, unique device topic based on Zigbee device ShortAddr "),Ll=Z(" SetOption89 must be enabled for this to work! "),jl=Z(" Use friendly name in Zigbee topic "),Nl=Z(" Uses Zigbee device friendly name instead of 16 bits short addresses as JSON key when reporting values and commands "),Al=Z(" Enable MQTT retain flag on TELE message "),Hl={class:"text-left"},Ul=Z(" Home Assistant Discovery topics found for this device "),zl=$("div",{class:"text-h5"},"No Sonoff ZbBridge with Tasmota found!",-1),Zl=$("div",{class:"text-body1"},"Did you configure MQTT on the device?",-1),Il=$("div",{class:"text-body1"}," Wait a moment until all messages have been received. ",-1),ea={__name:"TasmotaZBBridge",setup(e){const n=tl(),l=ll(),c={page:1,rowsPerPage:0};return(r,u)=>(R(),U(el,{padding:""},{default:F(()=>[p(n).isConnected?(R(),z("div",Dl,[$l,$("div",null,[Ml,(R(!0),z(de,null,ve(p(l).zbBridges,a=>(R(),z("span",{key:a.id},[x(It,{modelValue:p(l).selectedZBDevice,"onUpdate:modelValue":u[0]||(u[0]=o=>p(l).selectedZBDevice=o),val:a,label:`${a.dn} [${a.t}]`,onClick:o=>p(l).getZbInfo(a)},null,8,["modelValue","val","label","onClick"]),x(E,{href:`http://${a.ip}`,target:"_blank",onClick:u[1]||(u[1]=Xe(()=>{},["stop"])),flat:"",round:"",icon:"launch"},null,8,["href"])]))),128))]),p(l).selectedZBDevice?(R(),z("div",Fl,[El,$("div",null,[x(fe,{"model-value":p(l).config.SetOption89,"onUpdate:modelValue":u[2]||(u[2]=a=>p(l).publishCmd("SetOption89",a)),label:"SetOption89"},null,8,["model-value"]),Ql,p(l).config.SetOption89?J("",!0):(R(),U(Ye,{key:0,class:"text-white bg-negative"},{default:F(()=>[Ll]),_:1}))]),$("div",null,[x(fe,{"model-value":p(l).config.SetOption112,"onUpdate:modelValue":u[3]||(u[3]=a=>p(l).publishCmd("SetOption112",a)),label:"SetOption112"},null,8,["model-value"]),jl]),$("div",null,[x(fe,{"model-value":p(l).config.SetOption83,"onUpdate:modelValue":u[4]||(u[4]=a=>p(l).publishCmd("SetOption83",a)),label:"SetOption83"},null,8,["model-value"]),Nl]),$("div",null,[x(fe,{"model-value":p(l).config.SensorRetain,"onUpdate:modelValue":u[5]||(u[5]=a=>p(l).publishCmd("SensorRetain",a)),label:"SensorRetain"},null,8,["model-value"]),Al]),x(E,{onClick:u[6]||(u[6]=Xe(a=>p(l).getZbInfo(p(l).selectedZBDevice),["stop"])),label:"Refresh ZbInfo",color:"primary",flat:""}),x(Vl,{class:"q-mt-md",title:"ZigBee Devices",rows:p(l).ZbInfos,"row-key":"Device",pagination:c,flat:"",bordered:""},{header:F(a=>[x(Oe,{props:a},{default:F(()=>[x($e,{"auto-width":""}),(R(!0),z(de,null,ve(a.cols.filter(o=>!["Endpoints","Config"].includes(o.name)),o=>(R(),U($e,{key:o.name,props:a},{default:F(()=>[Z(Re(o.label),1)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"])]),body:F(a=>[x(Oe,{props:a},{default:F(()=>[x(Ve,{"auto-width":""},{default:F(()=>[x(E,{size:"sm",color:"primary",round:"",dense:"",onClick:o=>a.expand=!a.expand,icon:a.expand?"remove":"add"},null,8,["onClick","icon"])]),_:2},1024),(R(!0),z(de,null,ve(a.cols.filter(o=>!["Endpoints","Config"].includes(o.name)),o=>(R(),U(Ve,{key:o.name,props:a},{default:F(()=>[Z(Re(o.value)+" ",1),o.name==="Name"?(R(),U(al,{key:0,"model-value":o.value,"onUpdate:modelValue":d=>p(l).publishCmd("ZbName",`${a.row.Device},${d}`),title:"Set Name",buttons:""},{default:F(d=>[x(Wt,{type:"text",modelValue:d.value,"onUpdate:modelValue":m=>d.value=m,dense:"",autofocus:""},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1032,["model-value","onUpdate:modelValue"])):J("",!0),o.name==="Name"?(R(),U(Me,{key:1,name:"edit"})):J("",!0)]),_:2},1032,["props"]))),128))]),_:2},1032,["props"]),zt(x(Oe,{props:a},{default:F(()=>[x(Ve,{colspan:"100%"},{default:F(()=>{var o;return[$("div",Hl,[Ul,$("ul",null,[(R(!0),z(de,null,ve(p(n).searchTopics((o=a.row.IEEEAddr)==null?void 0:o.toLowerCase()),(d,m)=>(R(),z("li",{key:m},Re(d),1))),128))])])]}),_:2},1024)]),_:2},1032,["props"]),[[Zt,a.expand]])]),_:1},8,["rows"]),x(E,{class:"q-mt-md",color:"primary",label:"generate discovery config for all SNZB-02 sensors (TH01)",onClick:u[7]||(u[7]=a=>p(l).generateHomeAssistantDiscoveryForAllTH01())})])):J("",!0),p(l).zbBridges.length===0?(R(),U(Ye,{key:1,class:"bg-warning text-white"},{default:F(()=>[zl,Zl,Il]),_:1})):J("",!0)])):(R(),U(Jt,{key:0}))]),_:1}))}};export{ea as default};
