var Vy=Object.defineProperty;var Hy=(n,e,t)=>e in n?Vy(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Xo=(n,e,t)=>Hy(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Gy(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var X_={exports:{}},tc={},Y_={exports:{}},Xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var el=Symbol.for("react.element"),Wy=Symbol.for("react.portal"),jy=Symbol.for("react.fragment"),Xy=Symbol.for("react.strict_mode"),Yy=Symbol.for("react.profiler"),qy=Symbol.for("react.provider"),$y=Symbol.for("react.context"),Ky=Symbol.for("react.forward_ref"),Zy=Symbol.for("react.suspense"),Qy=Symbol.for("react.memo"),Jy=Symbol.for("react.lazy"),Hp=Symbol.iterator;function eS(n){return n===null||typeof n!="object"?null:(n=Hp&&n[Hp]||n["@@iterator"],typeof n=="function"?n:null)}var q_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$_=Object.assign,K_={};function ko(n,e,t){this.props=n,this.context=e,this.refs=K_,this.updater=t||q_}ko.prototype.isReactComponent={};ko.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};ko.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Z_(){}Z_.prototype=ko.prototype;function lh(n,e,t){this.props=n,this.context=e,this.refs=K_,this.updater=t||q_}var uh=lh.prototype=new Z_;uh.constructor=lh;$_(uh,ko.prototype);uh.isPureReactComponent=!0;var Gp=Array.isArray,Q_=Object.prototype.hasOwnProperty,ch={current:null},J_={key:!0,ref:!0,__self:!0,__source:!0};function e0(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Q_.call(e,i)&&!J_.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:el,type:n,key:s,ref:o,props:r,_owner:ch.current}}function tS(n,e){return{$$typeof:el,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function fh(n){return typeof n=="object"&&n!==null&&n.$$typeof===el}function nS(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Wp=/\/+/g;function Cc(n,e){return typeof n=="object"&&n!==null&&n.key!=null?nS(""+n.key):e.toString(36)}function tu(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case el:case Wy:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+Cc(o,0):i,Gp(r)?(t="",n!=null&&(t=n.replace(Wp,"$&/")+"/"),tu(r,e,t,"",function(u){return u})):r!=null&&(fh(r)&&(r=tS(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Wp,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Gp(n))for(var a=0;a<n.length;a++){s=n[a];var l=i+Cc(s,a);o+=tu(s,e,t,l,r)}else if(l=eS(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=i+Cc(s,a++),o+=tu(s,e,t,l,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function dl(n,e,t){if(n==null)return n;var i=[],r=0;return tu(n,i,"","",function(s){return e.call(t,s,r++)}),i}function iS(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var mn={current:null},nu={transition:null},rS={ReactCurrentDispatcher:mn,ReactCurrentBatchConfig:nu,ReactCurrentOwner:ch};function t0(){throw Error("act(...) is not supported in production builds of React.")}Xe.Children={map:dl,forEach:function(n,e,t){dl(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return dl(n,function(){e++}),e},toArray:function(n){return dl(n,function(e){return e})||[]},only:function(n){if(!fh(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};Xe.Component=ko;Xe.Fragment=jy;Xe.Profiler=Yy;Xe.PureComponent=lh;Xe.StrictMode=Xy;Xe.Suspense=Zy;Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=rS;Xe.act=t0;Xe.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=$_({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=ch.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)Q_.call(e,l)&&!J_.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:el,type:n.type,key:r,ref:s,props:i,_owner:o}};Xe.createContext=function(n){return n={$$typeof:$y,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:qy,_context:n},n.Consumer=n};Xe.createElement=e0;Xe.createFactory=function(n){var e=e0.bind(null,n);return e.type=n,e};Xe.createRef=function(){return{current:null}};Xe.forwardRef=function(n){return{$$typeof:Ky,render:n}};Xe.isValidElement=fh;Xe.lazy=function(n){return{$$typeof:Jy,_payload:{_status:-1,_result:n},_init:iS}};Xe.memo=function(n,e){return{$$typeof:Qy,type:n,compare:e===void 0?null:e}};Xe.startTransition=function(n){var e=nu.transition;nu.transition={};try{n()}finally{nu.transition=e}};Xe.unstable_act=t0;Xe.useCallback=function(n,e){return mn.current.useCallback(n,e)};Xe.useContext=function(n){return mn.current.useContext(n)};Xe.useDebugValue=function(){};Xe.useDeferredValue=function(n){return mn.current.useDeferredValue(n)};Xe.useEffect=function(n,e){return mn.current.useEffect(n,e)};Xe.useId=function(){return mn.current.useId()};Xe.useImperativeHandle=function(n,e,t){return mn.current.useImperativeHandle(n,e,t)};Xe.useInsertionEffect=function(n,e){return mn.current.useInsertionEffect(n,e)};Xe.useLayoutEffect=function(n,e){return mn.current.useLayoutEffect(n,e)};Xe.useMemo=function(n,e){return mn.current.useMemo(n,e)};Xe.useReducer=function(n,e,t){return mn.current.useReducer(n,e,t)};Xe.useRef=function(n){return mn.current.useRef(n)};Xe.useState=function(n){return mn.current.useState(n)};Xe.useSyncExternalStore=function(n,e,t){return mn.current.useSyncExternalStore(n,e,t)};Xe.useTransition=function(){return mn.current.useTransition()};Xe.version="18.3.1";Y_.exports=Xe;var rt=Y_.exports;const sS=Gy(rt);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var oS=rt,aS=Symbol.for("react.element"),lS=Symbol.for("react.fragment"),uS=Object.prototype.hasOwnProperty,cS=oS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,fS={key:!0,ref:!0,__self:!0,__source:!0};function n0(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)uS.call(e,i)&&!fS.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:aS,type:n,key:s,ref:o,props:r,_owner:cS.current}}tc.Fragment=lS;tc.jsx=n0;tc.jsxs=n0;X_.exports=tc;var P=X_.exports,Wf={},i0={exports:{}},Yn={},r0={exports:{}},s0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(I,B){var H=I.length;I.push(B);e:for(;0<H;){var Z=H-1>>>1,Q=I[Z];if(0<r(Q,B))I[Z]=B,I[H]=Q,H=Z;else break e}}function t(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var B=I[0],H=I.pop();if(H!==B){I[0]=H;e:for(var Z=0,Q=I.length,Y=Q>>>1;Z<Y;){var K=2*(Z+1)-1,re=I[K],pe=K+1,me=I[pe];if(0>r(re,H))pe<Q&&0>r(me,re)?(I[Z]=me,I[pe]=H,Z=pe):(I[Z]=re,I[K]=H,Z=K);else if(pe<Q&&0>r(me,H))I[Z]=me,I[pe]=H,Z=pe;else break e}}return B}function r(I,B){var H=I.sortIndex-B.sortIndex;return H!==0?H:I.id-B.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],u=[],c=1,f=null,h=3,p=!1,x=!1,g=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(I){for(var B=t(u);B!==null;){if(B.callback===null)i(u);else if(B.startTime<=I)i(u),B.sortIndex=B.expirationTime,e(l,B);else break;B=t(u)}}function y(I){if(g=!1,v(I),!x)if(t(l)!==null)x=!0,V(T);else{var B=t(u);B!==null&&q(y,B.startTime-I)}}function T(I,B){x=!1,g&&(g=!1,d(b),b=-1),p=!0;var H=h;try{for(v(B),f=t(l);f!==null&&(!(f.expirationTime>B)||I&&!U());){var Z=f.callback;if(typeof Z=="function"){f.callback=null,h=f.priorityLevel;var Q=Z(f.expirationTime<=B);B=n.unstable_now(),typeof Q=="function"?f.callback=Q:f===t(l)&&i(l),v(B)}else i(l);f=t(l)}if(f!==null)var Y=!0;else{var K=t(u);K!==null&&q(y,K.startTime-B),Y=!1}return Y}finally{f=null,h=H,p=!1}}var A=!1,E=null,b=-1,S=5,w=-1;function U(){return!(n.unstable_now()-w<S)}function k(){if(E!==null){var I=n.unstable_now();w=I;var B=!0;try{B=E(!0,I)}finally{B?$():(A=!1,E=null)}}else A=!1}var $;if(typeof _=="function")$=function(){_(k)};else if(typeof MessageChannel<"u"){var L=new MessageChannel,O=L.port2;L.port1.onmessage=k,$=function(){O.postMessage(null)}}else $=function(){m(k,0)};function V(I){E=I,A||(A=!0,$())}function q(I,B){b=m(function(){I(n.unstable_now())},B)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(I){I.callback=null},n.unstable_continueExecution=function(){x||p||(x=!0,V(T))},n.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):S=0<I?Math.floor(1e3/I):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(I){switch(h){case 1:case 2:case 3:var B=3;break;default:B=h}var H=h;h=B;try{return I()}finally{h=H}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(I,B){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var H=h;h=I;try{return B()}finally{h=H}},n.unstable_scheduleCallback=function(I,B,H){var Z=n.unstable_now();switch(typeof H=="object"&&H!==null?(H=H.delay,H=typeof H=="number"&&0<H?Z+H:Z):H=Z,I){case 1:var Q=-1;break;case 2:Q=250;break;case 5:Q=1073741823;break;case 4:Q=1e4;break;default:Q=5e3}return Q=H+Q,I={id:c++,callback:B,priorityLevel:I,startTime:H,expirationTime:Q,sortIndex:-1},H>Z?(I.sortIndex=H,e(u,I),t(l)===null&&I===t(u)&&(g?(d(b),b=-1):g=!0,q(y,H-Z))):(I.sortIndex=Q,e(l,I),x||p||(x=!0,V(T))),I},n.unstable_shouldYield=U,n.unstable_wrapCallback=function(I){var B=h;return function(){var H=h;h=B;try{return I.apply(this,arguments)}finally{h=H}}}})(s0);r0.exports=s0;var dS=r0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hS=rt,Wn=dS;function ie(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var o0=new Set,Ra={};function As(n,e){Mo(n,e),Mo(n+"Capture",e)}function Mo(n,e){for(Ra[n]=e,n=0;n<e.length;n++)o0.add(e[n])}var Zi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),jf=Object.prototype.hasOwnProperty,pS=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,jp={},Xp={};function mS(n){return jf.call(Xp,n)?!0:jf.call(jp,n)?!1:pS.test(n)?Xp[n]=!0:(jp[n]=!0,!1)}function gS(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function _S(n,e,t,i){if(e===null||typeof e>"u"||gS(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function gn(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var $t={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){$t[n]=new gn(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];$t[e]=new gn(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){$t[n]=new gn(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){$t[n]=new gn(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){$t[n]=new gn(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){$t[n]=new gn(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){$t[n]=new gn(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){$t[n]=new gn(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){$t[n]=new gn(n,5,!1,n.toLowerCase(),null,!1,!1)});var dh=/[\-:]([a-z])/g;function hh(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(dh,hh);$t[e]=new gn(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(dh,hh);$t[e]=new gn(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(dh,hh);$t[e]=new gn(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){$t[n]=new gn(n,1,!1,n.toLowerCase(),null,!1,!1)});$t.xlinkHref=new gn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){$t[n]=new gn(n,1,!1,n.toLowerCase(),null,!0,!0)});function ph(n,e,t,i){var r=$t.hasOwnProperty(e)?$t[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(_S(e,t,r,i)&&(t=null),i||r===null?mS(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var rr=hS.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,hl=Symbol.for("react.element"),qs=Symbol.for("react.portal"),$s=Symbol.for("react.fragment"),mh=Symbol.for("react.strict_mode"),Xf=Symbol.for("react.profiler"),a0=Symbol.for("react.provider"),l0=Symbol.for("react.context"),gh=Symbol.for("react.forward_ref"),Yf=Symbol.for("react.suspense"),qf=Symbol.for("react.suspense_list"),_h=Symbol.for("react.memo"),fr=Symbol.for("react.lazy"),u0=Symbol.for("react.offscreen"),Yp=Symbol.iterator;function Yo(n){return n===null||typeof n!="object"?null:(n=Yp&&n[Yp]||n["@@iterator"],typeof n=="function"?n:null)}var yt=Object.assign,bc;function la(n){if(bc===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);bc=e&&e[1]||""}return`
`+bc+n}var Pc=!1;function Lc(n,e){if(!n||Pc)return"";Pc=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(n,[],e)}else{try{e.call()}catch(u){i=u}n.call(e.prototype)}else{try{throw Error()}catch(u){i=u}n()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{Pc=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?la(n):""}function vS(n){switch(n.tag){case 5:return la(n.type);case 16:return la("Lazy");case 13:return la("Suspense");case 19:return la("SuspenseList");case 0:case 2:case 15:return n=Lc(n.type,!1),n;case 11:return n=Lc(n.type.render,!1),n;case 1:return n=Lc(n.type,!0),n;default:return""}}function $f(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case $s:return"Fragment";case qs:return"Portal";case Xf:return"Profiler";case mh:return"StrictMode";case Yf:return"Suspense";case qf:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case l0:return(n.displayName||"Context")+".Consumer";case a0:return(n._context.displayName||"Context")+".Provider";case gh:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case _h:return e=n.displayName||null,e!==null?e:$f(n.type)||"Memo";case fr:e=n._payload,n=n._init;try{return $f(n(e))}catch{}}return null}function xS(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return $f(e);case 8:return e===mh?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ur(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function c0(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function yS(n){var e=c0(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function pl(n){n._valueTracker||(n._valueTracker=yS(n))}function f0(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=c0(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function vu(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Kf(n,e){var t=e.checked;return yt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??n._wrapperState.initialChecked})}function qp(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=Ur(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function d0(n,e){e=e.checked,e!=null&&ph(n,"checked",e,!1)}function Zf(n,e){d0(n,e);var t=Ur(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?Qf(n,e.type,t):e.hasOwnProperty("defaultValue")&&Qf(n,e.type,Ur(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function $p(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function Qf(n,e,t){(e!=="number"||vu(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var ua=Array.isArray;function co(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+Ur(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function Jf(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return yt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Kp(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(ie(92));if(ua(t)){if(1<t.length)throw Error(ie(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:Ur(t)}}function h0(n,e){var t=Ur(e.value),i=Ur(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Zp(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function p0(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ed(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?p0(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var ml,m0=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(ml=ml||document.createElement("div"),ml.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=ml.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function Ca(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var pa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},SS=["Webkit","ms","Moz","O"];Object.keys(pa).forEach(function(n){SS.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),pa[e]=pa[n]})});function g0(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||pa.hasOwnProperty(n)&&pa[n]?(""+e).trim():e+"px"}function _0(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=g0(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var MS=yt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function td(n,e){if(e){if(MS[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function nd(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var id=null;function vh(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var rd=null,fo=null,ho=null;function Qp(n){if(n=il(n)){if(typeof rd!="function")throw Error(ie(280));var e=n.stateNode;e&&(e=oc(e),rd(n.stateNode,n.type,e))}}function v0(n){fo?ho?ho.push(n):ho=[n]:fo=n}function x0(){if(fo){var n=fo,e=ho;if(ho=fo=null,Qp(n),e)for(n=0;n<e.length;n++)Qp(e[n])}}function y0(n,e){return n(e)}function S0(){}var Dc=!1;function M0(n,e,t){if(Dc)return n(e,t);Dc=!0;try{return y0(n,e,t)}finally{Dc=!1,(fo!==null||ho!==null)&&(S0(),x0())}}function ba(n,e){var t=n.stateNode;if(t===null)return null;var i=oc(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(ie(231,e,typeof t));return t}var sd=!1;if(Zi)try{var qo={};Object.defineProperty(qo,"passive",{get:function(){sd=!0}}),window.addEventListener("test",qo,qo),window.removeEventListener("test",qo,qo)}catch{sd=!1}function ES(n,e,t,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(t,u)}catch(c){this.onError(c)}}var ma=!1,xu=null,yu=!1,od=null,TS={onError:function(n){ma=!0,xu=n}};function wS(n,e,t,i,r,s,o,a,l){ma=!1,xu=null,ES.apply(TS,arguments)}function AS(n,e,t,i,r,s,o,a,l){if(wS.apply(this,arguments),ma){if(ma){var u=xu;ma=!1,xu=null}else throw Error(ie(198));yu||(yu=!0,od=u)}}function Rs(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,e.flags&4098&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function E0(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Jp(n){if(Rs(n)!==n)throw Error(ie(188))}function RS(n){var e=n.alternate;if(!e){if(e=Rs(n),e===null)throw Error(ie(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return Jp(r),n;if(s===i)return Jp(r),e;s=s.sibling}throw Error(ie(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===t){o=!0,t=r,i=s;break}if(a===i){o=!0,i=r,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,i=r;break}if(a===i){o=!0,i=s,t=r;break}a=a.sibling}if(!o)throw Error(ie(189))}}if(t.alternate!==i)throw Error(ie(190))}if(t.tag!==3)throw Error(ie(188));return t.stateNode.current===t?n:e}function T0(n){return n=RS(n),n!==null?w0(n):null}function w0(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=w0(n);if(e!==null)return e;n=n.sibling}return null}var A0=Wn.unstable_scheduleCallback,em=Wn.unstable_cancelCallback,CS=Wn.unstable_shouldYield,bS=Wn.unstable_requestPaint,Ct=Wn.unstable_now,PS=Wn.unstable_getCurrentPriorityLevel,xh=Wn.unstable_ImmediatePriority,R0=Wn.unstable_UserBlockingPriority,Su=Wn.unstable_NormalPriority,LS=Wn.unstable_LowPriority,C0=Wn.unstable_IdlePriority,nc=null,Di=null;function DS(n){if(Di&&typeof Di.onCommitFiberRoot=="function")try{Di.onCommitFiberRoot(nc,n,void 0,(n.current.flags&128)===128)}catch{}}var yi=Math.clz32?Math.clz32:US,NS=Math.log,IS=Math.LN2;function US(n){return n>>>=0,n===0?32:31-(NS(n)/IS|0)|0}var gl=64,_l=4194304;function ca(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Mu(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~r;a!==0?i=ca(a):(s&=o,s!==0&&(i=ca(s)))}else o=t&~r,o!==0?i=ca(o):s!==0&&(i=ca(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-yi(e),r=1<<t,i|=n[t],e&=~r;return i}function OS(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function FS(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-yi(s),a=1<<o,l=r[o];l===-1?(!(a&t)||a&i)&&(r[o]=OS(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function ad(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function b0(){var n=gl;return gl<<=1,!(gl&4194240)&&(gl=64),n}function Nc(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function tl(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-yi(e),n[e]=t}function kS(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-yi(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function yh(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-yi(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var Ke=0;function P0(n){return n&=-n,1<n?4<n?n&268435455?16:536870912:4:1}var L0,Sh,D0,N0,I0,ld=!1,vl=[],Mr=null,Er=null,Tr=null,Pa=new Map,La=new Map,hr=[],zS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function tm(n,e){switch(n){case"focusin":case"focusout":Mr=null;break;case"dragenter":case"dragleave":Er=null;break;case"mouseover":case"mouseout":Tr=null;break;case"pointerover":case"pointerout":Pa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":La.delete(e.pointerId)}}function $o(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=il(e),e!==null&&Sh(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function BS(n,e,t,i,r){switch(e){case"focusin":return Mr=$o(Mr,n,e,t,i,r),!0;case"dragenter":return Er=$o(Er,n,e,t,i,r),!0;case"mouseover":return Tr=$o(Tr,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return Pa.set(s,$o(Pa.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,La.set(s,$o(La.get(s)||null,n,e,t,i,r)),!0}return!1}function U0(n){var e=os(n.target);if(e!==null){var t=Rs(e);if(t!==null){if(e=t.tag,e===13){if(e=E0(t),e!==null){n.blockedOn=e,I0(n.priority,function(){D0(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function iu(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=ud(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);id=i,t.target.dispatchEvent(i),id=null}else return e=il(t),e!==null&&Sh(e),n.blockedOn=t,!1;e.shift()}return!0}function nm(n,e,t){iu(n)&&t.delete(e)}function VS(){ld=!1,Mr!==null&&iu(Mr)&&(Mr=null),Er!==null&&iu(Er)&&(Er=null),Tr!==null&&iu(Tr)&&(Tr=null),Pa.forEach(nm),La.forEach(nm)}function Ko(n,e){n.blockedOn===e&&(n.blockedOn=null,ld||(ld=!0,Wn.unstable_scheduleCallback(Wn.unstable_NormalPriority,VS)))}function Da(n){function e(r){return Ko(r,n)}if(0<vl.length){Ko(vl[0],n);for(var t=1;t<vl.length;t++){var i=vl[t];i.blockedOn===n&&(i.blockedOn=null)}}for(Mr!==null&&Ko(Mr,n),Er!==null&&Ko(Er,n),Tr!==null&&Ko(Tr,n),Pa.forEach(e),La.forEach(e),t=0;t<hr.length;t++)i=hr[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<hr.length&&(t=hr[0],t.blockedOn===null);)U0(t),t.blockedOn===null&&hr.shift()}var po=rr.ReactCurrentBatchConfig,Eu=!0;function HS(n,e,t,i){var r=Ke,s=po.transition;po.transition=null;try{Ke=1,Mh(n,e,t,i)}finally{Ke=r,po.transition=s}}function GS(n,e,t,i){var r=Ke,s=po.transition;po.transition=null;try{Ke=4,Mh(n,e,t,i)}finally{Ke=r,po.transition=s}}function Mh(n,e,t,i){if(Eu){var r=ud(n,e,t,i);if(r===null)Gc(n,e,i,Tu,t),tm(n,i);else if(BS(r,n,e,t,i))i.stopPropagation();else if(tm(n,i),e&4&&-1<zS.indexOf(n)){for(;r!==null;){var s=il(r);if(s!==null&&L0(s),s=ud(n,e,t,i),s===null&&Gc(n,e,i,Tu,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else Gc(n,e,i,null,t)}}var Tu=null;function ud(n,e,t,i){if(Tu=null,n=vh(i),n=os(n),n!==null)if(e=Rs(n),e===null)n=null;else if(t=e.tag,t===13){if(n=E0(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Tu=n,null}function O0(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(PS()){case xh:return 1;case R0:return 4;case Su:case LS:return 16;case C0:return 536870912;default:return 16}default:return 16}}var mr=null,Eh=null,ru=null;function F0(){if(ru)return ru;var n,e=Eh,t=e.length,i,r="value"in mr?mr.value:mr.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return ru=r.slice(n,1<i?1-i:void 0)}function su(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function xl(){return!0}function im(){return!1}function qn(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?xl:im,this.isPropagationStopped=im,this}return yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=xl)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=xl)},persist:function(){},isPersistent:xl}),e}var zo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Th=qn(zo),nl=yt({},zo,{view:0,detail:0}),WS=qn(nl),Ic,Uc,Zo,ic=yt({},nl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wh,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Zo&&(Zo&&n.type==="mousemove"?(Ic=n.screenX-Zo.screenX,Uc=n.screenY-Zo.screenY):Uc=Ic=0,Zo=n),Ic)},movementY:function(n){return"movementY"in n?n.movementY:Uc}}),rm=qn(ic),jS=yt({},ic,{dataTransfer:0}),XS=qn(jS),YS=yt({},nl,{relatedTarget:0}),Oc=qn(YS),qS=yt({},zo,{animationName:0,elapsedTime:0,pseudoElement:0}),$S=qn(qS),KS=yt({},zo,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),ZS=qn(KS),QS=yt({},zo,{data:0}),sm=qn(QS),JS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},eM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},tM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function nM(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=tM[n])?!!e[n]:!1}function wh(){return nM}var iM=yt({},nl,{key:function(n){if(n.key){var e=JS[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=su(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?eM[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wh,charCode:function(n){return n.type==="keypress"?su(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?su(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),rM=qn(iM),sM=yt({},ic,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),om=qn(sM),oM=yt({},nl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wh}),aM=qn(oM),lM=yt({},zo,{propertyName:0,elapsedTime:0,pseudoElement:0}),uM=qn(lM),cM=yt({},ic,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),fM=qn(cM),dM=[9,13,27,32],Ah=Zi&&"CompositionEvent"in window,ga=null;Zi&&"documentMode"in document&&(ga=document.documentMode);var hM=Zi&&"TextEvent"in window&&!ga,k0=Zi&&(!Ah||ga&&8<ga&&11>=ga),am=" ",lm=!1;function z0(n,e){switch(n){case"keyup":return dM.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function B0(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ks=!1;function pM(n,e){switch(n){case"compositionend":return B0(e);case"keypress":return e.which!==32?null:(lm=!0,am);case"textInput":return n=e.data,n===am&&lm?null:n;default:return null}}function mM(n,e){if(Ks)return n==="compositionend"||!Ah&&z0(n,e)?(n=F0(),ru=Eh=mr=null,Ks=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return k0&&e.locale!=="ko"?null:e.data;default:return null}}var gM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function um(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!gM[n.type]:e==="textarea"}function V0(n,e,t,i){v0(i),e=wu(e,"onChange"),0<e.length&&(t=new Th("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var _a=null,Na=null;function _M(n){Q0(n,0)}function rc(n){var e=Js(n);if(f0(e))return n}function vM(n,e){if(n==="change")return e}var H0=!1;if(Zi){var Fc;if(Zi){var kc="oninput"in document;if(!kc){var cm=document.createElement("div");cm.setAttribute("oninput","return;"),kc=typeof cm.oninput=="function"}Fc=kc}else Fc=!1;H0=Fc&&(!document.documentMode||9<document.documentMode)}function fm(){_a&&(_a.detachEvent("onpropertychange",G0),Na=_a=null)}function G0(n){if(n.propertyName==="value"&&rc(Na)){var e=[];V0(e,Na,n,vh(n)),M0(_M,e)}}function xM(n,e,t){n==="focusin"?(fm(),_a=e,Na=t,_a.attachEvent("onpropertychange",G0)):n==="focusout"&&fm()}function yM(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return rc(Na)}function SM(n,e){if(n==="click")return rc(e)}function MM(n,e){if(n==="input"||n==="change")return rc(e)}function EM(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var Mi=typeof Object.is=="function"?Object.is:EM;function Ia(n,e){if(Mi(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!jf.call(e,r)||!Mi(n[r],e[r]))return!1}return!0}function dm(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function hm(n,e){var t=dm(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=dm(t)}}function W0(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?W0(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function j0(){for(var n=window,e=vu();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=vu(n.document)}return e}function Rh(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function TM(n){var e=j0(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&W0(t.ownerDocument.documentElement,t)){if(i!==null&&Rh(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=hm(t,s);var o=hm(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var wM=Zi&&"documentMode"in document&&11>=document.documentMode,Zs=null,cd=null,va=null,fd=!1;function pm(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;fd||Zs==null||Zs!==vu(i)||(i=Zs,"selectionStart"in i&&Rh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),va&&Ia(va,i)||(va=i,i=wu(cd,"onSelect"),0<i.length&&(e=new Th("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=Zs)))}function yl(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Qs={animationend:yl("Animation","AnimationEnd"),animationiteration:yl("Animation","AnimationIteration"),animationstart:yl("Animation","AnimationStart"),transitionend:yl("Transition","TransitionEnd")},zc={},X0={};Zi&&(X0=document.createElement("div").style,"AnimationEvent"in window||(delete Qs.animationend.animation,delete Qs.animationiteration.animation,delete Qs.animationstart.animation),"TransitionEvent"in window||delete Qs.transitionend.transition);function sc(n){if(zc[n])return zc[n];if(!Qs[n])return n;var e=Qs[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in X0)return zc[n]=e[t];return n}var Y0=sc("animationend"),q0=sc("animationiteration"),$0=sc("animationstart"),K0=sc("transitionend"),Z0=new Map,mm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Vr(n,e){Z0.set(n,e),As(e,[n])}for(var Bc=0;Bc<mm.length;Bc++){var Vc=mm[Bc],AM=Vc.toLowerCase(),RM=Vc[0].toUpperCase()+Vc.slice(1);Vr(AM,"on"+RM)}Vr(Y0,"onAnimationEnd");Vr(q0,"onAnimationIteration");Vr($0,"onAnimationStart");Vr("dblclick","onDoubleClick");Vr("focusin","onFocus");Vr("focusout","onBlur");Vr(K0,"onTransitionEnd");Mo("onMouseEnter",["mouseout","mouseover"]);Mo("onMouseLeave",["mouseout","mouseover"]);Mo("onPointerEnter",["pointerout","pointerover"]);Mo("onPointerLeave",["pointerout","pointerover"]);As("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));As("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));As("onBeforeInput",["compositionend","keypress","textInput","paste"]);As("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));As("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));As("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var fa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),CM=new Set("cancel close invalid load scroll toggle".split(" ").concat(fa));function gm(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,AS(i,e,void 0,n),n.currentTarget=null}function Q0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;gm(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;gm(r,a,u),s=l}}}if(yu)throw n=od,yu=!1,od=null,n}function ot(n,e){var t=e[gd];t===void 0&&(t=e[gd]=new Set);var i=n+"__bubble";t.has(i)||(J0(e,n,2,!1),t.add(i))}function Hc(n,e,t){var i=0;e&&(i|=4),J0(t,n,i,e)}var Sl="_reactListening"+Math.random().toString(36).slice(2);function Ua(n){if(!n[Sl]){n[Sl]=!0,o0.forEach(function(t){t!=="selectionchange"&&(CM.has(t)||Hc(t,!1,n),Hc(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[Sl]||(e[Sl]=!0,Hc("selectionchange",!1,e))}}function J0(n,e,t,i){switch(O0(e)){case 1:var r=HS;break;case 4:r=GS;break;default:r=Mh}t=r.bind(null,e,t,n),r=void 0,!sd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function Gc(n,e,t,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=os(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}M0(function(){var u=s,c=vh(t),f=[];e:{var h=Z0.get(n);if(h!==void 0){var p=Th,x=n;switch(n){case"keypress":if(su(t)===0)break e;case"keydown":case"keyup":p=rM;break;case"focusin":x="focus",p=Oc;break;case"focusout":x="blur",p=Oc;break;case"beforeblur":case"afterblur":p=Oc;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=rm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=XS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=aM;break;case Y0:case q0:case $0:p=$S;break;case K0:p=uM;break;case"scroll":p=WS;break;case"wheel":p=fM;break;case"copy":case"cut":case"paste":p=ZS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=om}var g=(e&4)!==0,m=!g&&n==="scroll",d=g?h!==null?h+"Capture":null:h;g=[];for(var _=u,v;_!==null;){v=_;var y=v.stateNode;if(v.tag===5&&y!==null&&(v=y,d!==null&&(y=ba(_,d),y!=null&&g.push(Oa(_,y,v)))),m)break;_=_.return}0<g.length&&(h=new p(h,x,null,t,c),f.push({event:h,listeners:g}))}}if(!(e&7)){e:{if(h=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",h&&t!==id&&(x=t.relatedTarget||t.fromElement)&&(os(x)||x[Qi]))break e;if((p||h)&&(h=c.window===c?c:(h=c.ownerDocument)?h.defaultView||h.parentWindow:window,p?(x=t.relatedTarget||t.toElement,p=u,x=x?os(x):null,x!==null&&(m=Rs(x),x!==m||x.tag!==5&&x.tag!==6)&&(x=null)):(p=null,x=u),p!==x)){if(g=rm,y="onMouseLeave",d="onMouseEnter",_="mouse",(n==="pointerout"||n==="pointerover")&&(g=om,y="onPointerLeave",d="onPointerEnter",_="pointer"),m=p==null?h:Js(p),v=x==null?h:Js(x),h=new g(y,_+"leave",p,t,c),h.target=m,h.relatedTarget=v,y=null,os(c)===u&&(g=new g(d,_+"enter",x,t,c),g.target=v,g.relatedTarget=m,y=g),m=y,p&&x)t:{for(g=p,d=x,_=0,v=g;v;v=Ps(v))_++;for(v=0,y=d;y;y=Ps(y))v++;for(;0<_-v;)g=Ps(g),_--;for(;0<v-_;)d=Ps(d),v--;for(;_--;){if(g===d||d!==null&&g===d.alternate)break t;g=Ps(g),d=Ps(d)}g=null}else g=null;p!==null&&_m(f,h,p,g,!1),x!==null&&m!==null&&_m(f,m,x,g,!0)}}e:{if(h=u?Js(u):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var T=vM;else if(um(h))if(H0)T=MM;else{T=yM;var A=xM}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(T=SM);if(T&&(T=T(n,u))){V0(f,T,t,c);break e}A&&A(n,h,u),n==="focusout"&&(A=h._wrapperState)&&A.controlled&&h.type==="number"&&Qf(h,"number",h.value)}switch(A=u?Js(u):window,n){case"focusin":(um(A)||A.contentEditable==="true")&&(Zs=A,cd=u,va=null);break;case"focusout":va=cd=Zs=null;break;case"mousedown":fd=!0;break;case"contextmenu":case"mouseup":case"dragend":fd=!1,pm(f,t,c);break;case"selectionchange":if(wM)break;case"keydown":case"keyup":pm(f,t,c)}var E;if(Ah)e:{switch(n){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Ks?z0(n,t)&&(b="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(b="onCompositionStart");b&&(k0&&t.locale!=="ko"&&(Ks||b!=="onCompositionStart"?b==="onCompositionEnd"&&Ks&&(E=F0()):(mr=c,Eh="value"in mr?mr.value:mr.textContent,Ks=!0)),A=wu(u,b),0<A.length&&(b=new sm(b,n,null,t,c),f.push({event:b,listeners:A}),E?b.data=E:(E=B0(t),E!==null&&(b.data=E)))),(E=hM?pM(n,t):mM(n,t))&&(u=wu(u,"onBeforeInput"),0<u.length&&(c=new sm("onBeforeInput","beforeinput",null,t,c),f.push({event:c,listeners:u}),c.data=E))}Q0(f,e)})}function Oa(n,e,t){return{instance:n,listener:e,currentTarget:t}}function wu(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ba(n,t),s!=null&&i.unshift(Oa(n,s,r)),s=ba(n,e),s!=null&&i.push(Oa(n,s,r))),n=n.return}return i}function Ps(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function _m(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var a=t,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=ba(t,s),l!=null&&o.unshift(Oa(t,l,a))):r||(l=ba(t,s),l!=null&&o.push(Oa(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var bM=/\r\n?/g,PM=/\u0000|\uFFFD/g;function vm(n){return(typeof n=="string"?n:""+n).replace(bM,`
`).replace(PM,"")}function Ml(n,e,t){if(e=vm(e),vm(n)!==e&&t)throw Error(ie(425))}function Au(){}var dd=null,hd=null;function pd(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var md=typeof setTimeout=="function"?setTimeout:void 0,LM=typeof clearTimeout=="function"?clearTimeout:void 0,xm=typeof Promise=="function"?Promise:void 0,DM=typeof queueMicrotask=="function"?queueMicrotask:typeof xm<"u"?function(n){return xm.resolve(null).then(n).catch(NM)}:md;function NM(n){setTimeout(function(){throw n})}function Wc(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),Da(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);Da(e)}function wr(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function ym(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var Bo=Math.random().toString(36).slice(2),bi="__reactFiber$"+Bo,Fa="__reactProps$"+Bo,Qi="__reactContainer$"+Bo,gd="__reactEvents$"+Bo,IM="__reactListeners$"+Bo,UM="__reactHandles$"+Bo;function os(n){var e=n[bi];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Qi]||t[bi]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=ym(n);n!==null;){if(t=n[bi])return t;n=ym(n)}return e}n=t,t=n.parentNode}return null}function il(n){return n=n[bi]||n[Qi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Js(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(ie(33))}function oc(n){return n[Fa]||null}var _d=[],eo=-1;function Hr(n){return{current:n}}function lt(n){0>eo||(n.current=_d[eo],_d[eo]=null,eo--)}function st(n,e){eo++,_d[eo]=n.current,n.current=e}var Or={},an=Hr(Or),Sn=Hr(!1),xs=Or;function Eo(n,e){var t=n.type.contextTypes;if(!t)return Or;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function Mn(n){return n=n.childContextTypes,n!=null}function Ru(){lt(Sn),lt(an)}function Sm(n,e,t){if(an.current!==Or)throw Error(ie(168));st(an,e),st(Sn,t)}function ev(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,xS(n)||"Unknown",r));return yt({},t,i)}function Cu(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||Or,xs=an.current,st(an,n),st(Sn,Sn.current),!0}function Mm(n,e,t){var i=n.stateNode;if(!i)throw Error(ie(169));t?(n=ev(n,e,xs),i.__reactInternalMemoizedMergedChildContext=n,lt(Sn),lt(an),st(an,n)):lt(Sn),st(Sn,t)}var ji=null,ac=!1,jc=!1;function tv(n){ji===null?ji=[n]:ji.push(n)}function OM(n){ac=!0,tv(n)}function Gr(){if(!jc&&ji!==null){jc=!0;var n=0,e=Ke;try{var t=ji;for(Ke=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}ji=null,ac=!1}catch(r){throw ji!==null&&(ji=ji.slice(n+1)),A0(xh,Gr),r}finally{Ke=e,jc=!1}}return null}var to=[],no=0,bu=null,Pu=0,Qn=[],Jn=0,ys=null,Yi=1,qi="";function Jr(n,e){to[no++]=Pu,to[no++]=bu,bu=n,Pu=e}function nv(n,e,t){Qn[Jn++]=Yi,Qn[Jn++]=qi,Qn[Jn++]=ys,ys=n;var i=Yi;n=qi;var r=32-yi(i)-1;i&=~(1<<r),t+=1;var s=32-yi(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Yi=1<<32-yi(e)+r|t<<r|i,qi=s+n}else Yi=1<<s|t<<r|i,qi=n}function Ch(n){n.return!==null&&(Jr(n,1),nv(n,1,0))}function bh(n){for(;n===bu;)bu=to[--no],to[no]=null,Pu=to[--no],to[no]=null;for(;n===ys;)ys=Qn[--Jn],Qn[Jn]=null,qi=Qn[--Jn],Qn[Jn]=null,Yi=Qn[--Jn],Qn[Jn]=null}var Vn=null,kn=null,ct=!1,mi=null;function iv(n,e){var t=ni(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Em(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,Vn=n,kn=wr(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,Vn=n,kn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=ys!==null?{id:Yi,overflow:qi}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=ni(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,Vn=n,kn=null,!0):!1;default:return!1}}function vd(n){return(n.mode&1)!==0&&(n.flags&128)===0}function xd(n){if(ct){var e=kn;if(e){var t=e;if(!Em(n,e)){if(vd(n))throw Error(ie(418));e=wr(t.nextSibling);var i=Vn;e&&Em(n,e)?iv(i,t):(n.flags=n.flags&-4097|2,ct=!1,Vn=n)}}else{if(vd(n))throw Error(ie(418));n.flags=n.flags&-4097|2,ct=!1,Vn=n}}}function Tm(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Vn=n}function El(n){if(n!==Vn)return!1;if(!ct)return Tm(n),ct=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!pd(n.type,n.memoizedProps)),e&&(e=kn)){if(vd(n))throw rv(),Error(ie(418));for(;e;)iv(n,e),e=wr(e.nextSibling)}if(Tm(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(ie(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){kn=wr(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}kn=null}}else kn=Vn?wr(n.stateNode.nextSibling):null;return!0}function rv(){for(var n=kn;n;)n=wr(n.nextSibling)}function To(){kn=Vn=null,ct=!1}function Ph(n){mi===null?mi=[n]:mi.push(n)}var FM=rr.ReactCurrentBatchConfig;function Qo(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(ie(309));var i=t.stateNode}if(!i)throw Error(ie(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(ie(284));if(!t._owner)throw Error(ie(290,n))}return n}function Tl(n,e){throw n=Object.prototype.toString.call(e),Error(ie(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function wm(n){var e=n._init;return e(n._payload)}function sv(n){function e(d,_){if(n){var v=d.deletions;v===null?(d.deletions=[_],d.flags|=16):v.push(_)}}function t(d,_){if(!n)return null;for(;_!==null;)e(d,_),_=_.sibling;return null}function i(d,_){for(d=new Map;_!==null;)_.key!==null?d.set(_.key,_):d.set(_.index,_),_=_.sibling;return d}function r(d,_){return d=br(d,_),d.index=0,d.sibling=null,d}function s(d,_,v){return d.index=v,n?(v=d.alternate,v!==null?(v=v.index,v<_?(d.flags|=2,_):v):(d.flags|=2,_)):(d.flags|=1048576,_)}function o(d){return n&&d.alternate===null&&(d.flags|=2),d}function a(d,_,v,y){return _===null||_.tag!==6?(_=Qc(v,d.mode,y),_.return=d,_):(_=r(_,v),_.return=d,_)}function l(d,_,v,y){var T=v.type;return T===$s?c(d,_,v.props.children,y,v.key):_!==null&&(_.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===fr&&wm(T)===_.type)?(y=r(_,v.props),y.ref=Qo(d,_,v),y.return=d,y):(y=du(v.type,v.key,v.props,null,d.mode,y),y.ref=Qo(d,_,v),y.return=d,y)}function u(d,_,v,y){return _===null||_.tag!==4||_.stateNode.containerInfo!==v.containerInfo||_.stateNode.implementation!==v.implementation?(_=Jc(v,d.mode,y),_.return=d,_):(_=r(_,v.children||[]),_.return=d,_)}function c(d,_,v,y,T){return _===null||_.tag!==7?(_=fs(v,d.mode,y,T),_.return=d,_):(_=r(_,v),_.return=d,_)}function f(d,_,v){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Qc(""+_,d.mode,v),_.return=d,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case hl:return v=du(_.type,_.key,_.props,null,d.mode,v),v.ref=Qo(d,null,_),v.return=d,v;case qs:return _=Jc(_,d.mode,v),_.return=d,_;case fr:var y=_._init;return f(d,y(_._payload),v)}if(ua(_)||Yo(_))return _=fs(_,d.mode,v,null),_.return=d,_;Tl(d,_)}return null}function h(d,_,v,y){var T=_!==null?_.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return T!==null?null:a(d,_,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case hl:return v.key===T?l(d,_,v,y):null;case qs:return v.key===T?u(d,_,v,y):null;case fr:return T=v._init,h(d,_,T(v._payload),y)}if(ua(v)||Yo(v))return T!==null?null:c(d,_,v,y,null);Tl(d,v)}return null}function p(d,_,v,y,T){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(v)||null,a(_,d,""+y,T);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case hl:return d=d.get(y.key===null?v:y.key)||null,l(_,d,y,T);case qs:return d=d.get(y.key===null?v:y.key)||null,u(_,d,y,T);case fr:var A=y._init;return p(d,_,v,A(y._payload),T)}if(ua(y)||Yo(y))return d=d.get(v)||null,c(_,d,y,T,null);Tl(_,y)}return null}function x(d,_,v,y){for(var T=null,A=null,E=_,b=_=0,S=null;E!==null&&b<v.length;b++){E.index>b?(S=E,E=null):S=E.sibling;var w=h(d,E,v[b],y);if(w===null){E===null&&(E=S);break}n&&E&&w.alternate===null&&e(d,E),_=s(w,_,b),A===null?T=w:A.sibling=w,A=w,E=S}if(b===v.length)return t(d,E),ct&&Jr(d,b),T;if(E===null){for(;b<v.length;b++)E=f(d,v[b],y),E!==null&&(_=s(E,_,b),A===null?T=E:A.sibling=E,A=E);return ct&&Jr(d,b),T}for(E=i(d,E);b<v.length;b++)S=p(E,d,b,v[b],y),S!==null&&(n&&S.alternate!==null&&E.delete(S.key===null?b:S.key),_=s(S,_,b),A===null?T=S:A.sibling=S,A=S);return n&&E.forEach(function(U){return e(d,U)}),ct&&Jr(d,b),T}function g(d,_,v,y){var T=Yo(v);if(typeof T!="function")throw Error(ie(150));if(v=T.call(v),v==null)throw Error(ie(151));for(var A=T=null,E=_,b=_=0,S=null,w=v.next();E!==null&&!w.done;b++,w=v.next()){E.index>b?(S=E,E=null):S=E.sibling;var U=h(d,E,w.value,y);if(U===null){E===null&&(E=S);break}n&&E&&U.alternate===null&&e(d,E),_=s(U,_,b),A===null?T=U:A.sibling=U,A=U,E=S}if(w.done)return t(d,E),ct&&Jr(d,b),T;if(E===null){for(;!w.done;b++,w=v.next())w=f(d,w.value,y),w!==null&&(_=s(w,_,b),A===null?T=w:A.sibling=w,A=w);return ct&&Jr(d,b),T}for(E=i(d,E);!w.done;b++,w=v.next())w=p(E,d,b,w.value,y),w!==null&&(n&&w.alternate!==null&&E.delete(w.key===null?b:w.key),_=s(w,_,b),A===null?T=w:A.sibling=w,A=w);return n&&E.forEach(function(k){return e(d,k)}),ct&&Jr(d,b),T}function m(d,_,v,y){if(typeof v=="object"&&v!==null&&v.type===$s&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case hl:e:{for(var T=v.key,A=_;A!==null;){if(A.key===T){if(T=v.type,T===$s){if(A.tag===7){t(d,A.sibling),_=r(A,v.props.children),_.return=d,d=_;break e}}else if(A.elementType===T||typeof T=="object"&&T!==null&&T.$$typeof===fr&&wm(T)===A.type){t(d,A.sibling),_=r(A,v.props),_.ref=Qo(d,A,v),_.return=d,d=_;break e}t(d,A);break}else e(d,A);A=A.sibling}v.type===$s?(_=fs(v.props.children,d.mode,y,v.key),_.return=d,d=_):(y=du(v.type,v.key,v.props,null,d.mode,y),y.ref=Qo(d,_,v),y.return=d,d=y)}return o(d);case qs:e:{for(A=v.key;_!==null;){if(_.key===A)if(_.tag===4&&_.stateNode.containerInfo===v.containerInfo&&_.stateNode.implementation===v.implementation){t(d,_.sibling),_=r(_,v.children||[]),_.return=d,d=_;break e}else{t(d,_);break}else e(d,_);_=_.sibling}_=Jc(v,d.mode,y),_.return=d,d=_}return o(d);case fr:return A=v._init,m(d,_,A(v._payload),y)}if(ua(v))return x(d,_,v,y);if(Yo(v))return g(d,_,v,y);Tl(d,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,_!==null&&_.tag===6?(t(d,_.sibling),_=r(_,v),_.return=d,d=_):(t(d,_),_=Qc(v,d.mode,y),_.return=d,d=_),o(d)):t(d,_)}return m}var wo=sv(!0),ov=sv(!1),Lu=Hr(null),Du=null,io=null,Lh=null;function Dh(){Lh=io=Du=null}function Nh(n){var e=Lu.current;lt(Lu),n._currentValue=e}function yd(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function mo(n,e){Du=n,Lh=io=null,n=n.dependencies,n!==null&&n.firstContext!==null&&(n.lanes&e&&(yn=!0),n.firstContext=null)}function ai(n){var e=n._currentValue;if(Lh!==n)if(n={context:n,memoizedValue:e,next:null},io===null){if(Du===null)throw Error(ie(308));io=n,Du.dependencies={lanes:0,firstContext:n}}else io=io.next=n;return e}var as=null;function Ih(n){as===null?as=[n]:as.push(n)}function av(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,Ih(e)):(t.next=r.next,r.next=t),e.interleaved=t,Ji(n,i)}function Ji(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var dr=!1;function Uh(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function lv(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Ki(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function Ar(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,qe&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ji(n,t)}return r=i.interleaved,r===null?(e.next=e,Ih(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ji(n,t)}function ou(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,yh(n,t)}}function Am(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function Nu(n,e,t,i){var r=n.updateQueue;dr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var c=n.alternate;c!==null&&(c=c.updateQueue,a=c.lastBaseUpdate,a!==o&&(a===null?c.firstBaseUpdate=u:a.next=u,c.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,c=u=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){c!==null&&(c=c.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=n,g=a;switch(h=e,p=t,g.tag){case 1:if(x=g.payload,typeof x=="function"){f=x.call(p,f,h);break e}f=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=g.payload,h=typeof x=="function"?x.call(p,f,h):x,h==null)break e;f=yt({},f,h);break e;case 2:dr=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},c===null?(u=c=p,l=f):c=c.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(c===null&&(l=f),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=c,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Ms|=o,n.lanes=o,n.memoizedState=f}}function Rm(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var rl={},Ni=Hr(rl),ka=Hr(rl),za=Hr(rl);function ls(n){if(n===rl)throw Error(ie(174));return n}function Oh(n,e){switch(st(za,e),st(ka,n),st(Ni,rl),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ed(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=ed(e,n)}lt(Ni),st(Ni,e)}function Ao(){lt(Ni),lt(ka),lt(za)}function uv(n){ls(za.current);var e=ls(Ni.current),t=ed(e,n.type);e!==t&&(st(ka,n),st(Ni,t))}function Fh(n){ka.current===n&&(lt(Ni),lt(ka))}var mt=Hr(0);function Iu(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Xc=[];function kh(){for(var n=0;n<Xc.length;n++)Xc[n]._workInProgressVersionPrimary=null;Xc.length=0}var au=rr.ReactCurrentDispatcher,Yc=rr.ReactCurrentBatchConfig,Ss=0,vt=null,Nt=null,Vt=null,Uu=!1,xa=!1,Ba=0,kM=0;function Qt(){throw Error(ie(321))}function zh(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!Mi(n[t],e[t]))return!1;return!0}function Bh(n,e,t,i,r,s){if(Ss=s,vt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,au.current=n===null||n.memoizedState===null?HM:GM,n=t(i,r),xa){s=0;do{if(xa=!1,Ba=0,25<=s)throw Error(ie(301));s+=1,Vt=Nt=null,e.updateQueue=null,au.current=WM,n=t(i,r)}while(xa)}if(au.current=Ou,e=Nt!==null&&Nt.next!==null,Ss=0,Vt=Nt=vt=null,Uu=!1,e)throw Error(ie(300));return n}function Vh(){var n=Ba!==0;return Ba=0,n}function wi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vt===null?vt.memoizedState=Vt=n:Vt=Vt.next=n,Vt}function li(){if(Nt===null){var n=vt.alternate;n=n!==null?n.memoizedState:null}else n=Nt.next;var e=Vt===null?vt.memoizedState:Vt.next;if(e!==null)Vt=e,Nt=n;else{if(n===null)throw Error(ie(310));Nt=n,n={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Vt===null?vt.memoizedState=Vt=n:Vt=Vt.next=n}return Vt}function Va(n,e){return typeof e=="function"?e(n):e}function qc(n){var e=li(),t=e.queue;if(t===null)throw Error(ie(311));t.lastRenderedReducer=n;var i=Nt,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var c=u.lane;if((Ss&c)===c)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:n(i,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,vt.lanes|=c,Ms|=c}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,Mi(i,e.memoizedState)||(yn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,vt.lanes|=s,Ms|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function $c(n){var e=li(),t=e.queue;if(t===null)throw Error(ie(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);Mi(s,e.memoizedState)||(yn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function cv(){}function fv(n,e){var t=vt,i=li(),r=e(),s=!Mi(i.memoizedState,r);if(s&&(i.memoizedState=r,yn=!0),i=i.queue,Hh(pv.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||Vt!==null&&Vt.memoizedState.tag&1){if(t.flags|=2048,Ha(9,hv.bind(null,t,i,r,e),void 0,null),Ht===null)throw Error(ie(349));Ss&30||dv(t,e,r)}return r}function dv(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function hv(n,e,t,i){e.value=t,e.getSnapshot=i,mv(e)&&gv(n)}function pv(n,e,t){return t(function(){mv(e)&&gv(n)})}function mv(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!Mi(n,t)}catch{return!0}}function gv(n){var e=Ji(n,1);e!==null&&Si(e,n,1,-1)}function Cm(n){var e=wi();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Va,lastRenderedState:n},e.queue=n,n=n.dispatch=VM.bind(null,vt,n),[e.memoizedState,n]}function Ha(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=vt.updateQueue,e===null?(e={lastEffect:null,stores:null},vt.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function _v(){return li().memoizedState}function lu(n,e,t,i){var r=wi();vt.flags|=n,r.memoizedState=Ha(1|e,t,void 0,i===void 0?null:i)}function lc(n,e,t,i){var r=li();i=i===void 0?null:i;var s=void 0;if(Nt!==null){var o=Nt.memoizedState;if(s=o.destroy,i!==null&&zh(i,o.deps)){r.memoizedState=Ha(e,t,s,i);return}}vt.flags|=n,r.memoizedState=Ha(1|e,t,s,i)}function bm(n,e){return lu(8390656,8,n,e)}function Hh(n,e){return lc(2048,8,n,e)}function vv(n,e){return lc(4,2,n,e)}function xv(n,e){return lc(4,4,n,e)}function yv(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function Sv(n,e,t){return t=t!=null?t.concat([n]):null,lc(4,4,yv.bind(null,e,n),t)}function Gh(){}function Mv(n,e){var t=li();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&zh(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function Ev(n,e){var t=li();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&zh(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function Tv(n,e,t){return Ss&21?(Mi(t,e)||(t=b0(),vt.lanes|=t,Ms|=t,n.baseState=!0),e):(n.baseState&&(n.baseState=!1,yn=!0),n.memoizedState=t)}function zM(n,e){var t=Ke;Ke=t!==0&&4>t?t:4,n(!0);var i=Yc.transition;Yc.transition={};try{n(!1),e()}finally{Ke=t,Yc.transition=i}}function wv(){return li().memoizedState}function BM(n,e,t){var i=Cr(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},Av(n))Rv(e,t);else if(t=av(n,e,t,i),t!==null){var r=pn();Si(t,n,i,r),Cv(t,e,i)}}function VM(n,e,t){var i=Cr(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(Av(n))Rv(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(r.hasEagerState=!0,r.eagerState=a,Mi(a,o)){var l=e.interleaved;l===null?(r.next=r,Ih(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}t=av(n,e,r,i),t!==null&&(r=pn(),Si(t,n,i,r),Cv(t,e,i))}}function Av(n){var e=n.alternate;return n===vt||e!==null&&e===vt}function Rv(n,e){xa=Uu=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function Cv(n,e,t){if(t&4194240){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,yh(n,t)}}var Ou={readContext:ai,useCallback:Qt,useContext:Qt,useEffect:Qt,useImperativeHandle:Qt,useInsertionEffect:Qt,useLayoutEffect:Qt,useMemo:Qt,useReducer:Qt,useRef:Qt,useState:Qt,useDebugValue:Qt,useDeferredValue:Qt,useTransition:Qt,useMutableSource:Qt,useSyncExternalStore:Qt,useId:Qt,unstable_isNewReconciler:!1},HM={readContext:ai,useCallback:function(n,e){return wi().memoizedState=[n,e===void 0?null:e],n},useContext:ai,useEffect:bm,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,lu(4194308,4,yv.bind(null,e,n),t)},useLayoutEffect:function(n,e){return lu(4194308,4,n,e)},useInsertionEffect:function(n,e){return lu(4,2,n,e)},useMemo:function(n,e){var t=wi();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=wi();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=BM.bind(null,vt,n),[i.memoizedState,n]},useRef:function(n){var e=wi();return n={current:n},e.memoizedState=n},useState:Cm,useDebugValue:Gh,useDeferredValue:function(n){return wi().memoizedState=n},useTransition:function(){var n=Cm(!1),e=n[0];return n=zM.bind(null,n[1]),wi().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=vt,r=wi();if(ct){if(t===void 0)throw Error(ie(407));t=t()}else{if(t=e(),Ht===null)throw Error(ie(349));Ss&30||dv(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,bm(pv.bind(null,i,s,n),[n]),i.flags|=2048,Ha(9,hv.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=wi(),e=Ht.identifierPrefix;if(ct){var t=qi,i=Yi;t=(i&~(1<<32-yi(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=Ba++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=kM++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},GM={readContext:ai,useCallback:Mv,useContext:ai,useEffect:Hh,useImperativeHandle:Sv,useInsertionEffect:vv,useLayoutEffect:xv,useMemo:Ev,useReducer:qc,useRef:_v,useState:function(){return qc(Va)},useDebugValue:Gh,useDeferredValue:function(n){var e=li();return Tv(e,Nt.memoizedState,n)},useTransition:function(){var n=qc(Va)[0],e=li().memoizedState;return[n,e]},useMutableSource:cv,useSyncExternalStore:fv,useId:wv,unstable_isNewReconciler:!1},WM={readContext:ai,useCallback:Mv,useContext:ai,useEffect:Hh,useImperativeHandle:Sv,useInsertionEffect:vv,useLayoutEffect:xv,useMemo:Ev,useReducer:$c,useRef:_v,useState:function(){return $c(Va)},useDebugValue:Gh,useDeferredValue:function(n){var e=li();return Nt===null?e.memoizedState=n:Tv(e,Nt.memoizedState,n)},useTransition:function(){var n=$c(Va)[0],e=li().memoizedState;return[n,e]},useMutableSource:cv,useSyncExternalStore:fv,useId:wv,unstable_isNewReconciler:!1};function hi(n,e){if(n&&n.defaultProps){e=yt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}function Sd(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:yt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var uc={isMounted:function(n){return(n=n._reactInternals)?Rs(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=pn(),r=Cr(n),s=Ki(i,r);s.payload=e,t!=null&&(s.callback=t),e=Ar(n,s,r),e!==null&&(Si(e,n,r,i),ou(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=pn(),r=Cr(n),s=Ki(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=Ar(n,s,r),e!==null&&(Si(e,n,r,i),ou(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=pn(),i=Cr(n),r=Ki(t,i);r.tag=2,e!=null&&(r.callback=e),e=Ar(n,r,i),e!==null&&(Si(e,n,i,t),ou(e,n,i))}};function Pm(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Ia(t,i)||!Ia(r,s):!0}function bv(n,e,t){var i=!1,r=Or,s=e.contextType;return typeof s=="object"&&s!==null?s=ai(s):(r=Mn(e)?xs:an.current,i=e.contextTypes,s=(i=i!=null)?Eo(n,r):Or),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=uc,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function Lm(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&uc.enqueueReplaceState(e,e.state,null)}function Md(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs={},Uh(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=ai(s):(s=Mn(e)?xs:an.current,r.context=Eo(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Sd(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&uc.enqueueReplaceState(r,r.state,null),Nu(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function Ro(n,e){try{var t="",i=e;do t+=vS(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function Kc(n,e,t){return{value:n,source:null,stack:t??null,digest:e??null}}function Ed(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var jM=typeof WeakMap=="function"?WeakMap:Map;function Pv(n,e,t){t=Ki(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){ku||(ku=!0,Nd=i),Ed(n,e)},t}function Lv(n,e,t){t=Ki(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){Ed(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Ed(n,e),typeof i!="function"&&(Rr===null?Rr=new Set([this]):Rr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Dm(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new jM;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=s1.bind(null,n,e,t),e.then(n,n))}function Nm(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Im(n,e,t,i,r){return n.mode&1?(n.flags|=65536,n.lanes=r,n):(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Ki(-1,1),e.tag=2,Ar(t,e,1))),t.lanes|=1),n)}var XM=rr.ReactCurrentOwner,yn=!1;function fn(n,e,t,i){e.child=n===null?ov(e,null,t,i):wo(e,n.child,t,i)}function Um(n,e,t,i,r){t=t.render;var s=e.ref;return mo(e,r),i=Bh(n,e,t,i,s,r),t=Vh(),n!==null&&!yn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,er(n,e,r)):(ct&&t&&Ch(e),e.flags|=1,fn(n,e,i,r),e.child)}function Om(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!Zh(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,Dv(n,e,s,i,r)):(n=du(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,!(n.lanes&r)){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:Ia,t(o,i)&&n.ref===e.ref)return er(n,e,r)}return e.flags|=1,n=br(s,i),n.ref=e.ref,n.return=e,e.child=n}function Dv(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if(Ia(s,i)&&n.ref===e.ref)if(yn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)n.flags&131072&&(yn=!0);else return e.lanes=n.lanes,er(n,e,r)}return Td(n,e,t,i,r)}function Nv(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},st(so,In),In|=t;else{if(!(t&1073741824))return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,st(so,In),In|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,st(so,In),In|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,st(so,In),In|=i;return fn(n,e,r,t),e.child}function Iv(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Td(n,e,t,i,r){var s=Mn(t)?xs:an.current;return s=Eo(e,s),mo(e,r),t=Bh(n,e,t,i,s,r),i=Vh(),n!==null&&!yn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,er(n,e,r)):(ct&&i&&Ch(e),e.flags|=1,fn(n,e,t,r),e.child)}function Fm(n,e,t,i,r){if(Mn(t)){var s=!0;Cu(e)}else s=!1;if(mo(e,r),e.stateNode===null)uu(n,e),bv(e,t,i),Md(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=t.contextType;typeof u=="object"&&u!==null?u=ai(u):(u=Mn(t)?xs:an.current,u=Eo(e,u));var c=t.getDerivedStateFromProps,f=typeof c=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&Lm(e,o,i,u),dr=!1;var h=e.memoizedState;o.state=h,Nu(e,i,o,r),l=e.memoizedState,a!==i||h!==l||Sn.current||dr?(typeof c=="function"&&(Sd(e,t,c,i),l=e.memoizedState),(a=dr||Pm(e,t,a,i,h,l,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,lv(n,e),a=e.memoizedProps,u=e.type===e.elementType?a:hi(e.type,a),o.props=u,f=e.pendingProps,h=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=ai(l):(l=Mn(t)?xs:an.current,l=Eo(e,l));var p=t.getDerivedStateFromProps;(c=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&Lm(e,o,i,l),dr=!1,h=e.memoizedState,o.state=h,Nu(e,i,o,r);var x=e.memoizedState;a!==f||h!==x||Sn.current||dr?(typeof p=="function"&&(Sd(e,t,p,i),x=e.memoizedState),(u=dr||Pm(e,t,u,i,h,x,l)||!1)?(c||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,x,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,x,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=x),o.props=i,o.state=x,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),i=!1)}return wd(n,e,t,i,s,r)}function wd(n,e,t,i,r,s){Iv(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Mm(e,t,!1),er(n,e,s);i=e.stateNode,XM.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=wo(e,n.child,null,s),e.child=wo(e,null,a,s)):fn(n,e,a,s),e.memoizedState=i.state,r&&Mm(e,t,!0),e.child}function Uv(n){var e=n.stateNode;e.pendingContext?Sm(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Sm(n,e.context,!1),Oh(n,e.containerInfo)}function km(n,e,t,i,r){return To(),Ph(r),e.flags|=256,fn(n,e,t,i),e.child}var Ad={dehydrated:null,treeContext:null,retryLane:0};function Rd(n){return{baseLanes:n,cachePool:null,transitions:null}}function Ov(n,e,t){var i=e.pendingProps,r=mt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),st(mt,r&1),n===null)return xd(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?(e.mode&1?n.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=dc(o,i,0,null),n=fs(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Rd(t),e.memoizedState=Ad,n):Wh(e,o));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return YM(n,e,o,i,a,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=br(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=br(a,s):(s=fs(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?Rd(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=Ad,i}return s=n.child,n=s.sibling,i=br(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function Wh(n,e){return e=dc({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function wl(n,e,t,i){return i!==null&&Ph(i),wo(e,n.child,null,t),n=Wh(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function YM(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=Kc(Error(ie(422))),wl(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=dc({mode:"visible",children:i.children},r,0,null),s=fs(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&wo(e,n.child,null,o),e.child.memoizedState=Rd(o),e.memoizedState=Ad,s);if(!(e.mode&1))return wl(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ie(419)),i=Kc(s,i,void 0),wl(n,e,o,i)}if(a=(o&n.childLanes)!==0,yn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ji(n,r),Si(i,n,r,-1))}return Kh(),i=Kc(Error(ie(421))),wl(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=o1.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,kn=wr(r.nextSibling),Vn=e,ct=!0,mi=null,n!==null&&(Qn[Jn++]=Yi,Qn[Jn++]=qi,Qn[Jn++]=ys,Yi=n.id,qi=n.overflow,ys=e),e=Wh(e,i.children),e.flags|=4096,e)}function zm(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),yd(n.return,e,t)}function Zc(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function Fv(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(fn(n,e,i.children,t),i=mt.current,i&2)i=i&1|2,e.flags|=128;else{if(n!==null&&n.flags&128)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&zm(n,t,e);else if(n.tag===19)zm(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(st(mt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&Iu(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),Zc(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&Iu(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}Zc(e,!0,t,null,s);break;case"together":Zc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function uu(n,e){!(e.mode&1)&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function er(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),Ms|=e.lanes,!(t&e.childLanes))return null;if(n!==null&&e.child!==n.child)throw Error(ie(153));if(e.child!==null){for(n=e.child,t=br(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=br(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function qM(n,e,t){switch(e.tag){case 3:Uv(e),To();break;case 5:uv(e);break;case 1:Mn(e.type)&&Cu(e);break;case 4:Oh(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;st(Lu,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(st(mt,mt.current&1),e.flags|=128,null):t&e.child.childLanes?Ov(n,e,t):(st(mt,mt.current&1),n=er(n,e,t),n!==null?n.sibling:null);st(mt,mt.current&1);break;case 19:if(i=(t&e.childLanes)!==0,n.flags&128){if(i)return Fv(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),st(mt,mt.current),i)break;return null;case 22:case 23:return e.lanes=0,Nv(n,e,t)}return er(n,e,t)}var kv,Cd,zv,Bv;kv=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Cd=function(){};zv=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,ls(Ni.current);var s=null;switch(t){case"input":r=Kf(n,r),i=Kf(n,i),s=[];break;case"select":r=yt({},r,{value:void 0}),i=yt({},i,{value:void 0}),s=[];break;case"textarea":r=Jf(n,r),i=Jf(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=Au)}td(t,i);var o;t=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ra.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(u,t)),t=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ra.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&ot("scroll",n),s||a===l||(s=[])):(s=s||[]).push(u,l))}t&&(s=s||[]).push("style",t);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};Bv=function(n,e,t,i){t!==i&&(e.flags|=4)};function Jo(n,e){if(!ct)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function Jt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function $M(n,e,t){var i=e.pendingProps;switch(bh(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Jt(e),null;case 1:return Mn(e.type)&&Ru(),Jt(e),null;case 3:return i=e.stateNode,Ao(),lt(Sn),lt(an),kh(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(El(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,mi!==null&&(Od(mi),mi=null))),Cd(n,e),Jt(e),null;case 5:Fh(e);var r=ls(za.current);if(t=e.type,n!==null&&e.stateNode!=null)zv(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return Jt(e),null}if(n=ls(Ni.current),El(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[bi]=e,i[Fa]=s,n=(e.mode&1)!==0,t){case"dialog":ot("cancel",i),ot("close",i);break;case"iframe":case"object":case"embed":ot("load",i);break;case"video":case"audio":for(r=0;r<fa.length;r++)ot(fa[r],i);break;case"source":ot("error",i);break;case"img":case"image":case"link":ot("error",i),ot("load",i);break;case"details":ot("toggle",i);break;case"input":qp(i,s),ot("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ot("invalid",i);break;case"textarea":Kp(i,s),ot("invalid",i)}td(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&Ml(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Ml(i.textContent,a,n),r=["children",""+a]):Ra.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ot("scroll",i)}switch(t){case"input":pl(i),$p(i,s,!0);break;case"textarea":pl(i),Zp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Au)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=p0(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[bi]=e,n[Fa]=i,kv(n,e,!1,!1),e.stateNode=n;e:{switch(o=nd(t,i),t){case"dialog":ot("cancel",n),ot("close",n),r=i;break;case"iframe":case"object":case"embed":ot("load",n),r=i;break;case"video":case"audio":for(r=0;r<fa.length;r++)ot(fa[r],n);r=i;break;case"source":ot("error",n),r=i;break;case"img":case"image":case"link":ot("error",n),ot("load",n),r=i;break;case"details":ot("toggle",n),r=i;break;case"input":qp(n,i),r=Kf(n,i),ot("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=yt({},i,{value:void 0}),ot("invalid",n);break;case"textarea":Kp(n,i),r=Jf(n,i),ot("invalid",n);break;default:r=i}td(t,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?_0(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&m0(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Ca(n,l):typeof l=="number"&&Ca(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ra.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ot("scroll",n):l!=null&&ph(n,s,l,o))}switch(t){case"input":pl(n),$p(n,i,!1);break;case"textarea":pl(n),Zp(n);break;case"option":i.value!=null&&n.setAttribute("value",""+Ur(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?co(n,!!i.multiple,s,!1):i.defaultValue!=null&&co(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=Au)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Jt(e),null;case 6:if(n&&e.stateNode!=null)Bv(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(t=ls(za.current),ls(Ni.current),El(e)){if(i=e.stateNode,t=e.memoizedProps,i[bi]=e,(s=i.nodeValue!==t)&&(n=Vn,n!==null))switch(n.tag){case 3:Ml(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ml(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[bi]=e,e.stateNode=i}return Jt(e),null;case 13:if(lt(mt),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(ct&&kn!==null&&e.mode&1&&!(e.flags&128))rv(),To(),e.flags|=98560,s=!1;else if(s=El(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(ie(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ie(317));s[bi]=e}else To(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Jt(e),s=!1}else mi!==null&&(Od(mi),mi=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(n===null||mt.current&1?It===0&&(It=3):Kh())),e.updateQueue!==null&&(e.flags|=4),Jt(e),null);case 4:return Ao(),Cd(n,e),n===null&&Ua(e.stateNode.containerInfo),Jt(e),null;case 10:return Nh(e.type._context),Jt(e),null;case 17:return Mn(e.type)&&Ru(),Jt(e),null;case 19:if(lt(mt),s=e.memoizedState,s===null)return Jt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Jo(s,!1);else{if(It!==0||n!==null&&n.flags&128)for(n=e.child;n!==null;){if(o=Iu(n),o!==null){for(e.flags|=128,Jo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return st(mt,mt.current&1|2),e.child}n=n.sibling}s.tail!==null&&Ct()>Co&&(e.flags|=128,i=!0,Jo(s,!1),e.lanes=4194304)}else{if(!i)if(n=Iu(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Jo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ct)return Jt(e),null}else 2*Ct()-s.renderingStartTime>Co&&t!==1073741824&&(e.flags|=128,i=!0,Jo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ct(),e.sibling=null,t=mt.current,st(mt,i?t&1|2:t&1),e):(Jt(e),null);case 22:case 23:return $h(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?In&1073741824&&(Jt(e),e.subtreeFlags&6&&(e.flags|=8192)):Jt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function KM(n,e){switch(bh(e),e.tag){case 1:return Mn(e.type)&&Ru(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Ao(),lt(Sn),lt(an),kh(),n=e.flags,n&65536&&!(n&128)?(e.flags=n&-65537|128,e):null;case 5:return Fh(e),null;case 13:if(lt(mt),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));To()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return lt(mt),null;case 4:return Ao(),null;case 10:return Nh(e.type._context),null;case 22:case 23:return $h(),null;case 24:return null;default:return null}}var Al=!1,nn=!1,ZM=typeof WeakSet=="function"?WeakSet:Set,he=null;function ro(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){Et(n,e,i)}else t.current=null}function bd(n,e,t){try{t()}catch(i){Et(n,e,i)}}var Bm=!1;function QM(n,e){if(dd=Eu,n=j0(),Rh(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,u=0,c=0,f=n,h=null;t:for(;;){for(var p;f!==t||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===n)break t;if(h===t&&++u===r&&(a=o),h===s&&++c===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(hd={focusedElem:n,selectionRange:t},Eu=!1,he=e;he!==null;)if(e=he,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,he=n;else for(;he!==null;){e=he;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var g=x.memoizedProps,m=x.memoizedState,d=e.stateNode,_=d.getSnapshotBeforeUpdate(e.elementType===e.type?g:hi(e.type,g),m);d.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(y){Et(e,e.return,y)}if(n=e.sibling,n!==null){n.return=e.return,he=n;break}he=e.return}return x=Bm,Bm=!1,x}function ya(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&bd(e,t,s)}r=r.next}while(r!==i)}}function cc(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function Pd(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function Vv(n){var e=n.alternate;e!==null&&(n.alternate=null,Vv(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[bi],delete e[Fa],delete e[gd],delete e[IM],delete e[UM])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Hv(n){return n.tag===5||n.tag===3||n.tag===4}function Vm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Hv(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Ld(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=Au));else if(i!==4&&(n=n.child,n!==null))for(Ld(n,e,t),n=n.sibling;n!==null;)Ld(n,e,t),n=n.sibling}function Dd(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(Dd(n,e,t),n=n.sibling;n!==null;)Dd(n,e,t),n=n.sibling}var Wt=null,pi=!1;function sr(n,e,t){for(t=t.child;t!==null;)Gv(n,e,t),t=t.sibling}function Gv(n,e,t){if(Di&&typeof Di.onCommitFiberUnmount=="function")try{Di.onCommitFiberUnmount(nc,t)}catch{}switch(t.tag){case 5:nn||ro(t,e);case 6:var i=Wt,r=pi;Wt=null,sr(n,e,t),Wt=i,pi=r,Wt!==null&&(pi?(n=Wt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Wt.removeChild(t.stateNode));break;case 18:Wt!==null&&(pi?(n=Wt,t=t.stateNode,n.nodeType===8?Wc(n.parentNode,t):n.nodeType===1&&Wc(n,t),Da(n)):Wc(Wt,t.stateNode));break;case 4:i=Wt,r=pi,Wt=t.stateNode.containerInfo,pi=!0,sr(n,e,t),Wt=i,pi=r;break;case 0:case 11:case 14:case 15:if(!nn&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&bd(t,e,o),r=r.next}while(r!==i)}sr(n,e,t);break;case 1:if(!nn&&(ro(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){Et(t,e,a)}sr(n,e,t);break;case 21:sr(n,e,t);break;case 22:t.mode&1?(nn=(i=nn)||t.memoizedState!==null,sr(n,e,t),nn=i):sr(n,e,t);break;default:sr(n,e,t)}}function Hm(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new ZM),e.forEach(function(i){var r=a1.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function ui(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Wt=a.stateNode,pi=!1;break e;case 3:Wt=a.stateNode.containerInfo,pi=!0;break e;case 4:Wt=a.stateNode.containerInfo,pi=!0;break e}a=a.return}if(Wt===null)throw Error(ie(160));Gv(s,o,r),Wt=null,pi=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){Et(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Wv(e,n),e=e.sibling}function Wv(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ui(e,n),Ti(n),i&4){try{ya(3,n,n.return),cc(3,n)}catch(g){Et(n,n.return,g)}try{ya(5,n,n.return)}catch(g){Et(n,n.return,g)}}break;case 1:ui(e,n),Ti(n),i&512&&t!==null&&ro(t,t.return);break;case 5:if(ui(e,n),Ti(n),i&512&&t!==null&&ro(t,t.return),n.flags&32){var r=n.stateNode;try{Ca(r,"")}catch(g){Et(n,n.return,g)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&d0(r,s),nd(a,o);var u=nd(a,s);for(o=0;o<l.length;o+=2){var c=l[o],f=l[o+1];c==="style"?_0(r,f):c==="dangerouslySetInnerHTML"?m0(r,f):c==="children"?Ca(r,f):ph(r,c,f,u)}switch(a){case"input":Zf(r,s);break;case"textarea":h0(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?co(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?co(r,!!s.multiple,s.defaultValue,!0):co(r,!!s.multiple,s.multiple?[]:"",!1))}r[Fa]=s}catch(g){Et(n,n.return,g)}}break;case 6:if(ui(e,n),Ti(n),i&4){if(n.stateNode===null)throw Error(ie(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(g){Et(n,n.return,g)}}break;case 3:if(ui(e,n),Ti(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{Da(e.containerInfo)}catch(g){Et(n,n.return,g)}break;case 4:ui(e,n),Ti(n);break;case 13:ui(e,n),Ti(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Yh=Ct())),i&4&&Hm(n);break;case 22:if(c=t!==null&&t.memoizedState!==null,n.mode&1?(nn=(u=nn)||c,ui(e,n),nn=u):ui(e,n),Ti(n),i&8192){if(u=n.memoizedState!==null,(n.stateNode.isHidden=u)&&!c&&n.mode&1)for(he=n,c=n.child;c!==null;){for(f=he=c;he!==null;){switch(h=he,p=h.child,h.tag){case 0:case 11:case 14:case 15:ya(4,h,h.return);break;case 1:ro(h,h.return);var x=h.stateNode;if(typeof x.componentWillUnmount=="function"){i=h,t=h.return;try{e=i,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(g){Et(i,t,g)}}break;case 5:ro(h,h.return);break;case 22:if(h.memoizedState!==null){Wm(f);continue}}p!==null?(p.return=h,he=p):Wm(f)}c=c.sibling}e:for(c=null,f=n;;){if(f.tag===5){if(c===null){c=f;try{r=f.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=g0("display",o))}catch(g){Et(n,n.return,g)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(g){Et(n,n.return,g)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===n)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===n)break e;for(;f.sibling===null;){if(f.return===null||f.return===n)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:ui(e,n),Ti(n),i&4&&Hm(n);break;case 21:break;default:ui(e,n),Ti(n)}}function Ti(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(Hv(t)){var i=t;break e}t=t.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ca(r,""),i.flags&=-33);var s=Vm(n);Dd(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Vm(n);Ld(n,a,o);break;default:throw Error(ie(161))}}catch(l){Et(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function JM(n,e,t){he=n,jv(n)}function jv(n,e,t){for(var i=(n.mode&1)!==0;he!==null;){var r=he,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||Al;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||nn;a=Al;var u=nn;if(Al=o,(nn=l)&&!u)for(he=r;he!==null;)o=he,l=o.child,o.tag===22&&o.memoizedState!==null?jm(r):l!==null?(l.return=o,he=l):jm(r);for(;s!==null;)he=s,jv(s),s=s.sibling;he=r,Al=a,nn=u}Gm(n)}else r.subtreeFlags&8772&&s!==null?(s.return=r,he=s):Gm(n)}}function Gm(n){for(;he!==null;){var e=he;if(e.flags&8772){var t=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:nn||cc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!nn)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:hi(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Rm(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Rm(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&Da(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}nn||e.flags&512&&Pd(e)}catch(h){Et(e,e.return,h)}}if(e===n){he=null;break}if(t=e.sibling,t!==null){t.return=e.return,he=t;break}he=e.return}}function Wm(n){for(;he!==null;){var e=he;if(e===n){he=null;break}var t=e.sibling;if(t!==null){t.return=e.return,he=t;break}he=e.return}}function jm(n){for(;he!==null;){var e=he;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{cc(4,e)}catch(l){Et(e,t,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Et(e,r,l)}}var s=e.return;try{Pd(e)}catch(l){Et(e,s,l)}break;case 5:var o=e.return;try{Pd(e)}catch(l){Et(e,o,l)}}}catch(l){Et(e,e.return,l)}if(e===n){he=null;break}var a=e.sibling;if(a!==null){a.return=e.return,he=a;break}he=e.return}}var e1=Math.ceil,Fu=rr.ReactCurrentDispatcher,jh=rr.ReactCurrentOwner,si=rr.ReactCurrentBatchConfig,qe=0,Ht=null,Dt=null,Yt=0,In=0,so=Hr(0),It=0,Ga=null,Ms=0,fc=0,Xh=0,Sa=null,vn=null,Yh=0,Co=1/0,Hi=null,ku=!1,Nd=null,Rr=null,Rl=!1,gr=null,zu=0,Ma=0,Id=null,cu=-1,fu=0;function pn(){return qe&6?Ct():cu!==-1?cu:cu=Ct()}function Cr(n){return n.mode&1?qe&2&&Yt!==0?Yt&-Yt:FM.transition!==null?(fu===0&&(fu=b0()),fu):(n=Ke,n!==0||(n=window.event,n=n===void 0?16:O0(n.type)),n):1}function Si(n,e,t,i){if(50<Ma)throw Ma=0,Id=null,Error(ie(185));tl(n,t,i),(!(qe&2)||n!==Ht)&&(n===Ht&&(!(qe&2)&&(fc|=t),It===4&&pr(n,Yt)),En(n,i),t===1&&qe===0&&!(e.mode&1)&&(Co=Ct()+500,ac&&Gr()))}function En(n,e){var t=n.callbackNode;FS(n,e);var i=Mu(n,n===Ht?Yt:0);if(i===0)t!==null&&em(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&em(t),e===1)n.tag===0?OM(Xm.bind(null,n)):tv(Xm.bind(null,n)),DM(function(){!(qe&6)&&Gr()}),t=null;else{switch(P0(i)){case 1:t=xh;break;case 4:t=R0;break;case 16:t=Su;break;case 536870912:t=C0;break;default:t=Su}t=Jv(t,Xv.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Xv(n,e){if(cu=-1,fu=0,qe&6)throw Error(ie(327));var t=n.callbackNode;if(go()&&n.callbackNode!==t)return null;var i=Mu(n,n===Ht?Yt:0);if(i===0)return null;if(i&30||i&n.expiredLanes||e)e=Bu(n,i);else{e=i;var r=qe;qe|=2;var s=qv();(Ht!==n||Yt!==e)&&(Hi=null,Co=Ct()+500,cs(n,e));do try{i1();break}catch(a){Yv(n,a)}while(!0);Dh(),Fu.current=s,qe=r,Dt!==null?e=0:(Ht=null,Yt=0,e=It)}if(e!==0){if(e===2&&(r=ad(n),r!==0&&(i=r,e=Ud(n,r))),e===1)throw t=Ga,cs(n,0),pr(n,i),En(n,Ct()),t;if(e===6)pr(n,i);else{if(r=n.current.alternate,!(i&30)&&!t1(r)&&(e=Bu(n,i),e===2&&(s=ad(n),s!==0&&(i=s,e=Ud(n,s))),e===1))throw t=Ga,cs(n,0),pr(n,i),En(n,Ct()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:es(n,vn,Hi);break;case 3:if(pr(n,i),(i&130023424)===i&&(e=Yh+500-Ct(),10<e)){if(Mu(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){pn(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=md(es.bind(null,n,vn,Hi),e);break}es(n,vn,Hi);break;case 4:if(pr(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-yi(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Ct()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*e1(i/1960))-i,10<i){n.timeoutHandle=md(es.bind(null,n,vn,Hi),i);break}es(n,vn,Hi);break;case 5:es(n,vn,Hi);break;default:throw Error(ie(329))}}}return En(n,Ct()),n.callbackNode===t?Xv.bind(null,n):null}function Ud(n,e){var t=Sa;return n.current.memoizedState.isDehydrated&&(cs(n,e).flags|=256),n=Bu(n,e),n!==2&&(e=vn,vn=t,e!==null&&Od(e)),n}function Od(n){vn===null?vn=n:vn.push.apply(vn,n)}function t1(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!Mi(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function pr(n,e){for(e&=~Xh,e&=~fc,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-yi(e),i=1<<t;n[t]=-1,e&=~i}}function Xm(n){if(qe&6)throw Error(ie(327));go();var e=Mu(n,0);if(!(e&1))return En(n,Ct()),null;var t=Bu(n,e);if(n.tag!==0&&t===2){var i=ad(n);i!==0&&(e=i,t=Ud(n,i))}if(t===1)throw t=Ga,cs(n,0),pr(n,e),En(n,Ct()),t;if(t===6)throw Error(ie(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,es(n,vn,Hi),En(n,Ct()),null}function qh(n,e){var t=qe;qe|=1;try{return n(e)}finally{qe=t,qe===0&&(Co=Ct()+500,ac&&Gr())}}function Es(n){gr!==null&&gr.tag===0&&!(qe&6)&&go();var e=qe;qe|=1;var t=si.transition,i=Ke;try{if(si.transition=null,Ke=1,n)return n()}finally{Ke=i,si.transition=t,qe=e,!(qe&6)&&Gr()}}function $h(){In=so.current,lt(so)}function cs(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,LM(t)),Dt!==null)for(t=Dt.return;t!==null;){var i=t;switch(bh(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Ru();break;case 3:Ao(),lt(Sn),lt(an),kh();break;case 5:Fh(i);break;case 4:Ao();break;case 13:lt(mt);break;case 19:lt(mt);break;case 10:Nh(i.type._context);break;case 22:case 23:$h()}t=t.return}if(Ht=n,Dt=n=br(n.current,null),Yt=In=e,It=0,Ga=null,Xh=fc=Ms=0,vn=Sa=null,as!==null){for(e=0;e<as.length;e++)if(t=as[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}as=null}return n}function Yv(n,e){do{var t=Dt;try{if(Dh(),au.current=Ou,Uu){for(var i=vt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Uu=!1}if(Ss=0,Vt=Nt=vt=null,xa=!1,Ba=0,jh.current=null,t===null||t.return===null){It=1,Ga=e,Dt=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=Yt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,c=a,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var h=c.alternate;h?(c.updateQueue=h.updateQueue,c.memoizedState=h.memoizedState,c.lanes=h.lanes):(c.updateQueue=null,c.memoizedState=null)}var p=Nm(o);if(p!==null){p.flags&=-257,Im(p,o,a,s,e),p.mode&1&&Dm(s,u,e),e=p,l=u;var x=e.updateQueue;if(x===null){var g=new Set;g.add(l),e.updateQueue=g}else x.add(l);break e}else{if(!(e&1)){Dm(s,u,e),Kh();break e}l=Error(ie(426))}}else if(ct&&a.mode&1){var m=Nm(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Im(m,o,a,s,e),Ph(Ro(l,a));break e}}s=l=Ro(l,a),It!==4&&(It=2),Sa===null?Sa=[s]:Sa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=Pv(s,l,e);Am(s,d);break e;case 1:a=l;var _=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Rr===null||!Rr.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=Lv(s,a,e);Am(s,y);break e}}s=s.return}while(s!==null)}Kv(t)}catch(T){e=T,Dt===t&&t!==null&&(Dt=t=t.return);continue}break}while(!0)}function qv(){var n=Fu.current;return Fu.current=Ou,n===null?Ou:n}function Kh(){(It===0||It===3||It===2)&&(It=4),Ht===null||!(Ms&268435455)&&!(fc&268435455)||pr(Ht,Yt)}function Bu(n,e){var t=qe;qe|=2;var i=qv();(Ht!==n||Yt!==e)&&(Hi=null,cs(n,e));do try{n1();break}catch(r){Yv(n,r)}while(!0);if(Dh(),qe=t,Fu.current=i,Dt!==null)throw Error(ie(261));return Ht=null,Yt=0,It}function n1(){for(;Dt!==null;)$v(Dt)}function i1(){for(;Dt!==null&&!CS();)$v(Dt)}function $v(n){var e=Qv(n.alternate,n,In);n.memoizedProps=n.pendingProps,e===null?Kv(n):Dt=e,jh.current=null}function Kv(n){var e=n;do{var t=e.alternate;if(n=e.return,e.flags&32768){if(t=KM(t,e),t!==null){t.flags&=32767,Dt=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{It=6,Dt=null;return}}else if(t=$M(t,e,In),t!==null){Dt=t;return}if(e=e.sibling,e!==null){Dt=e;return}Dt=e=n}while(e!==null);It===0&&(It=5)}function es(n,e,t){var i=Ke,r=si.transition;try{si.transition=null,Ke=1,r1(n,e,t,i)}finally{si.transition=r,Ke=i}return null}function r1(n,e,t,i){do go();while(gr!==null);if(qe&6)throw Error(ie(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(ie(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(kS(n,s),n===Ht&&(Dt=Ht=null,Yt=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Rl||(Rl=!0,Jv(Su,function(){return go(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=si.transition,si.transition=null;var o=Ke;Ke=1;var a=qe;qe|=4,jh.current=null,QM(n,t),Wv(t,n),TM(hd),Eu=!!dd,hd=dd=null,n.current=t,JM(t),bS(),qe=a,Ke=o,si.transition=s}else n.current=t;if(Rl&&(Rl=!1,gr=n,zu=r),s=n.pendingLanes,s===0&&(Rr=null),DS(t.stateNode),En(n,Ct()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(ku)throw ku=!1,n=Nd,Nd=null,n;return zu&1&&n.tag!==0&&go(),s=n.pendingLanes,s&1?n===Id?Ma++:(Ma=0,Id=n):Ma=0,Gr(),null}function go(){if(gr!==null){var n=P0(zu),e=si.transition,t=Ke;try{if(si.transition=null,Ke=16>n?16:n,gr===null)var i=!1;else{if(n=gr,gr=null,zu=0,qe&6)throw Error(ie(331));var r=qe;for(qe|=4,he=n.current;he!==null;){var s=he,o=s.child;if(he.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(he=u;he!==null;){var c=he;switch(c.tag){case 0:case 11:case 15:ya(8,c,s)}var f=c.child;if(f!==null)f.return=c,he=f;else for(;he!==null;){c=he;var h=c.sibling,p=c.return;if(Vv(c),c===u){he=null;break}if(h!==null){h.return=p,he=h;break}he=p}}}var x=s.alternate;if(x!==null){var g=x.child;if(g!==null){x.child=null;do{var m=g.sibling;g.sibling=null,g=m}while(g!==null)}}he=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,he=o;else e:for(;he!==null;){if(s=he,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ya(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,he=d;break e}he=s.return}}var _=n.current;for(he=_;he!==null;){o=he;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,he=v;else e:for(o=_;he!==null;){if(a=he,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:cc(9,a)}}catch(T){Et(a,a.return,T)}if(a===o){he=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,he=y;break e}he=a.return}}if(qe=r,Gr(),Di&&typeof Di.onPostCommitFiberRoot=="function")try{Di.onPostCommitFiberRoot(nc,n)}catch{}i=!0}return i}finally{Ke=t,si.transition=e}}return!1}function Ym(n,e,t){e=Ro(t,e),e=Pv(n,e,1),n=Ar(n,e,1),e=pn(),n!==null&&(tl(n,1,e),En(n,e))}function Et(n,e,t){if(n.tag===3)Ym(n,n,t);else for(;e!==null;){if(e.tag===3){Ym(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Rr===null||!Rr.has(i))){n=Ro(t,n),n=Lv(e,n,1),e=Ar(e,n,1),n=pn(),e!==null&&(tl(e,1,n),En(e,n));break}}e=e.return}}function s1(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=pn(),n.pingedLanes|=n.suspendedLanes&t,Ht===n&&(Yt&t)===t&&(It===4||It===3&&(Yt&130023424)===Yt&&500>Ct()-Yh?cs(n,0):Xh|=t),En(n,e)}function Zv(n,e){e===0&&(n.mode&1?(e=_l,_l<<=1,!(_l&130023424)&&(_l=4194304)):e=1);var t=pn();n=Ji(n,e),n!==null&&(tl(n,e,t),En(n,t))}function o1(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),Zv(n,t)}function a1(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),Zv(n,t)}var Qv;Qv=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||Sn.current)yn=!0;else{if(!(n.lanes&t)&&!(e.flags&128))return yn=!1,qM(n,e,t);yn=!!(n.flags&131072)}else yn=!1,ct&&e.flags&1048576&&nv(e,Pu,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;uu(n,e),n=e.pendingProps;var r=Eo(e,an.current);mo(e,t),r=Bh(null,e,i,n,r,t);var s=Vh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Mn(i)?(s=!0,Cu(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Uh(e),r.updater=uc,e.stateNode=r,r._reactInternals=e,Md(e,i,n,t),e=wd(null,e,i,!0,s,t)):(e.tag=0,ct&&s&&Ch(e),fn(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(uu(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=u1(i),n=hi(i,n),r){case 0:e=Td(null,e,i,n,t);break e;case 1:e=Fm(null,e,i,n,t);break e;case 11:e=Um(null,e,i,n,t);break e;case 14:e=Om(null,e,i,hi(i.type,n),t);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:hi(i,r),Td(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:hi(i,r),Fm(n,e,i,r,t);case 3:e:{if(Uv(e),n===null)throw Error(ie(387));i=e.pendingProps,s=e.memoizedState,r=s.element,lv(n,e),Nu(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Ro(Error(ie(423)),e),e=km(n,e,i,t,r);break e}else if(i!==r){r=Ro(Error(ie(424)),e),e=km(n,e,i,t,r);break e}else for(kn=wr(e.stateNode.containerInfo.firstChild),Vn=e,ct=!0,mi=null,t=ov(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(To(),i===r){e=er(n,e,t);break e}fn(n,e,i,t)}e=e.child}return e;case 5:return uv(e),n===null&&xd(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,pd(i,r)?o=null:s!==null&&pd(i,s)&&(e.flags|=32),Iv(n,e),fn(n,e,o,t),e.child;case 6:return n===null&&xd(e),null;case 13:return Ov(n,e,t);case 4:return Oh(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=wo(e,null,i,t):fn(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:hi(i,r),Um(n,e,i,r,t);case 7:return fn(n,e,e.pendingProps,t),e.child;case 8:return fn(n,e,e.pendingProps.children,t),e.child;case 12:return fn(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,st(Lu,i._currentValue),i._currentValue=o,s!==null)if(Mi(s.value,o)){if(s.children===r.children&&!Sn.current){e=er(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ki(-1,t&-t),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?l.next=l:(l.next=c.next,c.next=l),u.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),yd(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ie(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),yd(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}fn(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,mo(e,t),r=ai(r),i=i(r),e.flags|=1,fn(n,e,i,t),e.child;case 14:return i=e.type,r=hi(i,e.pendingProps),r=hi(i.type,r),Om(n,e,i,r,t);case 15:return Dv(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:hi(i,r),uu(n,e),e.tag=1,Mn(i)?(n=!0,Cu(e)):n=!1,mo(e,t),bv(e,i,r),Md(e,i,r,t),wd(null,e,i,!0,n,t);case 19:return Fv(n,e,t);case 22:return Nv(n,e,t)}throw Error(ie(156,e.tag))};function Jv(n,e){return A0(n,e)}function l1(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ni(n,e,t,i){return new l1(n,e,t,i)}function Zh(n){return n=n.prototype,!(!n||!n.isReactComponent)}function u1(n){if(typeof n=="function")return Zh(n)?1:0;if(n!=null){if(n=n.$$typeof,n===gh)return 11;if(n===_h)return 14}return 2}function br(n,e){var t=n.alternate;return t===null?(t=ni(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function du(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")Zh(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case $s:return fs(t.children,r,s,e);case mh:o=8,r|=8;break;case Xf:return n=ni(12,t,e,r|2),n.elementType=Xf,n.lanes=s,n;case Yf:return n=ni(13,t,e,r),n.elementType=Yf,n.lanes=s,n;case qf:return n=ni(19,t,e,r),n.elementType=qf,n.lanes=s,n;case u0:return dc(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case a0:o=10;break e;case l0:o=9;break e;case gh:o=11;break e;case _h:o=14;break e;case fr:o=16,i=null;break e}throw Error(ie(130,n==null?n:typeof n,""))}return e=ni(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function fs(n,e,t,i){return n=ni(7,n,i,e),n.lanes=t,n}function dc(n,e,t,i){return n=ni(22,n,i,e),n.elementType=u0,n.lanes=t,n.stateNode={isHidden:!1},n}function Qc(n,e,t){return n=ni(6,n,null,e),n.lanes=t,n}function Jc(n,e,t){return e=ni(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function c1(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Nc(0),this.expirationTimes=Nc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Nc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Qh(n,e,t,i,r,s,o,a,l){return n=new c1(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=ni(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Uh(s),n}function f1(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:qs,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function ex(n){if(!n)return Or;n=n._reactInternals;e:{if(Rs(n)!==n||n.tag!==1)throw Error(ie(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(n.tag===1){var t=n.type;if(Mn(t))return ev(n,t,e)}return e}function tx(n,e,t,i,r,s,o,a,l){return n=Qh(t,i,!0,n,r,s,o,a,l),n.context=ex(null),t=n.current,i=pn(),r=Cr(t),s=Ki(i,r),s.callback=e??null,Ar(t,s,r),n.current.lanes=r,tl(n,r,i),En(n,i),n}function hc(n,e,t,i){var r=e.current,s=pn(),o=Cr(r);return t=ex(t),e.context===null?e.context=t:e.pendingContext=t,e=Ki(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=Ar(r,e,o),n!==null&&(Si(n,r,o,s),ou(n,r,o)),o}function Vu(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function qm(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function Jh(n,e){qm(n,e),(n=n.alternate)&&qm(n,e)}function d1(){return null}var nx=typeof reportError=="function"?reportError:function(n){console.error(n)};function ep(n){this._internalRoot=n}pc.prototype.render=ep.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(ie(409));hc(n,e,null,null)};pc.prototype.unmount=ep.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Es(function(){hc(null,n,null,null)}),e[Qi]=null}};function pc(n){this._internalRoot=n}pc.prototype.unstable_scheduleHydration=function(n){if(n){var e=N0();n={blockedOn:null,target:n,priority:e};for(var t=0;t<hr.length&&e!==0&&e<hr[t].priority;t++);hr.splice(t,0,n),t===0&&U0(n)}};function tp(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function mc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function $m(){}function h1(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Vu(o);s.call(u)}}var o=tx(e,i,n,0,null,!1,!1,"",$m);return n._reactRootContainer=o,n[Qi]=o.current,Ua(n.nodeType===8?n.parentNode:n),Es(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=Vu(l);a.call(u)}}var l=Qh(n,0,!1,null,null,!1,!1,"",$m);return n._reactRootContainer=l,n[Qi]=l.current,Ua(n.nodeType===8?n.parentNode:n),Es(function(){hc(e,l,t,i)}),l}function gc(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Vu(o);a.call(l)}}hc(e,o,n,r)}else o=h1(t,e,n,r,i);return Vu(o)}L0=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=ca(e.pendingLanes);t!==0&&(yh(e,t|1),En(e,Ct()),!(qe&6)&&(Co=Ct()+500,Gr()))}break;case 13:Es(function(){var i=Ji(n,1);if(i!==null){var r=pn();Si(i,n,1,r)}}),Jh(n,1)}};Sh=function(n){if(n.tag===13){var e=Ji(n,134217728);if(e!==null){var t=pn();Si(e,n,134217728,t)}Jh(n,134217728)}};D0=function(n){if(n.tag===13){var e=Cr(n),t=Ji(n,e);if(t!==null){var i=pn();Si(t,n,e,i)}Jh(n,e)}};N0=function(){return Ke};I0=function(n,e){var t=Ke;try{return Ke=n,e()}finally{Ke=t}};rd=function(n,e,t){switch(e){case"input":if(Zf(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=oc(i);if(!r)throw Error(ie(90));f0(i),Zf(i,r)}}}break;case"textarea":h0(n,t);break;case"select":e=t.value,e!=null&&co(n,!!t.multiple,e,!1)}};y0=qh;S0=Es;var p1={usingClientEntryPoint:!1,Events:[il,Js,oc,v0,x0,qh]},ea={findFiberByHostInstance:os,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},m1={bundleType:ea.bundleType,version:ea.version,rendererPackageName:ea.rendererPackageName,rendererConfig:ea.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:rr.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=T0(n),n===null?null:n.stateNode},findFiberByHostInstance:ea.findFiberByHostInstance||d1,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Cl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Cl.isDisabled&&Cl.supportsFiber)try{nc=Cl.inject(m1),Di=Cl}catch{}}Yn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=p1;Yn.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!tp(e))throw Error(ie(200));return f1(n,e,null,t)};Yn.createRoot=function(n,e){if(!tp(n))throw Error(ie(299));var t=!1,i="",r=nx;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Qh(n,1,!1,null,null,t,!1,i,r),n[Qi]=e.current,Ua(n.nodeType===8?n.parentNode:n),new ep(e)};Yn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(ie(188)):(n=Object.keys(n).join(","),Error(ie(268,n)));return n=T0(e),n=n===null?null:n.stateNode,n};Yn.flushSync=function(n){return Es(n)};Yn.hydrate=function(n,e,t){if(!mc(e))throw Error(ie(200));return gc(null,n,e,!0,t)};Yn.hydrateRoot=function(n,e,t){if(!tp(n))throw Error(ie(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=nx;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=tx(e,null,n,1,t??null,r,!1,s,o),n[Qi]=e.current,Ua(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new pc(e)};Yn.render=function(n,e,t){if(!mc(e))throw Error(ie(200));return gc(null,n,e,!1,t)};Yn.unmountComponentAtNode=function(n){if(!mc(n))throw Error(ie(40));return n._reactRootContainer?(Es(function(){gc(null,null,n,!1,function(){n._reactRootContainer=null,n[Qi]=null})}),!0):!1};Yn.unstable_batchedUpdates=qh;Yn.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!mc(t))throw Error(ie(200));if(n==null||n._reactInternals===void 0)throw Error(ie(38));return gc(n,e,t,!1,i)};Yn.version="18.3.1-next-f1338f8080-20240426";function ix(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ix)}catch(n){console.error(n)}}ix(),i0.exports=Yn;var g1=i0.exports,Km=g1;Wf.createRoot=Km.createRoot,Wf.hydrateRoot=Km.hydrateRoot;function Gi(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function rx(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Hn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Wa={duration:.5,overwrite:!1,delay:0},np,qt,ft,ii=1e8,et=1/ii,Fd=Math.PI*2,_1=Fd/4,v1=0,sx=Math.sqrt,x1=Math.cos,y1=Math.sin,Gt=function(e){return typeof e=="string"},Tt=function(e){return typeof e=="function"},tr=function(e){return typeof e=="number"},ip=function(e){return typeof e>"u"},Ii=function(e){return typeof e=="object"},Tn=function(e){return e!==!1},rp=function(){return typeof window<"u"},bl=function(e){return Tt(e)||Gt(e)},ox=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},sn=Array.isArray,S1=/random\([^)]+\)/g,M1=/,\s*/g,Zm=/(?:-?\.?\d|\.)+/gi,ax=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,oo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,ef=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,lx=/[+-]=-?[.\d]+/,E1=/[^,'"\[\]\s]+/gi,T1=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,gt,Ai,kd,sp,jn={},Hu={},ux,cx=function(e){return(Hu=bo(e,jn))&&bn},op=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ja=function(e,t){return!t&&console.warn(e)},fx=function(e,t){return e&&(jn[e]=t)&&Hu&&(Hu[e]=t)||jn},Xa=function(){return 0},w1={suppressEvents:!0,isStart:!0,kill:!1},hu={suppressEvents:!0,kill:!1},A1={suppressEvents:!0},ap={},Pr=[],zd={},dx,Un={},tf={},Qm=30,pu=[],lp="",up=function(e){var t=e[0],i,r;if(Ii(t)||Tt(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=pu.length;r--&&!pu[r].targetTest(t););i=pu[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new Ix(e[r],i)))||e.splice(r,1);return e},ds=function(e){return e._gsap||up(ri(e))[0]._gsap},hx=function(e,t,i){return(i=e[t])&&Tt(i)?e[t]():ip(i)&&e.getAttribute&&e.getAttribute(t)||i},wn=function(e,t){return(e=e.split(",")).forEach(t)||e},At=function(e){return Math.round(e*1e5)/1e5||0},pt=function(e){return Math.round(e*1e7)/1e7||0},_o=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},R1=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Gu=function(){var e=Pr.length,t=Pr.slice(0),i,r;for(zd={},Pr.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},cp=function(e){return!!(e._initted||e._startAt||e.add)},px=function(e,t,i,r){Pr.length&&!qt&&Gu(),e.render(t,i,!!(qt&&t<0&&cp(e))),Pr.length&&!qt&&Gu()},mx=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(E1).length<2?t:Gt(e)?e.trim():e},gx=function(e){return e},Xn=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},C1=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},bo=function(e,t){for(var i in t)e[i]=t[i];return e},Jm=function n(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Ii(t[i])?n(e[i]||(e[i]={}),t[i]):t[i]);return e},Wu=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Ea=function(e){var t=e.parent||gt,i=e.keyframes?C1(sn(e.keyframes)):Xn;if(Tn(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},b1=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},_x=function(e,t,i,r,s){var o=e[r],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=o,t.parent=t._dp=e,t},_c=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var s=t._prev,o=t._next;s?s._next=o:e[i]===t&&(e[i]=o),o?o._prev=s:e[r]===t&&(e[r]=s),t._next=t._prev=t.parent=null},Fr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},hs=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},P1=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Bd=function(e,t,i,r){return e._startAt&&(qt?e._startAt.revert(hu):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},L1=function n(e){return!e||e._ts&&n(e.parent)},eg=function(e){return e._repeat?Po(e._tTime,e=e.duration()+e._rDelay)*e:0},Po=function(e,t){var i=Math.floor(e=pt(e/t));return e&&i===e?i-1:i},ju=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},vc=function(e){return e._end=pt(e._start+(e._tDur/Math.abs(e._ts||e._rts||et)||0))},xc=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=pt(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),vc(e),i._dirty||hs(i,e)),e},vx=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=ju(e.rawTime(),t),(!t._dur||sl(0,t.totalDuration(),i)-t._tTime>et)&&t.render(i,!0)),hs(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-et}},Pi=function(e,t,i,r){return t.parent&&Fr(t),t._start=pt((tr(i)?i:i||e!==gt?Zn(e,i,t):e._time)+t._delay),t._end=pt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),_x(e,t,"_first","_last",e._sort?"_start":0),Vd(t)||(e._recent=t),r||vx(e,t),e._ts<0&&xc(e,e._tTime),e},xx=function(e,t){return(jn.ScrollTrigger||op("scrollTrigger",t))&&jn.ScrollTrigger.create(t,e)},yx=function(e,t,i,r,s){if(dp(e,t,s),!e._initted)return 1;if(!i&&e._pt&&!qt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&dx!==Fn.frame)return Pr.push(e),e._lazy=[s,r],1},D1=function n(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||n(t))},Vd=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},N1=function(e,t,i,r){var s=e.ratio,o=t<0||!t&&(!e._start&&D1(e)&&!(!e._initted&&Vd(e))||(e._ts<0||e._dp._ts<0)&&!Vd(e))?0:1,a=e._rDelay,l=0,u,c,f;if(a&&e._repeat&&(l=sl(0,e._tDur,t),c=Po(l,a),e._yoyo&&c&1&&(o=1-o),c!==Po(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||qt||r||e._zTime===et||!t&&e._zTime){if(!e._initted&&yx(e,t,r,i,l))return;for(f=e._zTime,e._zTime=t||(i?et:0),i||(i=t&&!f),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,u=e._pt;u;)u.r(o,u.d),u=u._next;t<0&&Bd(e,t,i,!0),e._onUpdate&&!i&&zn(e,"onUpdate"),l&&e._repeat&&!i&&e.parent&&zn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Fr(e,1),!i&&!qt&&(zn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},I1=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},Lo=function(e,t,i,r){var s=e._repeat,o=pt(t)||0,a=e._tTime/e._tDur;return a&&!r&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:pt(o*(s+1)+e._rDelay*s):o,a>0&&!r&&xc(e,e._tTime=e._tDur*a),e.parent&&vc(e),i||hs(e.parent,e),e},tg=function(e){return e instanceof xn?hs(e):Lo(e,e._dur)},U1={_start:0,endTime:Xa,totalDuration:Xa},Zn=function n(e,t,i){var r=e.labels,s=e._recent||U1,o=e.duration()>=ii?s.endTime(!1):e._dur,a,l,u;return Gt(t)&&(isNaN(t)||t in r)?(l=t.charAt(0),u=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(u?(a<0?s:i).totalDuration()/100:1)):a<0?(t in r||(r[t]=o),r[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),u&&i&&(l=l/100*(sn(i)?i[0]:i).totalDuration()),a>1?n(e,t.substr(0,a-1),i)+l:o+l)):t==null?o:+t},Ta=function(e,t,i){var r=tr(t[1]),s=(r?2:1)+(e<2?0:1),o=t[s],a,l;if(r&&(o.duration=t[1]),o.parent=i,e){for(a=o,l=i;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Tn(l.vars.inherit)&&l.parent;o.immediateRender=Tn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Lt(t[0],o,t[s+1])},Wr=function(e,t){return e||e===0?t(e):t},sl=function(e,t,i){return i<e?e:i>t?t:i},rn=function(e,t){return!Gt(e)||!(t=T1.exec(e))?"":t[1]},O1=function(e,t,i){return Wr(i,function(r){return sl(e,t,r)})},Hd=[].slice,Sx=function(e,t){return e&&Ii(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ii(e[0]))&&!e.nodeType&&e!==Ai},F1=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var s;return Gt(r)&&!t||Sx(r,1)?(s=i).push.apply(s,ri(r)):i.push(r)})||i},ri=function(e,t,i){return ft&&!t&&ft.selector?ft.selector(e):Gt(e)&&!i&&(kd||!Do())?Hd.call((t||sp).querySelectorAll(e),0):sn(e)?F1(e,i):Sx(e)?Hd.call(e,0):e?[e]:[]},Gd=function(e){return e=ri(e)[0]||ja("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return ri(t,i.querySelectorAll?i:i===e?ja("Invalid scope")||sp.createElement("div"):e)}},Mx=function(e){return e.sort(function(){return .5-Math.random()})},Ex=function(e){if(Tt(e))return e;var t=Ii(e)?e:{each:e},i=ps(t.ease),r=t.from||0,s=parseFloat(t.base)||0,o={},a=r>0&&r<1,l=isNaN(r)||a,u=t.axis,c=r,f=r;return Gt(r)?c=f={center:.5,edges:.5,end:1}[r]||0:!a&&l&&(c=r[0],f=r[1]),function(h,p,x){var g=(x||t).length,m=o[g],d,_,v,y,T,A,E,b,S;if(!m){if(S=t.grid==="auto"?0:(t.grid||[1,ii])[1],!S){for(E=-ii;E<(E=x[S++].getBoundingClientRect().left)&&S<g;);S<g&&S--}for(m=o[g]=[],d=l?Math.min(S,g)*c-.5:r%S,_=S===ii?0:l?g*f/S-.5:r/S|0,E=0,b=ii,A=0;A<g;A++)v=A%S-d,y=_-(A/S|0),m[A]=T=u?Math.abs(u==="y"?y:v):sx(v*v+y*y),T>E&&(E=T),T<b&&(b=T);r==="random"&&Mx(m),m.max=E-b,m.min=b,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(S>g?g-1:u?u==="y"?g/S:S:Math.max(S,g/S))||0)*(r==="edges"?-1:1),m.b=g<0?s-g:s,m.u=rn(t.amount||t.each)||0,i=i&&g<0?K1(i):i}return g=(m[h]-m.min)/m.max||0,pt(m.b+(i?i(g):g)*m.v)+m.u}},Wd=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=pt(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(tr(i)?0:rn(i))}},Tx=function(e,t){var i=sn(e),r,s;return!i&&Ii(e)&&(r=i=e.radius||ii,e.values?(e=ri(e.values),(s=!tr(e[0]))&&(r*=r)):e=Wd(e.increment)),Wr(t,i?Tt(e)?function(o){return s=e(o),Math.abs(s-o)<=r?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),u=ii,c=0,f=e.length,h,p;f--;)s?(h=e[f].x-a,p=e[f].y-l,h=h*h+p*p):h=Math.abs(e[f]-a),h<u&&(u=h,c=f);return c=!r||u<=r?e[c]:o,s||c===o||tr(o)?c:c+rn(o)}:Wd(e))},wx=function(e,t,i,r){return Wr(sn(e)?!t:i===!0?!!(i=0):!r,function(){return sn(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},k1=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(s,o){return o(s)},r)}},z1=function(e,t){return function(i){return e(parseFloat(i))+(t||rn(i))}},B1=function(e,t,i){return Rx(e,t,0,1,i)},Ax=function(e,t,i){return Wr(i,function(r){return e[~~t(r)]})},V1=function n(e,t,i){var r=t-e;return sn(e)?Ax(e,n(0,e.length),t):Wr(i,function(s){return(r+(s-e)%r)%r+e})},H1=function n(e,t,i){var r=t-e,s=r*2;return sn(e)?Ax(e,n(0,e.length-1),t):Wr(i,function(o){return o=(s+(o-e)%s)%s||0,e+(o>r?s-o:o)})},Ya=function(e){return e.replace(S1,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(M1);return wx(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},Rx=function(e,t,i,r,s){var o=t-e,a=r-i;return Wr(s,function(l){return i+((l-e)/o*a||0)})},G1=function n(e,t,i,r){var s=isNaN(e+t)?0:function(p){return(1-p)*e+p*t};if(!s){var o=Gt(e),a={},l,u,c,f,h;if(i===!0&&(r=1)&&(i=null),o)e={p:e},t={p:t};else if(sn(e)&&!sn(t)){for(c=[],f=e.length,h=f-2,u=1;u<f;u++)c.push(n(e[u-1],e[u]));f--,s=function(x){x*=f;var g=Math.min(h,~~x);return c[g](x-g)},i=t}else r||(e=bo(sn(e)?[]:{},e));if(!c){for(l in t)fp.call(a,e,l,"get",t[l]);s=function(x){return mp(x,a)||(o?e.p:e)}}}return Wr(i,s)},ng=function(e,t,i){var r=e.labels,s=ii,o,a,l;for(o in r)a=r[o]-t,a<0==!!i&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},zn=function(e,t,i){var r=e.vars,s=r[t],o=ft,a=e._ctx,l,u,c;if(s)return l=r[t+"Params"],u=r.callbackScope||e,i&&Pr.length&&Gu(),a&&(ft=a),c=l?s.apply(u,l):s.call(u),ft=o,c},da=function(e){return Fr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!qt),e.progress()<1&&zn(e,"onInterrupt"),e},ao,Cx=[],bx=function(e){if(e)if(e=!e.name&&e.default||e,rp()||e.headless){var t=e.name,i=Tt(e),r=t&&!i&&e.init?function(){this._props=[]}:e,s={init:Xa,render:mp,add:fp,kill:oE,modifier:sE,rawVars:0},o={targetTest:0,get:0,getSetter:pp,aliases:{},register:0};if(Do(),e!==r){if(Un[t])return;Xn(r,Xn(Wu(e,s),o)),bo(r.prototype,bo(s,Wu(e,o))),Un[r.prop=t]=r,e.targetTest&&(pu.push(r),ap[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}fx(t,r),e.register&&e.register(bn,r,An)}else Cx.push(e)},Je=255,ha={aqua:[0,Je,Je],lime:[0,Je,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Je],navy:[0,0,128],white:[Je,Je,Je],olive:[128,128,0],yellow:[Je,Je,0],orange:[Je,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Je,0,0],pink:[Je,192,203],cyan:[0,Je,Je],transparent:[Je,Je,Je,0]},nf=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*Je+.5|0},Px=function(e,t,i){var r=e?tr(e)?[e>>16,e>>8&Je,e&Je]:0:ha.black,s,o,a,l,u,c,f,h,p,x;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),ha[e])r=ha[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&Je,r&Je,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&Je,e&Je]}else if(e.substr(0,3)==="hsl"){if(r=x=e.match(Zm),!t)l=+r[0]%360/360,u=+r[1]/100,c=+r[2]/100,o=c<=.5?c*(u+1):c+u-c*u,s=c*2-o,r.length>3&&(r[3]*=1),r[0]=nf(l+1/3,s,o),r[1]=nf(l,s,o),r[2]=nf(l-1/3,s,o);else if(~e.indexOf("="))return r=e.match(ax),i&&r.length<4&&(r[3]=1),r}else r=e.match(Zm)||ha.transparent;r=r.map(Number)}return t&&!x&&(s=r[0]/Je,o=r[1]/Je,a=r[2]/Je,f=Math.max(s,o,a),h=Math.min(s,o,a),c=(f+h)/2,f===h?l=u=0:(p=f-h,u=c>.5?p/(2-f-h):p/(f+h),l=f===s?(o-a)/p+(o<a?6:0):f===o?(a-s)/p+2:(s-o)/p+4,l*=60),r[0]=~~(l+.5),r[1]=~~(u*100+.5),r[2]=~~(c*100+.5)),i&&r.length<4&&(r[3]=1),r},Lx=function(e){var t=[],i=[],r=-1;return e.split(Lr).forEach(function(s){var o=s.match(oo)||[];t.push.apply(t,o),i.push(r+=o.length+1)}),t.c=i,t},ig=function(e,t,i){var r="",s=(e+r).match(Lr),o=t?"hsla(":"rgba(",a=0,l,u,c,f;if(!s)return e;if(s=s.map(function(h){return(h=Px(h,t,1))&&o+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(c=Lx(e),l=i.c,l.join(r)!==c.c.join(r)))for(u=e.replace(Lr,"1").split(oo),f=u.length-1;a<f;a++)r+=u[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(c.length?c:s.length?s:i).shift());if(!u)for(u=e.split(Lr),f=u.length-1;a<f;a++)r+=u[a]+s[a];return r+u[f]},Lr=function(){var n="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in ha)n+="|"+e+"\\b";return new RegExp(n+")","gi")}(),W1=/hsl[a]?\(/,Dx=function(e){var t=e.join(" "),i;if(Lr.lastIndex=0,Lr.test(t))return i=W1.test(t),e[1]=ig(e[1],i),e[0]=ig(e[0],i,Lx(e[1])),!0},qa,Fn=function(){var n=Date.now,e=500,t=33,i=n(),r=i,s=1e3/240,o=s,a=[],l,u,c,f,h,p,x=function g(m){var d=n()-r,_=m===!0,v,y,T,A;if((d>e||d<0)&&(i+=d-t),r+=d,T=r-i,v=T-o,(v>0||_)&&(A=++f.frame,h=T-f.time*1e3,f.time=T=T/1e3,o+=v+(v>=s?4:s-v),y=1),_||(l=u(g)),y)for(p=0;p<a.length;p++)a[p](T,h,A,m)};return f={time:0,frame:0,tick:function(){x(!0)},deltaRatio:function(m){return h/(1e3/(m||60))},wake:function(){ux&&(!kd&&rp()&&(Ai=kd=window,sp=Ai.document||{},jn.gsap=bn,(Ai.gsapVersions||(Ai.gsapVersions=[])).push(bn.version),cx(Hu||Ai.GreenSockGlobals||!Ai.gsap&&Ai||{}),Cx.forEach(bx)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&f.sleep(),u=c||function(m){return setTimeout(m,o-f.time*1e3+1|0)},qa=1,x(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(l),qa=0,u=Xa},lagSmoothing:function(m,d){e=m||1/0,t=Math.min(d||33,e)},fps:function(m){s=1e3/(m||240),o=f.time*1e3+s},add:function(m,d,_){var v=d?function(y,T,A,E){m(y,T,A,E),f.remove(v)}:m;return f.remove(m),a[_?"unshift":"push"](v),Do(),v},remove:function(m,d){~(d=a.indexOf(m))&&a.splice(d,1)&&p>=d&&p--},_listeners:a},f}(),Do=function(){return!qa&&Fn.wake()},Ye={},j1=/^[\d.\-M][\d.\-,\s]/,X1=/["']/g,Y1=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],s=1,o=i.length,a,l,u;s<o;s++)l=i[s],a=s!==o-1?l.lastIndexOf(","):l.length,u=l.substr(0,a),t[r]=isNaN(u)?u.replace(X1,"").trim():+u,r=l.substr(a+1).trim();return t},q1=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},$1=function(e){var t=(e+"").split("("),i=Ye[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[Y1(t[1])]:q1(e).split(",").map(mx)):Ye._CE&&j1.test(e)?Ye._CE("",e):i},K1=function(e){return function(t){return 1-e(1-t)}},ps=function(e,t){return e&&(Tt(e)?e:Ye[e]||$1(e))||t},Cs=function(e,t,i,r){i===void 0&&(i=function(l){return 1-t(1-l)}),r===void 0&&(r=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:i,easeInOut:r},o;return wn(e,function(a){Ye[a]=jn[a]=s,Ye[o=a.toLowerCase()]=i;for(var l in s)Ye[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Ye[a+"."+l]=s[l]}),s},Nx=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},rf=function n(e,t,i){var r=t>=1?t:1,s=(i||(e?.3:.45))/(t<1?t:1),o=s/Fd*(Math.asin(1/r)||0),a=function(c){return c===1?1:r*Math.pow(2,-10*c)*y1((c-o)*s)+1},l=e==="out"?a:e==="in"?function(u){return 1-a(1-u)}:Nx(a);return s=Fd/s,l.config=function(u,c){return n(e,u,c)},l},sf=function n(e,t){t===void 0&&(t=1.70158);var i=function(o){return o?--o*o*((t+1)*o+t)+1:0},r=e==="out"?i:e==="in"?function(s){return 1-i(1-s)}:Nx(i);return r.config=function(s){return n(e,s)},r};wn("Linear,Quad,Cubic,Quart,Quint,Strong",function(n,e){var t=e<5?e+1:e;Cs(n+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});Ye.Linear.easeNone=Ye.none=Ye.Linear.easeIn;Cs("Elastic",rf("in"),rf("out"),rf());(function(n,e){var t=1/e,i=2*t,r=2.5*t,s=function(a){return a<t?n*a*a:a<i?n*Math.pow(a-1.5/e,2)+.75:a<r?n*(a-=2.25/e)*a+.9375:n*Math.pow(a-2.625/e,2)+.984375};Cs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Cs("Expo",function(n){return Math.pow(2,10*(n-1))*n+n*n*n*n*n*n*(1-n)});Cs("Circ",function(n){return-(sx(1-n*n)-1)});Cs("Sine",function(n){return n===1?1:-x1(n*_1)+1});Cs("Back",sf("in"),sf("out"),sf());Ye.SteppedEase=Ye.steps=jn.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),s=t?1:0,o=1-et;return function(a){return((r*sl(0,o,a)|0)+s)*i}}};Wa.ease=Ye["quad.out"];wn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(n){return lp+=n+","+n+"Params,"});var Ix=function(e,t){this.id=v1++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:hx,this.set=t?t.getSetter:pp},$a=function(){function n(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Lo(this,+t.duration,1,1),this.data=t.data,ft&&(this._ctx=ft,ft.data.push(this)),qa||Fn.wake()}var e=n.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Lo(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(Do(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(xc(this,i),!s._dp||s.parent||vx(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&Pi(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===et||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),px(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+eg(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+eg(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*s,r):this._repeat?Po(this._tTime,s)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-et?0:this._rts;if(this._rts===i)return this;var s=this.parent&&this._ts?ju(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-et?0:this._rts,this.totalTime(sl(-Math.abs(this._delay),this.totalDuration(),s),r!==!1),vc(this),P1(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Do(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==et&&(this._tTime-=et)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=pt(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Pi(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Tn(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ju(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=A1);var r=qt;return qt=i,cp(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),qt=r,this},e.globalTime=function(i){for(var r=this,s=arguments.length?i:r.rawTime();r;)s=r._start+s/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):s},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,tg(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,tg(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Zn(this,i),Tn(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Tn(r)),this._dur||(this._zTime=-et),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-et:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-et,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,s;return!!(!i||this._ts&&this._initted&&i.isActive()&&(s=i.rawTime(!0))>=r&&s<this.endTime(!0)-et)},e.eventCallback=function(i,r,s){var o=this.vars;return arguments.length>1?(r?(o[i]=r,s&&(o[i+"Params"]=s),i==="onUpdate"&&(this._onUpdate=r)):delete o[i],this):o[i]},e.then=function(i){var r=this,s=r._prom;return new Promise(function(o){var a=Tt(i)?i:gx,l=function(){var c=r.then;r.then=null,s&&s(),Tt(a)&&(a=a(r))&&(a.then||a===r)&&(r.then=c),o(a),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?l():r._prom=l})},e.kill=function(){da(this)},n}();Xn($a.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-et,_prom:0,_ps:!1,_rts:1});var xn=function(n){rx(e,n);function e(i,r){var s;return i===void 0&&(i={}),s=n.call(this,i)||this,s.labels={},s.smoothChildTiming=!!i.smoothChildTiming,s.autoRemoveChildren=!!i.autoRemoveChildren,s._sort=Tn(i.sortChildren),gt&&Pi(i.parent||gt,Gi(s),r),i.reversed&&s.reverse(),i.paused&&s.paused(!0),i.scrollTrigger&&xx(Gi(s),i.scrollTrigger),s}var t=e.prototype;return t.to=function(r,s,o){return Ta(0,arguments,this),this},t.from=function(r,s,o){return Ta(1,arguments,this),this},t.fromTo=function(r,s,o,a){return Ta(2,arguments,this),this},t.set=function(r,s,o){return s.duration=0,s.parent=this,Ea(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Lt(r,s,Zn(this,o),1),this},t.call=function(r,s,o){return Pi(this,Lt.delayedCall(0,r,s),o)},t.staggerTo=function(r,s,o,a,l,u,c){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=u,o.onCompleteParams=c,o.parent=this,new Lt(r,o,Zn(this,l)),this},t.staggerFrom=function(r,s,o,a,l,u,c){return o.runBackwards=1,Ea(o).immediateRender=Tn(o.immediateRender),this.staggerTo(r,s,o,a,l,u,c)},t.staggerFromTo=function(r,s,o,a,l,u,c,f){return a.startAt=o,Ea(a).immediateRender=Tn(a.immediateRender),this.staggerTo(r,s,a,l,u,c,f)},t.render=function(r,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,u=this._dur,c=r<=0?0:pt(r),f=this._zTime<0!=r<0&&(this._initted||!u),h,p,x,g,m,d,_,v,y,T,A,E;if(this!==gt&&c>l&&r>=0&&(c=l),c!==this._tTime||o||f){if(a!==this._time&&u&&(c+=this._time-a,r+=this._time-a),h=c,y=this._start,v=this._ts,d=!v,f&&(u||(a=this._zTime),(r||!s)&&(this._zTime=r)),this._repeat){if(A=this._yoyo,m=u+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(m*100+r,s,o);if(h=pt(c%m),c===l?(g=this._repeat,h=u):(T=pt(c/m),g=~~T,g&&g===T&&(h=u,g--),h>u&&(h=u)),T=Po(this._tTime,m),!a&&this._tTime&&T!==g&&this._tTime-T*m-this._dur<=0&&(T=g),A&&g&1&&(h=u-h,E=1),g!==T&&!this._lock){var b=A&&T&1,S=b===(A&&g&1);if(g<T&&(b=!b),a=b?0:c%u?u:c,this._lock=1,this.render(a||(E?0:pt(g*m)),s,!u)._lock=0,this._tTime=c,!s&&this.parent&&zn(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1,T=g),a&&a!==this._time||d!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,l=this._tDur,S&&(this._lock=2,a=b?u:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!d)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(_=I1(this,pt(a),pt(h)),_&&(c-=h-(h=_._start))),this._tTime=c,this._time=h,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,a=0),!a&&c&&u&&!s&&!T&&(zn(this,"onStart"),this._tTime!==c))return this;if(h>=a&&r>=0)for(p=this._first;p;){if(x=p._next,(p._act||h>=p._start)&&p._ts&&_!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(h-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(h-p._start)*p._ts,s,o),h!==this._time||!this._ts&&!d){_=0,x&&(c+=this._zTime=-et);break}}p=x}else{p=this._last;for(var w=r<0?r:h;p;){if(x=p._prev,(p._act||w<=p._end)&&p._ts&&_!==p){if(p.parent!==this)return this.render(r,s,o);if(p.render(p._ts>0?(w-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(w-p._start)*p._ts,s,o||qt&&cp(p)),h!==this._time||!this._ts&&!d){_=0,x&&(c+=this._zTime=w?-et:et);break}}p=x}}if(_&&!s&&(this.pause(),_.render(h>=a?0:-et)._zTime=h>=a?1:-1,this._ts))return this._start=y,vc(this),this.render(r,s,o);this._onUpdate&&!s&&zn(this,"onUpdate",!0),(c===l&&this._tTime>=this.totalDuration()||!c&&a)&&(y===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!u)&&(c===l&&this._ts>0||!c&&this._ts<0)&&Fr(this,1),!s&&!(r<0&&!a)&&(c||a||!l)&&(zn(this,c===l&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,s){var o=this;if(tr(s)||(s=Zn(this,s,r)),!(r instanceof $a)){if(sn(r))return r.forEach(function(a){return o.add(a,s)}),this;if(Gt(r))return this.addLabel(r,s);if(Tt(r))r=Lt.delayedCall(0,r);else return this}return this!==r?Pi(this,r,s):this},t.getChildren=function(r,s,o,a){r===void 0&&(r=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ii);for(var l=[],u=this._first;u;)u._start>=a&&(u instanceof Lt?s&&l.push(u):(o&&l.push(u),r&&l.push.apply(l,u.getChildren(!0,s,o)))),u=u._next;return l},t.getById=function(r){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===r)return s[o]},t.remove=function(r){return Gt(r)?this.removeLabel(r):Tt(r)?this.killTweensOf(r):(r.parent===this&&_c(this,r),r===this._recent&&(this._recent=this._last),hs(this))},t.totalTime=function(r,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=pt(Fn.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),n.prototype.totalTime.call(this,r,s),this._forcing=0,this):this._tTime},t.addLabel=function(r,s){return this.labels[r]=Zn(this,s),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,s,o){var a=Lt.delayedCall(0,s||Xa,o);return a.data="isPause",this._hasPause=1,Pi(this,a,Zn(this,r))},t.removePause=function(r){var s=this._first;for(r=Zn(this,r);s;)s._start===r&&s.data==="isPause"&&Fr(s),s=s._next},t.killTweensOf=function(r,s,o){for(var a=this.getTweensOf(r,o),l=a.length;l--;)_r!==a[l]&&a[l].kill(r,s);return this},t.getTweensOf=function(r,s){for(var o=[],a=ri(r),l=this._first,u=tr(s),c;l;)l instanceof Lt?R1(l._targets,a)&&(u?(!_r||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(c=l.getTweensOf(a,s)).length&&o.push.apply(o,c),l=l._next;return o},t.tweenTo=function(r,s){s=s||{};var o=this,a=Zn(o,r),l=s,u=l.startAt,c=l.onStart,f=l.onStartParams,h=l.immediateRender,p,x=Lt.to(o,Xn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale())||et,onStart:function(){if(o.pause(),!p){var m=s.duration||Math.abs((a-(u&&"time"in u?u.time:o._time))/o.timeScale());x._dur!==m&&Lo(x,m,0,1).render(x._time,!0,!0),p=1}c&&c.apply(x,f||[])}},s));return h?x.render(0):x},t.tweenFromTo=function(r,s,o){return this.tweenTo(s,Xn({startAt:{time:Zn(this,r)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),ng(this,Zn(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),ng(this,Zn(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+et)},t.shiftChildren=function(r,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,u;for(r=pt(r);a;)a._start>=o&&(a._start+=r,a._end+=r),a=a._next;if(s)for(u in l)l[u]>=o&&(l[u]+=r);return hs(this)},t.invalidate=function(r){var s=this._first;for(this._lock=0;s;)s.invalidate(r),s=s._next;return n.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),hs(this)},t.totalDuration=function(r){var s=0,o=this,a=o._last,l=ii,u,c,f;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-r:r));if(o._dirty){for(f=o.parent;a;)u=a._prev,a._dirty&&a.totalDuration(),c=a._start,c>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Pi(o,a,c-a._delay,1)._lock=0):l=c,c<0&&a._ts&&(s-=c,(!f&&!o._dp||f&&f.smoothChildTiming)&&(o._start+=pt(c/o._ts),o._time-=c,o._tTime-=c),o.shiftChildren(-c,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=u;Lo(o,o===gt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(r){if(gt._ts&&(px(gt,ju(r,gt)),dx=Fn.frame),Fn.frame>=Qm){Qm+=Hn.autoSleep||120;var s=gt._first;if((!s||!s._ts)&&Hn.autoSleep&&Fn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Fn.sleep()}}},e}($a);Xn(xn.prototype,{_lock:0,_hasPause:0,_forcing:0});var Z1=function(e,t,i,r,s,o,a){var l=new An(this._pt,e,t,0,1,Bx,null,s),u=0,c=0,f,h,p,x,g,m,d,_;for(l.b=i,l.e=r,i+="",r+="",(d=~r.indexOf("random("))&&(r=Ya(r)),o&&(_=[i,r],o(_,e,t),i=_[0],r=_[1]),h=i.match(ef)||[];f=ef.exec(r);)x=f[0],g=r.substring(u,f.index),p?p=(p+1)%5:g.substr(-5)==="rgba("&&(p=1),x!==h[c++]&&(m=parseFloat(h[c-1])||0,l._pt={_next:l._pt,p:g||c===1?g:",",s:m,c:x.charAt(1)==="="?_o(m,x)-m:parseFloat(x)-m,m:p&&p<4?Math.round:0},u=ef.lastIndex);return l.c=u<r.length?r.substring(u,r.length):"",l.fp=a,(lx.test(r)||d)&&(l.e=0),this._pt=l,l},fp=function(e,t,i,r,s,o,a,l,u,c){Tt(r)&&(r=r(s||0,e,o));var f=e[t],h=i!=="get"?i:Tt(f)?u?e[t.indexOf("set")||!Tt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():f,p=Tt(f)?u?nE:kx:hp,x;if(Gt(r)&&(~r.indexOf("random(")&&(r=Ya(r)),r.charAt(1)==="="&&(x=_o(h,r)+(rn(h)||0),(x||x===0)&&(r=x))),!c||h!==r||jd)return!isNaN(h*r)&&r!==""?(x=new An(this._pt,e,t,+h||0,r-(h||0),typeof f=="boolean"?rE:zx,0,p),u&&(x.fp=u),a&&x.modifier(a,this,e),this._pt=x):(!f&&!(t in e)&&op(t,r),Z1.call(this,e,t,h,r,p,l||Hn.stringFilter,u))},Q1=function(e,t,i,r,s){if(Tt(e)&&(e=wa(e,s,t,i,r)),!Ii(e)||e.style&&e.nodeType||sn(e)||ox(e))return Gt(e)?wa(e,s,t,i,r):e;var o={},a;for(a in e)o[a]=wa(e[a],s,t,i,r);return o},Ux=function(e,t,i,r,s,o){var a,l,u,c;if(Un[e]&&(a=new Un[e]).init(s,a.rawVars?t[e]:Q1(t[e],r,s,o,i),i,r,o)!==!1&&(i._pt=l=new An(i._pt,s,e,0,1,a.render,a,0,a.priority),i!==ao))for(u=i._ptLookup[i._targets.indexOf(s)],c=a._props.length;c--;)u[a._props[c]]=l;return a},_r,jd,dp=function n(e,t,i){var r=e.vars,s=r.ease,o=r.startAt,a=r.immediateRender,l=r.lazy,u=r.onUpdate,c=r.runBackwards,f=r.yoyoEase,h=r.keyframes,p=r.autoRevert,x=e._dur,g=e._startAt,m=e._targets,d=e.parent,_=d&&d.data==="nested"?d.vars.targets:m,v=e._overwrite==="auto"&&!np,y=e.timeline,T=r.easeReverse||f,A,E,b,S,w,U,k,$,L,O,V,q,I;if(y&&(!h||!s)&&(s="none"),e._ease=ps(s,Wa.ease),e._rEase=T&&(ps(T)||e._ease),e._from=!y&&!!r.runBackwards,e._from&&(e.ratio=1),!y||h&&!r.stagger){if($=m[0]?ds(m[0]).harness:0,q=$&&r[$.prop],A=Wu(r,ap),g&&(g._zTime<0&&g.progress(1),t<0&&c&&a&&!p?g.render(-1,!0):g.revert(c&&x?hu:w1),g._lazy=0),o){if(Fr(e._startAt=Lt.set(m,Xn({data:"isStart",overwrite:!1,parent:d,immediateRender:!0,lazy:!g&&Tn(l),startAt:null,delay:0,onUpdate:u&&function(){return zn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(qt||!a&&!p)&&e._startAt.revert(hu),a&&x&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&x&&!g){if(t&&(a=!1),b=Xn({overwrite:!1,data:"isFromStart",lazy:a&&!g&&Tn(l),immediateRender:a,stagger:0,parent:d},A),q&&(b[$.prop]=q),Fr(e._startAt=Lt.set(m,b)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(qt?e._startAt.revert(hu):e._startAt.render(-1,!0)),e._zTime=t,!a)n(e._startAt,et,et);else if(!t)return}for(e._pt=e._ptCache=0,l=x&&Tn(l)||l&&!x,E=0;E<m.length;E++){if(w=m[E],k=w._gsap||up(m)[E]._gsap,e._ptLookup[E]=O={},zd[k.id]&&Pr.length&&Gu(),V=_===m?E:_.indexOf(w),$&&(L=new $).init(w,q||A,e,V,_)!==!1&&(e._pt=S=new An(e._pt,w,L.name,0,1,L.render,L,0,L.priority),L._props.forEach(function(B){O[B]=S}),L.priority&&(U=1)),!$||q)for(b in A)Un[b]&&(L=Ux(b,A,e,V,w,_))?L.priority&&(U=1):O[b]=S=fp.call(e,w,b,"get",A[b],V,_,0,r.stringFilter);e._op&&e._op[E]&&e.kill(w,e._op[E]),v&&e._pt&&(_r=e,gt.killTweensOf(w,O,e.globalTime(t)),I=!e.parent,_r=0),e._pt&&l&&(zd[k.id]=1)}U&&Vx(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!I,h&&t<=0&&y.render(ii,!0,!0)},J1=function(e,t,i,r,s,o,a,l){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,f,h,p;if(!u)for(u=e._ptCache[t]=[],h=e._ptLookup,p=e._targets.length;p--;){if(c=h[p][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return jd=1,e.vars[t]="+=0",dp(e,a),jd=0,l?ja(t+" not eligible for reset. Try splitting into individual properties"):1;u.push(c)}for(p=u.length;p--;)f=u[p],c=f._pt||f,c.s=(r||r===0)&&!s?r:c.s+(r||0)+o*c.c,c.c=i-c.s,f.e&&(f.e=At(i)+rn(f.e)),f.b&&(f.b=c.s+rn(f.b))},eE=function(e,t){var i=e[0]?ds(e[0]).harness:0,r=i&&i.aliases,s,o,a,l;if(!r)return t;s=bo({},t);for(o in r)if(o in s)for(l=r[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},tE=function(e,t,i,r){var s=t.ease||r||"power1.inOut",o,a;if(sn(t))a=i[e]||(i[e]=[]),t.forEach(function(l,u){return a.push({t:u/(t.length-1)*100,v:l,e:s})});else for(o in t)a=i[o]||(i[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},wa=function(e,t,i,r,s){return Tt(e)?e.call(t,i,r,s):Gt(e)&&~e.indexOf("random(")?Ya(e):e},Ox=lp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Fx={};wn(Ox+",id,stagger,delay,duration,paused,scrollTrigger",function(n){return Fx[n]=1});var Lt=function(n){rx(e,n);function e(i,r,s,o){var a;typeof r=="number"&&(s.duration=r,r=s,s=null),a=n.call(this,o?r:Ea(r))||this;var l=a.vars,u=l.duration,c=l.delay,f=l.immediateRender,h=l.stagger,p=l.overwrite,x=l.keyframes,g=l.defaults,m=l.scrollTrigger,d=r.parent||gt,_=(sn(i)||ox(i)?tr(i[0]):"length"in r)?[i]:ri(i),v,y,T,A,E,b,S,w;if(a._targets=_.length?up(_):ja("GSAP target "+i+" not found. https://gsap.com",!Hn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=p,x||h||bl(u)||bl(c)){r=a.vars;var U=r.easeReverse||r.yoyoEase;if(v=a.timeline=new xn({data:"nested",defaults:g||{},targets:d&&d.data==="nested"?d.vars.targets:_}),v.kill(),v.parent=v._dp=Gi(a),v._start=0,h||bl(u)||bl(c)){if(A=_.length,S=h&&Ex(h),Ii(h))for(E in h)~Ox.indexOf(E)&&(w||(w={}),w[E]=h[E]);for(y=0;y<A;y++)T=Wu(r,Fx),T.stagger=0,U&&(T.easeReverse=U),w&&bo(T,w),b=_[y],T.duration=+wa(u,Gi(a),y,b,_),T.delay=(+wa(c,Gi(a),y,b,_)||0)-a._delay,!h&&A===1&&T.delay&&(a._delay=c=T.delay,a._start+=c,T.delay=0),v.to(b,T,S?S(y,b,_):0),v._ease=Ye.none;v.duration()?u=c=0:a.timeline=0}else if(x){Ea(Xn(v.vars.defaults,{ease:"none"})),v._ease=ps(x.ease||r.ease||"none");var k=0,$,L,O;if(sn(x))x.forEach(function(V){return v.to(_,V,">")}),v.duration();else{T={};for(E in x)E==="ease"||E==="easeEach"||tE(E,x[E],T,x.easeEach);for(E in T)for($=T[E].sort(function(V,q){return V.t-q.t}),k=0,y=0;y<$.length;y++)L=$[y],O={ease:L.e,duration:(L.t-(y?$[y-1].t:0))/100*u},O[E]=L.v,v.to(_,O,k),k+=O.duration;v.duration()<u&&v.to({},{duration:u-v.duration()})}}u||a.duration(u=v.duration())}else a.timeline=0;return p===!0&&!np&&(_r=Gi(a),gt.killTweensOf(_),_r=0),Pi(d,Gi(a),s),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(f||!u&&!x&&a._start===pt(d._time)&&Tn(f)&&L1(Gi(a))&&d.data!=="nested")&&(a._tTime=-et,a.render(Math.max(0,-c)||0)),m&&xx(Gi(a),m),a}var t=e.prototype;return t.render=function(r,s,o){var a=this._time,l=this._tDur,u=this._dur,c=r<0,f=r>l-et&&!c?l:r<et?0:r,h,p,x,g,m,d,_,v;if(!u)N1(this,r,s,o);else if(f!==this._tTime||!r||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(h=f,v=this.timeline,this._repeat){if(g=u+this._rDelay,this._repeat<-1&&c)return this.totalTime(g*100+r,s,o);if(h=pt(f%g),f===l?(x=this._repeat,h=u):(m=pt(f/g),x=~~m,x&&x===m?(h=u,x--):h>u&&(h=u)),d=this._yoyo&&x&1,d&&(h=u-h),m=Po(this._tTime,g),h===a&&!o&&this._initted&&x===m)return this._tTime=f,this;x!==m&&this.vars.repeatRefresh&&!d&&!this._lock&&h!==g&&this._initted&&(this._lock=o=1,this.render(pt(g*x),!0).invalidate()._lock=0)}if(!this._initted){if(yx(this,c?r:h,o,s,f))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&x!==m))return this;if(u!==this._dur)return this.render(r,s,o)}if(this._rEase){var y=h<a;if(y!==this._inv){var T=y?a:u-a;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=T?(y?-1:1)/T:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=_=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=_=this._ease(h/u);if(this._from&&(this.ratio=_=1-_),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&f&&!s&&!m&&(zn(this,"onStart"),this._tTime!==f))return this;for(p=this._pt;p;)p.r(_,p.d),p=p._next;v&&v.render(r<0?r:v._dur*v._ease(h/this._dur),s,o)||this._startAt&&(this._zTime=r),this._onUpdate&&!s&&(c&&Bd(this,r,s,o),zn(this,"onUpdate")),this._repeat&&x!==m&&this.vars.onRepeat&&!s&&this.parent&&zn(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(c&&!this._onUpdate&&Bd(this,r,!0,!0),(r||!u)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&Fr(this,1),!s&&!(c&&!a)&&(f||a||d)&&(zn(this,f===l?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),n.prototype.invalidate.call(this,r)},t.resetTo=function(r,s,o,a,l){qa||Fn.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||dp(this,u),c=this._ease(u/this._dur),J1(this,r,s,o,a,c,u,l)?this.resetTo(r,s,o,a,1):(xc(this,0),this.parent||_x(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,s){if(s===void 0&&(s="all"),!r&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?da(this):this.scrollTrigger&&this.scrollTrigger.kill(!!qt),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(r,s,_r&&_r.vars.overwrite!==!0)._first||da(this),this.parent&&o!==this.timeline.totalDuration()&&Lo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=r?ri(r):a,u=this._ptLookup,c=this._pt,f,h,p,x,g,m,d;if((!s||s==="all")&&b1(a,l))return s==="all"&&(this._pt=0),da(this);for(f=this._op=this._op||[],s!=="all"&&(Gt(s)&&(g={},wn(s,function(_){return g[_]=1}),s=g),s=eE(a,s)),d=a.length;d--;)if(~l.indexOf(a[d])){h=u[d],s==="all"?(f[d]=s,x=h,p={}):(p=f[d]=f[d]||{},x=s);for(g in x)m=h&&h[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&_c(this,m,"_pt"),delete h[g]),p!=="all"&&(p[g]=1)}return this._initted&&!this._pt&&c&&da(this),this},e.to=function(r,s){return new e(r,s,arguments[2])},e.from=function(r,s){return Ta(1,arguments)},e.delayedCall=function(r,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(r,s,o){return Ta(2,arguments)},e.set=function(r,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(r,s)},e.killTweensOf=function(r,s,o){return gt.killTweensOf(r,s,o)},e}($a);Xn(Lt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});wn("staggerTo,staggerFrom,staggerFromTo",function(n){Lt[n]=function(){var e=new xn,t=Hd.call(arguments,0);return t.splice(n==="staggerFromTo"?5:4,0,0),e[n].apply(e,t)}});var hp=function(e,t,i){return e[t]=i},kx=function(e,t,i){return e[t](i)},nE=function(e,t,i,r){return e[t](r.fp,i)},iE=function(e,t,i){return e.setAttribute(t,i)},pp=function(e,t){return Tt(e[t])?kx:ip(e[t])&&e.setAttribute?iE:hp},zx=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},rE=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Bx=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},mp=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},sE=function(e,t,i,r){for(var s=this._pt,o;s;)o=s._next,s.p===r&&s.modifier(e,t,i),s=o},oE=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?_c(this,t,"_pt"):t.dep||(i=1),t=r;return!i},aE=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Vx=function(e){for(var t=e._pt,i,r,s,o;t;){for(i=t._next,r=s;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:o)?t._prev._next=t:s=t,(t._next=r)?r._prev=t:o=t,t=i}e._pt=s},An=function(){function n(t,i,r,s,o,a,l,u,c){this.t=i,this.s=s,this.c=o,this.p=r,this.r=a||zx,this.d=l||this,this.set=u||hp,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=n.prototype;return e.modifier=function(i,r,s){this.mSet=this.mSet||this.set,this.set=aE,this.m=i,this.mt=s,this.tween=r},n}();wn(lp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(n){return ap[n]=1});jn.TweenMax=jn.TweenLite=Lt;jn.TimelineLite=jn.TimelineMax=xn;gt=new xn({sortChildren:!1,defaults:Wa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Hn.stringFilter=Dx;var ms=[],mu={},lE=[],rg=0,uE=0,of=function(e){return(mu[e]||lE).map(function(t){return t()})},Xd=function(){var e=Date.now(),t=[];e-rg>2&&(of("matchMediaInit"),ms.forEach(function(i){var r=i.queries,s=i.conditions,o,a,l,u;for(a in r)o=Ai.matchMedia(r[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,u=1);u&&(i.revert(),l&&t.push(i))}),of("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),rg=e,of("matchMedia"))},Hx=function(){function n(t,i){this.selector=i&&Gd(i),this.data=[],this._r=[],this.isReverted=!1,this.id=uE++,t&&this.add(t)}var e=n.prototype;return e.add=function(i,r,s){Tt(i)&&(s=r,r=i,i=Tt);var o=this,a=function(){var u=ft,c=o.selector,f;return u&&u!==o&&u.data.push(o),s&&(o.selector=Gd(s)),ft=o,f=r.apply(o,arguments),Tt(f)&&o._r.push(f),ft=u,o.selector=c,o.isReverted=!1,f};return o.last=a,i===Tt?a(o,function(l){return o.add(null,l)}):i?o[i]=a:a},e.ignore=function(i){var r=ft;ft=null,i(this),ft=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof n?i.push.apply(i,r.getTweens()):r instanceof Lt&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var s=this;if(i?function(){for(var a=s.getTweens(),l=s.data.length,u;l--;)u=s.data[l],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(c){return a.splice(a.indexOf(c),1)}));for(a.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,f){return f.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),l=s.data.length;l--;)u=s.data[l],u instanceof xn?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof Lt)&&u.revert&&u.revert(i);s._r.forEach(function(c){return c(i,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),r)for(var o=ms.length;o--;)ms[o].id===this.id&&ms.splice(o,1)},e.revert=function(i){this.kill(i||{})},n}(),cE=function(){function n(t){this.contexts=[],this.scope=t,ft&&ft.data.push(this)}var e=n.prototype;return e.add=function(i,r,s){Ii(i)||(i={matches:i});var o=new Hx(0,s||this.scope),a=o.conditions={},l,u,c;ft&&!o.selector&&(o.selector=ft.selector),this.contexts.push(o),r=o.add("onMatch",r),o.queries=i;for(u in i)u==="all"?c=1:(l=Ai.matchMedia(i[u]),l&&(ms.indexOf(o)<0&&ms.push(o),(a[u]=l.matches)&&(c=1),l.addListener?l.addListener(Xd):l.addEventListener("change",Xd)));return c&&r(o,function(f){return o.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},n}(),Xu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return bx(r)})},timeline:function(e){return new xn(e)},getTweensOf:function(e,t){return gt.getTweensOf(e,t)},getProperty:function(e,t,i,r){Gt(e)&&(e=ri(e)[0]);var s=ds(e||{}).get,o=i?gx:mx;return i==="native"&&(i=""),e&&(t?o((Un[t]&&Un[t].get||s)(e,t,i,r)):function(a,l,u){return o((Un[a]&&Un[a].get||s)(e,a,l,u))})},quickSetter:function(e,t,i){if(e=ri(e),e.length>1){var r=e.map(function(c){return bn.quickSetter(c,t,i)}),s=r.length;return function(c){for(var f=s;f--;)r[f](c)}}e=e[0]||{};var o=Un[t],a=ds(e),l=a.harness&&(a.harness.aliases||{})[t]||t,u=o?function(c){var f=new o;ao._pt=0,f.init(e,i?c+i:c,ao,0,[e]),f.render(1,f),ao._pt&&mp(1,ao)}:a.set(e,l);return o?u:function(c){return u(e,l,i?c+i:c,a,1)}},quickTo:function(e,t,i){var r,s=bn.to(e,Xn((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),o=function(l,u,c){return s.resetTo(t,l,u,c)};return o.tween=s,o},isTweening:function(e){return gt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=ps(e.ease,Wa.ease)),Jm(Wa,e||{})},config:function(e){return Jm(Hn,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,s=e.defaults,o=e.extendTimeline;(r||"").split(",").forEach(function(a){return a&&!Un[a]&&!jn[a]&&ja(t+" effect requires "+a+" plugin.")}),tf[t]=function(a,l,u){return i(ri(a),Xn(l||{},s),u)},o&&(xn.prototype[t]=function(a,l,u){return this.add(tf[t](a,Ii(l)?l:(u=l)&&{},this),u)})},registerEase:function(e,t){Ye[e]=ps(t)},parseEase:function(e,t){return arguments.length?ps(e,t):Ye},getById:function(e){return gt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new xn(e),r,s;for(i.smoothChildTiming=Tn(e.smoothChildTiming),gt.remove(i),i._dp=0,i._time=i._tTime=gt._time,r=gt._first;r;)s=r._next,(t||!(!r._dur&&r instanceof Lt&&r.vars.onComplete===r._targets[0]))&&Pi(i,r,r._start-r._delay),r=s;return Pi(gt,i,0),i},context:function(e,t){return e?new Hx(e,t):ft},matchMedia:function(e){return new cE(e)},matchMediaRefresh:function(){return ms.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||Xd()},addEventListener:function(e,t){var i=mu[e]||(mu[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=mu[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:V1,wrapYoyo:H1,distribute:Ex,random:wx,snap:Tx,normalize:B1,getUnit:rn,clamp:O1,splitColor:Px,toArray:ri,selector:Gd,mapRange:Rx,pipe:k1,unitize:z1,interpolate:G1,shuffle:Mx},install:cx,effects:tf,ticker:Fn,updateRoot:xn.updateRoot,plugins:Un,globalTimeline:gt,core:{PropTween:An,globals:fx,Tween:Lt,Timeline:xn,Animation:$a,getCache:ds,_removeLinkedListItem:_c,reverting:function(){return qt},context:function(e){return e&&ft&&(ft.data.push(e),e._ctx=ft),ft},suppressOverwrites:function(e){return np=e}}};wn("to,from,fromTo,delayedCall,set,killTweensOf",function(n){return Xu[n]=Lt[n]});Fn.add(xn.updateRoot);ao=Xu.to({},{duration:0});var fE=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},dE=function(e,t){var i=e._targets,r,s,o;for(r in t)for(s=i.length;s--;)o=e._ptLookup[s][r],o&&(o=o.d)&&(o._pt&&(o=fE(o,r)),o&&o.modifier&&o.modifier(t[r],e,i[s],r))},af=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,s,o){o._onInit=function(a){var l,u;if(Gt(s)&&(l={},wn(s,function(c){return l[c]=1}),s=l),t){l={};for(u in s)l[u]=t(s[u]);s=l}dE(a,s)}}}},bn=Xu.registerPlugin({name:"attr",init:function(e,t,i,r,s){var o,a,l;this.tween=i;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],r,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var i=t._pt;i;)qt?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},af("roundProps",Wd),af("modifiers"),af("snap",Tx))||Xu;Lt.version=xn.version=bn.version="3.15.0";ux=1;rp()&&Do();Ye.Power0;Ye.Power1;Ye.Power2;Ye.Power3;Ye.Power4;Ye.Linear;Ye.Quad;Ye.Cubic;Ye.Quart;Ye.Quint;Ye.Strong;Ye.Elastic;Ye.Back;Ye.SteppedEase;Ye.Bounce;Ye.Sine;Ye.Expo;Ye.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var sg,vr,vo,gp,us,og,_p,hE=function(){return typeof window<"u"},nr={},ts=180/Math.PI,xo=Math.PI/180,Ls=Math.atan2,ag=1e8,vp=/([A-Z])/g,pE=/(left|right|width|margin|padding|x)/i,mE=/[\s,\(]\S/,Li={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Yd=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},gE=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},_E=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},vE=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},xE=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Gx=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Wx=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},yE=function(e,t,i){return e.style[t]=i},SE=function(e,t,i){return e.style.setProperty(t,i)},ME=function(e,t,i){return e._gsap[t]=i},EE=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},TE=function(e,t,i,r,s){var o=e._gsap;o.scaleX=o.scaleY=i,o.renderTransform(s,o)},wE=function(e,t,i,r,s){var o=e._gsap;o[t]=i,o.renderTransform(s,o)},_t="transform",Rn=_t+"Origin",AE=function n(e,t){var i=this,r=this.target,s=r.style,o=r._gsap;if(e in nr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Li[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return i.tfm[a]=Xi(r,a)}):this.tfm[e]=o.x?o[e]:Xi(r,e),e===Rn&&(this.tfm.zOrigin=o.zOrigin);else return Li.transform.split(",").forEach(function(a){return n.call(i,a,t)});if(this.props.indexOf(_t)>=0)return;o.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Rn,t,"")),e=_t}(s||t)&&this.props.push(e,t,s[e])},jx=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},RE=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?i[e[s]]=e[s+2]:i.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(vp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)r[o]=this.tfm[o];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=_p(),(!s||!s.isStart)&&!i[_t]&&(jx(i),r.zOrigin&&i[Rn]&&(i[Rn]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Xx=function(e,t){var i={target:e,props:[],revert:RE,save:AE};return e._gsap||bn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},Yx,qd=function(e,t){var i=vr.createElementNS?vr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):vr.createElement(e);return i&&i.style?i:vr.createElement(e)},Bn=function n(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(vp,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&n(e,No(t)||t,1)||""},lg="O,Moz,ms,Ms,Webkit".split(","),No=function(e,t,i){var r=t||us,s=r.style,o=5;if(e in s&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(lg[o]+e in s););return o<0?null:(o===3?"ms":o>=0?lg[o]:"")+e},$d=function(){hE()&&window.document&&(sg=window,vr=sg.document,vo=vr.documentElement,us=qd("div")||{style:{}},qd("div"),_t=No(_t),Rn=_t+"Origin",us.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Yx=!!No("perspective"),_p=bn.core.reverting,gp=1)},ug=function(e){var t=e.ownerSVGElement,i=qd("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),s;r.style.display="block",i.appendChild(r),vo.appendChild(i);try{s=r.getBBox()}catch{}return i.removeChild(r),vo.removeChild(i),s},cg=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},qx=function(e){var t,i;try{t=e.getBBox()}catch{t=ug(e),i=1}return t&&(t.width||t.height)||i||(t=ug(e)),t&&!t.width&&!t.x&&!t.y?{x:+cg(e,["x","cx","x1"])||0,y:+cg(e,["y","cy","y1"])||0,width:0,height:0}:t},$x=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&qx(e))},kr=function(e,t){if(t){var i=e.style,r;t in nr&&t!==Rn&&(t=_t),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(vp,"-$1").toLowerCase())):i.removeAttribute(t)}},xr=function(e,t,i,r,s,o){var a=new An(e._pt,t,i,0,1,o?Wx:Gx);return e._pt=a,a.b=r,a.e=s,e._props.push(i),a},fg={deg:1,rad:1,turn:1},CE={grid:1,flex:1},zr=function n(e,t,i,r){var s=parseFloat(i)||0,o=(i+"").trim().substr((s+"").length)||"px",a=us.style,l=pE.test(t),u=e.tagName.toLowerCase()==="svg",c=(u?"client":"offset")+(l?"Width":"Height"),f=100,h=r==="px",p=r==="%",x,g,m,d;if(r===o||!s||fg[r]||fg[o])return s;if(o!=="px"&&!h&&(s=n(e,t,i,"px")),d=e.getCTM&&$x(e),(p||o==="%")&&(nr[t]||~t.indexOf("adius")))return x=d?e.getBBox()[l?"width":"height"]:e[c],At(p?s/x*f:s/100*x);if(a[l?"width":"height"]=f+(h?o:r),g=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!u?e:e.parentNode,d&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===vr||!g.appendChild)&&(g=vr.body),m=g._gsap,m&&p&&m.width&&l&&m.time===Fn.time&&!m.uncache)return At(s/m.width*f);if(p&&(t==="height"||t==="width")){var _=e.style[t];e.style[t]=f+r,x=e[c],_?e.style[t]=_:kr(e,t)}else(p||o==="%")&&!CE[Bn(g,"display")]&&(a.position=Bn(e,"position")),g===e&&(a.position="static"),g.appendChild(us),x=us[c],g.removeChild(us),a.position="absolute";return l&&p&&(m=ds(g),m.time=Fn.time,m.width=g[c]),At(h?x*s/f:x&&s?f/x*s:0)},Xi=function(e,t,i,r){var s;return gp||$d(),t in Li&&t!=="transform"&&(t=Li[t],~t.indexOf(",")&&(t=t.split(",")[0])),nr[t]&&t!=="transform"?(s=Za(e,r),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:qu(Bn(e,Rn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||r||~(s+"").indexOf("calc("))&&(s=Yu[t]&&Yu[t](e,t,i)||Bn(e,t)||hx(e,t)||(t==="opacity"?1:0))),i&&!~(s+"").trim().indexOf(" ")?zr(e,t,s,i)+i:s},bE=function(e,t,i,r){if(!i||i==="none"){var s=No(t,e,1),o=s&&Bn(e,s,1);o&&o!==i?(t=s,i=o):t==="borderColor"&&(i=Bn(e,"borderTopColor"))}var a=new An(this._pt,e.style,t,0,1,Bx),l=0,u=0,c,f,h,p,x,g,m,d,_,v,y,T;if(a.b=i,a.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=Bn(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(g=e.style[t],e.style[t]=r,r=Bn(e,t)||r,g?e.style[t]=g:kr(e,t)),c=[i,r],Dx(c),i=c[0],r=c[1],h=i.match(oo)||[],T=r.match(oo)||[],T.length){for(;f=oo.exec(r);)m=f[0],_=r.substring(l,f.index),x?x=(x+1)%5:(_.substr(-5)==="rgba("||_.substr(-5)==="hsla(")&&(x=1),m!==(g=h[u++]||"")&&(p=parseFloat(g)||0,y=g.substr((p+"").length),m.charAt(1)==="="&&(m=_o(p,m)+y),d=parseFloat(m),v=m.substr((d+"").length),l=oo.lastIndex-v.length,v||(v=v||Hn.units[t]||y,l===r.length&&(r+=v,a.e+=v)),y!==v&&(p=zr(e,t,g,v)||0),a._pt={_next:a._pt,p:_||u===1?_:",",s:p,c:d-p,m:x&&x<4||t==="zIndex"?Math.round:0});a.c=l<r.length?r.substring(l,r.length):""}else a.r=t==="display"&&r==="none"?Wx:Gx;return lx.test(r)&&(a.e=0),this._pt=a,a},dg={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},PE=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=dg[i]||i,t[1]=dg[r]||r,t.join(" ")},LE=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,s=t.u,o=i._gsap,a,l,u;if(s==="all"||s===!0)r.cssText="",l=1;else for(s=s.split(","),u=s.length;--u>-1;)a=s[u],nr[a]&&(l=1,a=a==="transformOrigin"?Rn:_t),kr(i,a);l&&(kr(i,_t),o&&(o.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",Za(i,1),o.uncache=1,jx(r)))}},Yu={clearProps:function(e,t,i,r,s){if(s.data!=="isFromStart"){var o=e._pt=new An(e._pt,t,i,0,0,LE);return o.u=r,o.pr=-10,o.tween=s,e._props.push(i),1}}},Ka=[1,0,0,1,0,0],Kx={},Zx=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},hg=function(e){var t=Bn(e,_t);return Zx(t)?Ka:t.substr(7).match(ax).map(At)},xp=function(e,t){var i=e._gsap||ds(e),r=e.style,s=hg(e),o,a,l,u;return i.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ka:s):(s===Ka&&!e.offsetParent&&e!==vo&&!i.svg&&(l=r.display,r.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,a=e.nextElementSibling,vo.appendChild(e)),s=hg(e),l?r.display=l:kr(e,"display"),u&&(a?o.insertBefore(e,a):o?o.appendChild(e):vo.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Kd=function(e,t,i,r,s,o){var a=e._gsap,l=s||xp(e,!0),u=a.xOrigin||0,c=a.yOrigin||0,f=a.xOffset||0,h=a.yOffset||0,p=l[0],x=l[1],g=l[2],m=l[3],d=l[4],_=l[5],v=t.split(" "),y=parseFloat(v[0])||0,T=parseFloat(v[1])||0,A,E,b,S;i?l!==Ka&&(E=p*m-x*g)&&(b=y*(m/E)+T*(-g/E)+(g*_-m*d)/E,S=y*(-x/E)+T*(p/E)-(p*_-x*d)/E,y=b,T=S):(A=qx(e),y=A.x+(~v[0].indexOf("%")?y/100*A.width:y),T=A.y+(~(v[1]||v[0]).indexOf("%")?T/100*A.height:T)),r||r!==!1&&a.smooth?(d=y-u,_=T-c,a.xOffset=f+(d*p+_*g)-d,a.yOffset=h+(d*x+_*m)-_):a.xOffset=a.yOffset=0,a.xOrigin=y,a.yOrigin=T,a.smooth=!!r,a.origin=t,a.originIsAbsolute=!!i,e.style[Rn]="0px 0px",o&&(xr(o,a,"xOrigin",u,y),xr(o,a,"yOrigin",c,T),xr(o,a,"xOffset",f,a.xOffset),xr(o,a,"yOffset",h,a.yOffset)),e.setAttribute("data-svg-origin",y+" "+T)},Za=function(e,t){var i=e._gsap||new Ix(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,s=i.scaleX<0,o="px",a="deg",l=getComputedStyle(e),u=Bn(e,Rn)||"0",c,f,h,p,x,g,m,d,_,v,y,T,A,E,b,S,w,U,k,$,L,O,V,q,I,B,H,Z,Q,Y,K,re;return c=f=h=g=m=d=_=v=y=0,p=x=1,i.svg=!!(e.getCTM&&$x(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(r[_t]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[_t]!=="none"?l[_t]:"")),r.scale=r.rotate=r.translate="none"),E=xp(e,i.svg),i.svg&&(i.uncache?(I=e.getBBox(),u=i.xOrigin-I.x+"px "+(i.yOrigin-I.y)+"px",q=""):q=!t&&e.getAttribute("data-svg-origin"),Kd(e,q||u,!!q||i.originIsAbsolute,i.smooth!==!1,E)),T=i.xOrigin||0,A=i.yOrigin||0,E!==Ka&&(U=E[0],k=E[1],$=E[2],L=E[3],c=O=E[4],f=V=E[5],E.length===6?(p=Math.sqrt(U*U+k*k),x=Math.sqrt(L*L+$*$),g=U||k?Ls(k,U)*ts:0,_=$||L?Ls($,L)*ts+g:0,_&&(x*=Math.abs(Math.cos(_*xo))),i.svg&&(c-=T-(T*U+A*$),f-=A-(T*k+A*L))):(re=E[6],Y=E[7],H=E[8],Z=E[9],Q=E[10],K=E[11],c=E[12],f=E[13],h=E[14],b=Ls(re,Q),m=b*ts,b&&(S=Math.cos(-b),w=Math.sin(-b),q=O*S+H*w,I=V*S+Z*w,B=re*S+Q*w,H=O*-w+H*S,Z=V*-w+Z*S,Q=re*-w+Q*S,K=Y*-w+K*S,O=q,V=I,re=B),b=Ls(-$,Q),d=b*ts,b&&(S=Math.cos(-b),w=Math.sin(-b),q=U*S-H*w,I=k*S-Z*w,B=$*S-Q*w,K=L*w+K*S,U=q,k=I,$=B),b=Ls(k,U),g=b*ts,b&&(S=Math.cos(b),w=Math.sin(b),q=U*S+k*w,I=O*S+V*w,k=k*S-U*w,V=V*S-O*w,U=q,O=I),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,d=180-d),p=At(Math.sqrt(U*U+k*k+$*$)),x=At(Math.sqrt(V*V+re*re)),b=Ls(O,V),_=Math.abs(b)>2e-4?b*ts:0,y=K?1/(K<0?-K:K):0),i.svg&&(q=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Zx(Bn(e,_t)),q&&e.setAttribute("transform",q))),Math.abs(_)>90&&Math.abs(_)<270&&(s?(p*=-1,_+=g<=0?180:-180,g+=g<=0?180:-180):(x*=-1,_+=_<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+o,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+o,i.z=h+o,i.scaleX=At(p),i.scaleY=At(x),i.rotation=At(g)+a,i.rotationX=At(m)+a,i.rotationY=At(d)+a,i.skewX=_+a,i.skewY=v+a,i.transformPerspective=y+o,(i.zOrigin=parseFloat(u.split(" ")[2])||!t&&i.zOrigin||0)&&(r[Rn]=qu(u)),i.xOffset=i.yOffset=0,i.force3D=Hn.force3D,i.renderTransform=i.svg?NE:Yx?Qx:DE,i.uncache=0,i},qu=function(e){return(e=e.split(" "))[0]+" "+e[1]},lf=function(e,t,i){var r=rn(t);return At(parseFloat(t)+parseFloat(zr(e,"x",i+"px",r)))+r},DE=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Qx(e,t)},Yr="0deg",ta="0px",qr=") ",Qx=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.z,u=i.rotation,c=i.rotationY,f=i.rotationX,h=i.skewX,p=i.skewY,x=i.scaleX,g=i.scaleY,m=i.transformPerspective,d=i.force3D,_=i.target,v=i.zOrigin,y="",T=d==="auto"&&e&&e!==1||d===!0;if(v&&(f!==Yr||c!==Yr)){var A=parseFloat(c)*xo,E=Math.sin(A),b=Math.cos(A),S;A=parseFloat(f)*xo,S=Math.cos(A),o=lf(_,o,E*S*-v),a=lf(_,a,-Math.sin(A)*-v),l=lf(_,l,b*S*-v+v)}m!==ta&&(y+="perspective("+m+qr),(r||s)&&(y+="translate("+r+"%, "+s+"%) "),(T||o!==ta||a!==ta||l!==ta)&&(y+=l!==ta||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+qr),u!==Yr&&(y+="rotate("+u+qr),c!==Yr&&(y+="rotateY("+c+qr),f!==Yr&&(y+="rotateX("+f+qr),(h!==Yr||p!==Yr)&&(y+="skew("+h+", "+p+qr),(x!==1||g!==1)&&(y+="scale("+x+", "+g+qr),_.style[_t]=y||"translate(0, 0)"},NE=function(e,t){var i=t||this,r=i.xPercent,s=i.yPercent,o=i.x,a=i.y,l=i.rotation,u=i.skewX,c=i.skewY,f=i.scaleX,h=i.scaleY,p=i.target,x=i.xOrigin,g=i.yOrigin,m=i.xOffset,d=i.yOffset,_=i.forceCSS,v=parseFloat(o),y=parseFloat(a),T,A,E,b,S;l=parseFloat(l),u=parseFloat(u),c=parseFloat(c),c&&(c=parseFloat(c),u+=c,l+=c),l||u?(l*=xo,u*=xo,T=Math.cos(l)*f,A=Math.sin(l)*f,E=Math.sin(l-u)*-h,b=Math.cos(l-u)*h,u&&(c*=xo,S=Math.tan(u-c),S=Math.sqrt(1+S*S),E*=S,b*=S,c&&(S=Math.tan(c),S=Math.sqrt(1+S*S),T*=S,A*=S)),T=At(T),A=At(A),E=At(E),b=At(b)):(T=f,b=h,A=E=0),(v&&!~(o+"").indexOf("px")||y&&!~(a+"").indexOf("px"))&&(v=zr(p,"x",o,"px"),y=zr(p,"y",a,"px")),(x||g||m||d)&&(v=At(v+x-(x*T+g*E)+m),y=At(y+g-(x*A+g*b)+d)),(r||s)&&(S=p.getBBox(),v=At(v+r/100*S.width),y=At(y+s/100*S.height)),S="matrix("+T+","+A+","+E+","+b+","+v+","+y+")",p.setAttribute("transform",S),_&&(p.style[_t]=S)},IE=function(e,t,i,r,s){var o=360,a=Gt(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?ts:1),u=l-r,c=r+u+"deg",f,h;return a&&(f=s.split("_")[1],f==="short"&&(u%=o,u!==u%(o/2)&&(u+=u<0?o:-o)),f==="cw"&&u<0?u=(u+o*ag)%o-~~(u/o)*o:f==="ccw"&&u>0&&(u=(u-o*ag)%o-~~(u/o)*o)),e._pt=h=new An(e._pt,t,i,r,u,gE),h.e=c,h.u="deg",e._props.push(i),h},pg=function(e,t){for(var i in t)e[i]=t[i];return e},UE=function(e,t,i){var r=pg({},i._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=i.style,a,l,u,c,f,h,p,x;r.svg?(u=i.getAttribute("transform"),i.setAttribute("transform",""),o[_t]=t,a=Za(i,1),kr(i,_t),i.setAttribute("transform",u)):(u=getComputedStyle(i)[_t],o[_t]=t,a=Za(i,1),o[_t]=u);for(l in nr)u=r[l],c=a[l],u!==c&&s.indexOf(l)<0&&(p=rn(u),x=rn(c),f=p!==x?zr(i,l,u,x):parseFloat(u),h=parseFloat(c),e._pt=new An(e._pt,a,l,f,h-f,Yd),e._pt.u=x||0,e._props.push(l));pg(a,r)};wn("padding,margin,Width,Radius",function(n,e){var t="Top",i="Right",r="Bottom",s="Left",o=(e<3?[t,i,r,s]:[t+s,t+i,r+i,r+s]).map(function(a){return e<2?n+a:"border"+a+n});Yu[e>1?"border"+n:n]=function(a,l,u,c,f){var h,p;if(arguments.length<4)return h=o.map(function(x){return Xi(a,x,u)}),p=h.join(" "),p.split(h[0]).length===5?h[0]:p;h=(c+"").split(" "),p={},o.forEach(function(x,g){return p[x]=h[g]=h[g]||h[(g-1)/2|0]}),a.init(l,p,f)}});var Jx={name:"css",register:$d,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,s){var o=this._props,a=e.style,l=i.vars.startAt,u,c,f,h,p,x,g,m,d,_,v,y,T,A,E,b,S;gp||$d(),this.styles=this.styles||Xx(e),b=this.styles.props,this.tween=i;for(g in t)if(g!=="autoRound"&&(c=t[g],!(Un[g]&&Ux(g,t,i,r,e,s)))){if(p=typeof c,x=Yu[g],p==="function"&&(c=c.call(i,r,e,s),p=typeof c),p==="string"&&~c.indexOf("random(")&&(c=Ya(c)),x)x(this,e,g,c,i)&&(E=1);else if(g.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(g)+"").trim(),c+="",Lr.lastIndex=0,Lr.test(u)||(m=rn(u),d=rn(c),d?m!==d&&(u=zr(e,g,u,d)+d):m&&(c+=m)),this.add(a,"setProperty",u,c,r,s,0,0,g),o.push(g),b.push(g,0,a[g]);else if(p!=="undefined"){if(l&&g in l?(u=typeof l[g]=="function"?l[g].call(i,r,e,s):l[g],Gt(u)&&~u.indexOf("random(")&&(u=Ya(u)),rn(u+"")||u==="auto"||(u+=Hn.units[g]||rn(Xi(e,g))||""),(u+"").charAt(1)==="="&&(u=Xi(e,g))):u=Xi(e,g),h=parseFloat(u),_=p==="string"&&c.charAt(1)==="="&&c.substr(0,2),_&&(c=c.substr(2)),f=parseFloat(c),g in Li&&(g==="autoAlpha"&&(h===1&&Xi(e,"visibility")==="hidden"&&f&&(h=0),b.push("visibility",0,a.visibility),xr(this,a,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),g!=="scale"&&g!=="transform"&&(g=Li[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in nr,v){if(this.styles.save(g),S=c,p==="string"&&c.substring(0,6)==="var(--"){if(c=Bn(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var w=e.style.perspective;e.style.perspective=c,c=Bn(e,"perspective"),w?e.style.perspective=w:kr(e,"perspective")}f=parseFloat(c)}if(y||(T=e._gsap,T.renderTransform&&!t.parseTransform||Za(e,t.parseTransform),A=t.smoothOrigin!==!1&&T.smooth,y=this._pt=new An(this._pt,a,_t,0,1,T.renderTransform,T,0,-1),y.dep=1),g==="scale")this._pt=new An(this._pt,T,"scaleY",T.scaleY,(_?_o(T.scaleY,_+f):f)-T.scaleY||0,Yd),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){b.push(Rn,0,a[Rn]),c=PE(c),T.svg?Kd(e,c,0,A,0,this):(d=parseFloat(c.split(" ")[2])||0,d!==T.zOrigin&&xr(this,T,"zOrigin",T.zOrigin,d),xr(this,a,g,qu(u),qu(c)));continue}else if(g==="svgOrigin"){Kd(e,c,1,A,0,this);continue}else if(g in Kx){IE(this,T,g,h,_?_o(h,_+c):c);continue}else if(g==="smoothOrigin"){xr(this,T,"smooth",T.smooth,c);continue}else if(g==="force3D"){T[g]=c;continue}else if(g==="transform"){UE(this,c,e);continue}}else g in a||(g=No(g)||g);if(v||(f||f===0)&&(h||h===0)&&!mE.test(c)&&g in a)m=(u+"").substr((h+"").length),f||(f=0),d=rn(c)||(g in Hn.units?Hn.units[g]:m),m!==d&&(h=zr(e,g,u,d)),this._pt=new An(this._pt,v?T:a,g,h,(_?_o(h,_+f):f)-h,!v&&(d==="px"||g==="zIndex")&&t.autoRound!==!1?xE:Yd),this._pt.u=d||0,v&&S!==c?(this._pt.b=u,this._pt.e=S,this._pt.r=vE):m!==d&&d!=="%"&&(this._pt.b=u,this._pt.r=_E);else if(g in a)bE.call(this,e,g,u,_?_+c:c);else if(g in e)this.add(e,g,u||e[g],_?_+c:c,r,s);else if(g!=="parseTransform"){op(g,c);continue}v||(g in a?b.push(g,0,a[g]):typeof e[g]=="function"?b.push(g,2,e[g]()):b.push(g,1,u||e[g])),o.push(g)}}E&&Vx(this)},render:function(e,t){if(t.tween._time||!_p())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Xi,aliases:Li,getSetter:function(e,t,i){var r=Li[t];return r&&r.indexOf(",")<0&&(t=r),t in nr&&t!==Rn&&(e._gsap.x||Xi(e,"x"))?i&&og===i?t==="scale"?EE:ME:(og=i||{})&&(t==="scale"?TE:wE):e.style&&!ip(e.style[t])?yE:~t.indexOf("-")?SE:pp(e,t)},core:{_removeProperty:kr,_getMatrix:xp}};bn.utils.checkPrefix=No;bn.core.getStyleSaver=Xx;(function(n,e,t,i){var r=wn(n+","+e+","+t,function(s){nr[s]=1});wn(e,function(s){Hn.units[s]="deg",Kx[s]=1}),Li[r[13]]=n+","+e,wn(i,function(s){var o=s.split(":");Li[o[1]]=r[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");wn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(n){Hn.units[n]="px"});bn.registerPlugin(Jx);var Pt=bn.registerPlugin(Jx)||bn;Pt.core.Tween;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const yp="160",OE=0,mg=1,FE=2,ey=1,kE=2,Vi=3,Br=0,Cn=1,_i=2,Dr=0,yo=1,Nn=2,gg=3,_g=4,zE=5,rs=100,BE=101,VE=102,vg=103,xg=104,HE=200,GE=201,WE=202,jE=203,Zd=204,Qd=205,XE=206,YE=207,qE=208,$E=209,KE=210,ZE=211,QE=212,JE=213,eT=214,tT=0,nT=1,iT=2,$u=3,rT=4,sT=5,oT=6,aT=7,ty=0,lT=1,uT=2,Nr=0,cT=1,fT=2,dT=3,ny=4,hT=5,pT=6,iy=300,Io=301,Uo=302,Jd=303,eh=304,yc=306,th=1e3,vi=1001,nh=1002,dn=1003,yg=1004,uf=1005,ei=1006,mT=1007,Qa=1008,Ir=1009,gT=1010,_T=1011,Sp=1012,ry=1013,yr=1014,Sr=1015,Ja=1016,sy=1017,oy=1018,gs=1020,vT=1021,xi=1023,xT=1024,yT=1025,_s=1026,Oo=1027,ST=1028,ay=1029,MT=1030,ly=1031,uy=1033,cf=33776,ff=33777,df=33778,hf=33779,Sg=35840,Mg=35841,Eg=35842,Tg=35843,cy=36196,wg=37492,Ag=37496,Rg=37808,Cg=37809,bg=37810,Pg=37811,Lg=37812,Dg=37813,Ng=37814,Ig=37815,Ug=37816,Og=37817,Fg=37818,kg=37819,zg=37820,Bg=37821,pf=36492,Vg=36494,Hg=36495,ET=36283,Gg=36284,Wg=36285,jg=36286,fy=3e3,vs=3001,TT=3200,wT=3201,dy=0,AT=1,ti="",jt="srgb",ir="srgb-linear",Mp="display-p3",Sc="display-p3-linear",Ku="linear",at="srgb",Zu="rec709",Qu="p3",Ds=7680,Xg=519,RT=512,CT=513,bT=514,hy=515,PT=516,LT=517,DT=518,NT=519,Yg=35044,qg="300 es",ih=1035,$i=2e3,Ju=2001;class Vo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mf=Math.PI/180,rh=180/Math.PI;function ol(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]).toLowerCase()}function Xt(n,e,t){return Math.max(e,Math.min(t,n))}function IT(n,e){return(n%e+e)%e}function gf(n,e,t){return(1-t)*n+t*e}function $g(n){return(n&n-1)===0&&n!==0}function sh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function na(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function _n(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Oe{constructor(e=0,t=0){Oe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,i,r,s,o,a,l,u){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u)}set(e,t,i,r,s,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=r,c[2]=a,c[3]=t,c[4]=s,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],f=i[7],h=i[2],p=i[5],x=i[8],g=r[0],m=r[3],d=r[6],_=r[1],v=r[4],y=r[7],T=r[2],A=r[5],E=r[8];return s[0]=o*g+a*_+l*T,s[3]=o*m+a*v+l*A,s[6]=o*d+a*y+l*E,s[1]=u*g+c*_+f*T,s[4]=u*m+c*v+f*A,s[7]=u*d+c*y+f*E,s[2]=h*g+p*_+x*T,s[5]=h*m+p*v+x*A,s[8]=h*d+p*y+x*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return t*o*c-t*a*u-i*s*c+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=c*o-a*u,h=a*l-c*s,p=u*s-o*l,x=t*f+i*h+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/x;return e[0]=f*g,e[1]=(r*u-c*i)*g,e[2]=(a*i-r*o)*g,e[3]=h*g,e[4]=(c*t-r*l)*g,e[5]=(r*s-a*t)*g,e[6]=p*g,e[7]=(i*l-u*t)*g,e[8]=(o*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_f.makeScale(e,t)),this}rotate(e){return this.premultiply(_f.makeRotation(-e)),this}translate(e,t){return this.premultiply(_f.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _f=new Ge;function py(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ec(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function UT(){const n=ec("canvas");return n.style.display="block",n}const Kg={};function Aa(n){n in Kg||(Kg[n]=!0,console.warn(n))}const Zg=new Ge().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Qg=new Ge().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Pl={[ir]:{transfer:Ku,primaries:Zu,toReference:n=>n,fromReference:n=>n},[jt]:{transfer:at,primaries:Zu,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Sc]:{transfer:Ku,primaries:Qu,toReference:n=>n.applyMatrix3(Qg),fromReference:n=>n.applyMatrix3(Zg)},[Mp]:{transfer:at,primaries:Qu,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Qg),fromReference:n=>n.applyMatrix3(Zg).convertLinearToSRGB()}},OT=new Set([ir,Sc]),Qe={enabled:!0,_workingColorSpace:ir,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!OT.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Pl[e].toReference,r=Pl[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Pl[n].primaries},getTransfer:function(n){return n===ti?Ku:Pl[n].transfer}};function So(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vf(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ns;class my{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ns===void 0&&(Ns=ec("canvas")),Ns.width=e.width,Ns.height=e.height;const i=Ns.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Ns}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ec("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=So(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(So(t[i]/255)*255):t[i]=So(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let FT=0;class gy{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:FT++}),this.uuid=ol(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(xf(r[o].image)):s.push(xf(r[o]))}else s=xf(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function xf(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?my.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let kT=0;class Gn extends Vo{constructor(e=Gn.DEFAULT_IMAGE,t=Gn.DEFAULT_MAPPING,i=vi,r=vi,s=ei,o=Qa,a=xi,l=Ir,u=Gn.DEFAULT_ANISOTROPY,c=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kT++}),this.uuid=ol(),this.name="",this.source=new gy(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof c=="string"?this.colorSpace=c:(Aa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=c===vs?jt:ti),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==iy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case th:e.x=e.x-Math.floor(e.x);break;case vi:e.x=e.x<0?0:1;break;case nh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case th:e.y=e.y-Math.floor(e.y);break;case vi:e.y=e.y<0?0:1;break;case nh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Aa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===jt?vs:fy}set encoding(e){Aa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===vs?jt:ti}}Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=iy;Gn.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,i=0,r=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,u=l[0],c=l[4],f=l[8],h=l[1],p=l[5],x=l[9],g=l[2],m=l[6],d=l[10];if(Math.abs(c-h)<.01&&Math.abs(f-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(c+h)<.1&&Math.abs(f+g)<.1&&Math.abs(x+m)<.1&&Math.abs(u+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(u+1)/2,y=(p+1)/2,T=(d+1)/2,A=(c+h)/4,E=(f+g)/4,b=(x+m)/4;return v>y&&v>T?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=A/i,s=E/i):y>T?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=A/r,s=b/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=E/s,r=b/s),this.set(i,r,s,t),this}let _=Math.sqrt((m-x)*(m-x)+(f-g)*(f-g)+(h-c)*(h-c));return Math.abs(_)<.001&&(_=1),this.x=(m-x)/_,this.y=(f-g)/_,this.z=(h-c)/_,this.w=Math.acos((u+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zT extends Vo{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Aa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===vs?jt:ti),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Gn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new gy(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends zT{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class _y extends Gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=dn,this.minFilter=dn,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class BT extends Gn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=dn,this.minFilter=dn,this.wrapR=vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class al{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],u=i[r+1],c=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],x=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=x,e[t+3]=g;return}if(f!==g||l!==h||u!==p||c!==x){let m=1-a;const d=l*h+u*p+c*x+f*g,_=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const T=Math.sqrt(v),A=Math.atan2(T,d*_);m=Math.sin(m*A)/T,a=Math.sin(a*A)/T}const y=a*_;if(l=l*m+h*y,u=u*m+p*y,c=c*m+x*y,f=f*m+g*y,m===1-a){const T=1/Math.sqrt(l*l+u*u+c*c+f*f);l*=T,u*=T,c*=T,f*=T}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],c=i[r+3],f=s[o],h=s[o+1],p=s[o+2],x=s[o+3];return e[t]=a*x+c*f+l*p-u*h,e[t+1]=l*x+c*h+u*f-a*p,e[t+2]=u*x+c*p+a*h-l*f,e[t+3]=c*x-a*f-l*h-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),x=l(s/2);switch(o){case"XYZ":this._x=h*c*f+u*p*x,this._y=u*p*f-h*c*x,this._z=u*c*x+h*p*f,this._w=u*c*f-h*p*x;break;case"YXZ":this._x=h*c*f+u*p*x,this._y=u*p*f-h*c*x,this._z=u*c*x-h*p*f,this._w=u*c*f+h*p*x;break;case"ZXY":this._x=h*c*f-u*p*x,this._y=u*p*f+h*c*x,this._z=u*c*x+h*p*f,this._w=u*c*f-h*p*x;break;case"ZYX":this._x=h*c*f-u*p*x,this._y=u*p*f+h*c*x,this._z=u*c*x-h*p*f,this._w=u*c*f+h*p*x;break;case"YZX":this._x=h*c*f+u*p*x,this._y=u*p*f+h*c*x,this._z=u*c*x-h*p*f,this._w=u*c*f-h*p*x;break;case"XZY":this._x=h*c*f-u*p*x,this._y=u*p*f-h*c*x,this._z=u*c*x+h*p*f,this._w=u*c*f+h*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],u=t[2],c=t[6],f=t[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(c-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+o*a+r*u-s*l,this._y=r*c+o*l+s*a-i*u,this._z=s*c+o*u+i*l-r*a,this._w=o*c-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),f=Math.sin((1-t)*c)/u,h=Math.sin(t*c)/u;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Jg.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Jg.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),c=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*u+o*f-a*c,this.y=i+l*c+a*u-s*f,this.z=r+l*f+s*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return yf.copy(this).projectOnVector(e),this.sub(yf)}reflect(e){return this.sub(yf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yf=new N,Jg=new al;class ll{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ci):ci.fromBufferAttribute(s,o),ci.applyMatrix4(e.matrixWorld),this.expandByPoint(ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ll.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ll.copy(i.boundingBox)),Ll.applyMatrix4(e.matrixWorld),this.union(Ll)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,ci),ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ia),Dl.subVectors(this.max,ia),Is.subVectors(e.a,ia),Us.subVectors(e.b,ia),Os.subVectors(e.c,ia),or.subVectors(Us,Is),ar.subVectors(Os,Us),$r.subVectors(Is,Os);let t=[0,-or.z,or.y,0,-ar.z,ar.y,0,-$r.z,$r.y,or.z,0,-or.x,ar.z,0,-ar.x,$r.z,0,-$r.x,-or.y,or.x,0,-ar.y,ar.x,0,-$r.y,$r.x,0];return!Sf(t,Is,Us,Os,Dl)||(t=[1,0,0,0,1,0,0,0,1],!Sf(t,Is,Us,Os,Dl))?!1:(Nl.crossVectors(or,ar),t=[Nl.x,Nl.y,Nl.z],Sf(t,Is,Us,Os,Dl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Oi=[new N,new N,new N,new N,new N,new N,new N,new N],ci=new N,Ll=new ll,Is=new N,Us=new N,Os=new N,or=new N,ar=new N,$r=new N,ia=new N,Dl=new N,Nl=new N,Kr=new N;function Sf(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Kr.fromArray(n,s);const a=r.x*Math.abs(Kr.x)+r.y*Math.abs(Kr.y)+r.z*Math.abs(Kr.z),l=e.dot(Kr),u=t.dot(Kr),c=i.dot(Kr);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const VT=new ll,ra=new N,Mf=new N;class ul{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):VT.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ra.subVectors(e,this.center);const t=ra.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ra,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ra.copy(e.center).add(Mf)),this.expandByPoint(ra.copy(e.center).sub(Mf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Fi=new N,Ef=new N,Il=new N,lr=new N,Tf=new N,Ul=new N,wf=new N;class Ep{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,t),Fi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Ef.copy(e).add(t).multiplyScalar(.5),Il.copy(t).sub(e).normalize(),lr.copy(this.origin).sub(Ef);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Il),a=lr.dot(this.direction),l=-lr.dot(Il),u=lr.lengthSq(),c=Math.abs(1-o*o);let f,h,p,x;if(c>0)if(f=o*l-a,h=o*a-l,x=s*c,f>=0)if(h>=-x)if(h<=x){const g=1/c;f*=g,h*=g,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+u}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+u;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+u;else h<=-x?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+u):h<=x?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+u):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+u);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ef).addScaledVector(Il,h),p}intersectSphere(e,t){Fi.subVectors(e.center,this.origin);const i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),c>=0?(s=(e.min.y-h.y)*c,o=(e.max.y-h.y)*c):(s=(e.max.y-h.y)*c,o=(e.min.y-h.y)*c),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,t,i,r,s){Tf.subVectors(t,e),Ul.subVectors(i,e),wf.crossVectors(Tf,Ul);let o=this.direction.dot(wf),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;lr.subVectors(this.origin,e);const l=a*this.direction.dot(Ul.crossVectors(lr,Ul));if(l<0)return null;const u=a*this.direction.dot(Tf.cross(lr));if(u<0||l+u>o)return null;const c=-a*lr.dot(wf);return c<0?null:this.at(c/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,i,r,s,o,a,l,u,c,f,h,p,x,g,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,u,c,f,h,p,x,g,m)}set(e,t,i,r,s,o,a,l,u,c,f,h,p,x,g,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=u,d[6]=c,d[10]=f,d[14]=h,d[3]=p,d[7]=x,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Fs.setFromMatrixColumn(e,0).length(),s=1/Fs.setFromMatrixColumn(e,1).length(),o=1/Fs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),c=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*c,p=o*f,x=a*c,g=a*f;t[0]=l*c,t[4]=-l*f,t[8]=u,t[1]=p+x*u,t[5]=h-g*u,t[9]=-a*l,t[2]=g-h*u,t[6]=x+p*u,t[10]=o*l}else if(e.order==="YXZ"){const h=l*c,p=l*f,x=u*c,g=u*f;t[0]=h+g*a,t[4]=x*a-p,t[8]=o*u,t[1]=o*f,t[5]=o*c,t[9]=-a,t[2]=p*a-x,t[6]=g+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*c,p=l*f,x=u*c,g=u*f;t[0]=h-g*a,t[4]=-o*f,t[8]=x+p*a,t[1]=p+x*a,t[5]=o*c,t[9]=g-h*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*c,p=o*f,x=a*c,g=a*f;t[0]=l*c,t[4]=x*u-p,t[8]=h*u+g,t[1]=l*f,t[5]=g*u+h,t[9]=p*u-x,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*u,x=a*l,g=a*u;t[0]=l*c,t[4]=g-h*f,t[8]=x*f+p,t[1]=f,t[5]=o*c,t[9]=-a*c,t[2]=-u*c,t[6]=p*f+x,t[10]=h-g*f}else if(e.order==="XZY"){const h=o*l,p=o*u,x=a*l,g=a*u;t[0]=l*c,t[4]=-f,t[8]=u*c,t[1]=h*f+g,t[5]=o*c,t[9]=p*f-x,t[2]=x*f-p,t[6]=a*c,t[10]=g*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(HT,e,GT)}lookAt(e,t,i){const r=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),ur.crossVectors(i,Ln),ur.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),ur.crossVectors(i,Ln)),ur.normalize(),Ol.crossVectors(Ln,ur),r[0]=ur.x,r[4]=Ol.x,r[8]=Ln.x,r[1]=ur.y,r[5]=Ol.y,r[9]=Ln.y,r[2]=ur.z,r[6]=Ol.z,r[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],f=i[5],h=i[9],p=i[13],x=i[2],g=i[6],m=i[10],d=i[14],_=i[3],v=i[7],y=i[11],T=i[15],A=r[0],E=r[4],b=r[8],S=r[12],w=r[1],U=r[5],k=r[9],$=r[13],L=r[2],O=r[6],V=r[10],q=r[14],I=r[3],B=r[7],H=r[11],Z=r[15];return s[0]=o*A+a*w+l*L+u*I,s[4]=o*E+a*U+l*O+u*B,s[8]=o*b+a*k+l*V+u*H,s[12]=o*S+a*$+l*q+u*Z,s[1]=c*A+f*w+h*L+p*I,s[5]=c*E+f*U+h*O+p*B,s[9]=c*b+f*k+h*V+p*H,s[13]=c*S+f*$+h*q+p*Z,s[2]=x*A+g*w+m*L+d*I,s[6]=x*E+g*U+m*O+d*B,s[10]=x*b+g*k+m*V+d*H,s[14]=x*S+g*$+m*q+d*Z,s[3]=_*A+v*w+y*L+T*I,s[7]=_*E+v*U+y*O+T*B,s[11]=_*b+v*k+y*V+T*H,s[15]=_*S+v*$+y*q+T*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],f=e[6],h=e[10],p=e[14],x=e[3],g=e[7],m=e[11],d=e[15];return x*(+s*l*f-r*u*f-s*a*h+i*u*h+r*a*p-i*l*p)+g*(+t*l*p-t*u*h+s*o*h-r*o*p+r*u*c-s*l*c)+m*(+t*u*f-t*a*p-s*o*f+i*o*p+s*a*c-i*u*c)+d*(-r*a*c-t*l*f+t*a*h+r*o*f-i*o*h+i*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],f=e[9],h=e[10],p=e[11],x=e[12],g=e[13],m=e[14],d=e[15],_=f*m*u-g*h*u+g*l*p-a*m*p-f*l*d+a*h*d,v=x*h*u-c*m*u-x*l*p+o*m*p+c*l*d-o*h*d,y=c*g*u-x*f*u+x*a*p-o*g*p-c*a*d+o*f*d,T=x*f*l-c*g*l-x*a*h+o*g*h+c*a*m-o*f*m,A=t*_+i*v+r*y+s*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return e[0]=_*E,e[1]=(g*h*s-f*m*s-g*r*p+i*m*p+f*r*d-i*h*d)*E,e[2]=(a*m*s-g*l*s+g*r*u-i*m*u-a*r*d+i*l*d)*E,e[3]=(f*l*s-a*h*s-f*r*u+i*h*u+a*r*p-i*l*p)*E,e[4]=v*E,e[5]=(c*m*s-x*h*s+x*r*p-t*m*p-c*r*d+t*h*d)*E,e[6]=(x*l*s-o*m*s-x*r*u+t*m*u+o*r*d-t*l*d)*E,e[7]=(o*h*s-c*l*s+c*r*u-t*h*u-o*r*p+t*l*p)*E,e[8]=y*E,e[9]=(x*f*s-c*g*s-x*i*p+t*g*p+c*i*d-t*f*d)*E,e[10]=(o*g*s-x*a*s+x*i*u-t*g*u-o*i*d+t*a*d)*E,e[11]=(c*a*s-o*f*s-c*i*u+t*f*u+o*i*p-t*a*p)*E,e[12]=T*E,e[13]=(c*g*r-x*f*r+x*i*h-t*g*h-c*i*m+t*f*m)*E,e[14]=(x*a*r-o*g*r-x*i*l+t*g*l+o*i*m-t*a*m)*E,e[15]=(o*f*r-c*a*r+c*i*l-t*f*l-o*i*h+t*a*h)*E,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,c=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,c*a+i,c*l-r*o,0,u*l-r*a,c*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,u=s+s,c=o+o,f=a+a,h=s*u,p=s*c,x=s*f,g=o*c,m=o*f,d=a*f,_=l*u,v=l*c,y=l*f,T=i.x,A=i.y,E=i.z;return r[0]=(1-(g+d))*T,r[1]=(p+y)*T,r[2]=(x-v)*T,r[3]=0,r[4]=(p-y)*A,r[5]=(1-(h+d))*A,r[6]=(m+_)*A,r[7]=0,r[8]=(x+v)*E,r[9]=(m-_)*E,r[10]=(1-(h+g))*E,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Fs.set(r[0],r[1],r[2]).length();const o=Fs.set(r[4],r[5],r[6]).length(),a=Fs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],fi.copy(this);const u=1/s,c=1/o,f=1/a;return fi.elements[0]*=u,fi.elements[1]*=u,fi.elements[2]*=u,fi.elements[4]*=c,fi.elements[5]*=c,fi.elements[6]*=c,fi.elements[8]*=f,fi.elements[9]*=f,fi.elements[10]*=f,t.setFromRotationMatrix(fi),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=$i){const l=this.elements,u=2*s/(t-e),c=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let p,x;if(a===$i)p=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Ju)p=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=c,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=$i){const l=this.elements,u=1/(t-e),c=1/(i-r),f=1/(o-s),h=(t+e)*u,p=(i+r)*c;let x,g;if(a===$i)x=(o+s)*f,g=-2*f;else if(a===Ju)x=s*f,g=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=g,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Fs=new N,fi=new xt,HT=new N(0,0,0),GT=new N(1,1,1),ur=new N,Ol=new N,Ln=new N,e_=new xt,t_=new al;class Mc{constructor(e=0,t=0,i=0,r=Mc.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],c=r[9],f=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Xt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Xt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Xt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Xt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return e_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(e_,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return t_.setFromEuler(this),this.setFromQuaternion(t_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mc.DEFAULT_ORDER="XYZ";class vy{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let WT=0;const n_=new N,ks=new al,ki=new xt,Fl=new N,sa=new N,jT=new N,XT=new al,i_=new N(1,0,0),r_=new N(0,1,0),s_=new N(0,0,1),YT={type:"added"},qT={type:"removed"};class on extends Vo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:WT++}),this.uuid=ol(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=on.DEFAULT_UP.clone();const e=new N,t=new Mc,i=new al,r=new N(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xt},normalMatrix:{value:new Ge}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=on.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vy,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(i_,e)}rotateY(e){return this.rotateOnAxis(r_,e)}rotateZ(e){return this.rotateOnAxis(s_,e)}translateOnAxis(e,t){return n_.copy(e).applyQuaternion(this.quaternion),this.position.add(n_.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(i_,e)}translateY(e){return this.translateOnAxis(r_,e)}translateZ(e){return this.translateOnAxis(s_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Fl.copy(e):Fl.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(sa,Fl,this.up):ki.lookAt(Fl,sa,this.up),this.quaternion.setFromRotationMatrix(ki),r&&(ki.extractRotation(r.matrixWorld),ks.setFromRotationMatrix(ki),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(YT)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qT)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ki.multiply(e.parent.matrixWorld)),e.applyMatrix4(ki),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,e,jT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sa,XT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const f=l[u];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}on.DEFAULT_UP=new N(0,1,0);on.DEFAULT_MATRIX_AUTO_UPDATE=!0;on.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const di=new N,zi=new N,Af=new N,Bi=new N,zs=new N,Bs=new N,o_=new N,Rf=new N,Cf=new N,bf=new N;let kl=!1;class gi{constructor(e=new N,t=new N,i=new N){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),di.subVectors(e,t),r.cross(di);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){di.subVectors(r,t),zi.subVectors(i,t),Af.subVectors(e,t);const o=di.dot(di),a=di.dot(zi),l=di.dot(Af),u=zi.dot(zi),c=zi.dot(Af),f=o*u-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(u*l-a*c)*h,x=(o*c-a*l)*h;return s.set(1-p-x,x,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getUV(e,t,i,r,s,o,a,l){return kl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),kl=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bi.x),l.addScaledVector(o,Bi.y),l.addScaledVector(a,Bi.z),l)}static isFrontFacing(e,t,i,r){return di.subVectors(i,t),zi.subVectors(e,t),di.cross(zi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return di.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),di.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gi.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return kl===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),kl=!0),gi.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return gi.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return gi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;zs.subVectors(r,i),Bs.subVectors(s,i),Rf.subVectors(e,i);const l=zs.dot(Rf),u=Bs.dot(Rf);if(l<=0&&u<=0)return t.copy(i);Cf.subVectors(e,r);const c=zs.dot(Cf),f=Bs.dot(Cf);if(c>=0&&f<=c)return t.copy(r);const h=l*f-c*u;if(h<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(i).addScaledVector(zs,o);bf.subVectors(e,s);const p=zs.dot(bf),x=Bs.dot(bf);if(x>=0&&p<=x)return t.copy(s);const g=p*u-l*x;if(g<=0&&u>=0&&x<=0)return a=u/(u-x),t.copy(i).addScaledVector(Bs,a);const m=c*x-p*f;if(m<=0&&f-c>=0&&p-x>=0)return o_.subVectors(s,r),a=(f-c)/(f-c+(p-x)),t.copy(r).addScaledVector(o_,a);const d=1/(m+g+h);return o=g*d,a=h*d,t.copy(i).addScaledVector(zs,o).addScaledVector(Bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const xy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cr={h:0,s:0,l:0},zl={h:0,s:0,l:0};function Pf(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=Qe.workingColorSpace){if(e=IT(e,1),t=Xt(t,0,1),i=Xt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Pf(o,s,e+1/3),this.g=Pf(o,s,e),this.b=Pf(o,s,e-1/3)}return Qe.toWorkingColorSpace(this,r),this}setStyle(e,t=jt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const i=xy[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=So(e.r),this.g=So(e.g),this.b=So(e.b),this}copyLinearToSRGB(e){return this.r=vf(e.r),this.g=vf(e.g),this.b=vf(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Qe.fromWorkingColorSpace(tn.copy(this),e),Math.round(Xt(tn.r*255,0,255))*65536+Math.round(Xt(tn.g*255,0,255))*256+Math.round(Xt(tn.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.fromWorkingColorSpace(tn.copy(this),t);const i=tn.r,r=tn.g,s=tn.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const f=o-a;switch(u=c<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=Qe.workingColorSpace){return Qe.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=jt){Qe.fromWorkingColorSpace(tn.copy(this),e);const t=tn.r,i=tn.g,r=tn.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(cr),this.setHSL(cr.h+e,cr.s+t,cr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(cr),e.getHSL(zl);const i=gf(cr.h,zl.h,t),r=gf(cr.s,zl.s,t),s=gf(cr.l,zl.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new ze;ze.NAMES=xy;let $T=0;class bs extends Vo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$T++}),this.uuid=ol(),this.name="",this.type="Material",this.blending=yo,this.side=Br,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zd,this.blendDst=Qd,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=$u,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==yo&&(i.blending=this.blending),this.side!==Br&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Zd&&(i.blendSrc=this.blendSrc),this.blendDst!==Qd&&(i.blendDst=this.blendDst),this.blendEquation!==rs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==$u&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Wi extends bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ty,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new N,Bl=new Oe;class oi{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Yg,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Sr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Bl.fromBufferAttribute(this,t),Bl.applyMatrix3(e),this.setXY(t,Bl.x,Bl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=na(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=na(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=na(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=na(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=na(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array),s=_n(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yg&&(e.usage=this.usage),e}}class yy extends oi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Sy extends oi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ut extends oi{constructor(e,t,i){super(new Float32Array(e),t,i)}}let KT=0;const Kn=new xt,Lf=new on,Vs=new N,Dn=new ll,oa=new ll,Bt=new N;class Kt extends Vo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:KT++}),this.uuid=ol(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(py(e)?Sy:yy)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Kn.makeRotationFromQuaternion(e),this.applyMatrix4(Kn),this}rotateX(e){return Kn.makeRotationX(e),this.applyMatrix4(Kn),this}rotateY(e){return Kn.makeRotationY(e),this.applyMatrix4(Kn),this}rotateZ(e){return Kn.makeRotationZ(e),this.applyMatrix4(Kn),this}translate(e,t,i){return Kn.makeTranslation(e,t,i),this.applyMatrix4(Kn),this}scale(e,t,i){return Kn.makeScale(e,t,i),this.applyMatrix4(Kn),this}lookAt(e){return Lf.lookAt(e),Lf.updateMatrix(),this.applyMatrix4(Lf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ll);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ul);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];oa.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(Dn.min,oa.min),Dn.expandByPoint(Bt),Bt.addVectors(Dn.max,oa.max),Dn.expandByPoint(Bt)):(Dn.expandByPoint(oa.min),Dn.expandByPoint(oa.max))}Dn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Bt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)Bt.fromBufferAttribute(a,u),l&&(Vs.fromBufferAttribute(e,u),Bt.add(Vs)),r=Math.max(r,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new oi(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,u=[],c=[];for(let w=0;w<a;w++)u[w]=new N,c[w]=new N;const f=new N,h=new N,p=new N,x=new Oe,g=new Oe,m=new Oe,d=new N,_=new N;function v(w,U,k){f.fromArray(r,w*3),h.fromArray(r,U*3),p.fromArray(r,k*3),x.fromArray(o,w*2),g.fromArray(o,U*2),m.fromArray(o,k*2),h.sub(f),p.sub(f),g.sub(x),m.sub(x);const $=1/(g.x*m.y-m.x*g.y);isFinite($)&&(d.copy(h).multiplyScalar(m.y).addScaledVector(p,-g.y).multiplyScalar($),_.copy(p).multiplyScalar(g.x).addScaledVector(h,-m.x).multiplyScalar($),u[w].add(d),u[U].add(d),u[k].add(d),c[w].add(_),c[U].add(_),c[k].add(_))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let w=0,U=y.length;w<U;++w){const k=y[w],$=k.start,L=k.count;for(let O=$,V=$+L;O<V;O+=3)v(i[O+0],i[O+1],i[O+2])}const T=new N,A=new N,E=new N,b=new N;function S(w){E.fromArray(s,w*3),b.copy(E);const U=u[w];T.copy(U),T.sub(E.multiplyScalar(E.dot(U))).normalize(),A.crossVectors(b,U);const $=A.dot(c[w])<0?-1:1;l[w*4]=T.x,l[w*4+1]=T.y,l[w*4+2]=T.z,l[w*4+3]=$}for(let w=0,U=y.length;w<U;++w){const k=y[w],$=k.start,L=k.count;for(let O=$,V=$+L;O<V;O+=3)S(i[O+0]),S(i[O+1]),S(i[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new oi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,u=new N,c=new N,f=new N;if(e)for(let h=0,p=e.count;h<p;h+=3){const x=e.getX(h+0),g=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,g),u.fromBufferAttribute(i,m),a.add(c),l.add(c),u.add(c),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),c.subVectors(o,s),f.subVectors(r,s),c.cross(f),i.setXYZ(h+0,c.x,c.y,c.z),i.setXYZ(h+1,c.x,c.y,c.z),i.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,f=a.normalized,h=new u.constructor(l.length*c);let p=0,x=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?p=l[g]*a.data.stride+a.offset:p=l[g]*c;for(let d=0;d<c;d++)h[x++]=u[p++]}return new oi(h,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);t.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let c=0,f=u.length;c<f;c++){const h=u[c],p=e(h,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let f=0,h=u.length;f<h;f++){const p=u[f];c.push(p.toJSON(e.data))}c.length>0&&(r[l]=c,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const u in r){const c=r[u];this.setAttribute(u,c.clone(t))}const s=e.morphAttributes;for(const u in s){const c=[],f=s[u];for(let h=0,p=f.length;h<p;h++)c.push(f[h].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const a_=new xt,Zr=new Ep,Vl=new ul,l_=new N,Hs=new N,Gs=new N,Ws=new N,Df=new N,Hl=new N,Gl=new Oe,Wl=new Oe,jl=new Oe,u_=new N,c_=new N,f_=new N,Xl=new N,Yl=new N;class hn extends on{constructor(e=new Kt,t=new Wi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Hl.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const c=a[l],f=s[l];c!==0&&(Df.fromBufferAttribute(f,e),o?Hl.addScaledVector(Df,c):Hl.addScaledVector(Df.sub(t),c))}t.add(Hl)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Vl.copy(i.boundingSphere),Vl.applyMatrix4(s),Zr.copy(e.ray).recast(e.near),!(Vl.containsPoint(Zr.origin)===!1&&(Zr.intersectSphere(Vl,l_)===null||Zr.origin.distanceToSquared(l_)>(e.far-e.near)**2))&&(a_.copy(s).invert(),Zr.copy(e.ray).applyMatrix4(a_),!(i.boundingBox!==null&&Zr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Zr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,c=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,g=h.length;x<g;x++){const m=h[x],d=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,T=v;y<T;y+=3){const A=a.getX(y),E=a.getX(y+1),b=a.getX(y+2);r=ql(this,d,e,i,u,c,f,A,E,b),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let m=x,d=g;m<d;m+=3){const _=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);r=ql(this,o,e,i,u,c,f,_,v,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,g=h.length;x<g;x++){const m=h[x],d=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,T=v;y<T;y+=3){const A=y,E=y+1,b=y+2;r=ql(this,d,e,i,u,c,f,A,E,b),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=x,d=g;m<d;m+=3){const _=m,v=m+1,y=m+2;r=ql(this,o,e,i,u,c,f,_,v,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function ZT(n,e,t,i,r,s,o,a){let l;if(e.side===Cn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Br,a),l===null)return null;Yl.copy(a),Yl.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Yl);return u<t.near||u>t.far?null:{distance:u,point:Yl.clone(),object:n}}function ql(n,e,t,i,r,s,o,a,l,u){n.getVertexPosition(a,Hs),n.getVertexPosition(l,Gs),n.getVertexPosition(u,Ws);const c=ZT(n,e,t,i,Hs,Gs,Ws,Xl);if(c){r&&(Gl.fromBufferAttribute(r,a),Wl.fromBufferAttribute(r,l),jl.fromBufferAttribute(r,u),c.uv=gi.getInterpolation(Xl,Hs,Gs,Ws,Gl,Wl,jl,new Oe)),s&&(Gl.fromBufferAttribute(s,a),Wl.fromBufferAttribute(s,l),jl.fromBufferAttribute(s,u),c.uv1=gi.getInterpolation(Xl,Hs,Gs,Ws,Gl,Wl,jl,new Oe),c.uv2=c.uv1),o&&(u_.fromBufferAttribute(o,a),c_.fromBufferAttribute(o,l),f_.fromBufferAttribute(o,u),c.normal=gi.getInterpolation(Xl,Hs,Gs,Ws,u_,c_,f_,new N),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const f={a,b:l,c:u,normal:new N,materialIndex:0};gi.getNormal(Hs,Gs,Ws,f.normal),c.face=f}return c}class Ho extends Kt{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],c=[],f=[];let h=0,p=0;x("z","y","x",-1,-1,i,t,e,o,s,0),x("z","y","x",1,-1,i,t,-e,o,s,1),x("x","z","y",1,1,e,i,t,r,o,2),x("x","z","y",1,-1,e,i,-t,r,o,3),x("x","y","z",1,-1,e,t,i,r,s,4),x("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new ut(u,3)),this.setAttribute("normal",new ut(c,3)),this.setAttribute("uv",new ut(f,2));function x(g,m,d,_,v,y,T,A,E,b,S){const w=y/E,U=T/b,k=y/2,$=T/2,L=A/2,O=E+1,V=b+1;let q=0,I=0;const B=new N;for(let H=0;H<V;H++){const Z=H*U-$;for(let Q=0;Q<O;Q++){const Y=Q*w-k;B[g]=Y*_,B[m]=Z*v,B[d]=L,u.push(B.x,B.y,B.z),B[g]=0,B[m]=0,B[d]=A>0?1:-1,c.push(B.x,B.y,B.z),f.push(Q/E),f.push(1-H/b),q+=1}}for(let H=0;H<b;H++)for(let Z=0;Z<E;Z++){const Q=h+Z+O*H,Y=h+Z+O*(H+1),K=h+(Z+1)+O*(H+1),re=h+(Z+1)+O*H;l.push(Q,Y,re),l.push(Y,K,re),I+=6}a.addGroup(p,I,S),p+=I,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fo(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function cn(n){const e={};for(let t=0;t<n.length;t++){const i=Fo(n[t]);for(const r in i)e[r]=i[r]}return e}function QT(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function My(n){return n.getRenderTarget()===null?n.outputColorSpace:Qe.workingColorSpace}const JT={clone:Fo,merge:cn};var ew=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ws extends bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ew,this.fragmentShader=tw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fo(e.uniforms),this.uniformsGroups=QT(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ey extends on{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=$i}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class On extends Ey{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rh*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mf*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rh*2*Math.atan(Math.tan(mf*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mf*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const js=-90,Xs=1;class nw extends on{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new On(js,Xs,e,t);r.layers=this.layers,this.add(r);const s=new On(js,Xs,e,t);s.layers=this.layers,this.add(s);const o=new On(js,Xs,e,t);o.layers=this.layers,this.add(o);const a=new On(js,Xs,e,t);a.layers=this.layers,this.add(a);const l=new On(js,Xs,e,t);l.layers=this.layers,this.add(l);const u=new On(js,Xs,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const u of t)this.remove(u);if(e===$i)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ju)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,c]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,u),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,c),e.setRenderTarget(f,h,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Ty extends Gn{constructor(e,t,i,r,s,o,a,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:Io,super(e,t,i,r,s,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class iw extends Ts{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Aa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===vs?jt:ti),this.texture=new Ty(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ei}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ho(5,5,5),s=new ws({name:"CubemapFromEquirect",uniforms:Fo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Cn,blending:Dr});s.uniforms.tEquirect.value=t;const o=new hn(r,s),a=t.minFilter;return t.minFilter===Qa&&(t.minFilter=ei),new nw(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Nf=new N,rw=new N,sw=new Ge;class ns{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Nf.subVectors(i,t).cross(rw.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Nf),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||sw.getNormalMatrix(e),r=this.coplanarPoint(Nf).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Qr=new ul,$l=new N;class Tp{constructor(e=new ns,t=new ns,i=new ns,r=new ns,s=new ns,o=new ns){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=$i){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],c=r[5],f=r[6],h=r[7],p=r[8],x=r[9],g=r[10],m=r[11],d=r[12],_=r[13],v=r[14],y=r[15];if(i[0].setComponents(l-s,h-u,m-p,y-d).normalize(),i[1].setComponents(l+s,h+u,m+p,y+d).normalize(),i[2].setComponents(l+o,h+c,m+x,y+_).normalize(),i[3].setComponents(l-o,h-c,m-x,y-_).normalize(),i[4].setComponents(l-a,h-f,m-g,y-v).normalize(),t===$i)i[5].setComponents(l+a,h+f,m+g,y+v).normalize();else if(t===Ju)i[5].setComponents(a,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qr)}intersectsSprite(e){return Qr.center.set(0,0,0),Qr.radius=.7071067811865476,Qr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if($l.x=r.normal.x>0?e.max.x:e.min.x,$l.y=r.normal.y>0?e.max.y:e.min.y,$l.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint($l)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wy(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ow(n,e){const t=e.isWebGL2,i=new WeakMap;function r(u,c){const f=u.array,h=u.usage,p=f.byteLength,x=n.createBuffer();n.bindBuffer(c,x),n.bufferData(c,f,h),u.onUploadCallback();let g;if(f instanceof Float32Array)g=n.FLOAT;else if(f instanceof Uint16Array)if(u.isFloat16BufferAttribute)if(t)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)g=n.SHORT;else if(f instanceof Uint32Array)g=n.UNSIGNED_INT;else if(f instanceof Int32Array)g=n.INT;else if(f instanceof Int8Array)g=n.BYTE;else if(f instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:x,type:g,bytesPerElement:f.BYTES_PER_ELEMENT,version:u.version,size:p}}function s(u,c,f){const h=c.array,p=c._updateRange,x=c.updateRanges;if(n.bindBuffer(f,u),p.count===-1&&x.length===0&&n.bufferSubData(f,0,h),x.length!==0){for(let g=0,m=x.length;g<m;g++){const d=x[g];t?n.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h,d.start,d.count):n.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h.subarray(d.start,d.start+d.count))}c.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),c.onUploadCallback()}function o(u){return u.isInterleavedBufferAttribute&&(u=u.data),i.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const c=i.get(u);c&&(n.deleteBuffer(c.buffer),i.delete(u))}function l(u,c){if(u.isGLBufferAttribute){const h=i.get(u);(!h||h.version<u.version)&&i.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const f=i.get(u);if(f===void 0)i.set(u,r(u,c));else if(f.version<u.version){if(f.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,u,c),f.version=u.version}}return{get:o,remove:a,update:l}}class wp extends Kt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),u=a+1,c=l+1,f=e/a,h=t/l,p=[],x=[],g=[],m=[];for(let d=0;d<c;d++){const _=d*h-o;for(let v=0;v<u;v++){const y=v*f-s;x.push(y,-_,0),g.push(0,0,1),m.push(v/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let _=0;_<a;_++){const v=_+u*d,y=_+u*(d+1),T=_+1+u*(d+1),A=_+1+u*d;p.push(v,y,A),p.push(y,T,A)}this.setIndex(p),this.setAttribute("position",new ut(x,3)),this.setAttribute("normal",new ut(g,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wp(e.width,e.height,e.widthSegments,e.heightSegments)}}var aw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,lw=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,uw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fw=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,dw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hw=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,pw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,mw=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,_w=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,yw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Sw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Mw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Ew=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ww=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Aw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Rw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Cw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Pw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lw=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Dw=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Nw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Iw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ow=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fw="gl_FragColor = linearToOutputTexel( gl_FragColor );",kw=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,zw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Bw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Hw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ww=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$w=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Kw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qw=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,eA=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,tA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nA=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rA=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sA=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,oA=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,aA=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lA=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,uA=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cA=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fA=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dA=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,hA=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,pA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,_A=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,yA=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,SA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,MA=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,EA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,TA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wA=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,AA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bA=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,PA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,LA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,UA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,OA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,FA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,BA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,VA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,HA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,GA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,WA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,XA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,YA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$A=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,KA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ZA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,QA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,JA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,eR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,tR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,nR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,iR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,sR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const oR=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,aR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fR=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hR=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,pR=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,mR=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,gR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_R=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vR=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,xR=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yR=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,SR=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MR=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ER=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TR=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wR=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AR=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,RR=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,CR=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bR=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PR=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,LR=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DR=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NR=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IR=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,UR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,OR=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FR=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kR=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zR=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ke={alphahash_fragment:aw,alphahash_pars_fragment:lw,alphamap_fragment:uw,alphamap_pars_fragment:cw,alphatest_fragment:fw,alphatest_pars_fragment:dw,aomap_fragment:hw,aomap_pars_fragment:pw,batching_pars_vertex:mw,batching_vertex:gw,begin_vertex:_w,beginnormal_vertex:vw,bsdfs:xw,iridescence_fragment:yw,bumpmap_pars_fragment:Sw,clipping_planes_fragment:Mw,clipping_planes_pars_fragment:Ew,clipping_planes_pars_vertex:Tw,clipping_planes_vertex:ww,color_fragment:Aw,color_pars_fragment:Rw,color_pars_vertex:Cw,color_vertex:bw,common:Pw,cube_uv_reflection_fragment:Lw,defaultnormal_vertex:Dw,displacementmap_pars_vertex:Nw,displacementmap_vertex:Iw,emissivemap_fragment:Uw,emissivemap_pars_fragment:Ow,colorspace_fragment:Fw,colorspace_pars_fragment:kw,envmap_fragment:zw,envmap_common_pars_fragment:Bw,envmap_pars_fragment:Vw,envmap_pars_vertex:Hw,envmap_physical_pars_fragment:eA,envmap_vertex:Gw,fog_vertex:Ww,fog_pars_vertex:jw,fog_fragment:Xw,fog_pars_fragment:Yw,gradientmap_pars_fragment:qw,lightmap_fragment:$w,lightmap_pars_fragment:Kw,lights_lambert_fragment:Zw,lights_lambert_pars_fragment:Qw,lights_pars_begin:Jw,lights_toon_fragment:tA,lights_toon_pars_fragment:nA,lights_phong_fragment:iA,lights_phong_pars_fragment:rA,lights_physical_fragment:sA,lights_physical_pars_fragment:oA,lights_fragment_begin:aA,lights_fragment_maps:lA,lights_fragment_end:uA,logdepthbuf_fragment:cA,logdepthbuf_pars_fragment:fA,logdepthbuf_pars_vertex:dA,logdepthbuf_vertex:hA,map_fragment:pA,map_pars_fragment:mA,map_particle_fragment:gA,map_particle_pars_fragment:_A,metalnessmap_fragment:vA,metalnessmap_pars_fragment:xA,morphcolor_vertex:yA,morphnormal_vertex:SA,morphtarget_pars_vertex:MA,morphtarget_vertex:EA,normal_fragment_begin:TA,normal_fragment_maps:wA,normal_pars_fragment:AA,normal_pars_vertex:RA,normal_vertex:CA,normalmap_pars_fragment:bA,clearcoat_normal_fragment_begin:PA,clearcoat_normal_fragment_maps:LA,clearcoat_pars_fragment:DA,iridescence_pars_fragment:NA,opaque_fragment:IA,packing:UA,premultiplied_alpha_fragment:OA,project_vertex:FA,dithering_fragment:kA,dithering_pars_fragment:zA,roughnessmap_fragment:BA,roughnessmap_pars_fragment:VA,shadowmap_pars_fragment:HA,shadowmap_pars_vertex:GA,shadowmap_vertex:WA,shadowmask_pars_fragment:jA,skinbase_vertex:XA,skinning_pars_vertex:YA,skinning_vertex:qA,skinnormal_vertex:$A,specularmap_fragment:KA,specularmap_pars_fragment:ZA,tonemapping_fragment:QA,tonemapping_pars_fragment:JA,transmission_fragment:eR,transmission_pars_fragment:tR,uv_pars_fragment:nR,uv_pars_vertex:iR,uv_vertex:rR,worldpos_vertex:sR,background_vert:oR,background_frag:aR,backgroundCube_vert:lR,backgroundCube_frag:uR,cube_vert:cR,cube_frag:fR,depth_vert:dR,depth_frag:hR,distanceRGBA_vert:pR,distanceRGBA_frag:mR,equirect_vert:gR,equirect_frag:_R,linedashed_vert:vR,linedashed_frag:xR,meshbasic_vert:yR,meshbasic_frag:SR,meshlambert_vert:MR,meshlambert_frag:ER,meshmatcap_vert:TR,meshmatcap_frag:wR,meshnormal_vert:AR,meshnormal_frag:RR,meshphong_vert:CR,meshphong_frag:bR,meshphysical_vert:PR,meshphysical_frag:LR,meshtoon_vert:DR,meshtoon_frag:NR,points_vert:IR,points_frag:UR,shadow_vert:OR,shadow_frag:FR,sprite_vert:kR,sprite_frag:zR},oe={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Ri={basic:{uniforms:cn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:cn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new ze(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:cn([oe.common,oe.specularmap,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,oe.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:cn([oe.common,oe.envmap,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.roughnessmap,oe.metalnessmap,oe.fog,oe.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:cn([oe.common,oe.aomap,oe.lightmap,oe.emissivemap,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.gradientmap,oe.fog,oe.lights,{emissive:{value:new ze(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:cn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,oe.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:cn([oe.points,oe.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:cn([oe.common,oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:cn([oe.common,oe.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:cn([oe.common,oe.bumpmap,oe.normalmap,oe.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:cn([oe.sprite,oe.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:cn([oe.common,oe.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:cn([oe.lights,oe.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};Ri.physical={uniforms:cn([Ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const Kl={r:0,b:0,g:0};function BR(n,e,t,i,r,s,o){const a=new ze(0);let l=s===!0?0:1,u,c,f=null,h=0,p=null;function x(m,d){let _=!1,v=d.isScene===!0?d.background:null;v&&v.isTexture&&(v=(d.backgroundBlurriness>0?t:e).get(v)),v===null?g(a,l):v&&v.isColor&&(g(v,1),_=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===yc)?(c===void 0&&(c=new hn(new Ho(1,1,1),new ws({name:"BackgroundCubeMaterial",uniforms:Fo(Ri.backgroundCube.uniforms),vertexShader:Ri.backgroundCube.vertexShader,fragmentShader:Ri.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(v.colorSpace)!==at,(f!==v||h!==v.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(u===void 0&&(u=new hn(new wp(2,2),new ws({name:"BackgroundMaterial",uniforms:Fo(Ri.background.uniforms),vertexShader:Ri.background.vertexShader,fragmentShader:Ri.background.fragmentShader,side:Br,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=v,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=Qe.getTransfer(v.colorSpace)!==at,v.matrixAutoUpdate===!0&&v.updateMatrix(),u.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null))}function g(m,d){m.getRGB(Kl,My(n)),i.buffers.color.setClear(Kl.r,Kl.g,Kl.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),l=d,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,g(a,l)},render:x}}function VR(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let u=l,c=!1;function f(L,O,V,q,I){let B=!1;if(o){const H=g(q,V,O);u!==H&&(u=H,p(u.object)),B=d(L,q,V,I),B&&_(L,q,V,I)}else{const H=O.wireframe===!0;(u.geometry!==q.id||u.program!==V.id||u.wireframe!==H)&&(u.geometry=q.id,u.program=V.id,u.wireframe=H,B=!0)}I!==null&&t.update(I,n.ELEMENT_ARRAY_BUFFER),(B||c)&&(c=!1,b(L,O,V,q),I!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(I).buffer))}function h(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(L){return i.isWebGL2?n.bindVertexArray(L):s.bindVertexArrayOES(L)}function x(L){return i.isWebGL2?n.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function g(L,O,V){const q=V.wireframe===!0;let I=a[L.id];I===void 0&&(I={},a[L.id]=I);let B=I[O.id];B===void 0&&(B={},I[O.id]=B);let H=B[q];return H===void 0&&(H=m(h()),B[q]=H),H}function m(L){const O=[],V=[],q=[];for(let I=0;I<r;I++)O[I]=0,V[I]=0,q[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:V,attributeDivisors:q,object:L,attributes:{},index:null}}function d(L,O,V,q){const I=u.attributes,B=O.attributes;let H=0;const Z=V.getAttributes();for(const Q in Z)if(Z[Q].location>=0){const K=I[Q];let re=B[Q];if(re===void 0&&(Q==="instanceMatrix"&&L.instanceMatrix&&(re=L.instanceMatrix),Q==="instanceColor"&&L.instanceColor&&(re=L.instanceColor)),K===void 0||K.attribute!==re||re&&K.data!==re.data)return!0;H++}return u.attributesNum!==H||u.index!==q}function _(L,O,V,q){const I={},B=O.attributes;let H=0;const Z=V.getAttributes();for(const Q in Z)if(Z[Q].location>=0){let K=B[Q];K===void 0&&(Q==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),Q==="instanceColor"&&L.instanceColor&&(K=L.instanceColor));const re={};re.attribute=K,K&&K.data&&(re.data=K.data),I[Q]=re,H++}u.attributes=I,u.attributesNum=H,u.index=q}function v(){const L=u.newAttributes;for(let O=0,V=L.length;O<V;O++)L[O]=0}function y(L){T(L,0)}function T(L,O){const V=u.newAttributes,q=u.enabledAttributes,I=u.attributeDivisors;V[L]=1,q[L]===0&&(n.enableVertexAttribArray(L),q[L]=1),I[L]!==O&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,O),I[L]=O)}function A(){const L=u.newAttributes,O=u.enabledAttributes;for(let V=0,q=O.length;V<q;V++)O[V]!==L[V]&&(n.disableVertexAttribArray(V),O[V]=0)}function E(L,O,V,q,I,B,H){H===!0?n.vertexAttribIPointer(L,O,V,I,B):n.vertexAttribPointer(L,O,V,q,I,B)}function b(L,O,V,q){if(i.isWebGL2===!1&&(L.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const I=q.attributes,B=V.getAttributes(),H=O.defaultAttributeValues;for(const Z in B){const Q=B[Z];if(Q.location>=0){let Y=I[Z];if(Y===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(Y=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(Y=L.instanceColor)),Y!==void 0){const K=Y.normalized,re=Y.itemSize,pe=t.get(Y);if(pe===void 0)continue;const me=pe.buffer,Pe=pe.type,Le=pe.bytesPerElement,Te=i.isWebGL2===!0&&(Pe===n.INT||Pe===n.UNSIGNED_INT||Y.gpuType===ry);if(Y.isInterleavedBufferAttribute){const We=Y.data,G=We.stride,Ft=Y.offset;if(We.isInstancedInterleavedBuffer){for(let Me=0;Me<Q.locationSize;Me++)T(Q.location+Me,We.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=We.meshPerAttribute*We.count)}else for(let Me=0;Me<Q.locationSize;Me++)y(Q.location+Me);n.bindBuffer(n.ARRAY_BUFFER,me);for(let Me=0;Me<Q.locationSize;Me++)E(Q.location+Me,re/Q.locationSize,Pe,K,G*Le,(Ft+re/Q.locationSize*Me)*Le,Te)}else{if(Y.isInstancedBufferAttribute){for(let We=0;We<Q.locationSize;We++)T(Q.location+We,Y.meshPerAttribute);L.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let We=0;We<Q.locationSize;We++)y(Q.location+We);n.bindBuffer(n.ARRAY_BUFFER,me);for(let We=0;We<Q.locationSize;We++)E(Q.location+We,re/Q.locationSize,Pe,K,re*Le,re/Q.locationSize*We*Le,Te)}}else if(H!==void 0){const K=H[Z];if(K!==void 0)switch(K.length){case 2:n.vertexAttrib2fv(Q.location,K);break;case 3:n.vertexAttrib3fv(Q.location,K);break;case 4:n.vertexAttrib4fv(Q.location,K);break;default:n.vertexAttrib1fv(Q.location,K)}}}}A()}function S(){k();for(const L in a){const O=a[L];for(const V in O){const q=O[V];for(const I in q)x(q[I].object),delete q[I];delete O[V]}delete a[L]}}function w(L){if(a[L.id]===void 0)return;const O=a[L.id];for(const V in O){const q=O[V];for(const I in q)x(q[I].object),delete q[I];delete O[V]}delete a[L.id]}function U(L){for(const O in a){const V=a[O];if(V[L.id]===void 0)continue;const q=V[L.id];for(const I in q)x(q[I].object),delete q[I];delete V[L.id]}}function k(){$(),c=!0,u!==l&&(u=l,p(u.object))}function $(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:k,resetDefaultState:$,dispose:S,releaseStatesOfGeometry:w,releaseStatesOfProgram:U,initAttributes:v,enableAttribute:y,disableUnusedAttributes:A}}function HR(n,e,t,i){const r=i.isWebGL2;let s;function o(c){s=c}function a(c,f){n.drawArrays(s,c,f),t.update(f,s,1)}function l(c,f,h){if(h===0)return;let p,x;if(r)p=n,x="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[x](s,c,f,h),t.update(f,s,h)}function u(c,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<h;x++)this.render(c[x],f[x]);else{p.multiDrawArraysWEBGL(s,c,0,f,0,h);let x=0;for(let g=0;g<h;g++)x+=f[g];t.update(x,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function GR(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const u=o||e.has("WEBGL_draw_buffers"),c=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,y=o||e.has("OES_texture_float"),T=v&&y,A=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:u,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:c,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:_,vertexTextures:v,floatFragmentTextures:y,floatVertexTextures:T,maxSamples:A}}function WR(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new ns,a=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=c(f,h,0)},this.setState=function(f,h,p){const x=f.clippingPlanes,g=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||x===null||x.length===0||s&&!m)s?c(null):u();else{const _=s?0:i,v=_*4;let y=d.clippingState||null;l.value=y,y=c(x,h,v,p);for(let T=0;T!==v;++T)y[T]=t[T];d.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=_}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(f,h,p,x){const g=f!==null?f.length:0;let m=null;if(g!==0){if(m=l.value,x!==!0||m===null){const d=p+g*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let v=0,y=p;v!==g;++v,y+=4)o.copy(f[v]).applyMatrix4(_,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function jR(n){let e=new WeakMap;function t(o,a){return a===Jd?o.mapping=Io:a===eh&&(o.mapping=Uo),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Jd||a===eh)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new iw(l.height/2);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",r),t(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class XR extends Ey{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const lo=4,d_=[.125,.215,.35,.446,.526,.582],ss=20,If=new XR,h_=new ze;let Uf=null,Of=0,Ff=0;const is=(1+Math.sqrt(5))/2,Ys=1/is,p_=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,is,Ys),new N(0,is,-Ys),new N(Ys,0,is),new N(-Ys,0,is),new N(is,Ys,0),new N(-is,Ys,0)];class m_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Uf=this._renderer.getRenderTarget(),Of=this._renderer.getActiveCubeFace(),Ff=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=v_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=__(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Uf,Of,Ff),e.scissorTest=!1,Zl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Io||e.mapping===Uo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Uf=this._renderer.getRenderTarget(),Of=this._renderer.getActiveCubeFace(),Ff=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Ja,format:xi,colorSpace:ir,depthBuffer:!1},r=g_(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=g_(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=YR(s)),this._blurMaterial=qR(s,e,t)}return r}_compileMaterial(e){const t=new hn(this._lodPlanes[0],e);this._renderer.compile(t,If)}_sceneToCubeUV(e,t,i,r){const a=new On(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,h=c.toneMapping;c.getClearColor(h_),c.toneMapping=Nr,c.autoClear=!1;const p=new Wi({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),x=new hn(new Ho,p);let g=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,g=!0):(p.color.copy(h_),g=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(a.up.set(0,l[d],0),a.lookAt(u[d],0,0)):_===1?(a.up.set(0,0,l[d]),a.lookAt(0,u[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,u[d]));const v=this._cubeSize;Zl(r,_*v,d>2?v:0,v,v),c.setRenderTarget(r),g&&c.render(x,a),c.render(e,a)}x.geometry.dispose(),x.material.dispose(),c.toneMapping=h,c.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Io||e.mapping===Uo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=v_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=__());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new hn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Zl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,If)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=p_[(r-1)%p_.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,f=new hn(this._lodPlanes[r],u),h=u.uniforms,p=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ss-1),g=s/x,m=isFinite(s)?1+Math.floor(c*g):ss;m>ss&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ss}`);const d=[];let _=0;for(let E=0;E<ss;++E){const b=E/g,S=Math.exp(-b*b/2);d.push(S),E===0?_+=S:E<m&&(_+=2*S)}for(let E=0;E<d.length;E++)d[E]=d[E]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=x,h.mipInt.value=v-i;const y=this._sizeLods[r],T=3*y*(r>v-lo?r-v+lo:0),A=4*(this._cubeSize-y);Zl(t,T,A,3*y,2*y),l.setRenderTarget(t),l.render(f,If)}}function YR(n){const e=[],t=[],i=[];let r=n;const s=n-lo+1+d_.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-lo?l=d_[o-n+lo-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),c=-u,f=1+u,h=[c,c,f,c,f,f,c,c,f,f,c,f],p=6,x=6,g=3,m=2,d=1,_=new Float32Array(g*x*p),v=new Float32Array(m*x*p),y=new Float32Array(d*x*p);for(let A=0;A<p;A++){const E=A%3*2/3-1,b=A>2?0:-1,S=[E,b,0,E+2/3,b,0,E+2/3,b+1,0,E,b,0,E+2/3,b+1,0,E,b+1,0];_.set(S,g*x*A),v.set(h,m*x*A);const w=[A,A,A,A,A,A];y.set(w,d*x*A)}const T=new Kt;T.setAttribute("position",new oi(_,g)),T.setAttribute("uv",new oi(v,m)),T.setAttribute("faceIndex",new oi(y,d)),e.push(T),r>lo&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function g_(n,e,t){const i=new Ts(n,e,t);return i.texture.mapping=yc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function qR(n,e,t){const i=new Float32Array(ss),r=new N(0,1,0);return new ws({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ap(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function __(){return new ws({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ap(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function v_(){return new ws({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ap(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function Ap(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $R(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===Jd||l===eh,c=l===Io||l===Uo;if(u||c)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new m_(n)),f=u?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(u&&f&&f.height>0||c&&f&&r(f)){t===null&&(t=new m_(n));const h=u?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function KR(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function ZR(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);for(const x in h.morphAttributes){const g=h.morphAttributes[x];for(let m=0,d=g.length;m<d;m++)e.remove(g[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const x in h)e.update(h[x],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const x in p){const g=p[x];for(let m=0,d=g.length;m<d;m++)e.update(g[m],n.ARRAY_BUFFER)}}function u(f){const h=[],p=f.index,x=f.attributes.position;let g=0;if(p!==null){const _=p.array;g=p.version;for(let v=0,y=_.length;v<y;v+=3){const T=_[v+0],A=_[v+1],E=_[v+2];h.push(T,A,A,E,E,T)}}else if(x!==void 0){const _=x.array;g=x.version;for(let v=0,y=_.length/3-1;v<y;v+=3){const T=v+0,A=v+1,E=v+2;h.push(T,A,A,E,E,T)}}else return;const m=new(py(h)?Sy:yy)(h,1);m.version=g;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function c(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&u(f)}else u(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:c}}function QR(n,e,t,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function u(p){a=p.type,l=p.bytesPerElement}function c(p,x){n.drawElements(s,x,a,p*l),t.update(x,s,1)}function f(p,x,g){if(g===0)return;let m,d;if(r)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,x,a,p*l,g),t.update(x,s,g)}function h(p,x,g){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<g;d++)this.render(p[d]/l,x[d]);else{m.multiDrawElementsWEBGL(s,x,0,a,p,0,g);let d=0;for(let _=0;_<g;_++)d+=x[_];t.update(d,s,1)}}this.setMode=o,this.setIndex=u,this.render=c,this.renderInstances=f,this.renderMultiDraw=h}function JR(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function eC(n,e){return n[0]-e[0]}function tC(n,e){return Math.abs(e[1])-Math.abs(n[1])}function nC(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new dt,a=[];for(let u=0;u<8;u++)a[u]=[u,0];function l(u,c,f){const h=u.morphTargetInfluences;if(e.isWebGL2===!0){const x=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,g=x!==void 0?x.length:0;let m=s.get(c);if(m===void 0||m.count!==g){let O=function(){$.dispose(),s.delete(c),c.removeEventListener("dispose",O)};var p=O;m!==void 0&&m.texture.dispose();const v=c.morphAttributes.position!==void 0,y=c.morphAttributes.normal!==void 0,T=c.morphAttributes.color!==void 0,A=c.morphAttributes.position||[],E=c.morphAttributes.normal||[],b=c.morphAttributes.color||[];let S=0;v===!0&&(S=1),y===!0&&(S=2),T===!0&&(S=3);let w=c.attributes.position.count*S,U=1;w>e.maxTextureSize&&(U=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const k=new Float32Array(w*U*4*g),$=new _y(k,w,U,g);$.type=Sr,$.needsUpdate=!0;const L=S*4;for(let V=0;V<g;V++){const q=A[V],I=E[V],B=b[V],H=w*U*4*V;for(let Z=0;Z<q.count;Z++){const Q=Z*L;v===!0&&(o.fromBufferAttribute(q,Z),k[H+Q+0]=o.x,k[H+Q+1]=o.y,k[H+Q+2]=o.z,k[H+Q+3]=0),y===!0&&(o.fromBufferAttribute(I,Z),k[H+Q+4]=o.x,k[H+Q+5]=o.y,k[H+Q+6]=o.z,k[H+Q+7]=0),T===!0&&(o.fromBufferAttribute(B,Z),k[H+Q+8]=o.x,k[H+Q+9]=o.y,k[H+Q+10]=o.z,k[H+Q+11]=B.itemSize===4?o.w:1)}}m={count:g,texture:$,size:new Oe(w,U)},s.set(c,m),c.addEventListener("dispose",O)}let d=0;for(let v=0;v<h.length;v++)d+=h[v];const _=c.morphTargetsRelative?1:1-d;f.getUniforms().setValue(n,"morphTargetBaseInfluence",_),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const x=h===void 0?0:h.length;let g=i[c.id];if(g===void 0||g.length!==x){g=[];for(let y=0;y<x;y++)g[y]=[y,0];i[c.id]=g}for(let y=0;y<x;y++){const T=g[y];T[0]=y,T[1]=h[y]}g.sort(tC);for(let y=0;y<8;y++)y<x&&g[y][1]?(a[y][0]=g[y][0],a[y][1]=g[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(eC);const m=c.morphAttributes.position,d=c.morphAttributes.normal;let _=0;for(let y=0;y<8;y++){const T=a[y],A=T[0],E=T[1];A!==Number.MAX_SAFE_INTEGER&&E?(m&&c.getAttribute("morphTarget"+y)!==m[A]&&c.setAttribute("morphTarget"+y,m[A]),d&&c.getAttribute("morphNormal"+y)!==d[A]&&c.setAttribute("morphNormal"+y,d[A]),r[y]=E,_+=E):(m&&c.hasAttribute("morphTarget"+y)===!0&&c.deleteAttribute("morphTarget"+y),d&&c.hasAttribute("morphNormal"+y)===!0&&c.deleteAttribute("morphNormal"+y),r[y]=0)}const v=c.morphTargetsRelative?1:1-_;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function iC(n,e,t,i){let r=new WeakMap;function s(l){const u=i.render.frame,c=l.geometry,f=e.get(l,c);if(r.get(f)!==u&&(e.update(f),r.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return f}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:s,dispose:o}}class Ay extends Gn{constructor(e,t,i,r,s,o,a,l,u,c){if(c=c!==void 0?c:_s,c!==_s&&c!==Oo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===_s&&(i=yr),i===void 0&&c===Oo&&(i=gs),super(null,r,s,o,a,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:dn,this.minFilter=l!==void 0?l:dn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ry=new Gn,Cy=new Ay(1,1);Cy.compareFunction=hy;const by=new _y,Py=new BT,Ly=new Ty,x_=[],y_=[],S_=new Float32Array(16),M_=new Float32Array(9),E_=new Float32Array(4);function Go(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=x_[r];if(s===void 0&&(s=new Float32Array(r),x_[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ec(n,e){let t=y_[e];t===void 0&&(t=new Int32Array(e),y_[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function rC(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function sC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function oC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function aC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function lC(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;E_.set(i),n.uniformMatrix2fv(this.addr,!1,E_),Ot(t,i)}}function uC(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;M_.set(i),n.uniformMatrix3fv(this.addr,!1,M_),Ot(t,i)}}function cC(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;S_.set(i),n.uniformMatrix4fv(this.addr,!1,S_),Ot(t,i)}}function fC(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function hC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function pC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function mC(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function gC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function _C(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function vC(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function xC(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Cy:Ry;t.setTexture2D(e||s,r)}function yC(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Py,r)}function SC(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ly,r)}function MC(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||by,r)}function EC(n){switch(n){case 5126:return rC;case 35664:return sC;case 35665:return oC;case 35666:return aC;case 35674:return lC;case 35675:return uC;case 35676:return cC;case 5124:case 35670:return fC;case 35667:case 35671:return dC;case 35668:case 35672:return hC;case 35669:case 35673:return pC;case 5125:return mC;case 36294:return gC;case 36295:return _C;case 36296:return vC;case 35678:case 36198:case 36298:case 36306:case 35682:return xC;case 35679:case 36299:case 36307:return yC;case 35680:case 36300:case 36308:case 36293:return SC;case 36289:case 36303:case 36311:case 36292:return MC}}function TC(n,e){n.uniform1fv(this.addr,e)}function wC(n,e){const t=Go(e,this.size,2);n.uniform2fv(this.addr,t)}function AC(n,e){const t=Go(e,this.size,3);n.uniform3fv(this.addr,t)}function RC(n,e){const t=Go(e,this.size,4);n.uniform4fv(this.addr,t)}function CC(n,e){const t=Go(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function bC(n,e){const t=Go(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function PC(n,e){const t=Go(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function LC(n,e){n.uniform1iv(this.addr,e)}function DC(n,e){n.uniform2iv(this.addr,e)}function NC(n,e){n.uniform3iv(this.addr,e)}function IC(n,e){n.uniform4iv(this.addr,e)}function UC(n,e){n.uniform1uiv(this.addr,e)}function OC(n,e){n.uniform2uiv(this.addr,e)}function FC(n,e){n.uniform3uiv(this.addr,e)}function kC(n,e){n.uniform4uiv(this.addr,e)}function zC(n,e,t){const i=this.cache,r=e.length,s=Ec(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Ry,s[o])}function BC(n,e,t){const i=this.cache,r=e.length,s=Ec(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Py,s[o])}function VC(n,e,t){const i=this.cache,r=e.length,s=Ec(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Ly,s[o])}function HC(n,e,t){const i=this.cache,r=e.length,s=Ec(t,r);Ut(i,s)||(n.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||by,s[o])}function GC(n){switch(n){case 5126:return TC;case 35664:return wC;case 35665:return AC;case 35666:return RC;case 35674:return CC;case 35675:return bC;case 35676:return PC;case 5124:case 35670:return LC;case 35667:case 35671:return DC;case 35668:case 35672:return NC;case 35669:case 35673:return IC;case 5125:return UC;case 36294:return OC;case 36295:return FC;case 36296:return kC;case 35678:case 36198:case 36298:case 36306:case 35682:return zC;case 35679:case 36299:case 36307:return BC;case 35680:case 36300:case 36308:case 36293:return VC;case 36289:case 36303:case 36311:case 36292:return HC}}class WC{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=EC(t.type)}}class jC{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=GC(t.type)}}class XC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const kf=/(\w+)(\])?(\[|\.)?/g;function T_(n,e){n.seq.push(e),n.map[e.id]=e}function YC(n,e,t){const i=n.name,r=i.length;for(kf.lastIndex=0;;){const s=kf.exec(i),o=kf.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){T_(t,u===void 0?new WC(a,n,e):new jC(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new XC(a),T_(t,f)),t=f}}}class gu{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);YC(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function w_(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const qC=37297;let $C=0;function KC(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function ZC(n){const e=Qe.getPrimaries(Qe.workingColorSpace),t=Qe.getPrimaries(n);let i;switch(e===t?i="":e===Qu&&t===Zu?i="LinearDisplayP3ToLinearSRGB":e===Zu&&t===Qu&&(i="LinearSRGBToLinearDisplayP3"),n){case ir:case Sc:return[i,"LinearTransferOETF"];case jt:case Mp:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function A_(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+KC(n.getShaderSource(e),o)}else return r}function QC(n,e){const t=ZC(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function JC(n,e){let t;switch(e){case cT:t="Linear";break;case fT:t="Reinhard";break;case dT:t="OptimizedCineon";break;case ny:t="ACESFilmic";break;case pT:t="AgX";break;case hT:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function e2(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(uo).join(`
`)}function t2(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(uo).join(`
`)}function n2(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function i2(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function uo(n){return n!==""}function R_(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function C_(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const r2=/^[ \t]*#include +<([\w\d./]+)>/gm;function oh(n){return n.replace(r2,o2)}const s2=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function o2(n,e){let t=ke[e];if(t===void 0){const i=s2.get(e);if(i!==void 0)t=ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return oh(t)}const a2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function b_(n){return n.replace(a2,l2)}function l2(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function P_(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function u2(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ey?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===kE?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Vi&&(e="SHADOWMAP_TYPE_VSM"),e}function c2(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Io:case Uo:e="ENVMAP_TYPE_CUBE";break;case yc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function f2(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Uo:e="ENVMAP_MODE_REFRACTION";break}return e}function d2(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ty:e="ENVMAP_BLENDING_MULTIPLY";break;case lT:e="ENVMAP_BLENDING_MIX";break;case uT:e="ENVMAP_BLENDING_ADD";break}return e}function h2(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function p2(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=u2(t),u=c2(t),c=f2(t),f=d2(t),h=h2(t),p=t.isWebGL2?"":e2(t),x=t2(t),g=n2(s),m=r.createProgram();let d,_,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(uo).join(`
`),d.length>0&&(d+=`
`),_=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(uo).join(`
`),_.length>0&&(_+=`
`)):(d=[P_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(uo).join(`
`),_=[p,P_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nr?"#define TONE_MAPPING":"",t.toneMapping!==Nr?ke.tonemapping_pars_fragment:"",t.toneMapping!==Nr?JC("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,QC("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(uo).join(`
`)),o=oh(o),o=R_(o,t),o=C_(o,t),a=oh(a),a=R_(a,t),a=C_(a,t),o=b_(o),a=b_(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,d=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===qg?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===qg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const y=v+d+o,T=v+_+a,A=w_(r,r.VERTEX_SHADER,y),E=w_(r,r.FRAGMENT_SHADER,T);r.attachShader(m,A),r.attachShader(m,E),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function b(k){if(n.debug.checkShaderErrors){const $=r.getProgramInfoLog(m).trim(),L=r.getShaderInfoLog(A).trim(),O=r.getShaderInfoLog(E).trim();let V=!0,q=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,A,E);else{const I=A_(r,A,"vertex"),B=A_(r,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+I+`
`+B)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(L===""||O==="")&&(q=!1);q&&(k.diagnostics={runnable:V,programLog:$,vertexShader:{log:L,prefix:d},fragmentShader:{log:O,prefix:_}})}r.deleteShader(A),r.deleteShader(E),S=new gu(r,m),w=i2(r,m)}let S;this.getUniforms=function(){return S===void 0&&b(this),S};let w;this.getAttributes=function(){return w===void 0&&b(this),w};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=r.getProgramParameter(m,qC)),U},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=$C++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=A,this.fragmentShader=E,this}let m2=0;class g2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new _2(e),t.set(e,i)),i}}class _2{constructor(e){this.id=m2++,this.code=e,this.usedTimes=0}}function v2(n,e,t,i,r,s,o){const a=new vy,l=new g2,u=[],c=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return S===0?"uv":`uv${S}`}function m(S,w,U,k,$){const L=k.fog,O=$.geometry,V=S.isMeshStandardMaterial?k.environment:null,q=(S.isMeshStandardMaterial?t:e).get(S.envMap||V),I=q&&q.mapping===yc?q.image.height:null,B=x[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const H=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Z=H!==void 0?H.length:0;let Q=0;O.morphAttributes.position!==void 0&&(Q=1),O.morphAttributes.normal!==void 0&&(Q=2),O.morphAttributes.color!==void 0&&(Q=3);let Y,K,re,pe;if(B){const ln=Ri[B];Y=ln.vertexShader,K=ln.fragmentShader}else Y=S.vertexShader,K=S.fragmentShader,l.update(S),re=l.getVertexShaderID(S),pe=l.getFragmentShaderID(S);const me=n.getRenderTarget(),Pe=$.isInstancedMesh===!0,Le=$.isBatchedMesh===!0,Te=!!S.map,We=!!S.matcap,G=!!q,Ft=!!S.aoMap,Me=!!S.lightMap,Ce=!!S.bumpMap,xe=!!S.normalMap,le=!!S.displacementMap,ge=!!S.emissiveMap,R=!!S.metalnessMap,M=!!S.roughnessMap,z=S.anisotropy>0,J=S.clearcoat>0,ee=S.iridescence>0,te=S.sheen>0,_e=S.transmission>0,ae=z&&!!S.anisotropyMap,fe=J&&!!S.clearcoatMap,Se=J&&!!S.clearcoatNormalMap,Ne=J&&!!S.clearcoatRoughnessMap,ne=ee&&!!S.iridescenceMap,Ze=ee&&!!S.iridescenceThicknessMap,je=te&&!!S.sheenColorMap,De=te&&!!S.sheenRoughnessMap,Ee=!!S.specularMap,ve=!!S.specularColorMap,Fe=!!S.specularIntensityMap,$e=_e&&!!S.transmissionMap,St=_e&&!!S.thicknessMap,Ve=!!S.gradientMap,se=!!S.alphaMap,D=S.alphaTest>0,ue=!!S.alphaHash,ce=!!S.extensions,Re=!!O.attributes.uv1,we=!!O.attributes.uv2,tt=!!O.attributes.uv3;let nt=Nr;return S.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(nt=n.toneMapping),{isWebGL2:c,shaderID:B,shaderType:S.type,shaderName:S.name,vertexShader:Y,fragmentShader:K,defines:S.defines,customVertexShaderID:re,customFragmentShaderID:pe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Le,instancing:Pe,instancingColor:Pe&&$.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:me===null?n.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ir,map:Te,matcap:We,envMap:G,envMapMode:G&&q.mapping,envMapCubeUVHeight:I,aoMap:Ft,lightMap:Me,bumpMap:Ce,normalMap:xe,displacementMap:h&&le,emissiveMap:ge,normalMapObjectSpace:xe&&S.normalMapType===AT,normalMapTangentSpace:xe&&S.normalMapType===dy,metalnessMap:R,roughnessMap:M,anisotropy:z,anisotropyMap:ae,clearcoat:J,clearcoatMap:fe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ne,iridescence:ee,iridescenceMap:ne,iridescenceThicknessMap:Ze,sheen:te,sheenColorMap:je,sheenRoughnessMap:De,specularMap:Ee,specularColorMap:ve,specularIntensityMap:Fe,transmission:_e,transmissionMap:$e,thicknessMap:St,gradientMap:Ve,opaque:S.transparent===!1&&S.blending===yo,alphaMap:se,alphaTest:D,alphaHash:ue,combine:S.combine,mapUv:Te&&g(S.map.channel),aoMapUv:Ft&&g(S.aoMap.channel),lightMapUv:Me&&g(S.lightMap.channel),bumpMapUv:Ce&&g(S.bumpMap.channel),normalMapUv:xe&&g(S.normalMap.channel),displacementMapUv:le&&g(S.displacementMap.channel),emissiveMapUv:ge&&g(S.emissiveMap.channel),metalnessMapUv:R&&g(S.metalnessMap.channel),roughnessMapUv:M&&g(S.roughnessMap.channel),anisotropyMapUv:ae&&g(S.anisotropyMap.channel),clearcoatMapUv:fe&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:Se&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ze&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:je&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:De&&g(S.sheenRoughnessMap.channel),specularMapUv:Ee&&g(S.specularMap.channel),specularColorMapUv:ve&&g(S.specularColorMap.channel),specularIntensityMapUv:Fe&&g(S.specularIntensityMap.channel),transmissionMapUv:$e&&g(S.transmissionMap.channel),thicknessMapUv:St&&g(S.thicknessMap.channel),alphaMapUv:se&&g(S.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(xe||z),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Re,vertexUv2s:we,vertexUv3s:tt,pointsUvs:$.isPoints===!0&&!!O.attributes.uv&&(Te||se),fog:!!L,useFog:S.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:$.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:Q,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Te&&S.map.isVideoTexture===!0&&Qe.getTransfer(S.map.colorSpace)===at,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===_i,flipSided:S.side===Cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionDerivatives:ce&&S.extensions.derivatives===!0,extensionFragDepth:ce&&S.extensions.fragDepth===!0,extensionDrawBuffers:ce&&S.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&S.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&S.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:c||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()}}function d(S){const w=[];if(S.shaderID?w.push(S.shaderID):(w.push(S.customVertexShaderID),w.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)w.push(U),w.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(_(w,S),v(w,S),w.push(n.outputColorSpace)),w.push(S.customProgramCacheKey),w.join()}function _(S,w){S.push(w.precision),S.push(w.outputColorSpace),S.push(w.envMapMode),S.push(w.envMapCubeUVHeight),S.push(w.mapUv),S.push(w.alphaMapUv),S.push(w.lightMapUv),S.push(w.aoMapUv),S.push(w.bumpMapUv),S.push(w.normalMapUv),S.push(w.displacementMapUv),S.push(w.emissiveMapUv),S.push(w.metalnessMapUv),S.push(w.roughnessMapUv),S.push(w.anisotropyMapUv),S.push(w.clearcoatMapUv),S.push(w.clearcoatNormalMapUv),S.push(w.clearcoatRoughnessMapUv),S.push(w.iridescenceMapUv),S.push(w.iridescenceThicknessMapUv),S.push(w.sheenColorMapUv),S.push(w.sheenRoughnessMapUv),S.push(w.specularMapUv),S.push(w.specularColorMapUv),S.push(w.specularIntensityMapUv),S.push(w.transmissionMapUv),S.push(w.thicknessMapUv),S.push(w.combine),S.push(w.fogExp2),S.push(w.sizeAttenuation),S.push(w.morphTargetsCount),S.push(w.morphAttributeCount),S.push(w.numDirLights),S.push(w.numPointLights),S.push(w.numSpotLights),S.push(w.numSpotLightMaps),S.push(w.numHemiLights),S.push(w.numRectAreaLights),S.push(w.numDirLightShadows),S.push(w.numPointLightShadows),S.push(w.numSpotLightShadows),S.push(w.numSpotLightShadowsWithMaps),S.push(w.numLightProbes),S.push(w.shadowMapType),S.push(w.toneMapping),S.push(w.numClippingPlanes),S.push(w.numClipIntersection),S.push(w.depthPacking)}function v(S,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),S.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),S.push(a.mask)}function y(S){const w=x[S.type];let U;if(w){const k=Ri[w];U=JT.clone(k.uniforms)}else U=S.uniforms;return U}function T(S,w){let U;for(let k=0,$=u.length;k<$;k++){const L=u[k];if(L.cacheKey===w){U=L,++U.usedTimes;break}}return U===void 0&&(U=new p2(n,w,S,s),u.push(U)),U}function A(S){if(--S.usedTimes===0){const w=u.indexOf(S);u[w]=u[u.length-1],u.pop(),S.destroy()}}function E(S){l.remove(S)}function b(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:T,releaseProgram:A,releaseShaderCache:E,programs:u,dispose:b}}function x2(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function y2(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function L_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function D_(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,p,x,g,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:x,renderOrder:f.renderOrder,z:g,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=x,d.renderOrder=f.renderOrder,d.z=g,d.group=m),e++,d}function a(f,h,p,x,g,m){const d=o(f,h,p,x,g,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(f,h,p,x,g,m){const d=o(f,h,p,x,g,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function u(f,h){t.length>1&&t.sort(f||y2),i.length>1&&i.sort(h||L_),r.length>1&&r.sort(h||L_)}function c(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:c,sort:u}}function S2(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new D_,n.set(i,[o])):r>=s.length?(o=new D_,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function M2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return n[e.id]=t,t}}}function E2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let T2=0;function w2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function A2(n,e){const t=new M2,i=E2(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new N);const s=new N,o=new xt,a=new xt;function l(c,f){let h=0,p=0,x=0;for(let k=0;k<9;k++)r.probe[k].set(0,0,0);let g=0,m=0,d=0,_=0,v=0,y=0,T=0,A=0,E=0,b=0,S=0;c.sort(w2);const w=f===!0?Math.PI:1;for(let k=0,$=c.length;k<$;k++){const L=c[k],O=L.color,V=L.intensity,q=L.distance,I=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=O.r*V*w,p+=O.g*V*w,x+=O.b*V*w;else if(L.isLightProbe){for(let B=0;B<9;B++)r.probe[B].addScaledVector(L.sh.coefficients[B],V);S++}else if(L.isDirectionalLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){const H=L.shadow,Z=i.get(L);Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,r.directionalShadow[g]=Z,r.directionalShadowMap[g]=I,r.directionalShadowMatrix[g]=L.shadow.matrix,y++}r.directional[g]=B,g++}else if(L.isSpotLight){const B=t.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(O).multiplyScalar(V*w),B.distance=q,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,r.spot[d]=B;const H=L.shadow;if(L.map&&(r.spotLightMap[E]=L.map,E++,H.updateMatrices(L),L.castShadow&&b++),r.spotLightMatrix[d]=H.matrix,L.castShadow){const Z=i.get(L);Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,r.spotShadow[d]=Z,r.spotShadowMap[d]=I,A++}d++}else if(L.isRectAreaLight){const B=t.get(L);B.color.copy(O).multiplyScalar(V),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),r.rectArea[_]=B,_++}else if(L.isPointLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity*w),B.distance=L.distance,B.decay=L.decay,L.castShadow){const H=L.shadow,Z=i.get(L);Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,Z.shadowCameraNear=H.camera.near,Z.shadowCameraFar=H.camera.far,r.pointShadow[m]=Z,r.pointShadowMap[m]=I,r.pointShadowMatrix[m]=L.shadow.matrix,T++}r.point[m]=B,m++}else if(L.isHemisphereLight){const B=t.get(L);B.skyColor.copy(L.color).multiplyScalar(V*w),B.groundColor.copy(L.groundColor).multiplyScalar(V*w),r.hemi[v]=B,v++}}_>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_FLOAT_1,r.rectAreaLTC2=oe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=oe.LTC_HALF_1,r.rectAreaLTC2=oe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=x;const U=r.hash;(U.directionalLength!==g||U.pointLength!==m||U.spotLength!==d||U.rectAreaLength!==_||U.hemiLength!==v||U.numDirectionalShadows!==y||U.numPointShadows!==T||U.numSpotShadows!==A||U.numSpotMaps!==E||U.numLightProbes!==S)&&(r.directional.length=g,r.spot.length=d,r.rectArea.length=_,r.point.length=m,r.hemi.length=v,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=T,r.pointShadowMap.length=T,r.spotShadow.length=A,r.spotShadowMap.length=A,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=T,r.spotLightMatrix.length=A+E-b,r.spotLightMap.length=E,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=S,U.directionalLength=g,U.pointLength=m,U.spotLength=d,U.rectAreaLength=_,U.hemiLength=v,U.numDirectionalShadows=y,U.numPointShadows=T,U.numSpotShadows=A,U.numSpotMaps=E,U.numLightProbes=S,r.version=T2++)}function u(c,f){let h=0,p=0,x=0,g=0,m=0;const d=f.matrixWorldInverse;for(let _=0,v=c.length;_<v;_++){const y=c[_];if(y.isDirectionalLight){const T=r.directional[h];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(d),h++}else if(y.isSpotLight){const T=r.spot[x];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(d),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(d),x++}else if(y.isRectAreaLight){const T=r.rectArea[g];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(d),a.identity(),o.copy(y.matrixWorld),o.premultiply(d),a.extractRotation(o),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const T=r.point[p];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const T=r.hemi[m];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(d),m++}}}return{setup:l,setupView:u,state:r}}function N_(n,e){const t=new A2(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){t.setup(i,f)}function u(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:u,pushLight:o,pushShadow:a}}function R2(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new N_(n,e),t.set(s,[l])):o>=a.length?(l=new N_(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class C2 extends bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=TT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class b2 extends bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const P2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,L2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function D2(n,e,t){let i=new Tp;const r=new Oe,s=new Oe,o=new dt,a=new C2({depthPacking:wT}),l=new b2,u={},c=t.maxTextureSize,f={[Br]:Cn,[Cn]:Br,[_i]:_i},h=new ws({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:P2,fragmentShader:L2}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const x=new Kt;x.setAttribute("position",new oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new hn(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ey;let d=this.type;this.render=function(A,E,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const S=n.getRenderTarget(),w=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),k=n.state;k.setBlending(Dr),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const $=d!==Vi&&this.type===Vi,L=d===Vi&&this.type!==Vi;for(let O=0,V=A.length;O<V;O++){const q=A[O],I=q.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const B=I.getFrameExtents();if(r.multiply(B),s.copy(I.mapSize),(r.x>c||r.y>c)&&(r.x>c&&(s.x=Math.floor(c/B.x),r.x=s.x*B.x,I.mapSize.x=s.x),r.y>c&&(s.y=Math.floor(c/B.y),r.y=s.y*B.y,I.mapSize.y=s.y)),I.map===null||$===!0||L===!0){const Z=this.type!==Vi?{minFilter:dn,magFilter:dn}:{};I.map!==null&&I.map.dispose(),I.map=new Ts(r.x,r.y,Z),I.map.texture.name=q.name+".shadowMap",I.camera.updateProjectionMatrix()}n.setRenderTarget(I.map),n.clear();const H=I.getViewportCount();for(let Z=0;Z<H;Z++){const Q=I.getViewport(Z);o.set(s.x*Q.x,s.y*Q.y,s.x*Q.z,s.y*Q.w),k.viewport(o),I.updateMatrices(q,Z),i=I.getFrustum(),y(E,b,I.camera,q,this.type)}I.isPointLightShadow!==!0&&this.type===Vi&&_(I,b),I.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(S,w,U)};function _(A,E){const b=e.update(g);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ts(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(E,null,b,h,g,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(E,null,b,p,g,null)}function v(A,E,b,S){let w=null;const U=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(U!==void 0)w=U;else if(w=b.isPointLight===!0?l:a,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const k=w.uuid,$=E.uuid;let L=u[k];L===void 0&&(L={},u[k]=L);let O=L[$];O===void 0&&(O=w.clone(),L[$]=O,E.addEventListener("dispose",T)),w=O}if(w.visible=E.visible,w.wireframe=E.wireframe,S===Vi?w.side=E.shadowSide!==null?E.shadowSide:E.side:w.side=E.shadowSide!==null?E.shadowSide:f[E.side],w.alphaMap=E.alphaMap,w.alphaTest=E.alphaTest,w.map=E.map,w.clipShadows=E.clipShadows,w.clippingPlanes=E.clippingPlanes,w.clipIntersection=E.clipIntersection,w.displacementMap=E.displacementMap,w.displacementScale=E.displacementScale,w.displacementBias=E.displacementBias,w.wireframeLinewidth=E.wireframeLinewidth,w.linewidth=E.linewidth,b.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const k=n.properties.get(w);k.light=b}return w}function y(A,E,b,S,w){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&w===Vi)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const $=e.update(A),L=A.material;if(Array.isArray(L)){const O=$.groups;for(let V=0,q=O.length;V<q;V++){const I=O[V],B=L[I.materialIndex];if(B&&B.visible){const H=v(A,B,S,w);A.onBeforeShadow(n,A,E,b,$,H,I),n.renderBufferDirect(b,null,$,H,A,I),A.onAfterShadow(n,A,E,b,$,H,I)}}}else if(L.visible){const O=v(A,L,S,w);A.onBeforeShadow(n,A,E,b,$,O,null),n.renderBufferDirect(b,null,$,O,A,null),A.onAfterShadow(n,A,E,b,$,O,null)}}const k=A.children;for(let $=0,L=k.length;$<L;$++)y(k[$],E,b,S,w)}function T(A){A.target.removeEventListener("dispose",T);for(const b in u){const S=u[b],w=A.target.uuid;w in S&&(S[w].dispose(),delete S[w])}}}function N2(n,e,t){const i=t.isWebGL2;function r(){let D=!1;const ue=new dt;let ce=null;const Re=new dt(0,0,0,0);return{setMask:function(we){ce!==we&&!D&&(n.colorMask(we,we,we,we),ce=we)},setLocked:function(we){D=we},setClear:function(we,tt,nt,kt,ln){ln===!0&&(we*=kt,tt*=kt,nt*=kt),ue.set(we,tt,nt,kt),Re.equals(ue)===!1&&(n.clearColor(we,tt,nt,kt),Re.copy(ue))},reset:function(){D=!1,ce=null,Re.set(-1,0,0,0)}}}function s(){let D=!1,ue=null,ce=null,Re=null;return{setTest:function(we){we?Le(n.DEPTH_TEST):Te(n.DEPTH_TEST)},setMask:function(we){ue!==we&&!D&&(n.depthMask(we),ue=we)},setFunc:function(we){if(ce!==we){switch(we){case tT:n.depthFunc(n.NEVER);break;case nT:n.depthFunc(n.ALWAYS);break;case iT:n.depthFunc(n.LESS);break;case $u:n.depthFunc(n.LEQUAL);break;case rT:n.depthFunc(n.EQUAL);break;case sT:n.depthFunc(n.GEQUAL);break;case oT:n.depthFunc(n.GREATER);break;case aT:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ce=we}},setLocked:function(we){D=we},setClear:function(we){Re!==we&&(n.clearDepth(we),Re=we)},reset:function(){D=!1,ue=null,ce=null,Re=null}}}function o(){let D=!1,ue=null,ce=null,Re=null,we=null,tt=null,nt=null,kt=null,ln=null;return{setTest:function(it){D||(it?Le(n.STENCIL_TEST):Te(n.STENCIL_TEST))},setMask:function(it){ue!==it&&!D&&(n.stencilMask(it),ue=it)},setFunc:function(it,un,Ei){(ce!==it||Re!==un||we!==Ei)&&(n.stencilFunc(it,un,Ei),ce=it,Re=un,we=Ei)},setOp:function(it,un,Ei){(tt!==it||nt!==un||kt!==Ei)&&(n.stencilOp(it,un,Ei),tt=it,nt=un,kt=Ei)},setLocked:function(it){D=it},setClear:function(it){ln!==it&&(n.clearStencil(it),ln=it)},reset:function(){D=!1,ue=null,ce=null,Re=null,we=null,tt=null,nt=null,kt=null,ln=null}}}const a=new r,l=new s,u=new o,c=new WeakMap,f=new WeakMap;let h={},p={},x=new WeakMap,g=[],m=null,d=!1,_=null,v=null,y=null,T=null,A=null,E=null,b=null,S=new ze(0,0,0),w=0,U=!1,k=null,$=null,L=null,O=null,V=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,B=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(H)[1]),I=B>=1):H.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),I=B>=2);let Z=null,Q={};const Y=n.getParameter(n.SCISSOR_BOX),K=n.getParameter(n.VIEWPORT),re=new dt().fromArray(Y),pe=new dt().fromArray(K);function me(D,ue,ce,Re){const we=new Uint8Array(4),tt=n.createTexture();n.bindTexture(D,tt),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let nt=0;nt<ce;nt++)i&&(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)?n.texImage3D(ue,0,n.RGBA,1,1,Re,0,n.RGBA,n.UNSIGNED_BYTE,we):n.texImage2D(ue+nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,we);return tt}const Pe={};Pe[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),Pe[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Pe[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Pe[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Le(n.DEPTH_TEST),l.setFunc($u),ge(!1),R(mg),Le(n.CULL_FACE),xe(Dr);function Le(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function Te(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function We(D,ue){return p[D]!==ue?(n.bindFramebuffer(D,ue),p[D]=ue,i&&(D===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ue),D===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ue)),!0):!1}function G(D,ue){let ce=g,Re=!1;if(D)if(ce=x.get(ue),ce===void 0&&(ce=[],x.set(ue,ce)),D.isWebGLMultipleRenderTargets){const we=D.texture;if(ce.length!==we.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let tt=0,nt=we.length;tt<nt;tt++)ce[tt]=n.COLOR_ATTACHMENT0+tt;ce.length=we.length,Re=!0}}else ce[0]!==n.COLOR_ATTACHMENT0&&(ce[0]=n.COLOR_ATTACHMENT0,Re=!0);else ce[0]!==n.BACK&&(ce[0]=n.BACK,Re=!0);Re&&(t.isWebGL2?n.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function Ft(D){return m!==D?(n.useProgram(D),m=D,!0):!1}const Me={[rs]:n.FUNC_ADD,[BE]:n.FUNC_SUBTRACT,[VE]:n.FUNC_REVERSE_SUBTRACT};if(i)Me[vg]=n.MIN,Me[xg]=n.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(Me[vg]=D.MIN_EXT,Me[xg]=D.MAX_EXT)}const Ce={[HE]:n.ZERO,[GE]:n.ONE,[WE]:n.SRC_COLOR,[Zd]:n.SRC_ALPHA,[KE]:n.SRC_ALPHA_SATURATE,[qE]:n.DST_COLOR,[XE]:n.DST_ALPHA,[jE]:n.ONE_MINUS_SRC_COLOR,[Qd]:n.ONE_MINUS_SRC_ALPHA,[$E]:n.ONE_MINUS_DST_COLOR,[YE]:n.ONE_MINUS_DST_ALPHA,[ZE]:n.CONSTANT_COLOR,[QE]:n.ONE_MINUS_CONSTANT_COLOR,[JE]:n.CONSTANT_ALPHA,[eT]:n.ONE_MINUS_CONSTANT_ALPHA};function xe(D,ue,ce,Re,we,tt,nt,kt,ln,it){if(D===Dr){d===!0&&(Te(n.BLEND),d=!1);return}if(d===!1&&(Le(n.BLEND),d=!0),D!==zE){if(D!==_||it!==U){if((v!==rs||A!==rs)&&(n.blendEquation(n.FUNC_ADD),v=rs,A=rs),it)switch(D){case yo:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nn:n.blendFunc(n.ONE,n.ONE);break;case gg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _g:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case yo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case gg:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case _g:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,T=null,E=null,b=null,S.set(0,0,0),w=0,_=D,U=it}return}we=we||ue,tt=tt||ce,nt=nt||Re,(ue!==v||we!==A)&&(n.blendEquationSeparate(Me[ue],Me[we]),v=ue,A=we),(ce!==y||Re!==T||tt!==E||nt!==b)&&(n.blendFuncSeparate(Ce[ce],Ce[Re],Ce[tt],Ce[nt]),y=ce,T=Re,E=tt,b=nt),(kt.equals(S)===!1||ln!==w)&&(n.blendColor(kt.r,kt.g,kt.b,ln),S.copy(kt),w=ln),_=D,U=!1}function le(D,ue){D.side===_i?Te(n.CULL_FACE):Le(n.CULL_FACE);let ce=D.side===Cn;ue&&(ce=!ce),ge(ce),D.blending===yo&&D.transparent===!1?xe(Dr):xe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),l.setFunc(D.depthFunc),l.setTest(D.depthTest),l.setMask(D.depthWrite),a.setMask(D.colorWrite);const Re=D.stencilWrite;u.setTest(Re),Re&&(u.setMask(D.stencilWriteMask),u.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),u.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),z(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Le(n.SAMPLE_ALPHA_TO_COVERAGE):Te(n.SAMPLE_ALPHA_TO_COVERAGE)}function ge(D){k!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),k=D)}function R(D){D!==OE?(Le(n.CULL_FACE),D!==$&&(D===mg?n.cullFace(n.BACK):D===FE?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Te(n.CULL_FACE),$=D}function M(D){D!==L&&(I&&n.lineWidth(D),L=D)}function z(D,ue,ce){D?(Le(n.POLYGON_OFFSET_FILL),(O!==ue||V!==ce)&&(n.polygonOffset(ue,ce),O=ue,V=ce)):Te(n.POLYGON_OFFSET_FILL)}function J(D){D?Le(n.SCISSOR_TEST):Te(n.SCISSOR_TEST)}function ee(D){D===void 0&&(D=n.TEXTURE0+q-1),Z!==D&&(n.activeTexture(D),Z=D)}function te(D,ue,ce){ce===void 0&&(Z===null?ce=n.TEXTURE0+q-1:ce=Z);let Re=Q[ce];Re===void 0&&(Re={type:void 0,texture:void 0},Q[ce]=Re),(Re.type!==D||Re.texture!==ue)&&(Z!==ce&&(n.activeTexture(ce),Z=ce),n.bindTexture(D,ue||Pe[D]),Re.type=D,Re.texture=ue)}function _e(){const D=Q[Z];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ae(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ze(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function je(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function De(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ee(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(D){re.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),re.copy(D))}function $e(D){pe.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),pe.copy(D))}function St(D,ue){let ce=f.get(ue);ce===void 0&&(ce=new WeakMap,f.set(ue,ce));let Re=ce.get(D);Re===void 0&&(Re=n.getUniformBlockIndex(ue,D.name),ce.set(D,Re))}function Ve(D,ue){const Re=f.get(ue).get(D);c.get(ue)!==Re&&(n.uniformBlockBinding(ue,Re,D.__bindingPointIndex),c.set(ue,Re))}function se(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Z=null,Q={},p={},x=new WeakMap,g=[],m=null,d=!1,_=null,v=null,y=null,T=null,A=null,E=null,b=null,S=new ze(0,0,0),w=0,U=!1,k=null,$=null,L=null,O=null,V=null,re.set(0,0,n.canvas.width,n.canvas.height),pe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),u.reset()}return{buffers:{color:a,depth:l,stencil:u},enable:Le,disable:Te,bindFramebuffer:We,drawBuffers:G,useProgram:Ft,setBlending:xe,setMaterial:le,setFlipSided:ge,setCullFace:R,setLineWidth:M,setPolygonOffset:z,setScissorTest:J,activeTexture:ee,bindTexture:te,unbindTexture:_e,compressedTexImage2D:ae,compressedTexImage3D:fe,texImage2D:Ee,texImage3D:ve,updateUBOMapping:St,uniformBlockBinding:Ve,texStorage2D:je,texStorage3D:De,texSubImage2D:Se,texSubImage3D:Ne,compressedTexSubImage2D:ne,compressedTexSubImage3D:Ze,scissor:Fe,viewport:$e,reset:se}}function I2(n,e,t,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,M){return p?new OffscreenCanvas(R,M):ec("canvas")}function g(R,M,z,J){let ee=1;if((R.width>J||R.height>J)&&(ee=J/Math.max(R.width,R.height)),ee<1||M===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const te=M?sh:Math.floor,_e=te(ee*R.width),ae=te(ee*R.height);f===void 0&&(f=x(_e,ae));const fe=z?x(_e,ae):f;return fe.width=_e,fe.height=ae,fe.getContext("2d").drawImage(R,0,0,_e,ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+_e+"x"+ae+")."),fe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return $g(R.width)&&$g(R.height)}function d(R){return a?!1:R.wrapS!==vi||R.wrapT!==vi||R.minFilter!==dn&&R.minFilter!==ei}function _(R,M){return R.generateMipmaps&&M&&R.minFilter!==dn&&R.minFilter!==ei}function v(R){n.generateMipmap(R)}function y(R,M,z,J,ee=!1){if(a===!1)return M;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let te=M;if(M===n.RED&&(z===n.FLOAT&&(te=n.R32F),z===n.HALF_FLOAT&&(te=n.R16F),z===n.UNSIGNED_BYTE&&(te=n.R8)),M===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(te=n.R8UI),z===n.UNSIGNED_SHORT&&(te=n.R16UI),z===n.UNSIGNED_INT&&(te=n.R32UI),z===n.BYTE&&(te=n.R8I),z===n.SHORT&&(te=n.R16I),z===n.INT&&(te=n.R32I)),M===n.RG&&(z===n.FLOAT&&(te=n.RG32F),z===n.HALF_FLOAT&&(te=n.RG16F),z===n.UNSIGNED_BYTE&&(te=n.RG8)),M===n.RGBA){const _e=ee?Ku:Qe.getTransfer(J);z===n.FLOAT&&(te=n.RGBA32F),z===n.HALF_FLOAT&&(te=n.RGBA16F),z===n.UNSIGNED_BYTE&&(te=_e===at?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(te=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(te=n.RGB5_A1)}return(te===n.R16F||te===n.R32F||te===n.RG16F||te===n.RG32F||te===n.RGBA16F||te===n.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function T(R,M,z){return _(R,z)===!0||R.isFramebufferTexture&&R.minFilter!==dn&&R.minFilter!==ei?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function A(R){return R===dn||R===yg||R===uf?n.NEAREST:n.LINEAR}function E(R){const M=R.target;M.removeEventListener("dispose",E),S(M),M.isVideoTexture&&c.delete(M)}function b(R){const M=R.target;M.removeEventListener("dispose",b),U(M)}function S(R){const M=i.get(R);if(M.__webglInit===void 0)return;const z=R.source,J=h.get(z);if(J){const ee=J[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(R),Object.keys(J).length===0&&h.delete(z)}i.remove(R)}function w(R){const M=i.get(R);n.deleteTexture(M.__webglTexture);const z=R.source,J=h.get(z);delete J[M.__cacheKey],o.memory.textures--}function U(R){const M=R.texture,z=i.get(R),J=i.get(M);if(J.__webglTexture!==void 0&&(n.deleteTexture(J.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(z.__webglFramebuffer[ee]))for(let te=0;te<z.__webglFramebuffer[ee].length;te++)n.deleteFramebuffer(z.__webglFramebuffer[ee][te]);else n.deleteFramebuffer(z.__webglFramebuffer[ee]);z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer[ee])}else{if(Array.isArray(z.__webglFramebuffer))for(let ee=0;ee<z.__webglFramebuffer.length;ee++)n.deleteFramebuffer(z.__webglFramebuffer[ee]);else n.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&n.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let ee=0;ee<z.__webglColorRenderbuffer.length;ee++)z.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(z.__webglColorRenderbuffer[ee]);z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ee=0,te=M.length;ee<te;ee++){const _e=i.get(M[ee]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),o.memory.textures--),i.remove(M[ee])}i.remove(M),i.remove(R)}let k=0;function $(){k=0}function L(){const R=k;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),k+=1,R}function O(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function V(R,M){const z=i.get(R);if(R.isVideoTexture&&le(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){const J=R.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{re(z,R,M);return}}t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+M)}function q(R,M){const z=i.get(R);if(R.version>0&&z.__version!==R.version){re(z,R,M);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+M)}function I(R,M){const z=i.get(R);if(R.version>0&&z.__version!==R.version){re(z,R,M);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+M)}function B(R,M){const z=i.get(R);if(R.version>0&&z.__version!==R.version){pe(z,R,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+M)}const H={[th]:n.REPEAT,[vi]:n.CLAMP_TO_EDGE,[nh]:n.MIRRORED_REPEAT},Z={[dn]:n.NEAREST,[yg]:n.NEAREST_MIPMAP_NEAREST,[uf]:n.NEAREST_MIPMAP_LINEAR,[ei]:n.LINEAR,[mT]:n.LINEAR_MIPMAP_NEAREST,[Qa]:n.LINEAR_MIPMAP_LINEAR},Q={[RT]:n.NEVER,[NT]:n.ALWAYS,[CT]:n.LESS,[hy]:n.LEQUAL,[bT]:n.EQUAL,[DT]:n.GEQUAL,[PT]:n.GREATER,[LT]:n.NOTEQUAL};function Y(R,M,z){if(z?(n.texParameteri(R,n.TEXTURE_WRAP_S,H[M.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,H[M.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,H[M.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Z[M.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Z[M.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(M.wrapS!==vi||M.wrapT!==vi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,A(M.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,A(M.minFilter)),M.minFilter!==dn&&M.minFilter!==ei&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Q[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===dn||M.minFilter!==uf&&M.minFilter!==Qa||M.type===Sr&&e.has("OES_texture_float_linear")===!1||a===!1&&M.type===Ja&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||i.get(M).__currentAnisotropy)&&(n.texParameterf(R,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy)}}function K(R,M){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",E));const J=M.source;let ee=h.get(J);ee===void 0&&(ee={},h.set(J,ee));const te=O(M);if(te!==R.__cacheKey){ee[te]===void 0&&(ee[te]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),ee[te].usedTimes++;const _e=ee[R.__cacheKey];_e!==void 0&&(ee[R.__cacheKey].usedTimes--,_e.usedTimes===0&&w(M)),R.__cacheKey=te,R.__webglTexture=ee[te].texture}return z}function re(R,M,z){let J=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=n.TEXTURE_3D);const ee=K(R,M),te=M.source;t.bindTexture(J,R.__webglTexture,n.TEXTURE0+z);const _e=i.get(te);if(te.version!==_e.__version||ee===!0){t.activeTexture(n.TEXTURE0+z);const ae=Qe.getPrimaries(Qe.workingColorSpace),fe=M.colorSpace===ti?null:Qe.getPrimaries(M.colorSpace),Se=M.colorSpace===ti||ae===fe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ne=d(M)&&m(M.image)===!1;let ne=g(M.image,Ne,!1,r.maxTextureSize);ne=ge(M,ne);const Ze=m(ne)||a,je=s.convert(M.format,M.colorSpace);let De=s.convert(M.type),Ee=y(M.internalFormat,je,De,M.colorSpace,M.isVideoTexture);Y(J,M,Ze);let ve;const Fe=M.mipmaps,$e=a&&M.isVideoTexture!==!0&&Ee!==cy,St=_e.__version===void 0||ee===!0,Ve=T(M,ne,Ze);if(M.isDepthTexture)Ee=n.DEPTH_COMPONENT,a?M.type===Sr?Ee=n.DEPTH_COMPONENT32F:M.type===yr?Ee=n.DEPTH_COMPONENT24:M.type===gs?Ee=n.DEPTH24_STENCIL8:Ee=n.DEPTH_COMPONENT16:M.type===Sr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===_s&&Ee===n.DEPTH_COMPONENT&&M.type!==Sp&&M.type!==yr&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=yr,De=s.convert(M.type)),M.format===Oo&&Ee===n.DEPTH_COMPONENT&&(Ee=n.DEPTH_STENCIL,M.type!==gs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=gs,De=s.convert(M.type))),St&&($e?t.texStorage2D(n.TEXTURE_2D,1,Ee,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Ee,ne.width,ne.height,0,je,De,null));else if(M.isDataTexture)if(Fe.length>0&&Ze){$e&&St&&t.texStorage2D(n.TEXTURE_2D,Ve,Ee,Fe[0].width,Fe[0].height);for(let se=0,D=Fe.length;se<D;se++)ve=Fe[se],$e?t.texSubImage2D(n.TEXTURE_2D,se,0,0,ve.width,ve.height,je,De,ve.data):t.texImage2D(n.TEXTURE_2D,se,Ee,ve.width,ve.height,0,je,De,ve.data);M.generateMipmaps=!1}else $e?(St&&t.texStorage2D(n.TEXTURE_2D,Ve,Ee,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ne.width,ne.height,je,De,ne.data)):t.texImage2D(n.TEXTURE_2D,0,Ee,ne.width,ne.height,0,je,De,ne.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){$e&&St&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ve,Ee,Fe[0].width,Fe[0].height,ne.depth);for(let se=0,D=Fe.length;se<D;se++)ve=Fe[se],M.format!==xi?je!==null?$e?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,ve.width,ve.height,ne.depth,je,ve.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Ee,ve.width,ve.height,ne.depth,0,ve.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,ve.width,ve.height,ne.depth,je,De,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Ee,ve.width,ve.height,ne.depth,0,je,De,ve.data)}else{$e&&St&&t.texStorage2D(n.TEXTURE_2D,Ve,Ee,Fe[0].width,Fe[0].height);for(let se=0,D=Fe.length;se<D;se++)ve=Fe[se],M.format!==xi?je!==null?$e?t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,ve.width,ve.height,je,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Ee,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?t.texSubImage2D(n.TEXTURE_2D,se,0,0,ve.width,ve.height,je,De,ve.data):t.texImage2D(n.TEXTURE_2D,se,Ee,ve.width,ve.height,0,je,De,ve.data)}else if(M.isDataArrayTexture)$e?(St&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ve,Ee,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,je,De,ne.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,ne.width,ne.height,ne.depth,0,je,De,ne.data);else if(M.isData3DTexture)$e?(St&&t.texStorage3D(n.TEXTURE_3D,Ve,Ee,ne.width,ne.height,ne.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,je,De,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,ne.width,ne.height,ne.depth,0,je,De,ne.data);else if(M.isFramebufferTexture){if(St)if($e)t.texStorage2D(n.TEXTURE_2D,Ve,Ee,ne.width,ne.height);else{let se=ne.width,D=ne.height;for(let ue=0;ue<Ve;ue++)t.texImage2D(n.TEXTURE_2D,ue,Ee,se,D,0,je,De,null),se>>=1,D>>=1}}else if(Fe.length>0&&Ze){$e&&St&&t.texStorage2D(n.TEXTURE_2D,Ve,Ee,Fe[0].width,Fe[0].height);for(let se=0,D=Fe.length;se<D;se++)ve=Fe[se],$e?t.texSubImage2D(n.TEXTURE_2D,se,0,0,je,De,ve):t.texImage2D(n.TEXTURE_2D,se,Ee,je,De,ve);M.generateMipmaps=!1}else $e?(St&&t.texStorage2D(n.TEXTURE_2D,Ve,Ee,ne.width,ne.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,je,De,ne)):t.texImage2D(n.TEXTURE_2D,0,Ee,je,De,ne);_(M,Ze)&&v(J),_e.__version=te.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function pe(R,M,z){if(M.image.length!==6)return;const J=K(R,M),ee=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+z);const te=i.get(ee);if(ee.version!==te.__version||J===!0){t.activeTexture(n.TEXTURE0+z);const _e=Qe.getPrimaries(Qe.workingColorSpace),ae=M.colorSpace===ti?null:Qe.getPrimaries(M.colorSpace),fe=M.colorSpace===ti||_e===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Se=M.isCompressedTexture||M.image[0].isCompressedTexture,Ne=M.image[0]&&M.image[0].isDataTexture,ne=[];for(let se=0;se<6;se++)!Se&&!Ne?ne[se]=g(M.image[se],!1,!0,r.maxCubemapSize):ne[se]=Ne?M.image[se].image:M.image[se],ne[se]=ge(M,ne[se]);const Ze=ne[0],je=m(Ze)||a,De=s.convert(M.format,M.colorSpace),Ee=s.convert(M.type),ve=y(M.internalFormat,De,Ee,M.colorSpace),Fe=a&&M.isVideoTexture!==!0,$e=te.__version===void 0||J===!0;let St=T(M,Ze,je);Y(n.TEXTURE_CUBE_MAP,M,je);let Ve;if(Se){Fe&&$e&&t.texStorage2D(n.TEXTURE_CUBE_MAP,St,ve,Ze.width,Ze.height);for(let se=0;se<6;se++){Ve=ne[se].mipmaps;for(let D=0;D<Ve.length;D++){const ue=Ve[D];M.format!==xi?De!==null?Fe?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D,0,0,ue.width,ue.height,De,ue.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D,0,0,ue.width,ue.height,De,Ee,ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D,ve,ue.width,ue.height,0,De,Ee,ue.data)}}}else{Ve=M.mipmaps,Fe&&$e&&(Ve.length>0&&St++,t.texStorage2D(n.TEXTURE_CUBE_MAP,St,ve,ne[0].width,ne[0].height));for(let se=0;se<6;se++)if(Ne){Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ne[se].width,ne[se].height,De,Ee,ne[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ve,ne[se].width,ne[se].height,0,De,Ee,ne[se].data);for(let D=0;D<Ve.length;D++){const ce=Ve[D].image[se].image;Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D+1,0,0,ce.width,ce.height,De,Ee,ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D+1,ve,ce.width,ce.height,0,De,Ee,ce.data)}}else{Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De,Ee,ne[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ve,De,Ee,ne[se]);for(let D=0;D<Ve.length;D++){const ue=Ve[D];Fe?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D+1,0,0,De,Ee,ue.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,D+1,ve,De,Ee,ue.image[se])}}}_(M,je)&&v(n.TEXTURE_CUBE_MAP),te.__version=ee.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function me(R,M,z,J,ee,te){const _e=s.convert(z.format,z.colorSpace),ae=s.convert(z.type),fe=y(z.internalFormat,_e,ae,z.colorSpace);if(!i.get(M).__hasExternalTextures){const Ne=Math.max(1,M.width>>te),ne=Math.max(1,M.height>>te);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,te,fe,Ne,ne,M.depth,0,_e,ae,null):t.texImage2D(ee,te,fe,Ne,ne,0,_e,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),xe(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,ee,i.get(z).__webglTexture,0,Ce(M)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,ee,i.get(z).__webglTexture,te),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Pe(R,M,z){if(n.bindRenderbuffer(n.RENDERBUFFER,R),M.depthBuffer&&!M.stencilBuffer){let J=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(z||xe(M)){const ee=M.depthTexture;ee&&ee.isDepthTexture&&(ee.type===Sr?J=n.DEPTH_COMPONENT32F:ee.type===yr&&(J=n.DEPTH_COMPONENT24));const te=Ce(M);xe(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,J,M.width,M.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,te,J,M.width,M.height)}else n.renderbufferStorage(n.RENDERBUFFER,J,M.width,M.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(M.depthBuffer&&M.stencilBuffer){const J=Ce(M);z&&xe(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,J,n.DEPTH24_STENCIL8,M.width,M.height):xe(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,J,n.DEPTH24_STENCIL8,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const J=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ee=0;ee<J.length;ee++){const te=J[ee],_e=s.convert(te.format,te.colorSpace),ae=s.convert(te.type),fe=y(te.internalFormat,_e,ae,te.colorSpace),Se=Ce(M);z&&xe(M)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Se,fe,M.width,M.height):xe(M)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Se,fe,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,fe,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Le(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const J=i.get(M.depthTexture).__webglTexture,ee=Ce(M);if(M.depthTexture.format===_s)xe(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(M.depthTexture.format===Oo)xe(M)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Te(R){const M=i.get(R),z=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Le(M.__webglFramebuffer,R)}else if(z){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]=n.createRenderbuffer(),Pe(M.__webglDepthbuffer[J],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=n.createRenderbuffer(),Pe(M.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(R,M,z){const J=i.get(R);M!==void 0&&me(J.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Te(R)}function G(R){const M=R.texture,z=i.get(R),J=i.get(M);R.addEventListener("dispose",b),R.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=M.version,o.memory.textures++);const ee=R.isWebGLCubeRenderTarget===!0,te=R.isWebGLMultipleRenderTargets===!0,_e=m(R)||a;if(ee){z.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ae]=[];for(let fe=0;fe<M.mipmaps.length;fe++)z.__webglFramebuffer[ae][fe]=n.createFramebuffer()}else z.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(a&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ae=0;ae<M.mipmaps.length;ae++)z.__webglFramebuffer[ae]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(te)if(r.drawBuffers){const ae=R.texture;for(let fe=0,Se=ae.length;fe<Se;fe++){const Ne=i.get(ae[fe]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&xe(R)===!1){const ae=te?M:[M];z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let fe=0;fe<ae.length;fe++){const Se=ae[fe];z.__webglColorRenderbuffer[fe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[fe]);const Ne=s.convert(Se.format,Se.colorSpace),ne=s.convert(Se.type),Ze=y(Se.internalFormat,Ne,ne,Se.colorSpace,R.isXRRenderTarget===!0),je=Ce(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,je,Ze,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,z.__webglColorRenderbuffer[fe])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Pe(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ee){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Y(n.TEXTURE_CUBE_MAP,M,_e);for(let ae=0;ae<6;ae++)if(a&&M.mipmaps&&M.mipmaps.length>0)for(let fe=0;fe<M.mipmaps.length;fe++)me(z.__webglFramebuffer[ae][fe],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,fe);else me(z.__webglFramebuffer[ae],R,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);_(M,_e)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const ae=R.texture;for(let fe=0,Se=ae.length;fe<Se;fe++){const Ne=ae[fe],ne=i.get(Ne);t.bindTexture(n.TEXTURE_2D,ne.__webglTexture),Y(n.TEXTURE_2D,Ne,_e),me(z.__webglFramebuffer,R,Ne,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,0),_(Ne,_e)&&v(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?ae=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ae,J.__webglTexture),Y(ae,M,_e),a&&M.mipmaps&&M.mipmaps.length>0)for(let fe=0;fe<M.mipmaps.length;fe++)me(z.__webglFramebuffer[fe],R,M,n.COLOR_ATTACHMENT0,ae,fe);else me(z.__webglFramebuffer,R,M,n.COLOR_ATTACHMENT0,ae,0);_(M,_e)&&v(ae),t.unbindTexture()}R.depthBuffer&&Te(R)}function Ft(R){const M=m(R)||a,z=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let J=0,ee=z.length;J<ee;J++){const te=z[J];if(_(te,M)){const _e=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ae=i.get(te).__webglTexture;t.bindTexture(_e,ae),v(_e),t.unbindTexture()}}}function Me(R){if(a&&R.samples>0&&xe(R)===!1){const M=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],z=R.width,J=R.height;let ee=n.COLOR_BUFFER_BIT;const te=[],_e=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=i.get(R),fe=R.isWebGLMultipleRenderTargets===!0;if(fe)for(let Se=0;Se<M.length;Se++)t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ae.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglFramebuffer);for(let Se=0;Se<M.length;Se++){te.push(n.COLOR_ATTACHMENT0+Se),R.depthBuffer&&te.push(_e);const Ne=ae.__ignoreDepthValues!==void 0?ae.__ignoreDepthValues:!1;if(Ne===!1&&(R.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),fe&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ae.__webglColorRenderbuffer[Se]),Ne===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[_e]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_e])),fe){const ne=i.get(M[Se]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,z,J,0,0,z,J,ee,n.NEAREST),u&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),fe)for(let Se=0;Se<M.length;Se++){t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,ae.__webglColorRenderbuffer[Se]);const Ne=i.get(M[Se]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,Ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ae.__webglMultisampledFramebuffer)}}function Ce(R){return Math.min(r.maxSamples,R.samples)}function xe(R){const M=i.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function le(R){const M=o.render.frame;c.get(R)!==M&&(c.set(R,M),R.update())}function ge(R,M){const z=R.colorSpace,J=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===ih||z!==ir&&z!==ti&&(Qe.getTransfer(z)===at?a===!1?e.has("EXT_sRGB")===!0&&J===xi?(R.format=ih,R.minFilter=ei,R.generateMipmaps=!1):M=my.sRGBToLinear(M):(J!==xi||ee!==Ir)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}this.allocateTextureUnit=L,this.resetTextureUnits=$,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=I,this.setTextureCube=B,this.rebindTextures=We,this.setupRenderTarget=G,this.updateRenderTargetMipmap=Ft,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=me,this.useMultisampledRTT=xe}function U2(n,e,t){const i=t.isWebGL2;function r(s,o=ti){let a;const l=Qe.getTransfer(o);if(s===Ir)return n.UNSIGNED_BYTE;if(s===sy)return n.UNSIGNED_SHORT_4_4_4_4;if(s===oy)return n.UNSIGNED_SHORT_5_5_5_1;if(s===gT)return n.BYTE;if(s===_T)return n.SHORT;if(s===Sp)return n.UNSIGNED_SHORT;if(s===ry)return n.INT;if(s===yr)return n.UNSIGNED_INT;if(s===Sr)return n.FLOAT;if(s===Ja)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===vT)return n.ALPHA;if(s===xi)return n.RGBA;if(s===xT)return n.LUMINANCE;if(s===yT)return n.LUMINANCE_ALPHA;if(s===_s)return n.DEPTH_COMPONENT;if(s===Oo)return n.DEPTH_STENCIL;if(s===ih)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===ST)return n.RED;if(s===ay)return n.RED_INTEGER;if(s===MT)return n.RG;if(s===ly)return n.RG_INTEGER;if(s===uy)return n.RGBA_INTEGER;if(s===cf||s===ff||s===df||s===hf)if(l===at)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===cf)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ff)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===df)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===hf)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===cf)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ff)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===df)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===hf)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Sg||s===Mg||s===Eg||s===Tg)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Sg)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Mg)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Eg)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Tg)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===cy)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===wg||s===Ag)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===wg)return l===at?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ag)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Rg||s===Cg||s===bg||s===Pg||s===Lg||s===Dg||s===Ng||s===Ig||s===Ug||s===Og||s===Fg||s===kg||s===zg||s===Bg)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Rg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Cg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===bg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Pg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Lg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Dg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ng)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ig)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ug)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Og)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Fg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===kg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===zg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Bg)return l===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===pf||s===Vg||s===Hg)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===pf)return l===at?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Vg)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Hg)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ET||s===Gg||s===Wg||s===jg)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===pf)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Gg)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Wg)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===jg)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===gs?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class O2 extends On{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ci extends on{constructor(){super(),this.isGroup=!0,this.type="Group"}}const F2={type:"move"};class zf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ci,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ci,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ci,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),d=this._getHandJoint(u,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const c=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],h=c.position.distanceTo(f.position),p=.02,x=.005;u.inputState.pinching&&h>p+x?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=p-x&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(F2)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ci;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class k2 extends Vo{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,c=null,f=null,h=null,p=null,x=null;const g=t.getContextAttributes();let m=null,d=null;const _=[],v=[],y=new Oe;let T=null;const A=new On;A.layers.enable(1),A.viewport=new dt;const E=new On;E.layers.enable(2),E.viewport=new dt;const b=[A,E],S=new O2;S.layers.enable(1),S.layers.enable(2);let w=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let K=_[Y];return K===void 0&&(K=new zf,_[Y]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Y){let K=_[Y];return K===void 0&&(K=new zf,_[Y]=K),K.getGripSpace()},this.getHand=function(Y){let K=_[Y];return K===void 0&&(K=new zf,_[Y]=K),K.getHandSpace()};function k(Y){const K=v.indexOf(Y.inputSource);if(K===-1)return;const re=_[K];re!==void 0&&(re.update(Y.inputSource,Y.frame,u||o),re.dispatchEvent({type:Y.type,data:Y.inputSource}))}function $(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",L);for(let Y=0;Y<_.length;Y++){const K=v[Y];K!==null&&(v[Y]=null,_[Y].disconnect(K))}w=null,U=null,e.setRenderTarget(m),p=null,h=null,f=null,r=null,d=null,Q.stop(),i.isPresenting=!1,e.setPixelRatio(T),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(Y){u=Y},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(Y){if(r=Y,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",$),r.addEventListener("inputsourceschange",L),g.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:r.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Ts(p.framebufferWidth,p.framebufferHeight,{format:xi,type:Ir,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let K=null,re=null,pe=null;g.depth&&(pe=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=g.stencil?Oo:_s,re=g.stencil?gs:yr);const me={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(me),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),d=new Ts(h.textureWidth,h.textureHeight,{format:xi,type:Ir,depthTexture:new Ay(h.textureWidth,h.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const Pe=e.properties.get(d);Pe.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),Q.setContext(r),Q.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function L(Y){for(let K=0;K<Y.removed.length;K++){const re=Y.removed[K],pe=v.indexOf(re);pe>=0&&(v[pe]=null,_[pe].disconnect(re))}for(let K=0;K<Y.added.length;K++){const re=Y.added[K];let pe=v.indexOf(re);if(pe===-1){for(let Pe=0;Pe<_.length;Pe++)if(Pe>=v.length){v.push(re),pe=Pe;break}else if(v[Pe]===null){v[Pe]=re,pe=Pe;break}if(pe===-1)break}const me=_[pe];me&&me.connect(re)}}const O=new N,V=new N;function q(Y,K,re){O.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(re.matrixWorld);const pe=O.distanceTo(V),me=K.projectionMatrix.elements,Pe=re.projectionMatrix.elements,Le=me[14]/(me[10]-1),Te=me[14]/(me[10]+1),We=(me[9]+1)/me[5],G=(me[9]-1)/me[5],Ft=(me[8]-1)/me[0],Me=(Pe[8]+1)/Pe[0],Ce=Le*Ft,xe=Le*Me,le=pe/(-Ft+Me),ge=le*-Ft;K.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(ge),Y.translateZ(le),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const R=Le+le,M=Te+le,z=Ce-ge,J=xe+(pe-ge),ee=We*Te/M*R,te=G*Te/M*R;Y.projectionMatrix.makePerspective(z,J,ee,te,R,M),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function I(Y,K){K===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(K.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(r===null)return;S.near=E.near=A.near=Y.near,S.far=E.far=A.far=Y.far,(w!==S.near||U!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),w=S.near,U=S.far);const K=Y.parent,re=S.cameras;I(S,K);for(let pe=0;pe<re.length;pe++)I(re[pe],K);re.length===2?q(S,A,E):S.projectionMatrix.copy(A.projectionMatrix),B(Y,S,K)};function B(Y,K,re){re===null?Y.matrix.copy(K.matrixWorld):(Y.matrix.copy(re.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(K.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=rh*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)};let H=null;function Z(Y,K){if(c=K.getViewerPose(u||o),x=K,c!==null){const re=c.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let pe=!1;re.length!==S.cameras.length&&(S.cameras.length=0,pe=!0);for(let me=0;me<re.length;me++){const Pe=re[me];let Le=null;if(p!==null)Le=p.getViewport(Pe);else{const We=f.getViewSubImage(h,Pe);Le=We.viewport,me===0&&(e.setRenderTargetTextures(d,We.colorTexture,h.ignoreDepthValues?void 0:We.depthStencilTexture),e.setRenderTarget(d))}let Te=b[me];Te===void 0&&(Te=new On,Te.layers.enable(me),Te.viewport=new dt,b[me]=Te),Te.matrix.fromArray(Pe.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Pe.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Le.x,Le.y,Le.width,Le.height),me===0&&(S.matrix.copy(Te.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),pe===!0&&S.cameras.push(Te)}}for(let re=0;re<_.length;re++){const pe=v[re],me=_[re];pe!==null&&me!==void 0&&me.update(pe,K,u||o)}H&&H(Y,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),x=null}const Q=new wy;Q.setAnimationLoop(Z),this.setAnimationLoop=function(Y){H=Y},this.dispose=function(){}}}function z2(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,My(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,_,v,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),c(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(s(m,d),x(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),g(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,_,v):d.isSpriteMaterial?u(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Cn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Cn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const _=e.get(d).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const v=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*v,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,_,v){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=v*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Cn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){const _=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function B2(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,v){const y=v.program;i.uniformBlockBinding(_,y)}function u(_,v){let y=r[_.id];y===void 0&&(x(_),y=c(_),r[_.id]=y,_.addEventListener("dispose",m));const T=v.program;i.updateUBOMapping(_,T);const A=e.render.frame;s[_.id]!==A&&(h(_),s[_.id]=A)}function c(_){const v=f();_.__bindingPointIndex=v;const y=n.createBuffer(),T=_.__size,A=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,T,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,y),y}function f(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const v=r[_.id],y=_.uniforms,T=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let A=0,E=y.length;A<E;A++){const b=Array.isArray(y[A])?y[A]:[y[A]];for(let S=0,w=b.length;S<w;S++){const U=b[S];if(p(U,A,S,T)===!0){const k=U.__offset,$=Array.isArray(U.value)?U.value:[U.value];let L=0;for(let O=0;O<$.length;O++){const V=$[O],q=g(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,k+L,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,L),L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(_,v,y,T){const A=_.value,E=v+"_"+y;if(T[E]===void 0)return typeof A=="number"||typeof A=="boolean"?T[E]=A:T[E]=A.clone(),!0;{const b=T[E];if(typeof A=="number"||typeof A=="boolean"){if(b!==A)return T[E]=A,!0}else if(b.equals(A)===!1)return b.copy(A),!0}return!1}function x(_){const v=_.uniforms;let y=0;const T=16;for(let E=0,b=v.length;E<b;E++){const S=Array.isArray(v[E])?v[E]:[v[E]];for(let w=0,U=S.length;w<U;w++){const k=S[w],$=Array.isArray(k.value)?k.value:[k.value];for(let L=0,O=$.length;L<O;L++){const V=$[L],q=g(V),I=y%T;I!==0&&T-I<q.boundary&&(y+=T-I),k.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=q.storage}}}const A=y%T;return A>0&&(y+=T-A),_.__size=y,_.__cache={},this}function g(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){const v=_.target;v.removeEventListener("dispose",m);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function d(){for(const _ in r)n.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:u,dispose:d}}class Dy{constructor(e={}){const{canvas:t=UT(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),x=new Int32Array(4);let g=null,m=null;const d=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this._useLegacyLights=!1,this.toneMapping=Nr,this.toneMappingExposure=1;const v=this;let y=!1,T=0,A=0,E=null,b=-1,S=null;const w=new dt,U=new dt;let k=null;const $=new ze(0);let L=0,O=t.width,V=t.height,q=1,I=null,B=null;const H=new dt(0,0,O,V),Z=new dt(0,0,O,V);let Q=!1;const Y=new Tp;let K=!1,re=!1,pe=null;const me=new xt,Pe=new Oe,Le=new N,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function We(){return E===null?q:1}let G=i;function Ft(C,F){for(let j=0;j<C.length;j++){const X=C[j],W=t.getContext(X,F);if(W!==null)return W}return null}try{const C={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${yp}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",ue,!1),G===null){const F=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&F.shift(),G=Ft(F,C),G===null)throw Ft(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Me,Ce,xe,le,ge,R,M,z,J,ee,te,_e,ae,fe,Se,Ne,ne,Ze,je,De,Ee,ve,Fe,$e;function St(){Me=new KR(G),Ce=new GR(G,Me,e),Me.init(Ce),ve=new U2(G,Me,Ce),xe=new N2(G,Me,Ce),le=new JR(G),ge=new x2,R=new I2(G,Me,xe,ge,Ce,ve,le),M=new jR(v),z=new $R(v),J=new ow(G,Ce),Fe=new VR(G,Me,J,Ce),ee=new ZR(G,J,le,Fe),te=new iC(G,ee,J,le),je=new nC(G,Ce,R),Ne=new WR(ge),_e=new v2(v,M,z,Me,Ce,Fe,Ne),ae=new z2(v,ge),fe=new S2,Se=new R2(Me,Ce),Ze=new BR(v,M,z,xe,te,h,l),ne=new D2(v,te,Ce),$e=new B2(G,le,Ce,xe),De=new HR(G,Me,le,Ce),Ee=new QR(G,Me,le,Ce),le.programs=_e.programs,v.capabilities=Ce,v.extensions=Me,v.properties=ge,v.renderLists=fe,v.shadowMap=ne,v.state=xe,v.info=le}St();const Ve=new k2(v,G);this.xr=Ve,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const C=Me.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Me.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(C){C!==void 0&&(q=C,this.setSize(O,V,!1))},this.getSize=function(C){return C.set(O,V)},this.setSize=function(C,F,j=!0){if(Ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,V=F,t.width=Math.floor(C*q),t.height=Math.floor(F*q),j===!0&&(t.style.width=C+"px",t.style.height=F+"px"),this.setViewport(0,0,C,F)},this.getDrawingBufferSize=function(C){return C.set(O*q,V*q).floor()},this.setDrawingBufferSize=function(C,F,j){O=C,V=F,q=j,t.width=Math.floor(C*j),t.height=Math.floor(F*j),this.setViewport(0,0,C,F)},this.getCurrentViewport=function(C){return C.copy(w)},this.getViewport=function(C){return C.copy(H)},this.setViewport=function(C,F,j,X){C.isVector4?H.set(C.x,C.y,C.z,C.w):H.set(C,F,j,X),xe.viewport(w.copy(H).multiplyScalar(q).floor())},this.getScissor=function(C){return C.copy(Z)},this.setScissor=function(C,F,j,X){C.isVector4?Z.set(C.x,C.y,C.z,C.w):Z.set(C,F,j,X),xe.scissor(U.copy(Z).multiplyScalar(q).floor())},this.getScissorTest=function(){return Q},this.setScissorTest=function(C){xe.setScissorTest(Q=C)},this.setOpaqueSort=function(C){I=C},this.setTransparentSort=function(C){B=C},this.getClearColor=function(C){return C.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor.apply(Ze,arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha.apply(Ze,arguments)},this.clear=function(C=!0,F=!0,j=!0){let X=0;if(C){let W=!1;if(E!==null){const de=E.texture.format;W=de===uy||de===ly||de===ay}if(W){const de=E.texture.type,ye=de===Ir||de===yr||de===Sp||de===gs||de===sy||de===oy,Ae=Ze.getClearColor(),be=Ze.getClearAlpha(),Be=Ae.r,Ie=Ae.g,Ue=Ae.b;ye?(p[0]=Be,p[1]=Ie,p[2]=Ue,p[3]=be,G.clearBufferuiv(G.COLOR,0,p)):(x[0]=Be,x[1]=Ie,x[2]=Ue,x[3]=be,G.clearBufferiv(G.COLOR,0,x))}else X|=G.COLOR_BUFFER_BIT}F&&(X|=G.DEPTH_BUFFER_BIT),j&&(X|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),fe.dispose(),Se.dispose(),ge.dispose(),M.dispose(),z.dispose(),te.dispose(),Fe.dispose(),$e.dispose(),_e.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",ln),Ve.removeEventListener("sessionend",it),pe&&(pe.dispose(),pe=null),un.stop()};function se(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const C=le.autoReset,F=ne.enabled,j=ne.autoUpdate,X=ne.needsUpdate,W=ne.type;St(),le.autoReset=C,ne.enabled=F,ne.autoUpdate=j,ne.needsUpdate=X,ne.type=W}function ue(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ce(C){const F=C.target;F.removeEventListener("dispose",ce),Re(F)}function Re(C){we(C),ge.remove(C)}function we(C){const F=ge.get(C).programs;F!==void 0&&(F.forEach(function(j){_e.releaseProgram(j)}),C.isShaderMaterial&&_e.releaseShaderCache(C))}this.renderBufferDirect=function(C,F,j,X,W,de){F===null&&(F=Te);const ye=W.isMesh&&W.matrixWorld.determinant()<0,Ae=Fy(C,F,j,X,W);xe.setMaterial(X,ye);let be=j.index,Be=1;if(X.wireframe===!0){if(be=ee.getWireframeAttribute(j),be===void 0)return;Be=2}const Ie=j.drawRange,Ue=j.attributes.position;let wt=Ie.start*Be,Pn=(Ie.start+Ie.count)*Be;de!==null&&(wt=Math.max(wt,de.start*Be),Pn=Math.min(Pn,(de.start+de.count)*Be)),be!==null?(wt=Math.max(wt,0),Pn=Math.min(Pn,be.count)):Ue!=null&&(wt=Math.max(wt,0),Pn=Math.min(Pn,Ue.count));const zt=Pn-wt;if(zt<0||zt===1/0)return;Fe.setup(W,X,Ae,j,be);let Ui,ht=De;if(be!==null&&(Ui=J.get(be),ht=Ee,ht.setIndex(Ui)),W.isMesh)X.wireframe===!0?(xe.setLineWidth(X.wireframeLinewidth*We()),ht.setMode(G.LINES)):ht.setMode(G.TRIANGLES);else if(W.isLine){let He=X.linewidth;He===void 0&&(He=1),xe.setLineWidth(He*We()),W.isLineSegments?ht.setMode(G.LINES):W.isLineLoop?ht.setMode(G.LINE_LOOP):ht.setMode(G.LINE_STRIP)}else W.isPoints?ht.setMode(G.POINTS):W.isSprite&&ht.setMode(G.TRIANGLES);if(W.isBatchedMesh)ht.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else if(W.isInstancedMesh)ht.renderInstances(wt,zt,W.count);else if(j.isInstancedBufferGeometry){const He=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Tc=Math.min(j.instanceCount,He);ht.renderInstances(wt,zt,Tc)}else ht.render(wt,zt)};function tt(C,F,j){C.transparent===!0&&C.side===_i&&C.forceSinglePass===!1?(C.side=Cn,C.needsUpdate=!0,fl(C,F,j),C.side=Br,C.needsUpdate=!0,fl(C,F,j),C.side=_i):fl(C,F,j)}this.compile=function(C,F,j=null){j===null&&(j=C),m=Se.get(j),m.init(),_.push(m),j.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),C!==j&&C.traverseVisible(function(W){W.isLight&&W.layers.test(F.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),m.setupLights(v._useLegacyLights);const X=new Set;return C.traverse(function(W){const de=W.material;if(de)if(Array.isArray(de))for(let ye=0;ye<de.length;ye++){const Ae=de[ye];tt(Ae,j,W),X.add(Ae)}else tt(de,j,W),X.add(de)}),_.pop(),m=null,X},this.compileAsync=function(C,F,j=null){const X=this.compile(C,F,j);return new Promise(W=>{function de(){if(X.forEach(function(ye){ge.get(ye).currentProgram.isReady()&&X.delete(ye)}),X.size===0){W(C);return}setTimeout(de,10)}Me.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let nt=null;function kt(C){nt&&nt(C)}function ln(){un.stop()}function it(){un.start()}const un=new wy;un.setAnimationLoop(kt),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(C){nt=C,Ve.setAnimationLoop(C),C===null?un.stop():un.start()},Ve.addEventListener("sessionstart",ln),Ve.addEventListener("sessionend",it),this.render=function(C,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(F),F=Ve.getCamera()),C.isScene===!0&&C.onBeforeRender(v,C,F,E),m=Se.get(C,_.length),m.init(),_.push(m),me.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),Y.setFromProjectionMatrix(me),re=this.localClippingEnabled,K=Ne.init(this.clippingPlanes,re),g=fe.get(C,d.length),g.init(),d.push(g),Ei(C,F,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(I,B),this.info.render.frame++,K===!0&&Ne.beginShadows();const j=m.state.shadowsArray;if(ne.render(j,C,F),K===!0&&Ne.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ze.render(g,C),m.setupLights(v._useLegacyLights),F.isArrayCamera){const X=F.cameras;for(let W=0,de=X.length;W<de;W++){const ye=X[W];Op(g,C,ye,ye.viewport)}}else Op(g,C,F);E!==null&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),C.isScene===!0&&C.onAfterRender(v,C,F),Fe.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?m=_[_.length-1]:m=null,d.pop(),d.length>0?g=d[d.length-1]:g=null};function Ei(C,F,j,X){if(C.visible===!1)return;if(C.layers.test(F.layers)){if(C.isGroup)j=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(F);else if(C.isLight)m.pushLight(C),C.castShadow&&m.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){X&&Le.setFromMatrixPosition(C.matrixWorld).applyMatrix4(me);const ye=te.update(C),Ae=C.material;Ae.visible&&g.push(C,ye,Ae,j,Le.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){const ye=te.update(C),Ae=C.material;if(X&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Le.copy(C.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Le.copy(ye.boundingSphere.center)),Le.applyMatrix4(C.matrixWorld).applyMatrix4(me)),Array.isArray(Ae)){const be=ye.groups;for(let Be=0,Ie=be.length;Be<Ie;Be++){const Ue=be[Be],wt=Ae[Ue.materialIndex];wt&&wt.visible&&g.push(C,ye,wt,j,Le.z,Ue)}}else Ae.visible&&g.push(C,ye,Ae,j,Le.z,null)}}const de=C.children;for(let ye=0,Ae=de.length;ye<Ae;ye++)Ei(de[ye],F,j,X)}function Op(C,F,j,X){const W=C.opaque,de=C.transmissive,ye=C.transparent;m.setupLightsView(j),K===!0&&Ne.setGlobalState(v.clippingPlanes,j),de.length>0&&Oy(W,de,F,j),X&&xe.viewport(w.copy(X)),W.length>0&&cl(W,F,j),de.length>0&&cl(de,F,j),ye.length>0&&cl(ye,F,j),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Oy(C,F,j,X){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;const de=Ce.isWebGL2;pe===null&&(pe=new Ts(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?Ja:Ir,minFilter:Qa,samples:de?4:0})),v.getDrawingBufferSize(Pe),de?pe.setSize(Pe.x,Pe.y):pe.setSize(sh(Pe.x),sh(Pe.y));const ye=v.getRenderTarget();v.setRenderTarget(pe),v.getClearColor($),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const Ae=v.toneMapping;v.toneMapping=Nr,cl(C,j,X),R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe);let be=!1;for(let Be=0,Ie=F.length;Be<Ie;Be++){const Ue=F[Be],wt=Ue.object,Pn=Ue.geometry,zt=Ue.material,Ui=Ue.group;if(zt.side===_i&&wt.layers.test(X.layers)){const ht=zt.side;zt.side=Cn,zt.needsUpdate=!0,Fp(wt,j,X,Pn,zt,Ui),zt.side=ht,zt.needsUpdate=!0,be=!0}}be===!0&&(R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe)),v.setRenderTarget(ye),v.setClearColor($,L),v.toneMapping=Ae}function cl(C,F,j){const X=F.isScene===!0?F.overrideMaterial:null;for(let W=0,de=C.length;W<de;W++){const ye=C[W],Ae=ye.object,be=ye.geometry,Be=X===null?ye.material:X,Ie=ye.group;Ae.layers.test(j.layers)&&Fp(Ae,F,j,be,Be,Ie)}}function Fp(C,F,j,X,W,de){C.onBeforeRender(v,F,j,X,W,de),C.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),W.onBeforeRender(v,F,j,X,C,de),W.transparent===!0&&W.side===_i&&W.forceSinglePass===!1?(W.side=Cn,W.needsUpdate=!0,v.renderBufferDirect(j,F,X,W,C,de),W.side=Br,W.needsUpdate=!0,v.renderBufferDirect(j,F,X,W,C,de),W.side=_i):v.renderBufferDirect(j,F,X,W,C,de),C.onAfterRender(v,F,j,X,W,de)}function fl(C,F,j){F.isScene!==!0&&(F=Te);const X=ge.get(C),W=m.state.lights,de=m.state.shadowsArray,ye=W.state.version,Ae=_e.getParameters(C,W.state,de,F,j),be=_e.getProgramCacheKey(Ae);let Be=X.programs;X.environment=C.isMeshStandardMaterial?F.environment:null,X.fog=F.fog,X.envMap=(C.isMeshStandardMaterial?z:M).get(C.envMap||X.environment),Be===void 0&&(C.addEventListener("dispose",ce),Be=new Map,X.programs=Be);let Ie=Be.get(be);if(Ie!==void 0){if(X.currentProgram===Ie&&X.lightsStateVersion===ye)return zp(C,Ae),Ie}else Ae.uniforms=_e.getUniforms(C),C.onBuild(j,Ae,v),C.onBeforeCompile(Ae,v),Ie=_e.acquireProgram(Ae,be),Be.set(be,Ie),X.uniforms=Ae.uniforms;const Ue=X.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Ue.clippingPlanes=Ne.uniform),zp(C,Ae),X.needsLights=zy(C),X.lightsStateVersion=ye,X.needsLights&&(Ue.ambientLightColor.value=W.state.ambient,Ue.lightProbe.value=W.state.probe,Ue.directionalLights.value=W.state.directional,Ue.directionalLightShadows.value=W.state.directionalShadow,Ue.spotLights.value=W.state.spot,Ue.spotLightShadows.value=W.state.spotShadow,Ue.rectAreaLights.value=W.state.rectArea,Ue.ltc_1.value=W.state.rectAreaLTC1,Ue.ltc_2.value=W.state.rectAreaLTC2,Ue.pointLights.value=W.state.point,Ue.pointLightShadows.value=W.state.pointShadow,Ue.hemisphereLights.value=W.state.hemi,Ue.directionalShadowMap.value=W.state.directionalShadowMap,Ue.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ue.spotShadowMap.value=W.state.spotShadowMap,Ue.spotLightMatrix.value=W.state.spotLightMatrix,Ue.spotLightMap.value=W.state.spotLightMap,Ue.pointShadowMap.value=W.state.pointShadowMap,Ue.pointShadowMatrix.value=W.state.pointShadowMatrix),X.currentProgram=Ie,X.uniformsList=null,Ie}function kp(C){if(C.uniformsList===null){const F=C.currentProgram.getUniforms();C.uniformsList=gu.seqWithValue(F.seq,C.uniforms)}return C.uniformsList}function zp(C,F){const j=ge.get(C);j.outputColorSpace=F.outputColorSpace,j.batching=F.batching,j.instancing=F.instancing,j.instancingColor=F.instancingColor,j.skinning=F.skinning,j.morphTargets=F.morphTargets,j.morphNormals=F.morphNormals,j.morphColors=F.morphColors,j.morphTargetsCount=F.morphTargetsCount,j.numClippingPlanes=F.numClippingPlanes,j.numIntersection=F.numClipIntersection,j.vertexAlphas=F.vertexAlphas,j.vertexTangents=F.vertexTangents,j.toneMapping=F.toneMapping}function Fy(C,F,j,X,W){F.isScene!==!0&&(F=Te),R.resetTextureUnits();const de=F.fog,ye=X.isMeshStandardMaterial?F.environment:null,Ae=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ir,be=(X.isMeshStandardMaterial?z:M).get(X.envMap||ye),Be=X.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ie=!!j.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ue=!!j.morphAttributes.position,wt=!!j.morphAttributes.normal,Pn=!!j.morphAttributes.color;let zt=Nr;X.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(zt=v.toneMapping);const Ui=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ht=Ui!==void 0?Ui.length:0,He=ge.get(X),Tc=m.state.lights;if(K===!0&&(re===!0||C!==S)){const $n=C===S&&X.id===b;Ne.setState(X,C,$n)}let Mt=!1;X.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Tc.state.version||He.outputColorSpace!==Ae||W.isBatchedMesh&&He.batching===!1||!W.isBatchedMesh&&He.batching===!0||W.isInstancedMesh&&He.instancing===!1||!W.isInstancedMesh&&He.instancing===!0||W.isSkinnedMesh&&He.skinning===!1||!W.isSkinnedMesh&&He.skinning===!0||W.isInstancedMesh&&He.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&He.instancingColor===!1&&W.instanceColor!==null||He.envMap!==be||X.fog===!0&&He.fog!==de||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==Ne.numPlanes||He.numIntersection!==Ne.numIntersection)||He.vertexAlphas!==Be||He.vertexTangents!==Ie||He.morphTargets!==Ue||He.morphNormals!==wt||He.morphColors!==Pn||He.toneMapping!==zt||Ce.isWebGL2===!0&&He.morphTargetsCount!==ht)&&(Mt=!0):(Mt=!0,He.__version=X.version);let jr=He.currentProgram;Mt===!0&&(jr=fl(X,F,W));let Bp=!1,jo=!1,wc=!1;const Zt=jr.getUniforms(),Xr=He.uniforms;if(xe.useProgram(jr.program)&&(Bp=!0,jo=!0,wc=!0),X.id!==b&&(b=X.id,jo=!0),Bp||S!==C){Zt.setValue(G,"projectionMatrix",C.projectionMatrix),Zt.setValue(G,"viewMatrix",C.matrixWorldInverse);const $n=Zt.map.cameraPosition;$n!==void 0&&$n.setValue(G,Le.setFromMatrixPosition(C.matrixWorld)),Ce.logarithmicDepthBuffer&&Zt.setValue(G,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Zt.setValue(G,"isOrthographic",C.isOrthographicCamera===!0),S!==C&&(S=C,jo=!0,wc=!0)}if(W.isSkinnedMesh){Zt.setOptional(G,W,"bindMatrix"),Zt.setOptional(G,W,"bindMatrixInverse");const $n=W.skeleton;$n&&(Ce.floatVertexTextures?($n.boneTexture===null&&$n.computeBoneTexture(),Zt.setValue(G,"boneTexture",$n.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}W.isBatchedMesh&&(Zt.setOptional(G,W,"batchingTexture"),Zt.setValue(G,"batchingTexture",W._matricesTexture,R));const Ac=j.morphAttributes;if((Ac.position!==void 0||Ac.normal!==void 0||Ac.color!==void 0&&Ce.isWebGL2===!0)&&je.update(W,j,jr),(jo||He.receiveShadow!==W.receiveShadow)&&(He.receiveShadow=W.receiveShadow,Zt.setValue(G,"receiveShadow",W.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Xr.envMap.value=be,Xr.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),jo&&(Zt.setValue(G,"toneMappingExposure",v.toneMappingExposure),He.needsLights&&ky(Xr,wc),de&&X.fog===!0&&ae.refreshFogUniforms(Xr,de),ae.refreshMaterialUniforms(Xr,X,q,V,pe),gu.upload(G,kp(He),Xr,R)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(gu.upload(G,kp(He),Xr,R),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Zt.setValue(G,"center",W.center),Zt.setValue(G,"modelViewMatrix",W.modelViewMatrix),Zt.setValue(G,"normalMatrix",W.normalMatrix),Zt.setValue(G,"modelMatrix",W.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const $n=X.uniformsGroups;for(let Rc=0,By=$n.length;Rc<By;Rc++)if(Ce.isWebGL2){const Vp=$n[Rc];$e.update(Vp,jr),$e.bind(Vp,jr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return jr}function ky(C,F){C.ambientLightColor.needsUpdate=F,C.lightProbe.needsUpdate=F,C.directionalLights.needsUpdate=F,C.directionalLightShadows.needsUpdate=F,C.pointLights.needsUpdate=F,C.pointLightShadows.needsUpdate=F,C.spotLights.needsUpdate=F,C.spotLightShadows.needsUpdate=F,C.rectAreaLights.needsUpdate=F,C.hemisphereLights.needsUpdate=F}function zy(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(C,F,j){ge.get(C.texture).__webglTexture=F,ge.get(C.depthTexture).__webglTexture=j;const X=ge.get(C);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=j===void 0,X.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,F){const j=ge.get(C);j.__webglFramebuffer=F,j.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(C,F=0,j=0){E=C,T=F,A=j;let X=!0,W=null,de=!1,ye=!1;if(C){const be=ge.get(C);be.__useDefaultFramebuffer!==void 0?(xe.bindFramebuffer(G.FRAMEBUFFER,null),X=!1):be.__webglFramebuffer===void 0?R.setupRenderTarget(C):be.__hasExternalTextures&&R.rebindTextures(C,ge.get(C.texture).__webglTexture,ge.get(C.depthTexture).__webglTexture);const Be=C.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ye=!0);const Ie=ge.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ie[F])?W=Ie[F][j]:W=Ie[F],de=!0):Ce.isWebGL2&&C.samples>0&&R.useMultisampledRTT(C)===!1?W=ge.get(C).__webglMultisampledFramebuffer:Array.isArray(Ie)?W=Ie[j]:W=Ie,w.copy(C.viewport),U.copy(C.scissor),k=C.scissorTest}else w.copy(H).multiplyScalar(q).floor(),U.copy(Z).multiplyScalar(q).floor(),k=Q;if(xe.bindFramebuffer(G.FRAMEBUFFER,W)&&Ce.drawBuffers&&X&&xe.drawBuffers(C,W),xe.viewport(w),xe.scissor(U),xe.setScissorTest(k),de){const be=ge.get(C.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+F,be.__webglTexture,j)}else if(ye){const be=ge.get(C.texture),Be=F||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,be.__webglTexture,j||0,Be)}b=-1},this.readRenderTargetPixels=function(C,F,j,X,W,de,ye){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=ge.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){xe.bindFramebuffer(G.FRAMEBUFFER,Ae);try{const be=C.texture,Be=be.format,Ie=be.type;if(Be!==xi&&ve.convert(Be)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=Ie===Ja&&(Me.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Ie!==Ir&&ve.convert(Ie)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ie===Sr&&(Ce.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=C.width-X&&j>=0&&j<=C.height-W&&G.readPixels(F,j,X,W,ve.convert(Be),ve.convert(Ie),de)}finally{const be=E!==null?ge.get(E).__webglFramebuffer:null;xe.bindFramebuffer(G.FRAMEBUFFER,be)}}},this.copyFramebufferToTexture=function(C,F,j=0){const X=Math.pow(2,-j),W=Math.floor(F.image.width*X),de=Math.floor(F.image.height*X);R.setTexture2D(F,0),G.copyTexSubImage2D(G.TEXTURE_2D,j,0,0,C.x,C.y,W,de),xe.unbindTexture()},this.copyTextureToTexture=function(C,F,j,X=0){const W=F.image.width,de=F.image.height,ye=ve.convert(j.format),Ae=ve.convert(j.type);R.setTexture2D(j,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,j.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,j.unpackAlignment),F.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,X,C.x,C.y,W,de,ye,Ae,F.image.data):F.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,X,C.x,C.y,F.mipmaps[0].width,F.mipmaps[0].height,ye,F.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,X,C.x,C.y,ye,Ae,F.image),X===0&&j.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),xe.unbindTexture()},this.copyTextureToTexture3D=function(C,F,j,X,W=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=C.max.x-C.min.x+1,ye=C.max.y-C.min.y+1,Ae=C.max.z-C.min.z+1,be=ve.convert(X.format),Be=ve.convert(X.type);let Ie;if(X.isData3DTexture)R.setTexture3D(X,0),Ie=G.TEXTURE_3D;else if(X.isDataArrayTexture||X.isCompressedArrayTexture)R.setTexture2DArray(X,0),Ie=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,X.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,X.unpackAlignment);const Ue=G.getParameter(G.UNPACK_ROW_LENGTH),wt=G.getParameter(G.UNPACK_IMAGE_HEIGHT),Pn=G.getParameter(G.UNPACK_SKIP_PIXELS),zt=G.getParameter(G.UNPACK_SKIP_ROWS),Ui=G.getParameter(G.UNPACK_SKIP_IMAGES),ht=j.isCompressedTexture?j.mipmaps[W]:j.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,ht.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ht.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,C.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,C.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,C.min.z),j.isDataTexture||j.isData3DTexture?G.texSubImage3D(Ie,W,F.x,F.y,F.z,de,ye,Ae,be,Be,ht.data):j.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(Ie,W,F.x,F.y,F.z,de,ye,Ae,be,ht.data)):G.texSubImage3D(Ie,W,F.x,F.y,F.z,de,ye,Ae,be,Be,ht),G.pixelStorei(G.UNPACK_ROW_LENGTH,Ue),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,wt),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Pn),G.pixelStorei(G.UNPACK_SKIP_ROWS,zt),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Ui),W===0&&X.generateMipmaps&&G.generateMipmap(Ie),xe.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?R.setTextureCube(C,0):C.isData3DTexture?R.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?R.setTexture2DArray(C,0):R.setTexture2D(C,0),xe.unbindTexture()},this.resetState=function(){T=0,A=0,E=null,xe.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Mp?"display-p3":"srgb",t.unpackColorSpace=Qe.workingColorSpace===Sc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===jt?vs:fy}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===vs?jt:ir}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class V2 extends Dy{}V2.prototype.isWebGL1Renderer=!0;class Rp{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ze(e),this.density=t}clone(){return new Rp(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class H2 extends on{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class _u extends bs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const I_=new N,U_=new N,O_=new xt,Bf=new Ep,Ql=new ul;class Ny extends on{constructor(e=new Kt,t=new _u){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)I_.fromBufferAttribute(t,r-1),U_.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=I_.distanceTo(U_);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ql.copy(i.boundingSphere),Ql.applyMatrix4(r),Ql.radius+=s,e.ray.intersectsSphere(Ql)===!1)return;O_.copy(r).invert(),Bf.copy(e.ray).applyMatrix4(O_);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=new N,c=new N,f=new N,h=new N,p=this.isLineSegments?2:1,x=i.index,m=i.attributes.position;if(x!==null){const d=Math.max(0,o.start),_=Math.min(x.count,o.start+o.count);for(let v=d,y=_-1;v<y;v+=p){const T=x.getX(v),A=x.getX(v+1);if(u.fromBufferAttribute(m,T),c.fromBufferAttribute(m,A),Bf.distanceSqToSegment(u,c,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(h);b<e.near||b>e.far||t.push({distance:b,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const d=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let v=d,y=_-1;v<y;v+=p){if(u.fromBufferAttribute(m,v),c.fromBufferAttribute(m,v+1),Bf.distanceSqToSegment(u,c,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const A=e.ray.origin.distanceTo(h);A<e.near||A>e.far||t.push({distance:A,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const F_=new N,k_=new N;class G2 extends Ny{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)F_.fromBufferAttribute(t,r),k_.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+F_.distanceTo(k_);e.setAttribute("lineDistance",new ut(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Iy extends bs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const z_=new xt,ah=new Ep,Jl=new ul,eu=new N;class W2 extends on{constructor(e=new Kt,t=new Iy){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jl.copy(i.boundingSphere),Jl.applyMatrix4(r),Jl.radius+=s,e.ray.intersectsSphere(Jl)===!1)return;z_.copy(r).invert(),ah.copy(e.ray).applyMatrix4(z_);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=i.index,f=i.attributes.position;if(u!==null){const h=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let x=h,g=p;x<g;x++){const m=u.getX(x);eu.fromBufferAttribute(f,m),B_(eu,m,l,r,e,t,this)}}else{const h=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let x=h,g=p;x<g;x++)eu.fromBufferAttribute(f,x),B_(eu,x,l,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function B_(n,e,t,i,r,s,o){const a=ah.distanceSqToPoint(n);if(a<t){const l=new N;ah.closestPointToPoint(n,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class j2{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let r=0;const s=i.length;let o;t?o=t:o=e*i[s-1];let a=0,l=s-1,u;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),u=i[r]-o,u<0)a=r+1;else if(u>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const c=i[r],h=i[r+1]-c,p=(o-c)/h;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new Oe:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new N,r=[],s=[],o=[],a=new N,l=new xt;for(let p=0;p<=e;p++){const x=p/e;r[p]=this.getTangentAt(x,new N)}s[0]=new N,o[0]=new N;let u=Number.MAX_VALUE;const c=Math.abs(r[0].x),f=Math.abs(r[0].y),h=Math.abs(r[0].z);c<=u&&(u=c,i.set(1,0,0)),f<=u&&(u=f,i.set(0,1,0)),h<=u&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const x=Math.acos(Xt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,x))}o[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Xt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let x=1;x<=e;x++)s[x].applyMatrix4(l.makeRotationAxis(r[x],p*x)),o[x].crossVectors(r[x],s[x])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class X2 extends j2{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t){const i=t||new Oe,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),u=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),f=Math.sin(this.aRotation),h=l-this.aX,p=u-this.aY;l=h*c-p*f+this.aX,u=h*f+p*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Cp extends Kt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],u=new N,c=new Oe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,h=3;f<=t;f++,h+=3){const p=i+f/t*r;u.x=e*Math.cos(p),u.y=e*Math.sin(p),o.push(u.x,u.y,u.z),a.push(0,0,1),c.x=(o[h]/e+1)/2,c.y=(o[h+1]/e+1)/2,l.push(c.x,c.y)}for(let f=1;f<=t;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new ut(o,3)),this.setAttribute("normal",new ut(a,3)),this.setAttribute("uv",new ut(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cp(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class bp extends Kt{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const u=this;r=Math.floor(r),s=Math.floor(s);const c=[],f=[],h=[],p=[];let x=0;const g=[],m=i/2;let d=0;_(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(c),this.setAttribute("position",new ut(f,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(p,2));function _(){const y=new N,T=new N;let A=0;const E=(t-e)/i;for(let b=0;b<=s;b++){const S=[],w=b/s,U=w*(t-e)+e;for(let k=0;k<=r;k++){const $=k/r,L=$*l+a,O=Math.sin(L),V=Math.cos(L);T.x=U*O,T.y=-w*i+m,T.z=U*V,f.push(T.x,T.y,T.z),y.set(O,E,V).normalize(),h.push(y.x,y.y,y.z),p.push($,1-w),S.push(x++)}g.push(S)}for(let b=0;b<r;b++)for(let S=0;S<s;S++){const w=g[S][b],U=g[S+1][b],k=g[S+1][b+1],$=g[S][b+1];c.push(w,U,$),c.push(U,k,$),A+=6}u.addGroup(d,A,0),d+=A}function v(y){const T=x,A=new Oe,E=new N;let b=0;const S=y===!0?e:t,w=y===!0?1:-1;for(let k=1;k<=r;k++)f.push(0,m*w,0),h.push(0,w,0),p.push(.5,.5),x++;const U=x;for(let k=0;k<=r;k++){const L=k/r*l+a,O=Math.cos(L),V=Math.sin(L);E.x=S*V,E.y=m*w,E.z=S*O,f.push(E.x,E.y,E.z),h.push(0,w,0),A.x=O*.5+.5,A.y=V*.5*w+.5,p.push(A.x,A.y),x++}for(let k=0;k<r;k++){const $=T+k,L=U+k;y===!0?c.push(L,L+1,$):c.push(L+1,L,$),b+=3}u.addGroup(d,b,y===!0?1:2),d+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bp(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wo extends Kt{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),u(i),c(),this.setAttribute("position",new ut(s,3)),this.setAttribute("normal",new ut(s.slice(),3)),this.setAttribute("uv",new ut(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const v=new N,y=new N,T=new N;for(let A=0;A<t.length;A+=3)p(t[A+0],v),p(t[A+1],y),p(t[A+2],T),l(v,y,T,_)}function l(_,v,y,T){const A=T+1,E=[];for(let b=0;b<=A;b++){E[b]=[];const S=_.clone().lerp(y,b/A),w=v.clone().lerp(y,b/A),U=A-b;for(let k=0;k<=U;k++)k===0&&b===A?E[b][k]=S:E[b][k]=S.clone().lerp(w,k/U)}for(let b=0;b<A;b++)for(let S=0;S<2*(A-b)-1;S++){const w=Math.floor(S/2);S%2===0?(h(E[b][w+1]),h(E[b+1][w]),h(E[b][w])):(h(E[b][w+1]),h(E[b+1][w+1]),h(E[b+1][w]))}}function u(_){const v=new N;for(let y=0;y<s.length;y+=3)v.x=s[y+0],v.y=s[y+1],v.z=s[y+2],v.normalize().multiplyScalar(_),s[y+0]=v.x,s[y+1]=v.y,s[y+2]=v.z}function c(){const _=new N;for(let v=0;v<s.length;v+=3){_.x=s[v+0],_.y=s[v+1],_.z=s[v+2];const y=m(_)/2/Math.PI+.5,T=d(_)/Math.PI+.5;o.push(y,1-T)}x(),f()}function f(){for(let _=0;_<o.length;_+=6){const v=o[_+0],y=o[_+2],T=o[_+4],A=Math.max(v,y,T),E=Math.min(v,y,T);A>.9&&E<.1&&(v<.2&&(o[_+0]+=1),y<.2&&(o[_+2]+=1),T<.2&&(o[_+4]+=1))}}function h(_){s.push(_.x,_.y,_.z)}function p(_,v){const y=_*3;v.x=e[y+0],v.y=e[y+1],v.z=e[y+2]}function x(){const _=new N,v=new N,y=new N,T=new N,A=new Oe,E=new Oe,b=new Oe;for(let S=0,w=0;S<s.length;S+=9,w+=6){_.set(s[S+0],s[S+1],s[S+2]),v.set(s[S+3],s[S+4],s[S+5]),y.set(s[S+6],s[S+7],s[S+8]),A.set(o[w+0],o[w+1]),E.set(o[w+2],o[w+3]),b.set(o[w+4],o[w+5]),T.copy(_).add(v).add(y).divideScalar(3);const U=m(T);g(A,w+0,_,U),g(E,w+2,v,U),g(b,w+4,y,U)}}function g(_,v,y,T){T<0&&_.x===1&&(o[v]=_.x-1),y.x===0&&y.z===0&&(o[v]=T/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wo(e.vertices,e.indices,e.radius,e.details)}}class Pp extends Wo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Pp(e.radius,e.detail)}}class Lp extends Wo{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lp(e.radius,e.detail)}}class Dp extends Wo{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],r=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,r,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Dp(e.radius,e.detail)}}class Np extends Kt{constructor(e=.5,t=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],u=[],c=[];let f=e;const h=(t-e)/r,p=new N,x=new Oe;for(let g=0;g<=r;g++){for(let m=0;m<=i;m++){const d=s+m/i*o;p.x=f*Math.cos(d),p.y=f*Math.sin(d),l.push(p.x,p.y,p.z),u.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,c.push(x.x,x.y)}f+=h}for(let g=0;g<r;g++){const m=g*(i+1);for(let d=0;d<i;d++){const _=d+m,v=_,y=_+i+1,T=_+i+2,A=_+1;a.push(v,y,A),a.push(y,T,A)}}this.setIndex(a),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Np(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ip extends Kt{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let u=0;const c=[],f=new N,h=new N,p=[],x=[],g=[],m=[];for(let d=0;d<=i;d++){const _=[],v=d/i;let y=0;d===0&&o===0?y=.5/t:d===i&&l===Math.PI&&(y=-.5/t);for(let T=0;T<=t;T++){const A=T/t;f.x=-e*Math.cos(r+A*s)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(r+A*s)*Math.sin(o+v*a),x.push(f.x,f.y,f.z),h.copy(f).normalize(),g.push(h.x,h.y,h.z),m.push(A+y,1-v),_.push(u++)}c.push(_)}for(let d=0;d<i;d++)for(let _=0;_<t;_++){const v=c[d][_+1],y=c[d][_],T=c[d+1][_],A=c[d+1][_+1];(d!==0||o>0)&&p.push(v,y,A),(d!==i-1||l<Math.PI)&&p.push(y,T,A)}this.setIndex(p),this.setAttribute("position",new ut(x,3)),this.setAttribute("normal",new ut(g,3)),this.setAttribute("uv",new ut(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ip(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Up extends Wo{constructor(e=1,t=0){const i=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],r=[2,1,0,0,3,2,1,3,0,2,3,1];super(i,r,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Up(e.radius,e.detail)}}class Y2 extends Kt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){const t=[],i=new Set,r=new N,s=new N;if(e.index!==null){const o=e.attributes.position,a=e.index;let l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let u=0,c=l.length;u<c;++u){const f=l[u],h=f.start,p=f.count;for(let x=h,g=h+p;x<g;x+=3)for(let m=0;m<3;m++){const d=a.getX(x+m),_=a.getX(x+(m+1)%3);r.fromBufferAttribute(o,d),s.fromBufferAttribute(o,_),V_(r,s,i)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}}else{const o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let u=0;u<3;u++){const c=3*a+u,f=3*a+(u+1)%3;r.fromBufferAttribute(o,c),s.fromBufferAttribute(o,f),V_(r,s,i)===!0&&(t.push(r.x,r.y,r.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new ut(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}function V_(n,e,t){const i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,r=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(r)===!0?!1:(t.add(i),t.add(r),!0)}class q2 extends bs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dy,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $2 extends q2{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Xt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Uy extends on{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Vf=new xt,H_=new N,G_=new N;class K2{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tp,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;H_.setFromMatrixPosition(e.matrixWorld),t.position.copy(H_),G_.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(G_),t.updateMatrixWorld(),Vf.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vf),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const W_=new xt,aa=new N,Hf=new N;class Z2 extends K2{constructor(){super(new On(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Oe(4,2),this._viewportCount=6,this._viewports=[new dt(2,1,1,1),new dt(0,1,1,1),new dt(3,1,1,1),new dt(1,1,1,1),new dt(3,0,1,1),new dt(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),aa.setFromMatrixPosition(e.matrixWorld),i.position.copy(aa),Hf.copy(i.position),Hf.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Hf),i.updateMatrixWorld(),r.makeTranslation(-aa.x,-aa.y,-aa.z),W_.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(W_)}}class Gf extends Uy{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new Z2}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Q2 extends Uy{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class J2{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=j_(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=j_();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function j_(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:yp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=yp);const eb=({reducedMotion:n=!1,highQuality:e=!0})=>{const t=rt.useRef(null);return rt.useEffect(()=>{if(!t.current)return;const i=t.current,r=new H2;r.fog=new Rp(132622,.015);const s=new On(50,window.innerWidth/window.innerHeight,.1,1e3);s.position.set(0,0,32);const o=new Dy({antialias:e,alpha:!0,powerPreference:"high-performance"});o.setSize(window.innerWidth,window.innerHeight),o.setPixelRatio(Math.min(window.devicePixelRatio,e?2:1)),o.toneMapping=ny,o.toneMappingExposure=1.25,i.appendChild(o.domElement);const a=new Q2(398632,1.5);r.add(a);const l=new Gf(57855,4,45,1.2);l.position.set(0,-9,4),r.add(l);const u=new Gf(16742144,2.5,50,1.5);u.position.set(16,4,10),r.add(u);const c=new Gf(16733440,2,50,1.5);c.position.set(-16,-2,10),r.add(c);const f=new Ci;f.position.set(0,-9.5,0),f.rotation.x=Math.PI*.38,r.add(f);const h=[],p=[{rIn:1.8,rOut:2.1,color:61695,opacity:.9,speed:.008},{rIn:3.2,rOut:3.5,color:46335,opacity:.7,speed:-.006},{rIn:5,rOut:5.3,color:58879,opacity:.8,speed:.004},{rIn:7.2,rOut:7.5,color:16755200,opacity:.85,speed:-.003},{rIn:9.6,rOut:10,color:43775,opacity:.6,speed:.002},{rIn:12,rOut:12.4,color:35020,opacity:.45,speed:-.0015}];p.forEach(le=>{const ge=new Np(le.rIn,le.rOut,96),R=new Wi({color:le.color,transparent:!0,opacity:le.opacity,side:_i,blending:Nn}),M=new hn(ge,R);f.add(M),h.push(M)});const x=new Cp(2.2,48),g=new Wi({color:63487,transparent:!0,opacity:.85,blending:Nn}),m=new hn(x,g);f.add(m);const d=48,_=new Ho(.12,.8,.02),v=new Wi({color:57855,transparent:!0,opacity:.75,blending:Nn}),y=new Wi({color:16750848,transparent:!0,opacity:.85,blending:Nn}),T=new Ci;for(let le=0;le<d;le++){const ge=le/d*Math.PI*2,R=le%8===0,M=new hn(_,R?y:v),z=7.35;M.position.set(Math.cos(ge)*z,Math.sin(ge)*z,.02),M.rotation.z=ge+Math.PI/2,T.add(M)}f.add(T);const A=new Ci;r.add(A);const E=[];[{xR:26,yR:11,tiltX:1.1,tiltY:.25,tiltZ:.15,color:61695,speed:8e-4,pulseSpeed:.003},{xR:24,yR:10,tiltX:1.15,tiltY:-.2,tiltZ:-.1,color:16746496,speed:-6e-4,pulseSpeed:.004},{xR:30,yR:13,tiltX:1.05,tiltY:.1,tiltZ:.35,color:51455,speed:5e-4,pulseSpeed:.0025},{xR:28,yR:12,tiltX:1.25,tiltY:-.3,tiltZ:-.25,color:58879,speed:-7e-4,pulseSpeed:.0035}].forEach((le,ge)=>{const R=new Ci;R.rotation.set(le.tiltX,le.tiltY,le.tiltZ),A.add(R);const M=new X2(0,0,le.xR,le.yR,0,2*Math.PI,!1,0),z=M.getPoints(160),J=new Kt().setFromPoints(z),ee=new _u({color:le.color,transparent:!0,opacity:ge===1?.45:.6,blending:Nn}),te=new Ny(J,ee);R.add(te);const _e=new Ip(.24,12,12),ae=new Wi({color:65535,blending:Nn}),fe=new Wi({color:16755200,blending:Nn}),Se=new hn(_e,le.color===16746496?fe:ae),Ne=new hn(_e,fe);R.add(Se),R.add(Ne),E.push({curve:M,line:te,pulse1:Se,pulse2:Ne,speed:le.speed,pulseSpeed:le.pulseSpeed,pulseProgress1:ge*.25%1,pulseProgress2:(ge*.25+.5)%1,color:le.color})});const S=new Ci;r.add(S);const w=[],U=e?24:14,k=[new Dp(1.2,0),new Up(1.4,0),new Lp(1,0),new Pp(.9,0)],$=new $2({color:265238,roughness:.15,metalness:.85,transmission:.7,transparent:!0,opacity:.75,reflectivity:.9,clearcoat:1,clearcoatRoughness:.1}),L=new _u({color:61695,transparent:!0,opacity:.8,blending:Nn}),O=new _u({color:16750848,transparent:!0,opacity:.85,blending:Nn});for(let le=0;le<U;le++){const ge=k[le%k.length],R=new hn(ge,$.clone()),M=new Y2(ge),z=le%4===0,J=new G2(M,z?O:L);R.add(J);const ee=le/U*Math.PI*2,te=13+Math.random()*12,_e=Math.cos(ee)*te+(Math.random()-.5)*4,ae=(Math.random()-.5)*16,fe=-6+Math.random()*16;R.position.set(_e,ae,fe);const Se=.5+Math.random()*.8;R.scale.set(Se,Se,Se),S.add(R),w.push({mesh:R,wireMesh:J,rotSpeed:new N((Math.random()-.5)*.015,(Math.random()-.5)*.02,(Math.random()-.5)*.015),driftSpeed:new N((Math.random()-.5)*.005,(Math.random()-.5)*.008,(Math.random()-.5)*.005),initialPos:new N(_e,ae,fe)})}const V=e?600:250,q=new Kt,I=new Float32Array(V*3),B=new Float32Array(V*3),H=new ze(61695),Z=new ze(16746496),Q=new ze(30668);for(let le=0;le<V;le++){I[le*3]=(Math.random()-.5)*60,I[le*3+1]=(Math.random()-.5)*40,I[le*3+2]=(Math.random()-.5)*40;const ge=Math.random(),R=ge<.65?H:ge<.85?Q:Z;B[le*3]=R.r,B[le*3+1]=R.g,B[le*3+2]=R.b}q.setAttribute("position",new oi(I,3)),q.setAttribute("color",new oi(B,3));const Y=new Iy({size:.16,vertexColors:!0,transparent:!0,opacity:.75,blending:Nn}),K=new W2(q,Y);r.add(K);const re=new Ci;r.add(re);const pe=8,me=new bp(.08,.25,45,12,1,!0);for(let le=0;le<pe;le++){const ge=le%4===0,R=new Wi({color:ge?16742144:43775,transparent:!0,opacity:ge?.18:.12,blending:Nn,side:_i}),M=new hn(me,R),z=le/pe*Math.PI*2;M.position.set(Math.cos(z)*22,2,Math.sin(z)*14-8),re.add(M)}let Pe=0,Le=0,Te=0,We=0;const G=le=>{Pe=(le.clientX/window.innerWidth-.5)*2,Le=(le.clientY/window.innerHeight-.5)*2};window.addEventListener("mousemove",G,{passive:!0});const Ft=()=>{s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),o.setSize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",Ft);let Me,Ce=new J2;const xe=()=>{if(Me=requestAnimationFrame(xe),document.hidden)return;Ce.getDelta();const le=Ce.getElapsedTime();n||(Te+=(Pe-Te)*.04,We+=(Le-We)*.04,s.position.x=Te*1.5,s.position.y=-We*1.2+Math.sin(le*.4)*.25,s.lookAt(0,-1,0)),h.forEach((M,z)=>{const J=p[z].speed;M.rotation.z+=J*(n?.3:1)}),T.rotation.z-=.003;const ge=(Math.sin(le*2.2)+1)*.5;g.opacity=.55+ge*.4,l.intensity=3.2+ge*1.8,E.forEach(M=>{M.pulseProgress1=(M.pulseProgress1+M.pulseSpeed)%1,M.pulseProgress2=(M.pulseProgress2+M.pulseSpeed*.8)%1;const z=M.curve.getPoint(M.pulseProgress1),J=M.curve.getPoint(M.pulseProgress2);M.pulse1.position.set(z.x,z.y,0),M.pulse2.position.set(J.x,J.y,0)}),n||(A.rotation.y=Math.sin(le*.15)*.08,A.rotation.x=Math.cos(le*.12)*.04),w.forEach(M=>{n||(M.mesh.rotation.x+=M.rotSpeed.x,M.mesh.rotation.y+=M.rotSpeed.y,M.mesh.rotation.z+=M.rotSpeed.z,M.mesh.position.y=M.initialPos.y+Math.sin(le*.8+M.initialPos.x)*.6)});const R=q.attributes.position.array;for(let M=0;M<V;M++)R[M*3+1]+=.03,R[M*3+1]>20&&(R[M*3+1]=-20);q.attributes.position.needsUpdate=!0,re.rotation.y=le*.02,o.render(r,s)};return xe(),()=>{cancelAnimationFrame(Me),window.removeEventListener("mousemove",G),window.removeEventListener("resize",Ft),o.dispose(),i.contains(o.domElement)&&i.removeChild(o.domElement)}},[n,e]),P.jsx("div",{ref:t,className:"absolute inset-0 z-0 pointer-events-none overflow-hidden"})},tb=()=>P.jsxs("div",{className:"absolute inset-0 pointer-events-none z-[1] overflow-hidden",children:[P.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(circle at 50% 50%, rgba(2, 6, 16, 0.2) 0%, rgba(1, 3, 8, 0.85) 75%, rgba(0, 1, 4, 0.98) 100%)"}}),P.jsx("div",{className:"absolute inset-0 opacity-[0.07] mix-blend-screen",style:{backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.4) 2px, rgba(0, 240, 255, 0.4) 4px)"}}),P.jsx("div",{className:"absolute inset-0 opacity-[0.035]",style:{backgroundImage:"radial-gradient(rgba(0, 225, 255, 0.6) 1px, transparent 1px)",backgroundSize:"36px 36px"}}),P.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[120px]",style:{background:"radial-gradient(circle, rgba(0, 225, 255, 0.8) 0%, rgba(0, 100, 255, 0.3) 50%, transparent 80%)"}}),P.jsx("div",{className:"absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] h-[180px] rounded-full pointer-events-none opacity-30 blur-[70px]",style:{background:"radial-gradient(circle, rgba(0, 247, 255, 0.9) 0%, rgba(255, 136, 0, 0.4) 60%, transparent 85%)"}}),P.jsx("div",{className:"absolute top-1/4 left-12 w-[350px] h-[250px] rounded-full pointer-events-none opacity-15 blur-[90px]",style:{background:"radial-gradient(circle, rgba(255, 119, 0, 0.7) 0%, transparent 70%)"}}),P.jsx("div",{className:"absolute bottom-1/3 right-12 w-[400px] h-[300px] rounded-full pointer-events-none opacity-15 blur-[100px]",style:{background:"radial-gradient(circle, rgba(255, 136, 0, 0.7) 0%, transparent 70%)"}})]}),nb=()=>{const n=rt.useRef(null),e=rt.useRef(null),t=rt.useRef(null);return rt.useEffect(()=>{const i=Pt.context(()=>{n.current&&(Pt.to(n.current.querySelector(".reticle-outer"),{rotation:360,transformOrigin:"50% 50%",repeat:-1,duration:12,ease:"none"}),Pt.to(n.current.querySelector(".reticle-inner"),{rotation:-360,transformOrigin:"50% 50%",repeat:-1,duration:8,ease:"none"})),e.current&&Pt.to(e.current,{textShadow:"0 0 25px rgba(0, 240, 255, 0.95), 0 0 50px rgba(0, 180, 255, 0.6), 0 0 80px rgba(0, 130, 255, 0.3)",duration:2.8,repeat:-1,yoyo:!0,ease:"sine.inOut"}),t.current&&Pt.timeline({repeat:-1,repeatDelay:4.5}).fromTo(t.current,{x:"-120%",opacity:0},{x:"160%",opacity:.85,duration:1.4,ease:"power2.inOut"})});return()=>i.revert()},[]),P.jsxs("div",{className:"relative flex flex-col items-center select-none pt-4 pb-2 z-10",children:[P.jsxs("div",{className:"relative px-12 py-3 flex items-center justify-center",children:[P.jsxs("svg",{className:"absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_12px_rgba(0,225,255,0.5)]",preserveAspectRatio:"none",viewBox:"0 0 680 96",children:[P.jsx("path",{d:"M 28 6 L 652 6 L 674 28 L 674 68 L 652 90 L 28 90 L 6 68 L 6 28 Z",fill:"rgba(4, 12, 28, 0.35)",stroke:"rgba(0, 225, 255, 0.65)",strokeWidth:"1.5"}),P.jsx("path",{d:"M 40 14 L 640 14",stroke:"rgba(0, 240, 255, 0.3)",strokeWidth:"1"}),P.jsx("path",{d:"M 12 24 L 12 14 L 24 14",fill:"none",stroke:"#00f0ff",strokeWidth:"2.5"}),P.jsx("path",{d:"M 668 24 L 668 14 L 656 14",fill:"none",stroke:"#00f0ff",strokeWidth:"2.5"}),P.jsx("path",{d:"M 12 72 L 12 82 L 24 82",fill:"none",stroke:"#00f0ff",strokeWidth:"2.5"}),P.jsx("path",{d:"M 668 72 L 668 82 L 656 82",fill:"none",stroke:"#00f0ff",strokeWidth:"2.5"}),P.jsx("rect",{x:"330",y:"4",width:"20",height:"4",fill:"#00f0ff"}),P.jsx("circle",{cx:"320",cy:"6",r:"1.5",fill:"#ffaa00"}),P.jsx("circle",{cx:"360",cy:"6",r:"1.5",fill:"#ffaa00"})]}),P.jsxs("div",{className:"relative flex items-center gap-6 px-6 py-2",children:[P.jsxs("svg",{ref:n,className:"w-14 h-14 shrink-0 drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]",viewBox:"0 0 64 64",children:[P.jsx("circle",{className:"reticle-outer",cx:"32",cy:"32",r:"27",fill:"none",stroke:"#00e5ff",strokeWidth:"2.2",strokeDasharray:"32 10 16 12 40 14"}),P.jsx("circle",{className:"reticle-inner",cx:"32",cy:"32",r:"20",fill:"none",stroke:"#00ffff",strokeWidth:"1.8",strokeDasharray:"24 12 18 10",opacity:"0.85"}),P.jsx("circle",{cx:"32",cy:"32",r:"3.5",fill:"#00f7ff"}),P.jsx("circle",{cx:"32",cy:"32",r:"7",fill:"none",stroke:"#ff9900",strokeWidth:"1.2",opacity:"0.8"})]}),P.jsxs("div",{className:"relative overflow-hidden",children:[P.jsx("h1",{ref:e,className:"text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.16em] uppercase text-transparent bg-clip-text",style:{fontFamily:"'Orbitron', 'Rajdhani', sans-serif",backgroundImage:"linear-gradient(180deg, #ffffff 0%, #d4f8ff 45%, #6fe7ff 75%, #00b4ff 100%)",filter:"drop-shadow(0 0 16px rgba(0, 225, 255, 0.75))"},children:"CHAOS CONTROL"}),P.jsx("div",{ref:t,className:"absolute inset-y-0 w-32 -skew-x-20 pointer-events-none",style:{background:"linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, rgba(0, 240, 255, 0.9) 75%, transparent 100%)",mixBlendMode:"overlay"}})]})]})]}),P.jsxs("div",{className:"flex items-center gap-4 mt-2",children:[P.jsx("div",{className:"w-12 h-[2px] bg-gradient-to-r from-transparent to-[#ff8800] shadow-[0_0_8px_#ff7700]"}),P.jsx("span",{className:"text-xs md:text-sm font-bold tracking-[0.28em] uppercase text-[#ffaa22]",style:{fontFamily:"'Orbitron', 'Rajdhani', sans-serif",textShadow:"0 0 12px rgba(255, 136, 0, 0.8), 0 0 24px rgba(255, 100, 0, 0.4)"},children:"SABOTAGE THE SYSTEM"}),P.jsx("div",{className:"w-12 h-[2px] bg-gradient-to-l from-transparent to-[#ff8800] shadow-[0_0_8px_#ff7700]"})]})]})};class ib{constructor(){Xo(this,"ctx",null);Xo(this,"isMuted",!1);Xo(this,"sfxVol",.8);Xo(this,"masterVol",.8)}initContext(){if(!this.ctx&&typeof window<"u"){const e=window.AudioContext||window.webkitAudioContext;this.ctx=new e}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setVolumes(e,t){this.masterVol=e,this.sfxVol=t}setMuted(e){this.isMuted=e}playHover(){if(this.isMuted||(this.initContext(),!this.ctx))return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(1400,e),t.frequency.exponentialRampToValueAtTime(2200,e+.05);const r=.08*this.sfxVol*this.masterVol;i.gain.setValueAtTime(r,e),i.gain.exponentialRampToValueAtTime(.001,e+.05),t.connect(i),i.connect(this.ctx.destination),t.start(e),t.stop(e+.06)}playClick(){if(this.isMuted||(this.initContext(),!this.ctx))return;const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(120,e),t.frequency.exponentialRampToValueAtTime(40,e+.12);const r=.25*this.sfxVol*this.masterVol;i.gain.setValueAtTime(r,e),i.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(i),i.connect(this.ctx.destination),t.start(e),t.stop(e+.13);const s=this.ctx.createOscillator(),o=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(2400,e),s.frequency.exponentialRampToValueAtTime(600,e+.08);const a=.12*this.sfxVol*this.masterVol;o.gain.setValueAtTime(a,e),o.gain.exponentialRampToValueAtTime(.001,e+.08),s.connect(o),o.connect(this.ctx.destination),s.start(e),s.stop(e+.09)}playWhoosh(){if(this.isMuted||(this.initContext(),!this.ctx))return;const e=this.ctx.currentTime,t=this.ctx.sampleRate*.2,i=this.ctx.createBuffer(1,t,this.ctx.sampleRate),r=i.getChannelData(0);for(let u=0;u<t;u++)r[u]=Math.random()*2-1;const s=this.ctx.createBufferSource();s.buffer=i;const o=this.ctx.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(1800,e+.1),o.frequency.exponentialRampToValueAtTime(300,e+.2),o.Q.value=3;const a=this.ctx.createGain(),l=.15*this.sfxVol*this.masterVol;a.gain.setValueAtTime(.001,e),a.gain.linearRampToValueAtTime(l,e+.08),a.gain.exponentialRampToValueAtTime(.001,e+.2),s.connect(o),o.connect(a),a.connect(this.ctx.destination),s.start(e),s.stop(e+.21)}}const Rt=new ib,rb=({label:n,onClick:e,index:t})=>{const i=rt.useRef(null),r=rt.useRef(null),s=rt.useRef(null),o=rt.useRef(null),a=rt.useRef(null),l=rt.useRef(null),u=()=>{Rt.playHover(),r.current&&Pt.to(r.current,{stroke:"#00f7ff",strokeWidth:2.2,filter:"drop-shadow(0 0 14px rgba(0, 240, 255, 0.95))",duration:.25,ease:"power2.out"}),s.current&&Pt.to(s.current,{fill:"rgba(8, 32, 64, 0.85)",duration:.25,ease:"power2.out"}),a.current&&Pt.to(a.current,{x:6,color:"#ffffff",filter:"drop-shadow(0 0 8px #00ffff)",duration:.25,ease:"power2.out"}),l.current&&Pt.to(l.current,{color:"#ffffff",textShadow:"0 0 12px rgba(0, 240, 255, 0.9), 0 0 20px rgba(0, 180, 255, 0.5)",duration:.2}),i.current&&Pt.to(i.current,{scale:1.018,duration:.25,ease:"power2.out"}),o.current&&Pt.fromTo(o.current,{x:"-130%",opacity:0},{x:"140%",opacity:.9,duration:.5,ease:"power2.out"})},c=()=>{r.current&&Pt.to(r.current,{stroke:"rgba(0, 200, 255, 0.65)",strokeWidth:1.4,filter:"drop-shadow(0 0 6px rgba(0, 200, 255, 0.4))",duration:.35,ease:"power2.out"}),s.current&&Pt.to(s.current,{fill:"rgba(5, 14, 30, 0.72)",duration:.35,ease:"power2.out"}),a.current&&Pt.to(a.current,{x:0,color:"#00e1ff",filter:"drop-shadow(0 0 4px rgba(0, 225, 255, 0.6))",duration:.35,ease:"power2.out"}),l.current&&Pt.to(l.current,{color:"#d6f0ff",textShadow:"0 0 6px rgba(0, 200, 255, 0.4)",duration:.3}),i.current&&Pt.to(i.current,{scale:1,duration:.35,ease:"power2.out"})},f=()=>{Rt.playClick();const h=Pt.timeline({onComplete:e});r.current&&i.current?h.to(i.current,{scale:.97,duration:.08,ease:"power1.in"}).to(r.current,{stroke:"#ffffff",strokeWidth:3,filter:"drop-shadow(0 0 20px #00ffff)",duration:.08},"<").to(i.current,{scale:1,duration:.15,ease:"back.out(2.0)"}).to(r.current,{stroke:"#00f7ff",strokeWidth:2.2,filter:"drop-shadow(0 0 14px rgba(0, 240, 255, 0.95))",duration:.15},"<"):e()};return P.jsxs("button",{ref:i,onClick:f,onMouseEnter:u,onMouseLeave:c,onFocus:u,onBlur:c,className:"relative w-[360px] md:w-[420px] lg:w-[460px] h-[52px] md:h-[56px] focus:outline-none focus:ring-1 focus:ring-[#00ffff] select-none my-1.5 transition-transform cursor-pointer",style:{perspective:800},children:[P.jsxs("svg",{className:"absolute inset-0 w-full h-full pointer-events-none",viewBox:"0 0 460 56",preserveAspectRatio:"none",children:[P.jsx("path",{ref:s,d:"M 16 2 L 444 2 L 458 16 L 458 40 L 444 54 L 16 54 L 2 40 L 2 16 Z",fill:"rgba(5, 14, 30, 0.72)"}),P.jsx("path",{ref:r,d:"M 16 2 L 444 2 L 458 16 L 458 40 L 444 54 L 16 54 L 2 40 L 2 16 Z",fill:"none",stroke:"rgba(0, 200, 255, 0.65)",strokeWidth:"1.4",style:{filter:"drop-shadow(0 0 6px rgba(0, 200, 255, 0.4))"}}),P.jsx("line",{x1:"80",y1:"5",x2:"380",y2:"5",stroke:"rgba(0, 240, 255, 0.35)",strokeWidth:"0.8"}),P.jsx("line",{x1:"120",y1:"51",x2:"340",y2:"51",stroke:"rgba(0, 240, 255, 0.25)",strokeWidth:"0.8"}),P.jsx("circle",{cx:"16",cy:"14",r:"1.5",fill:"#00e5ff",opacity:"0.8"}),P.jsx("circle",{cx:"444",cy:"14",r:"1.5",fill:"#00e5ff",opacity:"0.8"})]}),P.jsx("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",style:{clipPath:"polygon(16px 2px, calc(100% - 16px) 2px, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0px calc(100% - 16px), 0px 16px)"},children:P.jsx("div",{ref:o,className:"absolute inset-y-0 w-28 -skew-x-25 opacity-0",style:{background:"linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.2) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(0, 240, 255, 0.4) 80%, transparent 100%)"}})}),P.jsxs("div",{className:"relative z-10 w-full h-full flex items-center justify-between px-8 md:px-10",children:[P.jsx("span",{className:"w-6"})," ",P.jsx("span",{ref:l,className:"text-sm md:text-base font-bold tracking-[0.16em] uppercase text-[#d6f0ff] transition-colors",style:{fontFamily:"'Orbitron', 'Rajdhani', sans-serif",textShadow:"0 0 6px rgba(0, 200, 255, 0.4)"},children:n}),P.jsxs("svg",{ref:a,className:"w-5 h-5 text-[#00e1ff] shrink-0",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",style:{filter:"drop-shadow(0 0 4px rgba(0, 225, 255, 0.6))"},children:[P.jsx("polyline",{points:"7 6 13 12 7 18"}),P.jsx("polyline",{points:"13 6 19 12 13 18"})]})]})]})},sb=()=>P.jsxs("div",{className:"relative z-10 flex items-center justify-center gap-3 pt-6 pb-4 select-none",children:[P.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-[#00e1ff] shadow-[0_0_6px_#00ffff]"}),P.jsx("p",{className:"text-[11px] md:text-xs font-semibold tracking-[0.24em] uppercase text-[#7dbfd6]",style:{fontFamily:"'Orbitron', 'Rajdhani', sans-serif",textShadow:"0 0 8px rgba(0, 200, 255, 0.4)"},children:"LOCAL 2-PLAYER SAME-KEYBOARD ARCADE • BEST OF 3 MATCHES"}),P.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-[#ffaa00] shadow-[0_0_6px_#ff9900]"})]}),ob=({onClose:n,onLaunchMatch:e})=>{const[t,i]=rt.useState(0),r=[{id:"training",name:"RESEARCH FACILITY",sub:"STATION SECTOR 01",desc:"High-voltage laser barriers, dynamic security blast gates, and precision corridor routing.",color:"#00f0ff",tag:"LASER GRID DEFENSE"},{id:"gravity",name:"POWER CORE",sub:"GRAVITY CORE SECTOR 02",desc:"Central energy bridge over infinite void, destabilization hazards, and permanent flank bypasses.",color:"#00e1ff",tag:"DESTABILIZING BRIDGES"},{id:"reactor",name:"UNDERGROUND COMPLEX",sub:"NEON REACTOR SECTOR 03",desc:"Central radioactive containment chamber with cyclical plasma purges and motorized blast shields.",color:"#ff8800",tag:"PLASMA PURGE HAZARDS"}];return P.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn",children:P.jsxs("div",{className:"relative w-full max-w-3xl p-8 bg-[#040e20]/90 border border-[#00e1ff]/70 shadow-[0_0_40px_rgba(0,225,255,0.35)] rounded-lg text-white",children:[P.jsxs("div",{className:"flex items-center justify-between pb-6 border-b border-[#00f0ff]/30",children:[P.jsxs("div",{children:[P.jsx("h2",{className:"text-2xl font-black tracking-widest text-[#00f7ff] font-['Orbitron']",children:"ARENA SELECTION"}),P.jsx("p",{className:"text-xs text-[#7bb8cc] tracking-wider mt-1",children:"SELECT YOUR TACTICAL COMBAT ZONE"})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),n()},className:"px-4 py-1.5 text-xs font-bold tracking-widest border border-[#ff4444] text-[#ff6666] hover:bg-[#ff4444]/20 transition-colors uppercase font-['Orbitron']",children:"ESC // CLOSE"})]}),P.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 my-6",children:r.map((s,o)=>{const a=t===o;return P.jsxs("div",{onClick:()=>{Rt.playClick(),i(o)},className:`p-5 rounded border cursor-pointer transition-all ${a?"border-[#00ffff] bg-[#00ffff]/15 shadow-[0_0_20px_rgba(0,255,255,0.4)] scale-[1.02]":"border-[#00e1ff]/30 bg-[#06152d]/60 hover:border-[#00e1ff]/70"}`,children:[P.jsx("span",{className:"text-[10px] font-bold tracking-widest text-[#ffaa00] uppercase block mb-1",children:s.sub}),P.jsx("h3",{className:"text-base font-bold text-white font-['Orbitron'] tracking-wider mb-2",children:s.name}),P.jsx("span",{className:"inline-block px-2 py-0.5 text-[9px] font-bold rounded bg-[#00ffff]/20 text-[#00ffff] mb-3",children:s.tag}),P.jsx("p",{className:"text-xs text-[#8cbcd0] leading-relaxed",children:s.desc})]},s.id)})}),P.jsxs("div",{className:"flex items-center justify-between pt-6 border-t border-[#00f0ff]/30",children:[P.jsxs("span",{className:"text-xs text-[#6fa6be]",children:["Selected: ",P.jsx("strong",{className:"text-[#00ffff] font-['Orbitron']",children:r[t].name})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),e(r[t].name)},className:"px-8 py-3 font-bold tracking-widest text-black bg-[#00f7ff] hover:bg-white transition-all shadow-[0_0_20px_#00e5ff] rounded uppercase font-['Orbitron']",children:"ENTER ARENA & LAUNCH MATCH >>"})]})]})})},ab=({onClose:n})=>P.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn",children:P.jsxs("div",{className:"relative w-full max-w-3xl p-8 bg-[#040e20]/95 border border-[#00e1ff]/70 shadow-[0_0_40px_rgba(0,225,255,0.35)] rounded-lg text-white max-h-[90vh] overflow-y-auto",children:[P.jsxs("div",{className:"flex items-center justify-between pb-6 border-b border-[#00f0ff]/30",children:[P.jsxs("div",{children:[P.jsx("h2",{className:"text-2xl font-black tracking-widest text-[#00f7ff] font-['Orbitron']",children:"HOW TO PLAY // SYSTEM OVERRIDE"}),P.jsx("p",{className:"text-xs text-[#7bb8cc] tracking-wider mt-1",children:"ASYMMETRIC 2-PLAYER COMBATIVE STRATEGY"})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),n()},className:"px-4 py-1.5 text-xs font-bold tracking-widest border border-[#ff4444] text-[#ff6666] hover:bg-[#ff4444]/20 transition-colors uppercase font-['Orbitron']",children:"ESC // CLOSE"})]}),P.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 my-6",children:[P.jsxs("div",{className:"p-5 bg-[#00ffff]/10 border border-[#00ffff]/40 rounded",children:[P.jsxs("div",{className:"flex items-center justify-between mb-3",children:[P.jsx("span",{className:"text-sm font-black text-[#00ffff] font-['Orbitron']",children:"CYAN PHANTOM (RUNNER)"}),P.jsx("span",{className:"text-[10px] px-2 py-0.5 bg-[#00ffff]/20 text-[#00ffff] rounded font-bold",children:"INFILTRATOR"})]}),P.jsxs("ul",{className:"text-xs text-[#b8e8f8] space-y-2 leading-relaxed",children:[P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Primary Goal"}),": Hack and activate all 3 control point nodes (Alpha, Beta, Gamma) across the arena, then breach the extraction gate."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Mobility Surge [Q / SHIFT]"}),": 1.35× high-speed burst for 1.4s to dash through closing blast doors or bypass traps."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Sonar Pulse"}),": Scans for the nearest terminal node and warns of active environmental hazards."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Hazard Defense"}),": Contact with active lethal lasers or radiation causes instant glitch dissipation and respawn at last valid checkpoint."]})]})]}),P.jsxs("div",{className:"p-5 bg-[#ff4400]/10 border border-[#ff4400]/40 rounded",children:[P.jsxs("div",{className:"flex items-center justify-between mb-3",children:[P.jsx("span",{className:"text-sm font-black text-[#ff5522] font-['Orbitron']",children:"CRIMSON WRAITH (SABOTEUR)"}),P.jsx("span",{className:"text-[10px] px-2 py-0.5 bg-[#ff4400]/20 text-[#ff7744] rounded font-bold",children:"OPERATOR"})]}),P.jsxs("ul",{className:"text-xs text-[#ffd2c0] space-y-2 leading-relaxed",children:[P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Primary Goal"}),": Prevent the Runner from escaping before the 120-second match round timer runs out."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Hazard Trap [E / ENTER]"}),": Drops high-voltage cyber mines that stun the Runner and reduce speed by 75%."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Facility Overload"}),": Overload laser grids to remain permanently active or collapse energy bridges."]}),P.jsxs("li",{children:["• ",P.jsx("strong",{children:"Terminal Scramble"}),": Locks uncaptured nodes in a glitch state to deny the Runner progression."]})]})]})]}),P.jsxs("div",{className:"p-4 bg-[#06152b] border border-[#00e1ff]/30 rounded my-4",children:[P.jsx("h3",{className:"text-xs font-bold tracking-widest text-[#00ffff] uppercase font-['Orbitron'] mb-3",children:"SAME-KEYBOARD LOCAL CONTROLS"}),P.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4 text-xs",children:[P.jsxs("div",{children:[P.jsx("p",{className:"text-[#00ffff] font-bold mb-1",children:"PLAYER 1 (LEFT SIDE)"}),P.jsxs("p",{className:"text-[#a8d8ea]",children:["• Movement: ",P.jsx("strong",{children:"[W] [A] [S] [D]"})]}),P.jsxs("p",{className:"text-[#a8d8ea]",children:["• Jump: ",P.jsx("strong",{children:"[SPACE] / [C]"})]}),P.jsxs("p",{className:"text-[#a8d8ea]",children:["• Override / Trap: ",P.jsx("strong",{children:"[E]"})]}),P.jsxs("p",{className:"text-[#a8d8ea]",children:["• Surge / Pulse: ",P.jsx("strong",{children:"[Q]"})]})]}),P.jsxs("div",{children:[P.jsx("p",{className:"text-[#ff7744] font-bold mb-1",children:"PLAYER 2 (RIGHT SIDE)"}),P.jsxs("p",{className:"text-[#ffd2c0]",children:["• Movement: ",P.jsx("strong",{children:"[↑] [←] [↓] [→]"})]}),P.jsxs("p",{className:"text-[#ffd2c0]",children:["• Jump: ",P.jsx("strong",{children:"[CTRL] / [KP 0]"})]}),P.jsxs("p",{className:"text-[#ffd2c0]",children:["• Action / Override: ",P.jsx("strong",{children:"[ENTER] / [SPACE]"})]}),P.jsxs("p",{className:"text-[#ffd2c0]",children:["• Surge / Pulse: ",P.jsx("strong",{children:"[SHIFT] / [/]"})]})]})]})]}),P.jsx("div",{className:"flex justify-end pt-4",children:P.jsx("button",{onClick:()=>{Rt.playClick(),n()},className:"px-6 py-2.5 text-xs font-bold tracking-widest text-black bg-[#00f7ff] hover:bg-white transition-colors rounded uppercase font-['Orbitron']",children:"I UNDERSTAND // RETURN"})})]})}),lb=({settings:n,onUpdateSettings:e,onClose:t})=>{const i=()=>{document.fullscreenElement?(document.exitFullscreen&&document.exitFullscreen().catch(()=>{}),e({fullscreen:!1})):(document.documentElement.requestFullscreen().catch(()=>{}),e({fullscreen:!0}))};return P.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn",children:P.jsxs("div",{className:"relative w-full max-w-xl p-8 bg-[#040e20]/95 border border-[#00e1ff]/70 shadow-[0_0_40px_rgba(0,225,255,0.35)] rounded-lg text-white",children:[P.jsxs("div",{className:"flex items-center justify-between pb-6 border-b border-[#00f0ff]/30",children:[P.jsxs("div",{children:[P.jsx("h2",{className:"text-2xl font-black tracking-widest text-[#00f7ff] font-['Orbitron']",children:"SYSTEM CONFIGURATION"}),P.jsx("p",{className:"text-xs text-[#7bb8cc] tracking-wider mt-1",children:"AUDIO · GRAPHICS · RUNTIME INTERFACE"})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),t()},className:"px-4 py-1.5 text-xs font-bold tracking-widest border border-[#ff4444] text-[#ff6666] hover:bg-[#ff4444]/20 transition-colors uppercase font-['Orbitron']",children:"ESC // CLOSE"})]}),P.jsxs("div",{className:"space-y-6 my-6 text-sm",children:[P.jsxs("div",{children:[P.jsxs("div",{className:"flex justify-between text-xs font-bold uppercase mb-2",children:[P.jsx("span",{className:"text-[#aee7f8]",children:"MASTER VOLUME"}),P.jsxs("span",{className:"text-[#00ffff] font-['Orbitron']",children:[Math.round(n.masterVolume*100),"%"]})]}),P.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:n.masterVolume,onChange:r=>{const s=parseFloat(r.target.value);e({masterVolume:s}),Rt.setVolumes(s,n.sfxVolume)},className:"w-full accent-[#00f0ff] cursor-pointer"})]}),P.jsxs("div",{children:[P.jsxs("div",{className:"flex justify-between text-xs font-bold uppercase mb-2",children:[P.jsx("span",{className:"text-[#aee7f8]",children:"SFX / TACTICAL AUDIO"}),P.jsxs("span",{className:"text-[#00ffff] font-['Orbitron']",children:[Math.round(n.sfxVolume*100),"%"]})]}),P.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",value:n.sfxVolume,onChange:r=>{const s=parseFloat(r.target.value);e({sfxVolume:s}),Rt.setVolumes(n.masterVolume,s),Rt.playClick()},className:"w-full accent-[#00f0ff] cursor-pointer"})]}),P.jsxs("div",{className:"pt-4 border-t border-[#00f0ff]/20 space-y-4",children:[P.jsxs("div",{className:"flex items-center justify-between",children:[P.jsxs("div",{children:[P.jsx("p",{className:"text-xs font-bold text-white uppercase tracking-wider",children:"FULLSCREEN DISPLAY"}),P.jsx("p",{className:"text-[11px] text-[#78a8be]",children:"Toggle immersive monitor presentation"})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),i()},className:`px-4 py-1.5 text-xs font-bold rounded border transition-colors ${n.fullscreen?"border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff]":"border-gray-600 text-gray-400"}`,children:n.fullscreen?"ON":"OFF"})]}),P.jsxs("div",{className:"flex items-center justify-between",children:[P.jsxs("div",{children:[P.jsx("p",{className:"text-xs font-bold text-white uppercase tracking-wider",children:"REDUCED MOTION"}),P.jsx("p",{className:"text-[11px] text-[#78a8be]",children:"Dampen camera parallax and orbital ring tilt"})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),e({reducedMotion:!n.reducedMotion})},className:`px-4 py-1.5 text-xs font-bold rounded border transition-colors ${n.reducedMotion?"border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff]":"border-gray-600 text-gray-400"}`,children:n.reducedMotion?"ON":"OFF"})]}),P.jsxs("div",{className:"flex items-center justify-between",children:[P.jsxs("div",{children:[P.jsx("p",{className:"text-xs font-bold text-white uppercase tracking-wider",children:"HIGH PRECISION WEBGL (60 FPS)"}),P.jsx("p",{className:"text-[11px] text-[#78a8be]",children:"Enable full volumetric particles and crystalline refraction"})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),e({highQuality:!n.highQuality})},className:`px-4 py-1.5 text-xs font-bold rounded border transition-colors ${n.highQuality?"border-[#00ffff] bg-[#00ffff]/20 text-[#00ffff]":"border-gray-600 text-gray-400"}`,children:n.highQuality?"HIGH":"LOW"})]})]})]}),P.jsx("div",{className:"flex justify-end pt-4 border-t border-[#00f0ff]/20",children:P.jsx("button",{onClick:()=>{Rt.playClick(),t()},className:"px-6 py-2.5 text-xs font-bold tracking-widest text-black bg-[#00f7ff] hover:bg-white transition-colors rounded uppercase font-['Orbitron']",children:"CONFIRM & CLOSE"})})]})})},ub=({onClose:n})=>{const e=()=>{Rt.playClick(),window.close&&window.close(),alert("Desktop session terminated. You may now safely close this window or return to your desktop shell."),n()};return P.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn",children:P.jsxs("div",{className:"relative w-full max-w-md p-8 bg-[#040e20]/95 border border-[#ff4444]/70 shadow-[0_0_40px_rgba(255,68,68,0.35)] rounded-lg text-white text-center",children:[P.jsx("div",{className:"w-12 h-12 mx-auto mb-4 rounded-full border border-[#ff5555] flex items-center justify-center text-[#ff5555] shadow-[0_0_15px_#ff3333]",children:P.jsx("svg",{className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:P.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})})}),P.jsx("h2",{className:"text-xl font-black tracking-widest text-[#ff5555] font-['Orbitron'] mb-2",children:"QUIT TO DESKTOP?"}),P.jsx("p",{className:"text-xs text-[#a8c0cc] leading-relaxed mb-6",children:"Are you sure you want to disconnect from Chaos Control and terminate the holographic terminal connection?"}),P.jsxs("div",{className:"flex gap-4 justify-center",children:[P.jsx("button",{onClick:()=>{Rt.playClick(),n()},className:"px-6 py-2.5 text-xs font-bold tracking-widest border border-gray-600 hover:border-[#00ffff] hover:text-[#00ffff] transition-colors rounded uppercase font-['Orbitron']",children:"CANCEL // STAY"}),P.jsx("button",{onClick:e,className:"px-6 py-2.5 text-xs font-bold tracking-widest text-white bg-[#cc2222] hover:bg-[#ff3333] transition-colors shadow-[0_0_15px_#ff2222] rounded uppercase font-['Orbitron']",children:"CONFIRM EXIT"})]})]})})},cb=({onClose:n,arenaName:e="RESEARCH FACILITY"})=>{const[t,i]=rt.useState(3),[r,s]=rt.useState("INITIALIZING SYSTEM OVERRIDE...");return rt.useEffect(()=>{Rt.playWhoosh();const o=setInterval(()=>{i(a=>a<=1?(clearInterval(o),s("DEPLOYING PLAYERS TO COMBAT ZONE..."),0):(Rt.playHover(),a-1))},1e3);return()=>clearInterval(o)},[]),P.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn",children:P.jsxs("div",{className:"relative w-full max-w-lg p-10 bg-[#040e20]/95 border border-[#00f7ff] shadow-[0_0_50px_rgba(0,247,255,0.45)] rounded-lg text-white text-center",children:[P.jsxs("div",{className:"relative w-28 h-28 mx-auto mb-6 flex items-center justify-center",children:[P.jsx("div",{className:"absolute inset-0 border-2 border-dashed border-[#00f7ff] rounded-full animate-spin",style:{animationDuration:"6s"}}),P.jsx("div",{className:"absolute inset-2 border-2 border-dashed border-[#ff8800] rounded-full animate-spin",style:{animationDirection:"reverse",animationDuration:"4s"}}),P.jsx("span",{className:"text-4xl font-black font-['Orbitron'] text-[#00f7ff] drop-shadow-[0_0_12px_#00ffff]",children:t>0?t:"GO!"})]}),P.jsx("h2",{className:"text-2xl font-black tracking-widest text-white font-['Orbitron'] mb-2",children:e}),P.jsx("p",{className:"text-xs text-[#00e1ff] tracking-[0.2em] font-bold uppercase mb-4 animate-pulse",children:r}),P.jsxs("div",{className:"p-4 bg-[#06152b] border border-[#00e1ff]/30 rounded text-xs text-[#9acddf] space-y-2 mb-6",children:[P.jsxs("div",{className:"flex justify-between border-b border-[#00e1ff]/20 pb-2",children:[P.jsx("span",{children:"PLAYER 1 [WASD]"}),P.jsx("strong",{className:"text-[#00ffff]",children:"CYAN PHANTOM (RUNNER)"})]}),P.jsxs("div",{className:"flex justify-between pt-1",children:[P.jsx("span",{children:"PLAYER 2 [ARROWS]"}),P.jsx("strong",{className:"text-[#ff7733]",children:"CRIMSON WRAITH (SABOTEUR)"})]})]}),P.jsx("button",{onClick:()=>{Rt.playClick(),n()},className:"px-8 py-2.5 text-xs font-bold tracking-widest border border-gray-600 hover:border-[#ff4444] hover:text-[#ff4444] transition-colors rounded uppercase font-['Orbitron']",children:"ABORT LAUNCH // ESC"})]})})},fb=()=>{const n=rt.useRef(null),e=rt.useRef(null),[t,i]=rt.useState("none"),[r,s]=rt.useState("RESEARCH FACILITY"),[o,a]=rt.useState({masterVolume:.85,sfxVolume:.85,musicVolume:.75,highQuality:!0,reducedMotion:!1,fullscreen:!1}),l=[{id:"quick_match",label:"PLAY QUICK MATCH"},{id:"arena_select",label:"ARENA SELECTION"},{id:"how_to_play",label:"HOW TO PLAY"},{id:"settings",label:"SETTINGS"},{id:"quit",label:"QUIT TO DESKTOP"}],u=f=>{i(f)},c=f=>{s(f),i("quick_match")};return rt.useEffect(()=>{const f=h=>{h.key==="Escape"&&t!=="none"&&(Rt.playClick(),i("none"))};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[t]),rt.useEffect(()=>{const f=Pt.context(()=>{Pt.timeline({defaults:{ease:"power3.out"}}).fromTo(".header-anim",{y:-40,opacity:0},{y:0,opacity:1,duration:1.1,delay:.2}).fromTo(".btn-anim",{y:25,opacity:0,scale:.94},{y:0,opacity:1,scale:1,duration:.8,stagger:.1},"-=0.6").fromTo(".footer-anim",{opacity:0},{opacity:1,duration:.9},"-=0.4")},n);return()=>f.revert()},[]),P.jsxs("div",{ref:n,className:"relative w-screen h-screen overflow-hidden bg-[#02050c] text-white flex flex-col justify-between items-center select-none",children:[P.jsx(eb,{reducedMotion:o.reducedMotion,highQuality:o.highQuality}),P.jsx(tb,{}),P.jsxs("div",{className:"relative z-20 w-full h-full flex flex-col justify-between items-center py-6 md:py-8 px-4",children:[P.jsx("div",{className:"header-anim w-full flex justify-center mt-2",children:P.jsx(nb,{})}),P.jsx("div",{ref:e,className:"flex flex-col items-center justify-center my-auto space-y-1.5 md:space-y-2 z-20",children:l.map((f,h)=>P.jsx("div",{className:"btn-anim",children:P.jsx(rb,{index:h,label:f.label,onClick:()=>u(f.id)})},f.id))}),P.jsx("div",{className:"footer-anim w-full flex justify-center mb-1",children:P.jsx(sb,{})})]}),t==="quick_match"&&P.jsx(cb,{arenaName:r,onClose:()=>i("none")}),t==="arena_select"&&P.jsx(ob,{onClose:()=>i("none"),onLaunchMatch:c}),t==="how_to_play"&&P.jsx(ab,{onClose:()=>i("none")}),t==="settings"&&P.jsx(lb,{settings:o,onUpdateSettings:f=>a(h=>({...h,...f})),onClose:()=>i("none")}),t==="quit"&&P.jsx(ub,{onClose:()=>i("none")})]})};Wf.createRoot(document.getElementById("root")).render(P.jsx(sS.StrictMode,{children:P.jsx(fb,{})}));
