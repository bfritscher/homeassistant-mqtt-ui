import{c as ge,ax as Ye,ay as _t,az as Bt,aA as At,ac as Ge,aB as Wt,ad as Je,aC as Xt,a as c,ao as Yt,h as C,Q as Fe,aD as Gt,R as Jt,j as Te,f as ae,u as Zt,k as el,r as E,e as Ot,z as tl,b as Ze,K as ll,L as ul,M as nl,m as al,n as ol,N as il,O as rl,P as sl,l as re,aE as cl,an as dl,aF as fl,aG as St,C as vl,U as ml,o as et,aH as Sl,aI as gl,aJ as hl,aK as yl,p as bl,aL as wl,aM as Cl,q as kl,v as Vl,x as ie,aN as ql,aO as xl,ae as _l,aP as Bl,a5 as Ke,aQ as gt,aR as Me,aS as ht,am as _e,s as Al,aT as Ol,aU as Il,g as Ml,W as yt,Y as bt,Z as Be,_ as oe,aq as je,V as ne,aV as wt,ab as We,a0 as zl,as as Fl,ap as Tl,$ as El,aW as Rl,aX as Pl}from"./index.b5beb44c.js";import{u as pl,v as Ct,a as Ll,b as Hl,c as Dl,d as kt,s as $l,p as Vt,f as Nl,r as Xe}from"./position-engine.3a63de70.js";import{Q as Ql}from"./QBanner.9f9327ea.js";import{u as Kl}from"./homeassistant.afc81340.js";var jl=ge({name:"QField",inheritAttrs:!1,props:Ye,emits:_t,setup(){return Bt(At())}});const Ul={xs:8,sm:10,md:14,lg:20,xl:24};var Wl=ge({name:"QChip",props:{...Ge,...Wt,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:r,emit:n}){const{proxy:{$q:g}}=Te(),h=Je(e,g),l=Xt(e,Ul),O=c(()=>e.selected===!0||e.icon!==void 0),y=c(()=>e.selected===!0?e.iconSelected||g.iconSet.chip.selected:e.icon),q=c(()=>e.iconRemove||g.iconSet.chip.remove),I=c(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),s=c(()=>{const x=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(x?` text-${x} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(I.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(h.value===!0?" q-chip--dark q-dark":"")}),k=c(()=>e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0});function B(x){x.keyCode===13&&w(x)}function w(x){e.disable||(n("update:selected",!e.selected),n("click",x))}function T(x){(x.keyCode===void 0||x.keyCode===13)&&(ae(x),e.disable===!1&&(n("update:modelValue",!1),n("remove")))}function P(){const x=[];I.value===!0&&x.push(C("div",{class:"q-focus-helper"})),O.value===!0&&x.push(C(Fe,{class:"q-chip__icon q-chip__icon--left",name:y.value}));const $=e.label!==void 0?[C("div",{class:"ellipsis"},[e.label])]:void 0;return x.push(C("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},Gt(r.default,$))),e.iconRight&&x.push(C(Fe,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&x.push(C(Fe,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:q.value,...k.value,onClick:T,onKeyup:T})),x}return()=>{if(e.modelValue===!1)return;const x={class:s.value,style:l.value};return I.value===!0&&Object.assign(x,k.value,{onClick:w,onKeyup:B}),Yt("div",x,P(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[Jt,e.ripple]])}}}),Xl=ge({name:"QItem",props:{...Ge,...Zt,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:r,emit:n}){const{proxy:{$q:g}}=Te(),h=Je(e,g),{hasRouterLink:l,hasLink:O,linkProps:y,linkClass:q,linkTag:I,navigateToRouterLink:s}=el(),k=E(null),B=E(null),w=c(()=>e.clickable===!0||O.value===!0||e.tag==="label"),T=c(()=>e.disable!==!0&&w.value===!0),P=c(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(h.value===!0?" q-item--dark":"")+(O.value===!0&&e.active===null?q.value:e.active===!0?`${e.activeClass!==void 0?` ${e.activeClass}`:""} q-item--active`:"")+(e.disable===!0?" disabled":"")+(T.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),x=c(()=>{if(e.insetLevel===void 0)return null;const b=g.lang.rtl===!0?"Right":"Left";return{["padding"+b]:16+e.insetLevel*56+"px"}});function $(b){T.value===!0&&(B.value!==null&&(b.qKeyEvent!==!0&&document.activeElement===k.value?B.value.focus():document.activeElement===B.value&&k.value.focus()),l.value===!0&&s(b),n("click",b))}function L(b){if(T.value===!0&&Ot(b,13)===!0){ae(b),b.qKeyEvent=!0;const z=new MouseEvent("click",b);z.qKeyEvent=!0,k.value.dispatchEvent(z)}n("keyup",b)}function Q(){const b=tl(r.default,[]);return T.value===!0&&b.unshift(C("div",{class:"q-focus-helper",tabindex:-1,ref:B})),b}return()=>{const b={ref:k,class:P.value,style:x.value,onClick:$,onKeyup:L};return T.value===!0?(b.tabindex=e.tabindex||"0",Object.assign(b,y.value)):w.value===!0&&(b["aria-disabled"]="true"),C(I.value,b,Q())}}}),Yl=ge({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:r}){const n=c(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>C("div",{class:n.value},Ze(r.default))}}),Gl=ge({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:r}){const n=c(()=>parseInt(e.lines,10)),g=c(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(n.value===1?" ellipsis":"")),h=c(()=>e.lines!==void 0&&n.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":n.value}:null);return()=>C("div",{style:h.value,class:g.value},Ze(r.default))}}),Jl=ge({name:"QMenu",inheritAttrs:!1,props:{...pl,...ll,...Ge,...ul,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:Ct},self:{type:String,validator:Ct},offset:{type:Array,validator:Ll},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...nl,"click","escape-key"],setup(e,{slots:r,emit:n,attrs:g}){let h=null,l,O,y;const q=Te(),{proxy:I}=q,{$q:s}=I,k=E(null),B=E(!1),w=c(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),T=Je(e,s),{registerTick:P,removeTick:x}=al(),{registerTimeout:$,removeTimeout:L}=ol(),{transition:Q,transitionStyle:b}=il(e,B),{localScrollTarget:z,changeScrollEvent:X,unconfigureScrollTarget:se}=Hl(e,M),{anchorEl:K,canShow:ce}=Dl({showing:B}),{hide:J}=rl({showing:B,canShow:ce,handleShow:a,handleHide:d,hideOnRouteChange:w,processOnMount:!0}),{showPortal:j,hidePortal:te,renderPortal:de}=sl(q,k,V),le={anchorEl:K,innerRef:k,onClickOutside(f){if(e.persistent!==!0&&B.value===!0)return J(f),(f.type==="touchstart"||f.target.classList.contains("q-dialog__backdrop"))&&ae(f),!0}},Z=c(()=>Vt(e.anchor||(e.cover===!0?"center middle":"bottom start"),s.lang.rtl)),ee=c(()=>e.cover===!0?Z.value:Vt(e.self||"top start",s.lang.rtl)),he=c(()=>(e.square===!0?" q-menu--square":"")+(T.value===!0?" q-menu--dark q-dark":"")),fe=c(()=>e.autoClose===!0?{onClick:H}:{}),ue=c(()=>B.value===!0&&e.persistent!==!0);re(ue,f=>{f===!0?(hl(S),Nl(le)):(St(S),kt(le))});function o(){Sl(()=>{let f=k.value;f&&f.contains(document.activeElement)!==!0&&(f=f.querySelector("[autofocus], [data-autofocus]")||f,f.focus({preventScroll:!0}))})}function a(f){if(x(),L(),h=e.noRefocus===!1?document.activeElement:null,cl(_),j(),M(),l=void 0,f!==void 0&&(e.touchPosition||e.contextMenu)){const Y=dl(f);if(Y.left!==void 0){const{top:ve,left:U}=K.value.getBoundingClientRect();l={left:Y.left-U,top:Y.top-ve}}}O===void 0&&(O=re(()=>s.screen.width+"|"+s.screen.height+"|"+e.self+"|"+e.anchor+"|"+s.lang.rtl,R)),e.noFocus!==!0&&document.activeElement.blur(),P(()=>{R(),e.noFocus!==!0&&o()}),$(()=>{s.platform.is.ios===!0&&(y=e.autoClose,k.value.click()),R(),j(!0),n("show",f)},e.transitionDuration)}function d(f){x(),L(),te(),m(!0),h!==null&&(f===void 0||f.qClickOutside!==!0)&&(h.focus(),h=null),$(()=>{te(!0),n("hide",f)},e.transitionDuration)}function m(f){l=void 0,O!==void 0&&(O(),O=void 0),(f===!0||B.value===!0)&&(fl(_),se(),kt(le),St(S)),f!==!0&&(h=null)}function M(){(K.value!==null||e.scrollTarget!==void 0)&&(z.value=vl(K.value,e.scrollTarget),X(z.value,R))}function H(f){y!==!0?(gl(I,f),n("click",f)):y=!1}function _(f){ue.value===!0&&e.noFocus!==!0&&yl(k.value,f.target)!==!0&&o()}function S(f){n("escape-key"),J(f)}function R(){const f=k.value;f===null||K.value===null||$l({el:f,offset:e.offset,anchorEl:K.value,anchorOrigin:Z.value,selfOrigin:ee.value,absoluteOffset:l,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function V(){return C(ml,{name:Q.value,appear:!0},()=>B.value===!0?C("div",{...g,ref:k,tabindex:-1,class:["q-menu q-position-engine scroll"+he.value,g.class],style:[g.style,b.value],...fe.value},Ze(r.default)):null)}return et(m),Object.assign(I,{focus:o,updatePosition:R}),de}});const G=1e3,Zl=["start","center","end","start-force","center-force","end-force"],It=Array.prototype.filter,eu=window.getComputedStyle(document.body).overflowAnchor===void 0?bl:function(e,r){e!==null&&(cancelAnimationFrame(e._qOverflowAnimationFrame),e._qOverflowAnimationFrame=requestAnimationFrame(()=>{if(e===null)return;const n=e.children||[];It.call(n,h=>h.dataset&&h.dataset.qVsAnchor!==void 0).forEach(h=>{delete h.dataset.qVsAnchor});const g=n[r];g&&g.dataset&&(g.dataset.qVsAnchor="")}))};function Ae(e,r){return e+r}function Ue(e,r,n,g,h,l,O,y){const q=e===window?document.scrollingElement||document.documentElement:e,I=h===!0?"offsetWidth":"offsetHeight",s={scrollStart:0,scrollViewSize:-O-y,scrollMaxSize:0,offsetStart:-O,offsetEnd:-y};if(h===!0?(e===window?(s.scrollStart=window.pageXOffset||window.scrollX||document.body.scrollLeft||0,s.scrollViewSize+=document.documentElement.clientWidth):(s.scrollStart=q.scrollLeft,s.scrollViewSize+=q.clientWidth),s.scrollMaxSize=q.scrollWidth,l===!0&&(s.scrollStart=(Xe===!0?s.scrollMaxSize-s.scrollViewSize:0)-s.scrollStart)):(e===window?(s.scrollStart=window.pageYOffset||window.scrollY||document.body.scrollTop||0,s.scrollViewSize+=document.documentElement.clientHeight):(s.scrollStart=q.scrollTop,s.scrollViewSize+=q.clientHeight),s.scrollMaxSize=q.scrollHeight),n!==null)for(let k=n.previousElementSibling;k!==null;k=k.previousElementSibling)k.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetStart+=k[I]);if(g!==null)for(let k=g.nextElementSibling;k!==null;k=k.nextElementSibling)k.classList.contains("q-virtual-scroll--skip")===!1&&(s.offsetEnd+=k[I]);if(r!==e){const k=q.getBoundingClientRect(),B=r.getBoundingClientRect();h===!0?(s.offsetStart+=B.left-k.left,s.offsetEnd-=B.width):(s.offsetStart+=B.top-k.top,s.offsetEnd-=B.height),e!==window&&(s.offsetStart+=s.scrollStart),s.offsetEnd+=s.scrollMaxSize-s.offsetStart}return s}function qt(e,r,n,g){r==="end"&&(r=(e===window?document.body:e)[n===!0?"scrollWidth":"scrollHeight"]),e===window?n===!0?(g===!0&&(r=(Xe===!0?document.body.scrollWidth-document.documentElement.clientWidth:0)-r),window.scrollTo(r,window.pageYOffset||window.scrollY||document.body.scrollTop||0)):window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,r):n===!0?(g===!0&&(r=(Xe===!0?e.scrollWidth-e.offsetWidth:0)-r),e.scrollLeft=r):e.scrollTop=r}function ze(e,r,n,g){if(n>=g)return 0;const h=r.length,l=Math.floor(n/G),O=Math.floor((g-1)/G)+1;let y=e.slice(l,O).reduce(Ae,0);return n%G!==0&&(y-=r.slice(l*G,n).reduce(Ae,0)),g%G!==0&&g!==h&&(y-=r.slice(g,O*G).reduce(Ae,0)),y}const Mt={virtualScrollSliceSize:{type:[Number,String],default:null},virtualScrollSliceRatioBefore:{type:[Number,String],default:1},virtualScrollSliceRatioAfter:{type:[Number,String],default:1},virtualScrollItemSize:{type:[Number,String],default:24},virtualScrollStickySizeStart:{type:[Number,String],default:0},virtualScrollStickySizeEnd:{type:[Number,String],default:0},tableColspan:[Number,String]},fu=Object.keys(Mt),tu={virtualScrollHorizontal:Boolean,onVirtualScroll:Function,...Mt};function lu({virtualScrollLength:e,getVirtualScrollTarget:r,getVirtualScrollEl:n,virtualScrollItemSizeComputed:g}){const h=Te(),{props:l,emit:O,proxy:y}=h,{$q:q}=y;let I,s,k,B=[],w;const T=E(0),P=E(0),x=E({}),$=E(null),L=E(null),Q=E(null),b=E({from:0,to:0}),z=c(()=>l.tableColspan!==void 0?l.tableColspan:100);g===void 0&&(g=c(()=>l.virtualScrollItemSize));const X=c(()=>g.value+";"+l.virtualScrollHorizontal),se=c(()=>X.value+";"+l.virtualScrollSliceRatioBefore+";"+l.virtualScrollSliceRatioAfter);re(se,()=>{ee()}),re(X,K);function K(){Z(s,!0)}function ce(a){Z(a===void 0?s:a)}function J(a,d){const m=r();if(m==null||m.nodeType===8)return;const M=Ue(m,n(),$.value,L.value,l.virtualScrollHorizontal,q.lang.rtl,l.virtualScrollStickySizeStart,l.virtualScrollStickySizeEnd);k!==M.scrollViewSize&&ee(M.scrollViewSize),te(m,M,Math.min(e.value-1,Math.max(0,parseInt(a,10)||0)),0,Zl.indexOf(d)>-1?d:s>-1&&a>s?"end":"start")}function j(){const a=r();if(a==null||a.nodeType===8)return;const d=Ue(a,n(),$.value,L.value,l.virtualScrollHorizontal,q.lang.rtl,l.virtualScrollStickySizeStart,l.virtualScrollStickySizeEnd),m=e.value-1,M=d.scrollMaxSize-d.offsetStart-d.offsetEnd-P.value;if(I===d.scrollStart)return;if(d.scrollMaxSize<=0){te(a,d,0,0);return}k!==d.scrollViewSize&&ee(d.scrollViewSize),de(b.value.from);const H=Math.floor(d.scrollMaxSize-Math.max(d.scrollViewSize,d.offsetEnd)-Math.min(w[m],d.scrollViewSize/2));if(H>0&&Math.ceil(d.scrollStart)>=H){te(a,d,m,d.scrollMaxSize-d.offsetEnd-B.reduce(Ae,0));return}let _=0,S=d.scrollStart-d.offsetStart,R=S;if(S<=M&&S+d.scrollViewSize>=T.value)S-=T.value,_=b.value.from,R=S;else for(let V=0;S>=B[V]&&_<m;V++)S-=B[V],_+=G;for(;S>0&&_<m;)S-=w[_],S>-d.scrollViewSize?(_++,R=S):R=w[_]+S;te(a,d,_,R)}function te(a,d,m,M,H){const _=typeof H=="string"&&H.indexOf("-force")>-1,S=_===!0?H.replace("-force",""):H,R=S!==void 0?S:"start";let V=Math.max(0,m-x.value[R]),f=V+x.value.total;f>e.value&&(f=e.value,V=Math.max(0,f-x.value.total)),I=d.scrollStart;const Y=V!==b.value.from||f!==b.value.to;if(Y===!1&&S===void 0){fe(m);return}const{activeElement:ve}=document,U=Q.value;Y===!0&&U!==null&&U!==ve&&U.contains(ve)===!0&&(U.addEventListener("focusout",le),setTimeout(()=>{U!==null&&U.removeEventListener("focusout",le)})),eu(U,m-V);const Ee=S!==void 0?w.slice(V,m).reduce(Ae,0):0;if(Y===!0){const ye=f>=b.value.from&&V<=b.value.to?b.value.to:f;b.value={from:V,to:ye},T.value=ze(B,w,0,V),P.value=ze(B,w,f,e.value),requestAnimationFrame(()=>{b.value.to!==f&&I===d.scrollStart&&(b.value={from:b.value.from,to:f},P.value=ze(B,w,f,e.value))})}requestAnimationFrame(()=>{if(I!==d.scrollStart)return;Y===!0&&de(V);const ye=w.slice(V,m).reduce(Ae,0),be=ye+d.offsetStart+T.value,Re=be+w[m];let Oe=be+M;if(S!==void 0){const W=ye-Ee,D=d.scrollStart+W;Oe=_!==!0&&D<be&&Re<D+d.scrollViewSize?D:S==="end"?Re-d.scrollViewSize:be-(S==="start"?0:Math.round((d.scrollViewSize-w[m])/2))}I=Oe,qt(a,Oe,l.virtualScrollHorizontal,q.lang.rtl),fe(m)})}function de(a){const d=Q.value;if(d){const m=It.call(d.children,V=>V.classList&&V.classList.contains("q-virtual-scroll--skip")===!1),M=m.length,H=l.virtualScrollHorizontal===!0?V=>V.getBoundingClientRect().width:V=>V.offsetHeight;let _=a,S,R;for(let V=0;V<M;){for(S=H(m[V]),V++;V<M&&m[V].classList.contains("q-virtual-scroll--with-prev")===!0;)S+=H(m[V]),V++;R=S-w[_],R!==0&&(w[_]+=R,B[Math.floor(_/G)]+=R),_++}}}function le(){Q.value!==null&&Q.value!==void 0&&Q.value.focus()}function Z(a,d){const m=1*g.value;(d===!0||Array.isArray(w)===!1)&&(w=[]);const M=w.length;w.length=e.value;for(let _=e.value-1;_>=M;_--)w[_]=m;const H=Math.floor((e.value-1)/G);B=[];for(let _=0;_<=H;_++){let S=0;const R=Math.min((_+1)*G,e.value);for(let V=_*G;V<R;V++)S+=w[V];B.push(S)}s=-1,I=void 0,T.value=ze(B,w,0,b.value.from),P.value=ze(B,w,b.value.to,e.value),a>=0?(de(b.value.from),ie(()=>{J(a)})):ue()}function ee(a){if(a===void 0&&typeof window!="undefined"){const S=r();S!=null&&S.nodeType!==8&&(a=Ue(S,n(),$.value,L.value,l.virtualScrollHorizontal,q.lang.rtl,l.virtualScrollStickySizeStart,l.virtualScrollStickySizeEnd).scrollViewSize)}k=a;const d=parseFloat(l.virtualScrollSliceRatioBefore)||0,m=parseFloat(l.virtualScrollSliceRatioAfter)||0,M=1+d+m,H=a===void 0||a<=0?1:Math.ceil(a/g.value),_=Math.max(1,H,Math.ceil((l.virtualScrollSliceSize>0?l.virtualScrollSliceSize:10)/M));x.value={total:Math.ceil(_*M),start:Math.ceil(_*d),center:Math.ceil(_*(.5+d)),end:Math.ceil(_*(1+d)),view:H}}function he(a,d){const m=l.virtualScrollHorizontal===!0?"width":"height",M={["--q-virtual-scroll-item-"+m]:g.value+"px"};return[a==="tbody"?C(a,{class:"q-virtual-scroll__padding",key:"before",ref:$},[C("tr",[C("td",{style:{[m]:`${T.value}px`,...M},colspan:z.value})])]):C(a,{class:"q-virtual-scroll__padding",key:"before",ref:$,style:{[m]:`${T.value}px`,...M}}),C(a,{class:"q-virtual-scroll__content",key:"content",ref:Q,tabindex:-1},d.flat()),a==="tbody"?C(a,{class:"q-virtual-scroll__padding",key:"after",ref:L},[C("tr",[C("td",{style:{[m]:`${P.value}px`,...M},colspan:z.value})])]):C(a,{class:"q-virtual-scroll__padding",key:"after",ref:L,style:{[m]:`${P.value}px`,...M}})]}function fe(a){s!==a&&(l.onVirtualScroll!==void 0&&O("virtual-scroll",{index:a,from:b.value.from,to:b.value.to-1,direction:a<s?"decrease":"increase",ref:y}),s=a)}ee();const ue=wl(j,q.platform.is.ios===!0?120:35);Cl(()=>{ee()});let o=!1;return kl(()=>{o=!0}),Vl(()=>{if(o!==!0)return;const a=r();I!==void 0&&a!==void 0&&a!==null&&a.nodeType!==8?qt(a,I,l.virtualScrollHorizontal,q.lang.rtl):J(s)}),et(()=>{ue.cancel()}),Object.assign(y,{scrollTo:J,reset:K,refresh:ce}),{virtualScrollSliceRange:b,virtualScrollSliceSizeComputed:x,setVirtualScrollSize:ee,onVirtualScrollEvt:ue,localResetVirtualScroll:Z,padVirtualScroll:he,scrollTo:J,reset:K,refresh:ce}}const xt=e=>["add","add-unique","toggle"].includes(e),uu=".*+?^${}()|[]\\",nu=Object.keys(Ye);var vu=ge({name:"QSelect",inheritAttrs:!1,props:{...tu,...ql,...Ye,modelValue:{required:!0},multiple:Boolean,displayValue:[String,Number],displayValueHtml:Boolean,dropdownIcon:String,options:{type:Array,default:()=>[]},optionValue:[Function,String],optionLabel:[Function,String],optionDisable:[Function,String],hideSelected:Boolean,hideDropdownIcon:Boolean,fillInput:Boolean,maxValues:[Number,String],optionsDense:Boolean,optionsDark:{type:Boolean,default:null},optionsSelectedClass:String,optionsHtml:Boolean,optionsCover:Boolean,menuShrink:Boolean,menuAnchor:String,menuSelf:String,menuOffset:Array,popupContentClass:String,popupContentStyle:[String,Array,Object],useInput:Boolean,useChips:Boolean,newValueMode:{type:String,validator:xt},mapOptions:Boolean,emitValue:Boolean,inputDebounce:{type:[Number,String],default:500},inputClass:[Array,String,Object],inputStyle:[Array,String,Object],tabindex:{type:[String,Number],default:0},autocomplete:String,transitionShow:String,transitionHide:String,transitionDuration:[String,Number],behavior:{type:String,validator:e=>["default","menu","dialog"].includes(e),default:"default"},virtualScrollItemSize:{type:[Number,String],default:void 0},onNewValue:Function,onFilter:Function},emits:[..._t,"add","remove","input-value","new-value","keyup","keypress","keydown","filter-abort"],setup(e,{slots:r,emit:n}){const{proxy:g}=Te(),{$q:h}=g,l=E(!1),O=E(!1),y=E(-1),q=E(""),I=E(!1),s=E(!1);let k,B,w,T,P,x,$,L,Q;const b=E(null),z=E(null),X=E(null),se=E(null),K=E(null),ce=xl(e),J=Il(ct),j=c(()=>Array.isArray(e.options)?e.options.length:0),te=c(()=>e.virtualScrollItemSize===void 0?e.optionsDense===!0?24:48:e.virtualScrollItemSize),{virtualScrollSliceRange:de,virtualScrollSliceSizeComputed:le,localResetVirtualScroll:Z,padVirtualScroll:ee,onVirtualScrollEvt:he,scrollTo:fe,setVirtualScrollSize:ue}=lu({virtualScrollLength:j,getVirtualScrollTarget:Et,getVirtualScrollEl:rt,virtualScrollItemSizeComputed:te}),o=At(),a=c(()=>{const t=e.mapOptions===!0&&e.multiple!==!0,i=e.modelValue!==void 0&&(e.modelValue!==null||t===!0)?e.multiple===!0&&Array.isArray(e.modelValue)?e.modelValue:[e.modelValue]:[];if(e.mapOptions===!0&&Array.isArray(e.options)===!0){const u=e.mapOptions===!0&&B!==void 0?B:[],v=i.map(F=>Tt(F,u));return e.modelValue===null&&t===!0?v.filter(F=>F!==null):v}return i}),d=c(()=>{const t={};return nu.forEach(i=>{const u=e[i];u!==void 0&&(t[i]=u)}),t}),m=c(()=>e.optionsDark===null?o.isDark.value:e.optionsDark),M=c(()=>gt(a.value)),H=c(()=>{let t="q-field__input q-placeholder col";return e.hideSelected===!0||a.value.length===0?[t,e.inputClass]:(t+=" q-field__input--padding",e.inputClass===void 0?t:[t,e.inputClass])}),_=c(()=>(e.virtualScrollHorizontal===!0?"q-virtual-scroll--horizontal":"")+(e.popupContentClass?" "+e.popupContentClass:"")),S=c(()=>j.value===0),R=c(()=>a.value.map(t=>D.value(t)).join(", ")),V=c(()=>e.optionsHtml===!0?()=>!0:t=>t!=null&&t.html===!0),f=c(()=>e.displayValueHtml===!0||e.displayValue===void 0&&(e.optionsHtml===!0||a.value.some(V.value))),Y=c(()=>o.focused.value===!0?e.tabindex:-1),ve=c(()=>{const t={tabindex:e.tabindex,role:"combobox","aria-label":e.label,"aria-autocomplete":e.useInput===!0?"list":"none","aria-expanded":l.value===!0?"true":"false","aria-owns":`${o.targetUid.value}_lb`,"aria-controls":`${o.targetUid.value}_lb`};return y.value>=0&&(t["aria-activedescendant"]=`${o.targetUid.value}_${y.value}`),t}),U=c(()=>{const t={id:`${o.targetUid.value}_lb`,role:"listbox","aria-multiselectable":e.multiple===!0?"true":"false"};return y.value>=0&&(t["aria-activedescendant"]=`${o.targetUid.value}_${y.value}`),t}),Ee=c(()=>a.value.map((t,i)=>({index:i,opt:t,html:V.value(t),selected:!0,removeAtIndex:Ft,toggleOption:me,tabindex:Y.value}))),ye=c(()=>{if(j.value===0)return[];const{from:t,to:i}=de.value;return e.options.slice(t,i).map((u,v)=>{const F=we.value(u)===!0,A=t+v,p={clickable:!0,active:!1,activeClass:Oe.value,manualFocus:!0,focused:!1,disable:F,tabindex:-1,dense:e.optionsDense,dark:m.value,role:"option",id:`${o.targetUid.value}_${A}`,onClick:()=>{me(u)}};return F!==!0&&($e(u)===!0&&(p.active=!0),y.value===A&&(p.focused=!0),p["aria-selected"]=p.active===!0?"true":"false",h.platform.is.desktop===!0&&(p.onMousemove=()=>{l.value===!0&&Ce(A)})),{index:A,opt:u,html:V.value(u),label:D.value(u),selected:p.active,focused:p.focused,toggleOption:me,setOptionIndex:Ce,itemProps:p}})}),be=c(()=>e.dropdownIcon!==void 0?e.dropdownIcon:h.iconSet.arrow.dropdown),Re=c(()=>e.optionsCover===!1&&e.outlined!==!0&&e.standout!==!0&&e.borderless!==!0&&e.rounded!==!0),Oe=c(()=>e.optionsSelectedClass!==void 0?e.optionsSelectedClass:e.color!==void 0?`text-${e.color}`:""),W=c(()=>De(e.optionValue,"value")),D=c(()=>De(e.optionLabel,"label")),we=c(()=>De(e.optionDisable,"disable")),Pe=c(()=>a.value.map(t=>W.value(t))),zt=c(()=>{const t={onInput:ct,onChange:J,onKeydown:it,onKeyup:at,onKeypress:ot,onFocus:ut,onClick(i){w===!0&&_e(i)}};return t.onCompositionstart=t.onCompositionupdate=t.onCompositionend=J,t});re(a,t=>{B=t,e.useInput===!0&&e.fillInput===!0&&e.multiple!==!0&&o.innerLoading.value!==!0&&(O.value!==!0&&l.value!==!0||M.value!==!0)&&(T!==!0&&xe(),(O.value===!0||l.value===!0)&&ke(""))},{immediate:!0}),re(()=>e.fillInput,xe),re(l,Ne),re(j,Ut);function tt(t){return e.emitValue===!0?W.value(t):t}function He(t){if(t>-1&&t<a.value.length)if(e.multiple===!0){const i=e.modelValue.slice();n("remove",{index:t,value:i.splice(t,1)[0]}),n("update:modelValue",i)}else n("update:modelValue",null)}function Ft(t){He(t),o.focus()}function lt(t,i){const u=tt(t);if(e.multiple!==!0){e.fillInput===!0&&Ie(D.value(t),!0,!0),n("update:modelValue",u);return}if(a.value.length===0){n("add",{index:0,value:u}),n("update:modelValue",e.multiple===!0?[u]:u);return}if(i===!0&&$e(t)===!0||e.maxValues!==void 0&&e.modelValue.length>=e.maxValues)return;const v=e.modelValue.slice();n("add",{index:v.length,value:u}),v.push(u),n("update:modelValue",v)}function me(t,i){if(o.editable.value!==!0||t===void 0||we.value(t)===!0)return;const u=W.value(t);if(e.multiple!==!0){i!==!0&&(Ie(e.fillInput===!0?D.value(t):"",!0,!0),Se()),z.value!==null&&z.value.focus(),(a.value.length===0||Me(W.value(a.value[0]),u)!==!0)&&n("update:modelValue",e.emitValue===!0?u:t);return}if((w!==!0||I.value===!0)&&o.focus(),ut(),a.value.length===0){const A=e.emitValue===!0?u:t;n("add",{index:0,value:A}),n("update:modelValue",e.multiple===!0?[A]:A);return}const v=e.modelValue.slice(),F=Pe.value.findIndex(A=>Me(A,u));if(F>-1)n("remove",{index:F,value:v.splice(F,1)[0]});else{if(e.maxValues!==void 0&&v.length>=e.maxValues)return;const A=e.emitValue===!0?u:t;n("add",{index:v.length,value:A}),v.push(A)}n("update:modelValue",v)}function Ce(t){if(h.platform.is.desktop!==!0)return;const i=t>-1&&t<j.value?t:-1;y.value!==i&&(y.value=i)}function pe(t=1,i){if(l.value===!0){let u=y.value;do u=ht(u+t,-1,j.value-1);while(u!==-1&&u!==y.value&&we.value(e.options[u])===!0);y.value!==u&&(Ce(u),fe(u),i!==!0&&e.useInput===!0&&e.fillInput===!0&&Le(u>=0?D.value(e.options[u]):x))}}function Tt(t,i){const u=v=>Me(W.value(v),t);return e.options.find(u)||i.find(u)||t}function De(t,i){const u=t!==void 0?t:i;return typeof u=="function"?u:v=>v!==null&&typeof v=="object"&&u in v?v[u]:v}function $e(t){const i=W.value(t);return Pe.value.find(u=>Me(u,i))!==void 0}function ut(t){e.useInput===!0&&z.value!==null&&(t===void 0||z.value===t.target&&t.target.value===R.value)&&z.value.select()}function nt(t){Ot(t,27)===!0&&l.value===!0&&(_e(t),Se(),xe()),n("keyup",t)}function at(t){const{value:i}=t.target;if(t.keyCode!==void 0){nt(t);return}if(t.target.value="",clearTimeout(k),xe(),typeof i=="string"&&i.length>0){const u=i.toLocaleLowerCase(),v=A=>{const p=e.options.find(N=>A.value(N).toLocaleLowerCase()===u);return p===void 0?!1:(a.value.indexOf(p)===-1?me(p):Se(),!0)},F=A=>{v(W)!==!0&&(v(D)===!0||A===!0||ke(i,!0,()=>F(!0)))};F()}else o.clearValue(t)}function ot(t){n("keypress",t)}function it(t){if(n("keydown",t),Al(t)===!0)return;const i=q.value.length>0&&(e.newValueMode!==void 0||e.onNewValue!==void 0),u=t.shiftKey!==!0&&e.multiple!==!0&&(y.value>-1||i===!0);if(t.keyCode===27){Ke(t);return}if(t.keyCode===9&&u===!1){Ve();return}if(t.target===void 0||t.target.id!==o.targetUid.value)return;if(t.keyCode===40&&o.innerLoading.value!==!0&&l.value===!1){ae(t),qe();return}if(t.keyCode===8&&e.hideSelected!==!0&&q.value.length===0){e.multiple===!0&&Array.isArray(e.modelValue)===!0?He(e.modelValue.length-1):e.multiple!==!0&&e.modelValue!==null&&n("update:modelValue",null);return}(t.keyCode===35||t.keyCode===36)&&(typeof q.value!="string"||q.value.length===0)&&(ae(t),y.value=-1,pe(t.keyCode===36?1:-1,e.multiple)),(t.keyCode===33||t.keyCode===34)&&le.value!==void 0&&(ae(t),y.value=Math.max(-1,Math.min(j.value,y.value+(t.keyCode===33?-1:1)*le.value.view)),pe(t.keyCode===33?1:-1,e.multiple)),(t.keyCode===38||t.keyCode===40)&&(ae(t),pe(t.keyCode===38?-1:1,e.multiple));const v=j.value;if((L===void 0||Q<Date.now())&&(L=""),v>0&&e.useInput!==!0&&t.key!==void 0&&t.key.length===1&&t.altKey===t.ctrlKey&&(t.keyCode!==32||L.length>0)){l.value!==!0&&qe(t);const F=t.key.toLocaleLowerCase(),A=L.length===1&&L[0]===F;Q=Date.now()+1500,A===!1&&(ae(t),L+=F);const p=new RegExp("^"+L.split("").map(Qe=>uu.indexOf(Qe)>-1?"\\"+Qe:Qe).join(".*"),"i");let N=y.value;if(A===!0||N<0||p.test(D.value(e.options[N]))!==!0)do N=ht(N+1,-1,v-1);while(N!==y.value&&(we.value(e.options[N])===!0||p.test(D.value(e.options[N]))!==!0));y.value!==N&&ie(()=>{Ce(N),fe(N),N>=0&&e.useInput===!0&&e.fillInput===!0&&Le(D.value(e.options[N]))});return}if(!(t.keyCode!==13&&(t.keyCode!==32||e.useInput===!0||L!=="")&&(t.keyCode!==9||u===!1))){if(t.keyCode!==9&&ae(t),y.value>-1&&y.value<v){me(e.options[y.value]);return}if(i===!0){const F=(A,p)=>{if(p){if(xt(p)!==!0)return}else p=e.newValueMode;if(A==null)return;Ie("",e.multiple!==!0,!0),(p==="toggle"?me:lt)(A,p==="add-unique"),e.multiple!==!0&&(z.value!==null&&z.value.focus(),Se())};if(e.onNewValue!==void 0?n("new-value",q.value,F):F(q.value),e.multiple!==!0)return}l.value===!0?Ve():o.innerLoading.value!==!0&&qe()}}function rt(){return w===!0?K.value:X.value!==null&&X.value.__qPortalInnerRef.value!==null?X.value.__qPortalInnerRef.value:void 0}function Et(){return rt()}function Rt(){return e.hideSelected===!0?[]:r["selected-item"]!==void 0?Ee.value.map(t=>r["selected-item"](t)).slice():r.selected!==void 0?[].concat(r.selected()):e.useChips===!0?Ee.value.map((t,i)=>C(Wl,{key:"option-"+i,removable:o.editable.value===!0&&we.value(t.opt)!==!0,dense:!0,textColor:e.color,tabindex:Y.value,onRemove(){t.removeAtIndex(i)}},()=>C("span",{class:"ellipsis",[t.html===!0?"innerHTML":"textContent"]:D.value(t.opt)}))):[C("span",{[f.value===!0?"innerHTML":"textContent"]:e.displayValue!==void 0?e.displayValue:R.value})]}function st(){if(S.value===!0)return r["no-option"]!==void 0?r["no-option"]({inputValue:q.value}):void 0;const t=r.option!==void 0?r.option:u=>C(Xl,{key:u.index,...u.itemProps},()=>C(Yl,()=>C(Gl,()=>C("span",{[u.html===!0?"innerHTML":"textContent"]:u.label}))));let i=ee("div",ye.value.map(t));return r["before-options"]!==void 0&&(i=r["before-options"]().concat(i)),Ml(r["after-options"],i)}function Pt(t,i){const u=i===!0?{...ve.value,...o.splitAttrs.attributes.value}:void 0,v={ref:i===!0?z:void 0,key:"i_t",class:H.value,style:e.inputStyle,value:q.value!==void 0?q.value:"",type:"search",...u,id:i===!0?o.targetUid.value:void 0,maxlength:e.maxlength,autocomplete:e.autocomplete,"data-autofocus":t!==!0&&e.autofocus===!0||void 0,disabled:e.disable===!0,readonly:e.readonly===!0,...zt.value};return t!==!0&&w===!0&&(Array.isArray(v.class)===!0?v.class=[...v.class,"no-pointer-events"]:v.class+=" no-pointer-events"),C("input",v)}function ct(t){clearTimeout(k),!(t&&t.target&&t.target.qComposing===!0)&&(Le(t.target.value||""),T=!0,x=q.value,o.focused.value!==!0&&(w!==!0||I.value===!0)&&o.focus(),e.onFilter!==void 0&&(k=setTimeout(()=>{ke(q.value)},e.inputDebounce)))}function Le(t){q.value!==t&&(q.value=t,n("input-value",t))}function Ie(t,i,u){T=u!==!0,e.useInput===!0&&(Le(t),(i===!0||u!==!0)&&(x=t),i!==!0&&ke(t))}function ke(t,i,u){if(e.onFilter===void 0||i!==!0&&o.focused.value!==!0)return;o.innerLoading.value===!0?n("filter-abort"):(o.innerLoading.value=!0,s.value=!0),t!==""&&e.multiple!==!0&&a.value.length>0&&T!==!0&&t===D.value(a.value[0])&&(t="");const v=setTimeout(()=>{l.value===!0&&(l.value=!1)},10);clearTimeout(P),P=v,n("filter",t,(F,A)=>{(i===!0||o.focused.value===!0)&&P===v&&(clearTimeout(P),typeof F=="function"&&F(),s.value=!1,ie(()=>{o.innerLoading.value=!1,o.editable.value===!0&&(i===!0?l.value===!0&&Se():l.value===!0?Ne(!0):l.value=!0),typeof A=="function"&&ie(()=>{A(g)}),typeof u=="function"&&ie(()=>{u(g)})}))},()=>{o.focused.value===!0&&P===v&&(clearTimeout(P),o.innerLoading.value=!1,s.value=!1),l.value===!0&&(l.value=!1)})}function pt(){return C(Jl,{ref:X,class:_.value,style:e.popupContentStyle,modelValue:l.value,fit:e.menuShrink!==!0,cover:e.optionsCover===!0&&S.value!==!0&&e.useInput!==!0,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,dark:m.value,noParentEvent:!0,noRefocus:!0,noFocus:!0,square:Re.value,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,separateClosePopup:!0,...U.value,onScrollPassive:he,onBeforeShow:ft,onBeforeHide:Lt,onShow:Ht},st)}function Lt(t){vt(t),Ve()}function Ht(){ue()}function Dt(t){_e(t),z.value!==null&&z.value.focus(),I.value=!0,window.scrollTo(window.pageXOffset||window.scrollX||document.body.scrollLeft||0,0)}function $t(t){_e(t),ie(()=>{I.value=!1})}function Nt(){const t=[C(jl,{class:`col-auto ${o.fieldClass.value}`,...d.value,for:o.targetUid.value,dark:m.value,square:!0,loading:s.value,itemAligned:!1,filled:!0,stackLabel:q.value.length>0,...o.splitAttrs.listeners.value,onFocus:Dt,onBlur:$t},{...r,rawControl:()=>o.getControl(!0),before:void 0,after:void 0})];return l.value===!0&&t.push(C("div",{ref:K,class:_.value+" scroll",style:e.popupContentStyle,...U.value,onClick:Ke,onScrollPassive:he},st())),C(Ol,{ref:se,modelValue:O.value,position:e.useInput===!0?"top":void 0,transitionShow:$,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:ft,onBeforeHide:Qt,onHide:Kt,onShow:jt},()=>C("div",{class:"q-select__dialog"+(m.value===!0?" q-select__dialog--dark q-dark":"")+(I.value===!0?" q-select__dialog--focused":"")},t))}function Qt(t){vt(t),se.value!==null&&se.value.__updateRefocusTarget(o.rootRef.value.querySelector(".q-field__native > [tabindex]:last-child")),o.focused.value=!1}function Kt(t){Se(),o.focused.value===!1&&n("blur",t),xe()}function jt(){const t=document.activeElement;(t===null||t.id!==o.targetUid.value)&&z.value!==null&&z.value!==t&&z.value.focus(),ue()}function Ve(){O.value!==!0&&(y.value=-1,l.value===!0&&(l.value=!1),o.focused.value===!1&&(clearTimeout(P),P=void 0,o.innerLoading.value===!0&&(n("filter-abort"),o.innerLoading.value=!1,s.value=!1)))}function qe(t){o.editable.value===!0&&(w===!0?(o.onControlFocusin(t),O.value=!0,ie(()=>{o.focus()})):o.focus(),e.onFilter!==void 0?ke(q.value):(S.value!==!0||r["no-option"]!==void 0)&&(l.value=!0))}function Se(){O.value=!1,Ve()}function xe(){e.useInput===!0&&Ie(e.multiple!==!0&&e.fillInput===!0&&a.value.length>0&&D.value(a.value[0])||"",!0,!0)}function Ne(t){let i=-1;if(t===!0){if(a.value.length>0){const u=W.value(a.value[0]);i=e.options.findIndex(v=>Me(W.value(v),u))}Z(i)}Ce(i)}function Ut(t,i){l.value===!0&&o.innerLoading.value===!1&&(Z(-1,!0),ie(()=>{l.value===!0&&o.innerLoading.value===!1&&(t>i?Z():Ne(!0))}))}function dt(){O.value===!1&&X.value!==null&&X.value.updatePosition()}function ft(t){t!==void 0&&_e(t),n("popup-show",t),o.hasPopupOpen=!0,o.onControlFocusin(t)}function vt(t){t!==void 0&&_e(t),n("popup-hide",t),o.hasPopupOpen=!1,o.onControlFocusout(t)}function mt(){w=h.platform.is.mobile!==!0&&e.behavior!=="dialog"?!1:e.behavior!=="menu"&&(e.useInput===!0?r["no-option"]!==void 0||e.onFilter!==void 0||S.value===!1:!0),$=h.platform.is.ios===!0&&w===!0&&e.useInput===!0?"fade":e.transitionShow}return _l(mt),Bl(dt),mt(),et(()=>{clearTimeout(k)}),Object.assign(g,{showPopup:qe,hidePopup:Se,removeAtIndex:He,add:lt,toggleOption:me,getOptionIndex:()=>y.value,setOptionIndex:Ce,moveOptionSelection:pe,filter:ke,updateMenuPosition:dt,updateInputValue:Ie,isOptionSelected:$e,getEmittingOptionValue:tt,isOptionDisabled:(...t)=>we.value.apply(null,t)===!0,getOptionValue:(...t)=>W.value.apply(null,t),getOptionLabel:(...t)=>D.value.apply(null,t)}),Object.assign(o,{innerValue:a,fieldClass:c(()=>`q-select q-field--auto-height q-select--with${e.useInput!==!0?"out":""}-input q-select--with${e.useChips!==!0?"out":""}-chips q-select--${e.multiple===!0?"multiple":"single"}`),inputRef:b,targetRef:z,hasValue:M,showPopup:qe,floatingLabel:c(()=>e.hideSelected!==!0&&M.value===!0||q.value.length>0||gt(e.displayValue)),getControlChild:()=>{if(o.editable.value!==!1&&(O.value===!0||S.value!==!0||r["no-option"]!==void 0))return w===!0?Nt():pt();o.hasPopupOpen===!0&&(o.hasPopupOpen=!1)},controlEvents:{onFocusin(t){o.onControlFocusin(t)},onFocusout(t){o.onControlFocusout(t,()=>{xe(),Ve()})},onClick(t){if(Ke(t),w!==!0&&l.value===!0){Ve(),z.value!==null&&z.value.focus();return}qe(t)}},getControl:t=>{const i=Rt(),u=t===!0||O.value!==!0||w!==!0;if(e.useInput===!0)i.push(Pt(t,u));else if(o.editable.value===!0){const F=u===!0?ve.value:void 0;i.push(C("input",{ref:u===!0?z:void 0,key:"d_t",class:"q-select__focus-target",id:u===!0?o.targetUid.value:void 0,readonly:!0,"data-autofocus":t!==!0&&e.autofocus===!0||void 0,...F,onKeydown:it,onKeyup:nt,onKeypress:ot})),u===!0&&typeof e.autocomplete=="string"&&e.autocomplete.length>0&&i.push(C("input",{class:"q-select__autocomplete-input",autocomplete:e.autocomplete,onKeyup:at}))}if(ce.value!==void 0&&e.disable!==!0&&Pe.value.length>0){const F=Pe.value.map(A=>C("option",{value:A,selected:!0}));i.push(C("select",{class:"hidden",name:ce.value,multiple:e.multiple},F))}const v=e.useInput===!0||u!==!0?void 0:o.splitAttrs.attributes.value;return C("div",{class:"q-field__native row items-center",...v},i)},getInnerAppend:()=>e.loading!==!0&&s.value!==!0&&e.hideDropdownIcon!==!0?[C(Fe,{class:"q-select__dropdown-icon"+(l.value===!0?" rotate-180":""),name:be.value})]:null}),Bt(o)}});const au=We("div",{class:"text-h5 q-mb-xs"},"MQTT Server Config",-1),ou={class:"col-12 col-md-6"},iu={class:"col-12 col-md-6"},mu={__name:"MqttConfig",setup(e){const r=Kl(),n=E(!0);return(g,h)=>(yt(),bt(Pl,{flat:"",bordered:"",square:""},{default:Be(()=>[oe(wt,null,{default:Be(()=>[au,oe(je,{label:"Server URL",hint:"Example: mqtt://localhost:1883 or ws://10.0.0.1:8883",modelValue:ne(r).config.url,"onUpdate:modelValue":h[0]||(h[0]=l=>ne(r).config.url=l)},null,8,["modelValue"])]),_:1}),oe(wt,{class:"row q-col-gutter-md"},{default:Be(()=>[We("div",ou,[oe(je,{label:"Username",modelValue:ne(r).config.username,"onUpdate:modelValue":h[1]||(h[1]=l=>ne(r).config.username=l)},null,8,["modelValue"])]),We("div",iu,[oe(je,{modelValue:ne(r).config.password,"onUpdate:modelValue":h[3]||(h[3]=l=>ne(r).config.password=l),label:"Password",type:n.value?"password":"text"},{append:Be(()=>[oe(Fe,{name:n.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:h[2]||(h[2]=l=>n.value=!n.value)},null,8,["name"])]),_:1},8,["modelValue","type"])])]),_:1}),ne(r).error?(yt(),bt(Ql,{key:0,"inline-actions":"",class:"text-white bg-red"},{default:Be(()=>[zl(Fl(ne(r).error),1)]),_:1})):Tl("",!0),oe(Rl,{align:"right"},{default:Be(()=>[oe(El,{label:"connect",unelevated:"",color:"primary",icon:"bolt",onClick:h[4]||(h[4]=l=>ne(r).connect())})]),_:1})]),_:1}))}};export{vu as Q,mu as _,Jl as a,lu as b,fu as c,tu as u};