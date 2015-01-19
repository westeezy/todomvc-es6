(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){(function(global){var ensureSymbol=function(key){Symbol[key]=Symbol[key]||Symbol()};var ensureProto=function(Constructor,key,val){var proto=Constructor.prototype;proto[key]=proto[key]||val};if(typeof Symbol==="undefined"){require("es6-symbol/implement")}require("es6-shim");require("./transformation/transformers/es6-generators/runtime");ensureSymbol("referenceGet");ensureSymbol("referenceSet");ensureSymbol("referenceDelete");ensureProto(Function,Symbol.referenceGet,function(){return this});ensureProto(Map,Symbol.referenceGet,Map.prototype.get);ensureProto(Map,Symbol.referenceSet,Map.prototype.set);ensureProto(Map,Symbol.referenceDelete,Map.prototype.delete);if(global.WeakMap){ensureProto(WeakMap,Symbol.referenceGet,WeakMap.prototype.get);ensureProto(WeakMap,Symbol.referenceSet,WeakMap.prototype.set);ensureProto(WeakMap,Symbol.referenceDelete,WeakMap.prototype.delete)}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./transformation/transformers/es6-generators/runtime":2,"es6-shim":4,"es6-symbol/implement":5}],2:[function(require,module,exports){(function(global){var iteratorSymbol=typeof Symbol==="function"&&Symbol.iterator||"@@iterator";var runtime=global.regeneratorRuntime=exports;var hasOwn=Object.prototype.hasOwnProperty;var wrap=runtime.wrap=function wrap(innerFn,outerFn,self,tryList){return new Generator(innerFn,outerFn,self||null,tryList||[])};var GenStateSuspendedStart="suspendedStart";var GenStateSuspendedYield="suspendedYield";var GenStateExecuting="executing";var GenStateCompleted="completed";var ContinueSentinel={};function GeneratorFunction(){}var GFp=function GeneratorFunctionPrototype(){};var Gp=GFp.prototype=Generator.prototype;(GFp.constructor=GeneratorFunction).prototype=Gp.constructor=GFp;runtime.isGeneratorFunction=function(genFun){var ctor=genFun&&genFun.constructor;return ctor?GeneratorFunction.name===ctor.name:false};runtime.mark=function(genFun){genFun.__proto__=GFp;genFun.prototype=Object.create(Gp);return genFun};runtime.async=function(innerFn,outerFn,self,tryList){return new Promise(function(resolve,reject){var generator=wrap(innerFn,outerFn,self,tryList);var callNext=step.bind(generator.next);var callThrow=step.bind(generator["throw"]);function step(arg){var info;var value;try{info=this(arg);value=info.value}catch(error){return reject(error)}if(info.done){resolve(value)}else{Promise.resolve(value).then(callNext,callThrow)}}callNext()})};function Generator(innerFn,outerFn,self,tryList){var generator=outerFn?Object.create(outerFn.prototype):this;var context=new Context(tryList);var state=GenStateSuspendedStart;function invoke(method,arg){if(state===GenStateExecuting){throw new Error("Generator is already running")}if(state===GenStateCompleted){throw new Error("Generator has already finished")}while(true){var delegate=context.delegate;var info;if(delegate){try{info=delegate.iterator[method](arg);method="next";arg=undefined}catch(uncaught){context.delegate=null;method="throw";arg=uncaught;continue}if(info.done){context[delegate.resultName]=info.value;context.next=delegate.nextLoc}else{state=GenStateSuspendedYield;return info}context.delegate=null}if(method==="next"){if(state===GenStateSuspendedStart&&typeof arg!=="undefined"){throw new TypeError("attempt to send "+JSON.stringify(arg)+" to newborn generator")}if(state===GenStateSuspendedYield){context.sent=arg}else{delete context.sent}}else if(method==="throw"){if(state===GenStateSuspendedStart){state=GenStateCompleted;throw arg}if(context.dispatchException(arg)){method="next";arg=undefined}}else if(method==="return"){context.abrupt("return",arg)}state=GenStateExecuting;try{var value=innerFn.call(self,context);state=context.done?GenStateCompleted:GenStateSuspendedYield;info={value:value,done:context.done};if(value===ContinueSentinel){if(context.delegate&&method==="next"){arg=undefined}}else{return info}}catch(thrown){state=GenStateCompleted;if(method==="next"){context.dispatchException(thrown)}else{arg=thrown}}}}generator.next=invoke.bind(generator,"next");generator["throw"]=invoke.bind(generator,"throw");generator["return"]=invoke.bind(generator,"return");return generator}Gp[iteratorSymbol]=function(){return this};Gp.toString=function(){return"[object Generator]"};function pushTryEntry(triple){var entry={tryLoc:triple[0]};if(1 in triple){entry.catchLoc=triple[1]}if(2 in triple){entry.finallyLoc=triple[2]}this.tryEntries.push(entry)}function resetTryEntry(entry,i){var record=entry.completion||{};record.type=i===0?"normal":"return";delete record.arg;entry.completion=record}function Context(tryList){this.tryEntries=[{tryLoc:"root"}];tryList.forEach(pushTryEntry,this);this.reset()}runtime.keys=function(object){var keys=[];for(var key in object){keys.push(key)}keys.reverse();return function next(){while(keys.length){var key=keys.pop();if(key in object){next.value=key;next.done=false;return next}}next.done=true;return next}};function values(iterable){var iterator=iterable;if(iteratorSymbol in iterable){iterator=iterable[iteratorSymbol]()}else if(!isNaN(iterable.length)){var i=-1;iterator=function next(){while(++i<iterable.length){if(i in iterable){next.value=iterable[i];next.done=false;return next}}next.done=true;return next};iterator.next=iterator}return iterator}runtime.values=values;Context.prototype={constructor:Context,reset:function(){this.prev=0;this.next=0;this.sent=undefined;this.done=false;this.delegate=null;this.tryEntries.forEach(resetTryEntry);for(var tempIndex=0,tempName;hasOwn.call(this,tempName="t"+tempIndex)||tempIndex<20;++tempIndex){this[tempName]=null}},stop:function(){this.done=true;var rootEntry=this.tryEntries[0];var rootRecord=rootEntry.completion;if(rootRecord.type==="throw"){throw rootRecord.arg}return this.rval},dispatchException:function(exception){if(this.done){throw exception}var context=this;function handle(loc,caught){record.type="throw";record.arg=exception;context.next=loc;return!!caught}for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];var record=entry.completion;if(entry.tryLoc==="root"){return handle("end")}if(entry.tryLoc<=this.prev){var hasCatch=hasOwn.call(entry,"catchLoc");var hasFinally=hasOwn.call(entry,"finallyLoc");if(hasCatch&&hasFinally){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}else if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else if(hasCatch){if(this.prev<entry.catchLoc){return handle(entry.catchLoc,true)}}else if(hasFinally){if(this.prev<entry.finallyLoc){return handle(entry.finallyLoc)}}else{throw new Error("try statement without catch or finally")}}}},_findFinallyEntry:function(finallyLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc<=this.prev&&hasOwn.call(entry,"finallyLoc")&&(entry.finallyLoc===finallyLoc||this.prev<entry.finallyLoc)){return entry}}},abrupt:function(type,arg){var entry=this._findFinallyEntry();var record=entry?entry.completion:{};record.type=type;record.arg=arg;if(entry){this.next=entry.finallyLoc}else{this.complete(record)}return ContinueSentinel},complete:function(record){if(record.type==="throw"){throw record.arg}if(record.type==="break"||record.type==="continue"){this.next=record.arg}else if(record.type==="return"){this.rval=record.arg;this.next="end"}return ContinueSentinel},finish:function(finallyLoc){var entry=this._findFinallyEntry(finallyLoc);return this.complete(entry.completion)},"catch":function(tryLoc){for(var i=this.tryEntries.length-1;i>=0;--i){var entry=this.tryEntries[i];if(entry.tryLoc===tryLoc){var record=entry.completion;var thrown;if(record.type==="throw"){thrown=record.arg;resetTryEntry(entry,i)}return thrown}}throw new Error("illegal catch attempt")},delegateYield:function(iterable,resultName,nextLoc){this.delegate={iterator:values(iterable),resultName:resultName,nextLoc:nextLoc};return ContinueSentinel}}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],3:[function(require,module,exports){var process=module.exports={};process.nextTick=function(){var canSetImmediate=typeof window!=="undefined"&&window.setImmediate;var canMutationObserver=typeof window!=="undefined"&&window.MutationObserver;var canPost=typeof window!=="undefined"&&window.postMessage&&window.addEventListener;if(canSetImmediate){return function(f){return window.setImmediate(f)}}var queue=[];if(canMutationObserver){var hiddenDiv=document.createElement("div");var observer=new MutationObserver(function(){var queueList=queue.slice();queue.length=0;queueList.forEach(function(fn){fn()})});observer.observe(hiddenDiv,{attributes:true});return function nextTick(fn){if(!queue.length){hiddenDiv.setAttribute("yes","no")}queue.push(fn)}}if(canPost){window.addEventListener("message",function(ev){var source=ev.source;if((source===window||source===null)&&ev.data==="process-tick"){ev.stopPropagation();if(queue.length>0){var fn=queue.shift();fn()}}},true);return function nextTick(fn){queue.push(fn);window.postMessage("process-tick","*")}}return function nextTick(fn){setTimeout(fn,0)}}();process.title="browser";process.browser=true;process.env={};process.argv=[];function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")}},{}],4:[function(require,module,exports){(function(process){(function(root,factory){if(typeof define==="function"&&define.amd){define(factory)}else if(typeof exports==="object"){module.exports=factory()}else{root.returnExports=factory()}})(this,function(){"use strict";var isCallableWithoutNew=function(func){try{func()}catch(e){return false}return true};var supportsSubclassing=function(C,f){try{var Sub=function(){C.apply(this,arguments)};if(!Sub.__proto__){return false}Object.setPrototypeOf(Sub,C);Sub.prototype=Object.create(C.prototype,{constructor:{value:C}});return f(Sub)}catch(e){return false}};var arePropertyDescriptorsSupported=function(){try{Object.defineProperty({},"x",{});return true}catch(e){return false}};var startsWithRejectsRegex=function(){var rejectsRegex=false;if(String.prototype.startsWith){try{"/a/".startsWith(/a/)}catch(e){rejectsRegex=true}}return rejectsRegex};var getGlobal=new Function("return this;");var globals=getGlobal();var global_isFinite=globals.isFinite;var supportsDescriptors=!!Object.defineProperty&&arePropertyDescriptorsSupported();var startsWithIsCompliant=startsWithRejectsRegex();var _slice=Array.prototype.slice;var _indexOf=String.prototype.indexOf;var _toString=Object.prototype.toString;var _hasOwnProperty=Object.prototype.hasOwnProperty;var ArrayIterator;var defineProperty=function(object,name,value,force){if(!force&&name in object){return}if(supportsDescriptors){Object.defineProperty(object,name,{configurable:true,enumerable:false,writable:true,value:value})}else{object[name]=value}};var defineProperties=function(object,map){Object.keys(map).forEach(function(name){var method=map[name];defineProperty(object,name,method,false)})};var create=Object.create||function(prototype,properties){function Type(){}Type.prototype=prototype;var object=new Type;if(typeof properties!=="undefined"){defineProperties(object,properties)}return object};var $iterator$=typeof Symbol==="function"&&Symbol.iterator||"_es6-shim iterator_";if(globals.Set&&typeof(new globals.Set)["@@iterator"]==="function"){$iterator$="@@iterator"}var addIterator=function(prototype,impl){if(!impl){impl=function iterator(){return this}}var o={};o[$iterator$]=impl;defineProperties(prototype,o);if(!prototype[$iterator$]&&typeof $iterator$==="symbol"){prototype[$iterator$]=impl}};var isArguments=function isArguments(value){var str=_toString.call(value);var result=str==="[object Arguments]";if(!result){result=str!=="[object Array]"&&value!==null&&typeof value==="object"&&typeof value.length==="number"&&value.length>=0&&_toString.call(value.callee)==="[object Function]"}return result};var emulateES6construct=function(o){if(!ES.TypeIsObject(o)){throw new TypeError("bad object")}if(!o._es6construct){if(o.constructor&&ES.IsCallable(o.constructor["@@create"])){o=o.constructor["@@create"](o)}defineProperties(o,{_es6construct:true})}return o};var ES={CheckObjectCoercible:function(x,optMessage){if(x==null){throw new TypeError(optMessage||"Cannot call method on "+x)}return x},TypeIsObject:function(x){return x!=null&&Object(x)===x},ToObject:function(o,optMessage){return Object(ES.CheckObjectCoercible(o,optMessage))},IsCallable:function(x){return typeof x==="function"&&_toString.call(x)==="[object Function]"},ToInt32:function(x){return x>>0},ToUint32:function(x){return x>>>0},ToInteger:function(value){var number=+value;if(Number.isNaN(number)){return 0}if(number===0||!Number.isFinite(number)){return number}return(number>0?1:-1)*Math.floor(Math.abs(number))},ToLength:function(value){var len=ES.ToInteger(value);if(len<=0){return 0}if(len>Number.MAX_SAFE_INTEGER){return Number.MAX_SAFE_INTEGER}return len},SameValue:function(a,b){if(a===b){if(a===0){return 1/a===1/b}return true}return Number.isNaN(a)&&Number.isNaN(b)},SameValueZero:function(a,b){return a===b||Number.isNaN(a)&&Number.isNaN(b)},IsIterable:function(o){return ES.TypeIsObject(o)&&(typeof o[$iterator$]!=="undefined"||isArguments(o))},GetIterator:function(o){if(isArguments(o)){return new ArrayIterator(o,"value")}var itFn=o[$iterator$];if(!ES.IsCallable(itFn)){throw new TypeError("value is not an iterable")}var it=itFn.call(o);if(!ES.TypeIsObject(it)){throw new TypeError("bad iterator")}return it},IteratorNext:function(it){var result=arguments.length>1?it.next(arguments[1]):it.next();if(!ES.TypeIsObject(result)){throw new TypeError("bad iterator")}return result},Construct:function(C,args){var obj;if(ES.IsCallable(C["@@create"])){obj=C["@@create"]()}else{obj=create(C.prototype||null)}defineProperties(obj,{_es6construct:true});var result=C.apply(obj,args);return ES.TypeIsObject(result)?result:obj}};var numberConversion=function(){function roundToEven(n){var w=Math.floor(n),f=n-w;if(f<.5){return w}if(f>.5){return w+1}return w%2?w+1:w}function packIEEE754(v,ebits,fbits){var bias=(1<<ebits-1)-1,s,e,f,i,bits,str,bytes;if(v!==v){e=(1<<ebits)-1;f=Math.pow(2,fbits-1);s=0}else if(v===Infinity||v===-Infinity){e=(1<<ebits)-1;f=0;s=v<0?1:0}else if(v===0){e=0;f=0;s=1/v===-Infinity?1:0}else{s=v<0;v=Math.abs(v);if(v>=Math.pow(2,1-bias)){e=Math.min(Math.floor(Math.log(v)/Math.LN2),1023);f=roundToEven(v/Math.pow(2,e)*Math.pow(2,fbits));if(f/Math.pow(2,fbits)>=2){e=e+1;f=1}if(e>bias){e=(1<<ebits)-1;f=0}else{e=e+bias;f=f-Math.pow(2,fbits)}}else{e=0;f=roundToEven(v/Math.pow(2,1-bias-fbits))}}bits=[];for(i=fbits;i;i-=1){bits.push(f%2?1:0);f=Math.floor(f/2)}for(i=ebits;i;i-=1){bits.push(e%2?1:0);e=Math.floor(e/2)}bits.push(s?1:0);bits.reverse();str=bits.join("");bytes=[];while(str.length){bytes.push(parseInt(str.slice(0,8),2));str=str.slice(8)}return bytes}function unpackIEEE754(bytes,ebits,fbits){var bits=[],i,j,b,str,bias,s,e,f;for(i=bytes.length;i;i-=1){b=bytes[i-1];for(j=8;j;j-=1){bits.push(b%2?1:0);b=b>>1}}bits.reverse();str=bits.join("");bias=(1<<ebits-1)-1;s=parseInt(str.slice(0,1),2)?-1:1;e=parseInt(str.slice(1,1+ebits),2);f=parseInt(str.slice(1+ebits),2);if(e===(1<<ebits)-1){return f!==0?NaN:s*Infinity}else if(e>0){return s*Math.pow(2,e-bias)*(1+f/Math.pow(2,fbits))}else if(f!==0){return s*Math.pow(2,-(bias-1))*(f/Math.pow(2,fbits))}else{return s<0?-0:0}}function unpackFloat64(b){return unpackIEEE754(b,11,52)}function packFloat64(v){return packIEEE754(v,11,52)}function unpackFloat32(b){return unpackIEEE754(b,8,23)}function packFloat32(v){return packIEEE754(v,8,23)}var conversions={toFloat32:function(num){return unpackFloat32(packFloat32(num))}};if(typeof Float32Array!=="undefined"){var float32array=new Float32Array(1);conversions.toFloat32=function(num){float32array[0]=num;return float32array[0]}}return conversions}();defineProperties(String,{fromCodePoint:function fromCodePoint(_){var result=[];var next;for(var i=0,length=arguments.length;i<length;i++){next=Number(arguments[i]);if(!ES.SameValue(next,ES.ToInteger(next))||next<0||next>1114111){throw new RangeError("Invalid code point "+next)}if(next<65536){result.push(String.fromCharCode(next))}else{next-=65536;result.push(String.fromCharCode((next>>10)+55296));result.push(String.fromCharCode(next%1024+56320))}}return result.join("")},raw:function raw(callSite){var cooked=ES.ToObject(callSite,"bad callSite");var rawValue=cooked.raw;var rawString=ES.ToObject(rawValue,"bad raw value");var len=rawString.length;var literalsegments=ES.ToLength(len);if(literalsegments<=0){return""}var stringElements=[];var nextIndex=0;var nextKey,next,nextSeg,nextSub;while(nextIndex<literalsegments){nextKey=String(nextIndex);next=rawString[nextKey];nextSeg=String(next);stringElements.push(nextSeg);if(nextIndex+1>=literalsegments){break}next=nextIndex+1<arguments.length?arguments[nextIndex+1]:"";nextSub=String(next);stringElements.push(nextSub);nextIndex++}return stringElements.join("")}});if(String.fromCodePoint.length!==1){var originalFromCodePoint=String.fromCodePoint;defineProperty(String,"fromCodePoint",function(_){return originalFromCodePoint.apply(this,arguments)},true)}var StringShims={repeat:function(){var repeat=function(s,times){if(times<1){return""}if(times%2){return repeat(s,times-1)+s}var half=repeat(s,times/2);return half+half};return function(times){var thisStr=String(ES.CheckObjectCoercible(this));times=ES.ToInteger(times);if(times<0||times===Infinity){throw new RangeError("Invalid String#repeat value")}return repeat(thisStr,times)}}(),startsWith:function(searchStr){var thisStr=String(ES.CheckObjectCoercible(this));if(_toString.call(searchStr)==="[object RegExp]"){throw new TypeError('Cannot call method "startsWith" with a regex')}searchStr=String(searchStr);var startArg=arguments.length>1?arguments[1]:void 0;var start=Math.max(ES.ToInteger(startArg),0);return thisStr.slice(start,start+searchStr.length)===searchStr},endsWith:function(searchStr){var thisStr=String(ES.CheckObjectCoercible(this));if(_toString.call(searchStr)==="[object RegExp]"){throw new TypeError('Cannot call method "endsWith" with a regex')}searchStr=String(searchStr);var thisLen=thisStr.length;var posArg=arguments.length>1?arguments[1]:void 0;var pos=typeof posArg==="undefined"?thisLen:ES.ToInteger(posArg);var end=Math.min(Math.max(pos,0),thisLen);return thisStr.slice(end-searchStr.length,end)===searchStr},includes:function includes(searchString){var position=arguments.length>1?arguments[1]:void 0;return _indexOf.call(this,searchString,position)!==-1},codePointAt:function(pos){var thisStr=String(ES.CheckObjectCoercible(this));var position=ES.ToInteger(pos);var length=thisStr.length;if(position<0||position>=length){return}var first=thisStr.charCodeAt(position);var isEnd=position+1===length;if(first<55296||first>56319||isEnd){return first}var second=thisStr.charCodeAt(position+1);if(second<56320||second>57343){return first}return(first-55296)*1024+(second-56320)+65536}};defineProperties(String.prototype,StringShims);var hasStringTrimBug="".trim().length!==1;if(hasStringTrimBug){var originalStringTrim=String.prototype.trim;delete String.prototype.trim;var ws=["	\n\f\r   ᠎    ","         　\u2028","\u2029﻿"].join("");var trimRegexp=new RegExp("(^["+ws+"]+)|(["+ws+"]+$)","g");defineProperties(String.prototype,{trim:function(){if(typeof this==="undefined"||this===null){throw new TypeError("can't convert "+this+" to object")}return String(this).replace(trimRegexp,"")}})}var StringIterator=function(s){this._s=String(ES.CheckObjectCoercible(s));this._i=0};StringIterator.prototype.next=function(){var s=this._s,i=this._i;if(typeof s==="undefined"||i>=s.length){this._s=void 0;return{value:void 0,done:true}}var first=s.charCodeAt(i),second,len;if(first<55296||first>56319||i+1==s.length){len=1}else{second=s.charCodeAt(i+1);len=second<56320||second>57343?1:2}this._i=i+len;return{value:s.substr(i,len),done:false}};addIterator(StringIterator.prototype);addIterator(String.prototype,function(){return new StringIterator(this)});if(!startsWithIsCompliant){String.prototype.startsWith=StringShims.startsWith;String.prototype.endsWith=StringShims.endsWith}var ArrayShims={from:function(iterable){var mapFn=arguments.length>1?arguments[1]:void 0;var list=ES.ToObject(iterable,"bad iterable");if(typeof mapFn!=="undefined"&&!ES.IsCallable(mapFn)){throw new TypeError("Array.from: when provided, the second argument must be a function")}var hasThisArg=arguments.length>2;var thisArg=hasThisArg?arguments[2]:void 0;var usingIterator=ES.IsIterable(list);var length;var result,i,value;if(usingIterator){i=0;result=ES.IsCallable(this)?Object(new this):[];var it=usingIterator?ES.GetIterator(list):null;var iterationValue;do{iterationValue=ES.IteratorNext(it);if(!iterationValue.done){value=iterationValue.value;if(mapFn){result[i]=hasThisArg?mapFn.call(thisArg,value,i):mapFn(value,i)}else{result[i]=value}i+=1}}while(!iterationValue.done);length=i}else{length=ES.ToLength(list.length);result=ES.IsCallable(this)?Object(new this(length)):new Array(length);for(i=0;i<length;++i){value=list[i];if(mapFn){result[i]=hasThisArg?mapFn.call(thisArg,value,i):mapFn(value,i)}else{result[i]=value}}}result.length=length;return result},of:function(){return Array.from(arguments)}};defineProperties(Array,ArrayShims);var arrayFromSwallowsNegativeLengths=function(){try{return Array.from({length:-1}).length===0}catch(e){return false}};if(!arrayFromSwallowsNegativeLengths()){defineProperty(Array,"from",ArrayShims.from,true)}ArrayIterator=function(array,kind){this.i=0;this.array=array;this.kind=kind};defineProperties(ArrayIterator.prototype,{next:function(){var i=this.i,array=this.array;if(!(this instanceof ArrayIterator)){throw new TypeError("Not an ArrayIterator")}if(typeof array!=="undefined"){var len=ES.ToLength(array.length);for(;i<len;i++){var kind=this.kind;var retval;if(kind==="key"){retval=i}else if(kind==="value"){retval=array[i]}else if(kind==="entry"){retval=[i,array[i]]}this.i=i+1;return{value:retval,done:false}}}this.array=void 0;return{value:void 0,done:true}}});addIterator(ArrayIterator.prototype);var ArrayPrototypeShims={copyWithin:function(target,start){var end=arguments[2];var o=ES.ToObject(this);var len=ES.ToLength(o.length);target=ES.ToInteger(target);start=ES.ToInteger(start);var to=target<0?Math.max(len+target,0):Math.min(target,len);var from=start<0?Math.max(len+start,0):Math.min(start,len);end=typeof end==="undefined"?len:ES.ToInteger(end);var fin=end<0?Math.max(len+end,0):Math.min(end,len);var count=Math.min(fin-from,len-to);var direction=1;if(from<to&&to<from+count){direction=-1;from+=count-1;to+=count-1}while(count>0){if(_hasOwnProperty.call(o,from)){o[to]=o[from]}else{delete o[from]}from+=direction;to+=direction;count-=1}return o},fill:function(value){var start=arguments.length>1?arguments[1]:void 0;var end=arguments.length>2?arguments[2]:void 0;var O=ES.ToObject(this);var len=ES.ToLength(O.length);start=ES.ToInteger(typeof start==="undefined"?0:start);end=ES.ToInteger(typeof end==="undefined"?len:end);var relativeStart=start<0?Math.max(len+start,0):Math.min(start,len);var relativeEnd=end<0?len+end:end;for(var i=relativeStart;i<len&&i<relativeEnd;++i){O[i]=value}return O},find:function find(predicate){var list=ES.ToObject(this);var length=ES.ToLength(list.length);if(!ES.IsCallable(predicate)){throw new TypeError("Array#find: predicate must be a function")}var thisArg=arguments.length>1?arguments[1]:null;for(var i=0,value;i<length;i++){value=list[i];if(thisArg){if(predicate.call(thisArg,value,i,list)){return value}}else{if(predicate(value,i,list)){return value}}}return},findIndex:function findIndex(predicate){var list=ES.ToObject(this);var length=ES.ToLength(list.length);if(!ES.IsCallable(predicate)){throw new TypeError("Array#findIndex: predicate must be a function")}var thisArg=arguments.length>1?arguments[1]:null;for(var i=0;i<length;i++){if(thisArg){if(predicate.call(thisArg,list[i],i,list)){return i}}else{if(predicate(list[i],i,list)){return i}}}return-1},keys:function(){return new ArrayIterator(this,"key")},values:function(){return new ArrayIterator(this,"value")},entries:function(){return new ArrayIterator(this,"entry")}};if(Array.prototype.keys&&!ES.IsCallable([1].keys().next)){delete Array.prototype.keys}if(Array.prototype.entries&&!ES.IsCallable([1].entries().next)){delete Array.prototype.entries}if(Array.prototype.keys&&Array.prototype.entries&&!Array.prototype.values&&Array.prototype[$iterator$]){defineProperties(Array.prototype,{values:Array.prototype[$iterator$]})}defineProperties(Array.prototype,ArrayPrototypeShims);addIterator(Array.prototype,function(){return this.values()});if(Object.getPrototypeOf){addIterator(Object.getPrototypeOf([].values()))}var maxSafeInteger=Math.pow(2,53)-1;defineProperties(Number,{MAX_SAFE_INTEGER:maxSafeInteger,MIN_SAFE_INTEGER:-maxSafeInteger,EPSILON:2.220446049250313e-16,parseInt:globals.parseInt,parseFloat:globals.parseFloat,isFinite:function(value){return typeof value==="number"&&global_isFinite(value)},isInteger:function(value){return Number.isFinite(value)&&ES.ToInteger(value)===value},isSafeInteger:function(value){return Number.isInteger(value)&&Math.abs(value)<=Number.MAX_SAFE_INTEGER},isNaN:function(value){return value!==value}});if(![,1].find(function(item,idx){return idx===0})){defineProperty(Array.prototype,"find",ArrayPrototypeShims.find,true)}if([,1].findIndex(function(item,idx){return idx===0})!==0){defineProperty(Array.prototype,"findIndex",ArrayPrototypeShims.findIndex,true)}if(supportsDescriptors){defineProperties(Object,{getPropertyDescriptor:function(subject,name){var pd=Object.getOwnPropertyDescriptor(subject,name);var proto=Object.getPrototypeOf(subject);while(typeof pd==="undefined"&&proto!==null){pd=Object.getOwnPropertyDescriptor(proto,name);proto=Object.getPrototypeOf(proto)}return pd},getPropertyNames:function(subject){var result=Object.getOwnPropertyNames(subject);var proto=Object.getPrototypeOf(subject);var addProperty=function(property){if(result.indexOf(property)===-1){result.push(property)}};while(proto!==null){Object.getOwnPropertyNames(proto).forEach(addProperty);proto=Object.getPrototypeOf(proto)}return result}});defineProperties(Object,{assign:function(target,source){if(!ES.TypeIsObject(target)){throw new TypeError("target must be an object")}return Array.prototype.reduce.call(arguments,function(target,source){return Object.keys(Object(source)).reduce(function(target,key){target[key]=source[key];return target},target)})},is:function(a,b){return ES.SameValue(a,b)},setPrototypeOf:function(Object,magic){var set;var checkArgs=function(O,proto){if(!ES.TypeIsObject(O)){throw new TypeError("cannot set prototype on a non-object")}if(!(proto===null||ES.TypeIsObject(proto))){throw new TypeError("can only set prototype to an object or null"+proto)}};var setPrototypeOf=function(O,proto){checkArgs(O,proto);set.call(O,proto);return O};try{set=Object.getOwnPropertyDescriptor(Object.prototype,magic).set;set.call({},null)}catch(e){if(Object.prototype!=={}[magic]){return}set=function(proto){this[magic]=proto};setPrototypeOf.polyfill=setPrototypeOf(setPrototypeOf({},null),Object.prototype)instanceof Object}return setPrototypeOf}(Object,"__proto__")})}if(Object.setPrototypeOf&&Object.getPrototypeOf&&Object.getPrototypeOf(Object.setPrototypeOf({},null))!==null&&Object.getPrototypeOf(Object.create(null))===null){(function(){var FAKENULL=Object.create(null);var gpo=Object.getPrototypeOf,spo=Object.setPrototypeOf;Object.getPrototypeOf=function(o){var result=gpo(o);return result===FAKENULL?null:result};Object.setPrototypeOf=function(o,p){if(p===null){p=FAKENULL}return spo(o,p)};Object.setPrototypeOf.polyfill=false})()}try{Object.keys("foo")}catch(e){var originalObjectKeys=Object.keys;Object.keys=function(obj){return originalObjectKeys(ES.ToObject(obj))}}var MathShims={acosh:function(value){value=Number(value);if(Number.isNaN(value)||value<1){return NaN}if(value===1){return 0}if(value===Infinity){return value}return Math.log(value+Math.sqrt(value*value-1))},asinh:function(value){value=Number(value);if(value===0||!global_isFinite(value)){return value}return value<0?-Math.asinh(-value):Math.log(value+Math.sqrt(value*value+1))},atanh:function(value){value=Number(value);if(Number.isNaN(value)||value<-1||value>1){return NaN}if(value===-1){return-Infinity}if(value===1){return Infinity}if(value===0){return value}return.5*Math.log((1+value)/(1-value))},cbrt:function(value){value=Number(value);if(value===0){return value}var negate=value<0,result;if(negate){value=-value}result=Math.pow(value,1/3);return negate?-result:result},clz32:function(value){value=Number(value);var number=ES.ToUint32(value);if(number===0){return 32}return 32-number.toString(2).length},cosh:function(value){value=Number(value);if(value===0){return 1}if(Number.isNaN(value)){return NaN}if(!global_isFinite(value)){return Infinity}if(value<0){value=-value}if(value>21){return Math.exp(value)/2}return(Math.exp(value)+Math.exp(-value))/2},expm1:function(value){value=Number(value);if(value===-Infinity){return-1}if(!global_isFinite(value)||value===0){return value}return Math.exp(value)-1},hypot:function(x,y){var anyNaN=false;var allZero=true;var anyInfinity=false;var numbers=[];Array.prototype.every.call(arguments,function(arg){var num=Number(arg);if(Number.isNaN(num)){anyNaN=true}else if(num===Infinity||num===-Infinity){anyInfinity=true}else if(num!==0){allZero=false}if(anyInfinity){return false}else if(!anyNaN){numbers.push(Math.abs(num))}return true});if(anyInfinity){return Infinity}if(anyNaN){return NaN}if(allZero){return 0}numbers.sort(function(a,b){return b-a});var largest=numbers[0];var divided=numbers.map(function(number){return number/largest});var sum=divided.reduce(function(sum,number){return sum+=number*number},0);return largest*Math.sqrt(sum)},log2:function(value){return Math.log(value)*Math.LOG2E},log10:function(value){return Math.log(value)*Math.LOG10E},log1p:function(value){value=Number(value);if(value<-1||Number.isNaN(value)){return NaN}if(value===0||value===Infinity){return value}if(value===-1){return-Infinity}var result=0;var n=50;if(value<0||value>1){return Math.log(1+value)}for(var i=1;i<n;i++){if(i%2===0){result-=Math.pow(value,i)/i}else{result+=Math.pow(value,i)/i}}return result},sign:function(value){var number=+value;if(number===0){return number}if(Number.isNaN(number)){return number}return number<0?-1:1},sinh:function(value){value=Number(value);if(!global_isFinite(value)||value===0){return value}return(Math.exp(value)-Math.exp(-value))/2},tanh:function(value){value=Number(value);if(Number.isNaN(value)||value===0){return value}if(value===Infinity){return 1}if(value===-Infinity){return-1}return(Math.exp(value)-Math.exp(-value))/(Math.exp(value)+Math.exp(-value))},trunc:function(value){var number=Number(value);return number<0?-Math.floor(-number):Math.floor(number)},imul:function(x,y){x=ES.ToUint32(x);y=ES.ToUint32(y);var ah=x>>>16&65535;var al=x&65535;var bh=y>>>16&65535;var bl=y&65535;return al*bl+(ah*bl+al*bh<<16>>>0)|0},fround:function(x){if(x===0||x===Infinity||x===-Infinity||Number.isNaN(x)){return x}var num=Number(x);return numberConversion.toFloat32(num)}};defineProperties(Math,MathShims);if(Math.imul(4294967295,5)!==-5){Math.imul=MathShims.imul
}var PromiseShim=function(){var Promise,Promise$prototype;ES.IsPromise=function(promise){if(!ES.TypeIsObject(promise)){return false}if(!promise._promiseConstructor){return false}if(typeof promise._status==="undefined"){return false}return true};var PromiseCapability=function(C){if(!ES.IsCallable(C)){throw new TypeError("bad promise constructor")}var capability=this;var resolver=function(resolve,reject){capability.resolve=resolve;capability.reject=reject};capability.promise=ES.Construct(C,[resolver]);if(!capability.promise._es6construct){throw new TypeError("bad promise constructor")}if(!(ES.IsCallable(capability.resolve)&&ES.IsCallable(capability.reject))){throw new TypeError("bad promise constructor")}};var setTimeout=globals.setTimeout;var makeZeroTimeout;if(typeof window!=="undefined"&&ES.IsCallable(window.postMessage)){makeZeroTimeout=function(){var timeouts=[];var messageName="zero-timeout-message";var setZeroTimeout=function(fn){timeouts.push(fn);window.postMessage(messageName,"*")};var handleMessage=function(event){if(event.source==window&&event.data==messageName){event.stopPropagation();if(timeouts.length===0){return}var fn=timeouts.shift();fn()}};window.addEventListener("message",handleMessage,true);return setZeroTimeout}}var makePromiseAsap=function(){var P=globals.Promise;return P&&P.resolve&&function(task){return P.resolve().then(task)}};var enqueue=ES.IsCallable(globals.setImmediate)?globals.setImmediate.bind(globals):typeof process==="object"&&process.nextTick?process.nextTick:makePromiseAsap()||(ES.IsCallable(makeZeroTimeout)?makeZeroTimeout():function(task){setTimeout(task,0)});var triggerPromiseReactions=function(reactions,x){reactions.forEach(function(reaction){enqueue(function(){var handler=reaction.handler;var capability=reaction.capability;var resolve=capability.resolve;var reject=capability.reject;try{var result=handler(x);if(result===capability.promise){throw new TypeError("self resolution")}var updateResult=updatePromiseFromPotentialThenable(result,capability);if(!updateResult){resolve(result)}}catch(e){reject(e)}})})};var updatePromiseFromPotentialThenable=function(x,capability){if(!ES.TypeIsObject(x)){return false}var resolve=capability.resolve;var reject=capability.reject;try{var then=x.then;if(!ES.IsCallable(then)){return false}then.call(x,resolve,reject)}catch(e){reject(e)}return true};var promiseResolutionHandler=function(promise,onFulfilled,onRejected){return function(x){if(x===promise){return onRejected(new TypeError("self resolution"))}var C=promise._promiseConstructor;var capability=new PromiseCapability(C);var updateResult=updatePromiseFromPotentialThenable(x,capability);if(updateResult){return capability.promise.then(onFulfilled,onRejected)}else{return onFulfilled(x)}}};Promise=function(resolver){var promise=this;promise=emulateES6construct(promise);if(!promise._promiseConstructor){throw new TypeError("bad promise")}if(typeof promise._status!=="undefined"){throw new TypeError("promise already initialized")}if(!ES.IsCallable(resolver)){throw new TypeError("not a valid resolver")}promise._status="unresolved";promise._resolveReactions=[];promise._rejectReactions=[];var resolve=function(resolution){if(promise._status!=="unresolved"){return}var reactions=promise._resolveReactions;promise._result=resolution;promise._resolveReactions=void 0;promise._rejectReactions=void 0;promise._status="has-resolution";triggerPromiseReactions(reactions,resolution)};var reject=function(reason){if(promise._status!=="unresolved"){return}var reactions=promise._rejectReactions;promise._result=reason;promise._resolveReactions=void 0;promise._rejectReactions=void 0;promise._status="has-rejection";triggerPromiseReactions(reactions,reason)};try{resolver(resolve,reject)}catch(e){reject(e)}return promise};Promise$prototype=Promise.prototype;defineProperties(Promise,{"@@create":function(obj){var constructor=this;var prototype=constructor.prototype||Promise$prototype;obj=obj||create(prototype);defineProperties(obj,{_status:void 0,_result:void 0,_resolveReactions:void 0,_rejectReactions:void 0,_promiseConstructor:void 0});obj._promiseConstructor=constructor;return obj}});var _promiseAllResolver=function(index,values,capability,remaining){var done=false;return function(x){if(done){return}done=true;values[index]=x;if(--remaining.count===0){var resolve=capability.resolve;resolve(values)}}};Promise.all=function(iterable){var C=this;var capability=new PromiseCapability(C);var resolve=capability.resolve;var reject=capability.reject;try{if(!ES.IsIterable(iterable)){throw new TypeError("bad iterable")}var it=ES.GetIterator(iterable);var values=[],remaining={count:1};for(var index=0;;index++){var next=ES.IteratorNext(it);if(next.done){break}var nextPromise=C.resolve(next.value);var resolveElement=_promiseAllResolver(index,values,capability,remaining);remaining.count++;nextPromise.then(resolveElement,capability.reject)}if(--remaining.count===0){resolve(values)}}catch(e){reject(e)}return capability.promise};Promise.race=function(iterable){var C=this;var capability=new PromiseCapability(C);var resolve=capability.resolve;var reject=capability.reject;try{if(!ES.IsIterable(iterable)){throw new TypeError("bad iterable")}var it=ES.GetIterator(iterable);while(true){var next=ES.IteratorNext(it);if(next.done){break}var nextPromise=C.resolve(next.value);nextPromise.then(resolve,reject)}}catch(e){reject(e)}return capability.promise};Promise.reject=function(reason){var C=this;var capability=new PromiseCapability(C);var reject=capability.reject;reject(reason);return capability.promise};Promise.resolve=function(v){var C=this;if(ES.IsPromise(v)){var constructor=v._promiseConstructor;if(constructor===C){return v}}var capability=new PromiseCapability(C);var resolve=capability.resolve;resolve(v);return capability.promise};Promise.prototype["catch"]=function(onRejected){return this.then(void 0,onRejected)};Promise.prototype.then=function(onFulfilled,onRejected){var promise=this;if(!ES.IsPromise(promise)){throw new TypeError("not a promise")}var C=this.constructor;var capability=new PromiseCapability(C);if(!ES.IsCallable(onRejected)){onRejected=function(e){throw e}}if(!ES.IsCallable(onFulfilled)){onFulfilled=function(x){return x}}var resolutionHandler=promiseResolutionHandler(promise,onFulfilled,onRejected);var resolveReaction={capability:capability,handler:resolutionHandler};var rejectReaction={capability:capability,handler:onRejected};switch(promise._status){case"unresolved":promise._resolveReactions.push(resolveReaction);promise._rejectReactions.push(rejectReaction);break;case"has-resolution":triggerPromiseReactions([resolveReaction],promise._result);break;case"has-rejection":triggerPromiseReactions([rejectReaction],promise._result);break;default:throw new TypeError("unexpected")}return capability.promise};return Promise}();if(globals.Promise){delete globals.Promise.accept;delete globals.Promise.defer;delete globals.Promise.prototype.chain}defineProperties(globals,{Promise:PromiseShim});var promiseSupportsSubclassing=supportsSubclassing(globals.Promise,function(S){return S.resolve(42)instanceof S});var promiseIgnoresNonFunctionThenCallbacks=function(){try{globals.Promise.reject(42).then(null,5).then(null,function(){});return true}catch(ex){return false}}();var promiseRequiresObjectContext=function(){try{Promise.call(3,function(){})}catch(e){return true}return false}();if(!promiseSupportsSubclassing||!promiseIgnoresNonFunctionThenCallbacks||!promiseRequiresObjectContext){globals.Promise=PromiseShim}var testOrder=function(a){var b=Object.keys(a.reduce(function(o,k){o[k]=true;return o},{}));return a.join(":")===b.join(":")};var preservesInsertionOrder=testOrder(["z","a","bb"]);var preservesNumericInsertionOrder=testOrder(["z",1,"a","3",2]);if(supportsDescriptors){var fastkey=function fastkey(key){if(!preservesInsertionOrder){return null}var type=typeof key;if(type==="string"){return"$"+key}else if(type==="number"){if(!preservesNumericInsertionOrder){return"n"+key}return key}return null};var emptyObject=function emptyObject(){return Object.create?Object.create(null):{}};var collectionShims={Map:function(){var empty={};function MapEntry(key,value){this.key=key;this.value=value;this.next=null;this.prev=null}MapEntry.prototype.isRemoved=function(){return this.key===empty};function MapIterator(map,kind){this.head=map._head;this.i=this.head;this.kind=kind}MapIterator.prototype={next:function(){var i=this.i,kind=this.kind,head=this.head,result;if(typeof this.i==="undefined"){return{value:void 0,done:true}}while(i.isRemoved()&&i!==head){i=i.prev}while(i.next!==head){i=i.next;if(!i.isRemoved()){if(kind==="key"){result=i.key}else if(kind==="value"){result=i.value}else{result=[i.key,i.value]}this.i=i;return{value:result,done:false}}}this.i=void 0;return{value:void 0,done:true}}};addIterator(MapIterator.prototype);function Map(iterable){var map=this;if(!ES.TypeIsObject(map)){throw new TypeError("Map does not accept arguments when called as a function")}map=emulateES6construct(map);if(!map._es6map){throw new TypeError("bad map")}var head=new MapEntry(null,null);head.next=head.prev=head;defineProperties(map,{_head:head,_storage:emptyObject(),_size:0});if(typeof iterable!=="undefined"&&iterable!==null){var it=ES.GetIterator(iterable);var adder=map.set;if(!ES.IsCallable(adder)){throw new TypeError("bad map")}while(true){var next=ES.IteratorNext(it);if(next.done){break}var nextItem=next.value;if(!ES.TypeIsObject(nextItem)){throw new TypeError("expected iterable of pairs")}adder.call(map,nextItem[0],nextItem[1])}}return map}var Map$prototype=Map.prototype;defineProperties(Map,{"@@create":function(obj){var constructor=this;var prototype=constructor.prototype||Map$prototype;obj=obj||create(prototype);defineProperties(obj,{_es6map:true});return obj}});Object.defineProperty(Map.prototype,"size",{configurable:true,enumerable:false,get:function(){if(typeof this._size==="undefined"){throw new TypeError("size method called on incompatible Map")}return this._size}});defineProperties(Map.prototype,{get:function(key){var fkey=fastkey(key);if(fkey!==null){var entry=this._storage[fkey];if(entry){return entry.value}else{return}}var head=this._head,i=head;while((i=i.next)!==head){if(ES.SameValueZero(i.key,key)){return i.value}}return},has:function(key){var fkey=fastkey(key);if(fkey!==null){return typeof this._storage[fkey]!=="undefined"}var head=this._head,i=head;while((i=i.next)!==head){if(ES.SameValueZero(i.key,key)){return true}}return false},set:function(key,value){var head=this._head,i=head,entry;var fkey=fastkey(key);if(fkey!==null){if(typeof this._storage[fkey]!=="undefined"){this._storage[fkey].value=value;return this}else{entry=this._storage[fkey]=new MapEntry(key,value);i=head.prev}}while((i=i.next)!==head){if(ES.SameValueZero(i.key,key)){i.value=value;return this}}entry=entry||new MapEntry(key,value);if(ES.SameValue(-0,key)){entry.key=+0}entry.next=this._head;entry.prev=this._head.prev;entry.prev.next=entry;entry.next.prev=entry;this._size+=1;return this},"delete":function(key){var head=this._head,i=head;var fkey=fastkey(key);if(fkey!==null){if(typeof this._storage[fkey]==="undefined"){return false}i=this._storage[fkey].prev;delete this._storage[fkey]}while((i=i.next)!==head){if(ES.SameValueZero(i.key,key)){i.key=i.value=empty;i.prev.next=i.next;i.next.prev=i.prev;this._size-=1;return true}}return false},clear:function(){this._size=0;this._storage=emptyObject();var head=this._head,i=head,p=i.next;while((i=p)!==head){i.key=i.value=empty;p=i.next;i.next=i.prev=head}head.next=head.prev=head},keys:function(){return new MapIterator(this,"key")},values:function(){return new MapIterator(this,"value")},entries:function(){return new MapIterator(this,"key+value")},forEach:function(callback){var context=arguments.length>1?arguments[1]:null;var it=this.entries();for(var entry=it.next();!entry.done;entry=it.next()){if(context){callback.call(context,entry.value[1],entry.value[0],this)}else{callback(entry.value[1],entry.value[0],this)}}}});addIterator(Map.prototype,function(){return this.entries()});return Map}(),Set:function(){var SetShim=function Set(iterable){var set=this;if(!ES.TypeIsObject(set)){throw new TypeError("Set does not accept arguments when called as a function")}set=emulateES6construct(set);if(!set._es6set){throw new TypeError("bad set")}defineProperties(set,{"[[SetData]]":null,_storage:emptyObject()});if(typeof iterable!=="undefined"&&iterable!==null){var it=ES.GetIterator(iterable);var adder=set.add;if(!ES.IsCallable(adder)){throw new TypeError("bad set")}while(true){var next=ES.IteratorNext(it);if(next.done){break}var nextItem=next.value;adder.call(set,nextItem)}}return set};var Set$prototype=SetShim.prototype;defineProperties(SetShim,{"@@create":function(obj){var constructor=this;var prototype=constructor.prototype||Set$prototype;obj=obj||create(prototype);defineProperties(obj,{_es6set:true});return obj}});var ensureMap=function ensureMap(set){if(!set["[[SetData]]"]){var m=set["[[SetData]]"]=new collectionShims.Map;Object.keys(set._storage).forEach(function(k){if(k.charCodeAt(0)===36){k=k.slice(1)}else if(k.charAt(0)==="n"){k=+k.slice(1)}else{k=+k}m.set(k,k)});set._storage=null}};Object.defineProperty(SetShim.prototype,"size",{configurable:true,enumerable:false,get:function(){if(typeof this._storage==="undefined"){throw new TypeError("size method called on incompatible Set")}ensureMap(this);return this["[[SetData]]"].size}});defineProperties(SetShim.prototype,{has:function(key){var fkey;if(this._storage&&(fkey=fastkey(key))!==null){return!!this._storage[fkey]}ensureMap(this);return this["[[SetData]]"].has(key)},add:function(key){var fkey;if(this._storage&&(fkey=fastkey(key))!==null){this._storage[fkey]=true;return this}ensureMap(this);this["[[SetData]]"].set(key,key);return this},"delete":function(key){var fkey;if(this._storage&&(fkey=fastkey(key))!==null){var hasFKey=_hasOwnProperty.call(this._storage,fkey);return delete this._storage[fkey]&&hasFKey}ensureMap(this);return this["[[SetData]]"]["delete"](key)},clear:function(){if(this._storage){this._storage=emptyObject();return}return this["[[SetData]]"].clear()},values:function(){ensureMap(this);return this["[[SetData]]"].values()},entries:function(){ensureMap(this);return this["[[SetData]]"].entries()},forEach:function(callback){var context=arguments.length>1?arguments[1]:null;var entireSet=this;ensureMap(entireSet);this["[[SetData]]"].forEach(function(value,key){if(context){callback.call(context,key,key,entireSet)}else{callback(key,key,entireSet)}})}});defineProperty(SetShim,"keys",SetShim.values,true);addIterator(SetShim.prototype,function(){return this.values()});return SetShim}()};defineProperties(globals,collectionShims);if(globals.Map||globals.Set){if(typeof globals.Map.prototype.clear!=="function"||(new globals.Set).size!==0||(new globals.Map).size!==0||typeof globals.Map.prototype.keys!=="function"||typeof globals.Set.prototype.keys!=="function"||typeof globals.Map.prototype.forEach!=="function"||typeof globals.Set.prototype.forEach!=="function"||isCallableWithoutNew(globals.Map)||isCallableWithoutNew(globals.Set)||!supportsSubclassing(globals.Map,function(M){var m=new M([]);m.set(42,42);return m instanceof M})){globals.Map=collectionShims.Map;globals.Set=collectionShims.Set}}if(globals.Set.prototype.keys!==globals.Set.prototype.values){defineProperty(globals.Set.prototype,"keys",globals.Set.prototype.values,true)}addIterator(Object.getPrototypeOf((new globals.Map).keys()));addIterator(Object.getPrototypeOf((new globals.Set).keys()))}return globals})}).call(this,require("_process"))},{_process:3}],5:[function(require,module,exports){"use strict";if(!require("./is-implemented")()){Object.defineProperty(require("es5-ext/global"),"Symbol",{value:require("./polyfill"),configurable:true,enumerable:false,writable:true})}},{"./is-implemented":6,"./polyfill":21,"es5-ext/global":8}],6:[function(require,module,exports){"use strict";module.exports=function(){var symbol;if(typeof Symbol!=="function")return false;symbol=Symbol("test symbol");try{String(symbol)}catch(e){return false}if(typeof Symbol.iterator==="symbol")return true;if(typeof Symbol.isConcatSpreadable!=="object")return false;if(typeof Symbol.isRegExp!=="object")return false;if(typeof Symbol.iterator!=="object")return false;if(typeof Symbol.toPrimitive!=="object")return false;if(typeof Symbol.toStringTag!=="object")return false;if(typeof Symbol.unscopables!=="object")return false;return true}},{}],7:[function(require,module,exports){"use strict";var assign=require("es5-ext/object/assign"),normalizeOpts=require("es5-ext/object/normalize-options"),isCallable=require("es5-ext/object/is-callable"),contains=require("es5-ext/string/#/contains"),d;d=module.exports=function(dscr,value){var c,e,w,options,desc;if(arguments.length<2||typeof dscr!=="string"){options=value;value=dscr;dscr=null}else{options=arguments[2]}if(dscr==null){c=w=true;e=false}else{c=contains.call(dscr,"c");e=contains.call(dscr,"e");w=contains.call(dscr,"w")}desc={value:value,configurable:c,enumerable:e,writable:w};return!options?desc:assign(normalizeOpts(options),desc)};d.gs=function(dscr,get,set){var c,e,options,desc;if(typeof dscr!=="string"){options=set;set=get;get=dscr;dscr=null}else{options=arguments[3]}if(get==null){get=undefined}else if(!isCallable(get)){options=get;get=set=undefined}else if(set==null){set=undefined}else if(!isCallable(set)){options=set;set=undefined}if(dscr==null){c=true;e=false}else{c=contains.call(dscr,"c");e=contains.call(dscr,"e")}desc={get:get,set:set,configurable:c,enumerable:e};return!options?desc:assign(normalizeOpts(options),desc)}},{"es5-ext/object/assign":9,"es5-ext/object/is-callable":12,"es5-ext/object/normalize-options":16,"es5-ext/string/#/contains":18}],8:[function(require,module,exports){"use strict";module.exports=new Function("return this")()},{}],9:[function(require,module,exports){"use strict";module.exports=require("./is-implemented")()?Object.assign:require("./shim")},{"./is-implemented":10,"./shim":11}],10:[function(require,module,exports){"use strict";module.exports=function(){var assign=Object.assign,obj;if(typeof assign!=="function")return false;obj={foo:"raz"};assign(obj,{bar:"dwa"},{trzy:"trzy"});return obj.foo+obj.bar+obj.trzy==="razdwatrzy"}},{}],11:[function(require,module,exports){"use strict";var keys=require("../keys"),value=require("../valid-value"),max=Math.max;module.exports=function(dest,src){var error,i,l=max(arguments.length,2),assign;dest=Object(value(dest));assign=function(key){try{dest[key]=src[key]}catch(e){if(!error)error=e}};for(i=1;i<l;++i){src=arguments[i];keys(src).forEach(assign)}if(error!==undefined)throw error;return dest}},{"../keys":13,"../valid-value":17}],12:[function(require,module,exports){"use strict";module.exports=function(obj){return typeof obj==="function"}},{}],13:[function(require,module,exports){"use strict";module.exports=require("./is-implemented")()?Object.keys:require("./shim")},{"./is-implemented":14,"./shim":15}],14:[function(require,module,exports){"use strict";module.exports=function(){try{Object.keys("primitive");return true}catch(e){return false}}},{}],15:[function(require,module,exports){"use strict";var keys=Object.keys;module.exports=function(object){return keys(object==null?object:Object(object))}},{}],16:[function(require,module,exports){"use strict";var assign=require("./assign"),forEach=Array.prototype.forEach,create=Object.create,getPrototypeOf=Object.getPrototypeOf,process;process=function(src,obj){var proto=getPrototypeOf(src);return assign(proto?process(proto,obj):obj,src)};module.exports=function(options){var result=create(null);forEach.call(arguments,function(options){if(options==null)return;process(Object(options),result)});return result}},{"./assign":9}],17:[function(require,module,exports){"use strict";module.exports=function(value){if(value==null)throw new TypeError("Cannot use null or undefined");return value}},{}],18:[function(require,module,exports){"use strict";module.exports=require("./is-implemented")()?String.prototype.contains:require("./shim")},{"./is-implemented":19,"./shim":20}],19:[function(require,module,exports){"use strict";var str="razdwatrzy";module.exports=function(){if(typeof str.contains!=="function")return false;return str.contains("dwa")===true&&str.contains("foo")===false}},{}],20:[function(require,module,exports){"use strict";var indexOf=String.prototype.indexOf;module.exports=function(searchString){return indexOf.call(this,searchString,arguments[1])>-1}},{}],21:[function(require,module,exports){"use strict";var d=require("d"),create=Object.create,defineProperties=Object.defineProperties,generateName,Symbol;generateName=function(){var created=create(null);return function(desc){var postfix=0;while(created[desc+(postfix||"")])++postfix;desc+=postfix||"";created[desc]=true;return"@@"+desc}}();module.exports=Symbol=function(description){var symbol;if(this instanceof Symbol){throw new TypeError("TypeError: Symbol is not a constructor")}symbol=create(Symbol.prototype);description=description===undefined?"":String(description);return defineProperties(symbol,{__description__:d("",description),__name__:d("",generateName(description))})};Object.defineProperties(Symbol,{create:d("",Symbol("create")),hasInstance:d("",Symbol("hasInstance")),isConcatSpreadable:d("",Symbol("isConcatSpreadable")),isRegExp:d("",Symbol("isRegExp")),iterator:d("",Symbol("iterator")),toPrimitive:d("",Symbol("toPrimitive")),toStringTag:d("",Symbol("toStringTag")),unscopables:d("",Symbol("unscopables"))});defineProperties(Symbol.prototype,{properToString:d(function(){return"Symbol ("+this.__description__+")"}),toString:d("",function(){return this.__name__})});Object.defineProperty(Symbol.prototype,Symbol.toPrimitive,d("",function(hint){throw new TypeError("Conversion of symbol objects is not allowed")}));Object.defineProperty(Symbol.prototype,Symbol.toStringTag,d("c","Symbol"))},{d:7}]},{},[1]);(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/*global NodeList */
(function (window) {
  "use strict";

  // Get element(s) by CSS selector:
  window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  // addEventListener wrapper:
  window.$on = function (target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture);
  };

  // Register events on elements that may or may not exist yet:
  // $live('div a', 'click', function (event) {});
  window.$live = (function () {
    var dispatchEvent = function (event) {
      var targetElement = event.target;

      eventRegistry[event.type].forEach(function (entry) {
        var potentialElements = window.qsa(entry.selector);
        var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;

        if (hasMatch) {
          entry.handler.call(targetElement, event);
        }
      });
    };

    var eventRegistry = {};

    return function (selector, event, handler) {
      if (!eventRegistry[event]) {
        eventRegistry[event] = [];
        window.$on(document.documentElement, event, dispatchEvent, true);
      }

      eventRegistry[event].push({
        selector: selector,
        handler: handler
      });
    };
  })();

  // Find the element's parent with the given tag name:
  // $parent(qs('a'), 'div');
  window.$parent = function (element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };

  // Allow for looping on nodes by chaining:
  // qsa('.foo').forEach(function () {})
  NodeList.prototype.forEach = Array.prototype.forEach;
})(window);

},{}],2:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

/*jshint eqeqeq:false */

var Store = (function () {
  function Store(name) {
    this._dbName = name;

    if (!localStorage[name]) {
      var data = {
        todos: []
      };

      localStorage[name] = JSON.stringify(data);
    }
  }

  _prototypeProperties(Store, null, {
    find: {
      value: function find(query) {
        var todos = JSON.parse(localStorage[this._dbName]).todos;
        return regeneratorRuntime.mark(function findGenerator() {
          return regeneratorRuntime.wrap(function findGenerator$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return todos.filter(function (todo) {
                  for (var q in query) {
                    if (query[q] !== todo[q]) {
                      return false;
                    }
                  }
                  return true;
                });
              case 2:
              case "end":
                return context$3$0.stop();
            }
          }, findGenerator, this);
        })();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    findAll: {
      value: function findAll() {
        return regeneratorRuntime.mark(function findAllGenerator(dbName) {
          return regeneratorRuntime.wrap(function findAllGenerator$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return JSON.parse(localStorage[dbName]).todos;
              case 2:
              case "end":
                return context$3$0.stop();
            }
          }, findAllGenerator, this);
        })(this._dbName);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    save: {
      value: function save(updateData) {
        var id = arguments[1] === undefined ? false : arguments[1];
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        // If an ID was actually given, find the item and update each property
        if (id) {
          for (var i = 0, len = todos.length; i < len; i++) {
            if (todos[i].id === id) {
              for (var key in updateData) {
                todos[i][key] = updateData[key];
              }
              break;
            }
          }

          localStorage[this._dbName] = JSON.stringify(data);

          return regeneratorRuntime.mark(function updateGenerator(dbName) {
            return regeneratorRuntime.wrap(function updateGenerator$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return JSON.parse(localStorage[dbName]).todos;
                case 2:
                case "end":
                  return context$3$0.stop();
              }
            }, updateGenerator, this);
          })(this._dbName);
        } else {
          // Generate an ID
          updateData.id = new Date().getTime();

          todos.push(updateData);
          localStorage[this._dbName] = JSON.stringify(data);

          return regeneratorRuntime.mark(function updateGenerator() {
            return regeneratorRuntime.wrap(function updateGenerator$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return [updateData];
                case 2:
                case "end":
                  return context$3$0.stop();
              }
            }, updateGenerator, this);
          })();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    remove: {
      value: function remove(id) {
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        for (var i = 0, len = todos.length; i < len; i++) {
          if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
          }
        }

        localStorage[this._dbName] = JSON.stringify(data);
        return regeneratorRuntime.mark(function removeGen(dbName) {
          return regeneratorRuntime.wrap(function removeGen$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return JSON.parse(localStorage[dbName]).todos;
              case 2:
              case "end":
                return context$3$0.stop();
            }
          }, removeGen, this);
        })(this._dbName);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    drop: {
      value: function drop() {
        localStorage[this._dbName] = JSON.stringify({ todos: [] });
        return regeneratorRuntime.mark(function dropGenerator(dbName) {
          return regeneratorRuntime.wrap(function dropGenerator$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.next = 2;
                return JSON.parse(localStorage[this._dbName]).todos;
              case 2:
              case "end":
                return context$3$0.stop();
            }
          }, dropGenerator, this);
        })(this._dbName);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Store;
})();

module.exports = Store;

},{}],3:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var TodoCtrl = (function () {
  function TodoCtrl(model, view) {
    this.model = model;
    this.view = view;
    this._attachEventListeners();
  }

  _prototypeProperties(TodoCtrl, null, {
    setView: {

      /**
       * Loads and initialises the view
       *
       * @param {string} '' | 'active' | 'completed'
       */
      value: function setView(locationHash) {
        var route = locationHash.split("/")[1];
        var page = route || "";
        this._updateFilterState(page);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    showAll: {

      /**
       * An event to fire on load. Will get all items and display them in the
       * todo-list
       */
      value: function showAll() {
        var todos = this.model.read().next();
        this.view.render("showEntries", todos.value);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    showActive: {

      /**
       * Renders all active tasks
       */
      value: function showActive() {
        var activeTodos = this.model.read({ completed: false }).next();
        this.view.render("showEntries", activeTodos.value);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    showCompleted: {

      /**
       * Renders all completed tasks
       */
      value: function showCompleted() {
        var completedTodos = this.model.read({ completed: true }).next();
        this.view.render("showEntries", completedTodos.value);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    addItem: {

      /**
       * An event to fire whenever you want to add an item. Simply pass in the event
       * object and it'll handle the DOM insertion and saving of the new item.
       */
      value: function addItem(title) {
        if (title.trim() === "") {
          return;
        }

        this.model.create(title).next();
        this.view.render("clearNewTodo");
        this._filter(true);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    editItem: {

      /*
       * Triggers the item editing mode.
       */
      value: function editItem(id) {
        var data = this.model.read(id).next();
        this.view.render("editItem", { id: id, title: data.value[0].title });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    editItemSave: {

      /*
       * Finishes the item editing mode successfully.
       */
      value: function editItemSave(id, title) {
        if (title.trim()) {
          this.model.update(id, { title: title }).next();
          this.view.render("editItemDone", { id: id, title: title });
        } else {
          this.removeItem(id);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    editItemCancel: {

      /*
       * Cancels the item editing mode.
       */
      value: function editItemCancel(id) {
        var data = this.model.read(id).next();
        this.view.render("editItemDone", { id: id, title: data.value[0].title });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeItem: {

      /**
       * By giving it an ID it'll find the DOM element matching that ID,
       * remove it from the DOM and also remove it from storage.
       *
       * @param {number} id The ID of the item to remove from the DOM and
       * storage
       */
      value: function removeItem(id) {
        this.model.remove(id).next();
        this.view.render("removeItem", id);
        this._filter();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeCompletedItems: {

      /**
       * Will remove all completed items from the DOM and storage.
       */
      value: function removeCompletedItems() {
        var _this = this;
        var completed = this.model.read({ completed: true }).next();
        completed.value.forEach(function (item) {
          _this.removeItem(item.id);
        });
        this._filter();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    toggleComplete: {

      /**
       * Give it an ID of a model and a checkbox and it will update the item
       * in storage based on the checkbox's state.
       *
       * @param {number} id The ID of the element to complete or uncomplete
       * @param {object} checkbox The checkbox to check the state of complete
       *                          or not
       * @param {boolean|undefined} silent Prevent re-filtering the todo items
       */
      value: function toggleComplete(id, completed, silent) {
        this.model.update(id, { completed: completed }).next();
        this.view.render("elementComplete", {
          id: id,
          completed: completed
        });

        if (!silent) {
          this._filter();
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    toggleAll: {

      /**
       * Will toggle ALL checkboxe's on/off state and completeness of models.
       * Just pass in the event object.
       */
      value: function toggleAll(completed) {
        var _this2 = this;
        var todos = this.model.read({ completed: !completed }).next();
        todos.value.forEach(function (item) {
          _this2.toggleComplete(item.id, completed, true);
        });

        this._filter();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _attachEventListeners: {
      value: function AttachEventListeners() {
        var that = this;
        this.view.bind("newTodo", function (title) {
          that.addItem(title);
        });

        this.view.bind("itemEdit", function (item) {
          that.editItem(item.id);
        });

        this.view.bind("itemEditDone", function (item) {
          that.editItemSave(item.id, item.title);
        });

        this.view.bind("itemEditCancel", function (item) {
          that.editItemCancel(item.id);
        });

        this.view.bind("itemRemove", function (item) {
          that.removeItem(item.id);
        });

        this.view.bind("itemToggle", function (item) {
          that.toggleComplete(item.id, item.completed);
        });

        this.view.bind("removeCompleted", function () {
          that.removeCompletedItems();
        });

        this.view.bind("toggleAll", function (status) {
          that.toggleAll(status.completed);
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _updateCount: {

      /**
       * Updates the pieces of the page which change depending on the remaining
       * number of todos.
       */
      value: function UpdateCount() {
        var todos = this.model.getCount();
        this.view.render("updateElementCount", todos.active);
        this.view.render("clearCompletedButton", {
          completed: todos.completed,
          visible: todos.completed > 0
        });

        this.view.render("toggleAll", { checked: todos.completed === todos.total });
        this.view.render("contentBlockVisibility", { visible: todos.total > 0 });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _filter: {

      /**
       * Re-filters the todo items, based on the active route.
       * @param {boolean|undefined} force  forces a re-painting of todo items.
       */
      value: function Filter(force) {
        var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

        // Update the elements on the page, which change with each completed todo
        this._updateCount();

        // If the last active route isn't "All", or we're switching routes, we
        // re-create the todo item elements, calling:
        //   this.show[All|Active|Completed]();
        if (force || this._lastActiveRoute !== "All" || this._lastActiveRoute !== activeRoute) {
          this["show" + activeRoute]();
        }

        this._lastActiveRoute = activeRoute;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _updateFilterState: {

      /**
       * Simply updates the filter nav's selected states
       */
      value: function UpdateFilterState(currentPage) {
        // Store a reference to the active route, allowing us to re-filter todo
        // items as they are marked complete or incomplete.
        this._activeRoute = currentPage;

        if (currentPage === "") {
          this._activeRoute = "All";
        }

        this._filter();

        this.view.render("setFilter", currentPage);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TodoCtrl;
})();

module.exports = TodoCtrl;

},{}],4:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var TodoModel = (function () {
  function TodoModel(storage) {
    this.storage = storage;
  }

  _prototypeProperties(TodoModel, null, {
    create: {
      value: function create(title) {
        title = title || "";

        var newItem = {
          title: title.trim(),
          completed: false
        };

        return this.storage.save(newItem);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    read: {
      value: function read(query) {
        var queryType = typeof query;
        switch (queryType) {
          case queryType === "function":
            return this.storage.findAll();
          case queryType === "string":
          case queryType === "number":
            return this.storage.find({ id: parseInt(query, 10) });
          default:
            return this.storage.find(query);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    update: {
      value: function update(id, data) {
        return this.storage.save(data, id);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    remove: {
      value: function remove(id) {
        return this.storage.remove(id);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    removeAll: {
      value: function removeAll() {
        return this.storage.drop();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getCount: {
      value: function getCount() {
        var todoCounts = {
          active: 0,
          completed: 0,
          total: 0
        };

        var todos = this.storage.findAll().next();
        todos.value.forEach(function (todo) {
          if (todo.completed) {
            todoCounts.completed++;
          } else {
            todoCounts.active++;
          }
          todoCounts.total++;
        });

        return todoCounts;
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TodoModel;
})();

module.exports = TodoModel;

},{}],5:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var TodoTemplate = (function () {
  function TodoTemplate() {
    this.defaultTemplate = "<li data-id=\"{{id}}\" class=\"{{completed}}\">" + "<div class=\"view\">" + "<input class=\"toggle\" type=\"checkbox\" {{checked}}>" + "<label>{{title}}</label>" + "<button class=\"destroy\"></button>" + "</div>" + "</li>";
  }

  _prototypeProperties(TodoTemplate, null, {
    show: {
      value: function show(data) {
        var i, l;
        var view = "";

        for (i = 0, l = data.length; i < l; i++) {
          var template = this.defaultTemplate;
          var completed = "";
          var checked = "";

          if (data[i].completed) {
            completed = "completed";
            checked = "checked";
          }

          template = template.replace("{{id}}", data[i].id);
          template = template.replace("{{title}}", data[i].title);
          template = template.replace("{{completed}}", completed);
          template = template.replace("{{checked}}", checked);

          view = view + template;
        }

        return view;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    itemCounter: {
      value: function itemCounter(activeTodos) {
        var plural = activeTodos === 1 ? "" : "s";

        return "<strong>" + activeTodos + "</strong> item" + plural + " left";
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    clearCompletedButton: {
      value: function clearCompletedButton(completedTodos) {
        return completedTodos > 0 ? "Clear completed (" + completedTodos + ")" : "";
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TodoTemplate;
})();

module.exports = TodoTemplate;

},{}],6:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var TodoView = (function () {
  /**
   * View that abstracts away the browser's DOM completely.
   * It has two simple entry points:
   *
   *   - bind(eventName, handler)
   *     Takes a todo application event and registers the handler
   *   - render(command, parameterObject)
   *     Renders the given command with the options
   */
  function TodoView(template) {
    this.template = template;

    this.ENTER_KEY = 13;
    this.ESCAPE_KEY = 27;

    this.$todoList = qs("#todo-list");
    this.$todoItemCounter = qs("#todo-count");
    this.$clearCompleted = qs("#clear-completed");
    this.$main = qs("#main");
    this.$footer = qs("#footer");
    this.$toggleAll = qs("#toggle-all");
    this.$newTodo = qs("#new-todo");
  }

  _prototypeProperties(TodoView, null, {
    _removeItem: {
      value: function RemoveItem(id) {
        var elem = qs("[data-id=\"" + id + "\"]");

        if (elem) {
          this.$todoList.removeChild(elem);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _clearCompletedButton: {
      value: function ClearCompletedButton(completedCount, visible) {
        this.$clearCompleted.innerHTML = this.template.clearCompletedButton(completedCount);
        this.$clearCompleted.style.display = visible ? "block" : "none";
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _setFilter: {
      value: function SetFilter(currentPage) {
        qs("#filters .selected").className = "";
        qs("#filters [href=\"#/" + currentPage + "\"]").className = "selected";
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _elementComplete: {
      value: function ElementComplete(id, completed) {
        var listItem = qs("[data-id=\"" + id + "\"]");

        if (!listItem) {
          return;
        }

        listItem.className = completed ? "completed" : "";

        // In case it was toggled from an event and not by clicking the checkbox
        qs("input", listItem).checked = completed;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _editItem: {
      value: function EditItem(id, title) {
        var listItem = qs("[data-id=\"" + id + "\"]");

        if (!listItem) {
          return;
        }

        listItem.className = listItem.className + " editing";

        var input = document.createElement("input");
        input.className = "edit";

        listItem.appendChild(input);
        input.focus();
        input.value = title;
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _editItemDone: {
      value: function EditItemDone(id, title) {
        var listItem = qs("[data-id=\"" + id + "\"]");

        if (!listItem) {
          return;
        }

        var input = qs("input.edit", listItem);
        listItem.removeChild(input);

        listItem.className = listItem.className.replace("editing", "");

        qsa("label", listItem).forEach(function (label) {
          label.textContent = title;
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    render: {
      value: function render(viewCmd, parameter) {
        var that = this;
        var viewCommands = {
          showEntries: function () {
            that.$todoList.innerHTML = that.template.show(parameter);
          },
          removeItem: function () {
            that._removeItem(parameter);
          },
          updateElementCount: function () {
            that.$todoItemCounter.innerHTML = that.template.itemCounter(parameter);
          },
          clearCompletedButton: function () {
            that._clearCompletedButton(parameter.completed, parameter.visible);
          },
          contentBlockVisibility: function () {
            that.$main.style.display = that.$footer.style.display = parameter.visible ? "block" : "none";
          },
          toggleAll: function () {
            that.$toggleAll.checked = parameter.checked;
          },
          setFilter: function () {
            that._setFilter(parameter);
          },
          clearNewTodo: function () {
            that.$newTodo.value = "";
          },
          elementComplete: function () {
            that._elementComplete(parameter.id, parameter.completed);
          },
          editItem: function () {
            that._editItem(parameter.id, parameter.title);
          },
          editItemDone: function () {
            that._editItemDone(parameter.id, parameter.title);
          }
        };

        viewCommands[viewCmd]();
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _itemId: {
      value: function ItemId(element) {
        var li = $parent(element, "li");
        return parseInt(li.getAttribute("data-id"), 10);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _bindItemEditDone: {
      value: function BindItemEditDone(handler) {
        var that = this;
        $live("#todo-list li .edit", "blur", function () {
          if (!this.getAttribute("data-iscanceled")) {
            handler({
              id: that._itemId(this),
              title: this.value
            });
          }
        });

        $live("#todo-list li .edit", "keypress", function (event) {
          if (event.keyCode === that.ENTER_KEY) {
            // Remove the cursor from the input when you hit enter just like if it
            // were a real form
            this.blur();
          }
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    _bindItemEditCancel: {
      value: function BindItemEditCancel(handler) {
        var that = this;
        $live("#todo-list li .edit", "keyup", function (event) {
          if (event.keyCode === that.ESCAPE_KEY) {
            this.setAttribute("data-iscanceled", true);
            this.blur();

            handler({ id: that._itemId(this) });
          }
        });
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    bind: {
      value: function bind(event, handler) {
        var that = this;
        if (event === "newTodo") {
          $on(that.$newTodo, "change", function () {
            handler(that.$newTodo.value);
          });
        } else if (event === "removeCompleted") {
          $on(that.$clearCompleted, "click", function () {
            handler();
          });
        } else if (event === "toggleAll") {
          $on(that.$toggleAll, "click", function () {
            handler({ completed: this.checked });
          });
        } else if (event === "itemEdit") {
          $live("#todo-list li label", "dblclick", function () {
            handler({ id: that._itemId(this) });
          });
        } else if (event === "itemRemove") {
          $live("#todo-list .destroy", "click", function () {
            handler({ id: that._itemId(this) });
          });
        } else if (event === "itemToggle") {
          $live("#todo-list .toggle", "click", function () {
            handler({
              id: that._itemId(this),
              completed: this.checked
            });
          });
        } else if (event === "itemEditDone") {
          that._bindItemEditDone(handler);
        } else if (event === "itemEditCancel") {
          that._bindItemEditCancel(handler);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TodoView;
})();

module.exports = TodoView;

},{}],7:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

var Store = _interopRequire(require("./Store"));

var Model = _interopRequire(require("./TodoModel"));

var Template = _interopRequire(require("./TodoTemplate"));

var Controller = _interopRequire(require("./TodoCtrl"));

var View = _interopRequire(require("./TodoView"));

require("./Helpers");

var TodoApp = (function () {
  function TodoApp(name) {
    this.storage = new Store(name);
    this.model = new Model(this.storage);
    this.template = new Template();
    this.view = new View(this.template);
    this.controller = new Controller(this.model, this.view);
  }

  _prototypeProperties(TodoApp, null, {
    setView: {
      value: function setView() {
        todo.controller.setView(document.location.hash);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return TodoApp;
})();

try {
  var todo = new TodoApp("todos");
  $on(window, "load", todo.setView);
  $on(window, "hashchange", todo.setView);
} catch (e) {
  console.log("App Could Not Be Started.");
}

window.app = {
  Controller: Controller,
  Model: Model,
  Template: Template,
  View: View
};

module.exports = todo;

},{"./Helpers":1,"./Store":2,"./TodoCtrl":3,"./TodoModel":4,"./TodoTemplate":5,"./TodoView":6}]},{},[1,2,3,4,5,6,7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvd2VzdGludy90b2RvbXZjLWVzNi9qcy9IZWxwZXJzLmpzIiwiL1VzZXJzL3dlc3RpbncvdG9kb212Yy1lczYvanMvU3RvcmUuanMiLCIvVXNlcnMvd2VzdGludy90b2RvbXZjLWVzNi9qcy9Ub2RvQ3RybC5qcyIsIi9Vc2Vycy93ZXN0aW53L3RvZG9tdmMtZXM2L2pzL1RvZG9Nb2RlbC5qcyIsIi9Vc2Vycy93ZXN0aW53L3RvZG9tdmMtZXM2L2pzL1RvZG9UZW1wbGF0ZS5qcyIsIi9Vc2Vycy93ZXN0aW53L3RvZG9tdmMtZXM2L2pzL1RvZG9WaWV3LmpzIiwiL1VzZXJzL3dlc3RpbncvdG9kb212Yy1lczYvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7QUNDQSxDQUFDLFVBQVUsTUFBTSxFQUFFO0FBQ2xCLGNBQVksQ0FBQzs7O0FBR2IsUUFBTSxDQUFDLEVBQUUsR0FBRyxVQUFVLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDdEMsV0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUEsQ0FBRSxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDbkQsQ0FBQztBQUNGLFFBQU0sQ0FBQyxHQUFHLEdBQUcsVUFBVSxRQUFRLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLFdBQU8sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFBLENBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDdEQsQ0FBQzs7O0FBR0YsUUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtBQUMxRCxVQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7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LFlBQVUsRUFBRSxVQUFVO0FBQ3RCLE9BQUssRUFBRSxLQUFLO0FBQ1osVUFBUSxFQUFFLFFBQVE7QUFDbEIsTUFBSSxFQUFFLElBQUk7Q0FDVixDQUFDOztpQkFFYSxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qZ2xvYmFsIE5vZGVMaXN0ICovXG4oZnVuY3Rpb24gKHdpbmRvdykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0Ly8gR2V0IGVsZW1lbnQocykgYnkgQ1NTIHNlbGVjdG9yOlxuXHR3aW5kb3cucXMgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHNjb3BlKSB7XG5cdFx0cmV0dXJuIChzY29wZSB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cdH07XG5cdHdpbmRvdy5xc2EgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIHNjb3BlKSB7XG5cdFx0cmV0dXJuIChzY29wZSB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cdH07XG5cblx0Ly8gYWRkRXZlbnRMaXN0ZW5lciB3cmFwcGVyOlxuXHR3aW5kb3cuJG9uID0gZnVuY3Rpb24gKHRhcmdldCwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpIHtcblx0XHR0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjaywgISF1c2VDYXB0dXJlKTtcblx0fTtcblxuXHQvLyBSZWdpc3RlciBldmVudHMgb24gZWxlbWVudHMgdGhhdCBtYXkgb3IgbWF5IG5vdCBleGlzdCB5ZXQ6XG5cdC8vICRsaXZlKCdkaXYgYScsICdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge30pO1xuXHR3aW5kb3cuJGxpdmUgPSAoZnVuY3Rpb24gKCkge1xuXHRcdHZhciBldmVudFJlZ2lzdHJ5ID0ge307XG5cblx0XHRmdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2ZW50KSB7XG5cdFx0XHR2YXIgdGFyZ2V0RWxlbWVudCA9IGV2ZW50LnRhcmdldDtcblxuXHRcdFx0ZXZlbnRSZWdpc3RyeVtldmVudC50eXBlXS5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xuXHRcdFx0XHR2YXIgcG90ZW50aWFsRWxlbWVudHMgPSB3aW5kb3cucXNhKGVudHJ5LnNlbGVjdG9yKTtcblx0XHRcdFx0dmFyIGhhc01hdGNoID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChwb3RlbnRpYWxFbGVtZW50cywgdGFyZ2V0RWxlbWVudCkgPj0gMDtcblxuXHRcdFx0XHRpZiAoaGFzTWF0Y2gpIHtcblx0XHRcdFx0XHRlbnRyeS5oYW5kbGVyLmNhbGwodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gKHNlbGVjdG9yLCBldmVudCwgaGFuZGxlcikge1xuXHRcdFx0aWYgKCFldmVudFJlZ2lzdHJ5W2V2ZW50XSkge1xuXHRcdFx0XHRldmVudFJlZ2lzdHJ5W2V2ZW50XSA9IFtdO1xuXHRcdFx0XHR3aW5kb3cuJG9uKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZXZlbnQsIGRpc3BhdGNoRXZlbnQsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRldmVudFJlZ2lzdHJ5W2V2ZW50XS5wdXNoKHtcblx0XHRcdFx0c2VsZWN0b3I6IHNlbGVjdG9yLFxuXHRcdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0XHR9KTtcblx0XHR9O1xuXHR9KCkpO1xuXG5cdC8vIEZpbmQgdGhlIGVsZW1lbnQncyBwYXJlbnQgd2l0aCB0aGUgZ2l2ZW4gdGFnIG5hbWU6XG5cdC8vICRwYXJlbnQocXMoJ2EnKSwgJ2RpdicpO1xuXHR3aW5kb3cuJHBhcmVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCB0YWdOYW1lKSB7XG5cdFx0aWYgKCFlbGVtZW50LnBhcmVudE5vZGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKGVsZW1lbnQucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZ05hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0cmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cdFx0cmV0dXJuIHdpbmRvdy4kcGFyZW50KGVsZW1lbnQucGFyZW50Tm9kZSwgdGFnTmFtZSk7XG5cdH07XG5cblx0Ly8gQWxsb3cgZm9yIGxvb3Bpbmcgb24gbm9kZXMgYnkgY2hhaW5pbmc6XG5cdC8vIHFzYSgnLmZvbycpLmZvckVhY2goZnVuY3Rpb24gKCkge30pXG5cdE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG59KSh3aW5kb3cpOyIsIi8qanNoaW50IGVxZXFlcTpmYWxzZSAqL1xuXG5jbGFzcyBTdG9yZSB7XG5cdGNvbnN0cnVjdG9yKG5hbWUpIHtcblx0XHR0aGlzLl9kYk5hbWUgPSBuYW1lO1xuXG5cdFx0aWYgKCFsb2NhbFN0b3JhZ2VbbmFtZV0pIHtcblx0XHRcdHZhciBkYXRhID0ge1xuXHRcdFx0XHR0b2RvczogW11cblx0XHRcdH07XG5cblx0XHRcdGxvY2FsU3RvcmFnZVtuYW1lXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXHRcdH1cblx0fVxuXG5cdGZpbmQgKHF1ZXJ5KSB7XG5cdFx0dmFyIHRvZG9zID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbdGhpcy5fZGJOYW1lXSkudG9kb3M7XG5cdFx0cmV0dXJuIChmdW5jdGlvbiAqZmluZEdlbmVyYXRvcigpe1xuXHRcdCBcdHlpZWxkIHRvZG9zLmZpbHRlcihmdW5jdGlvbiAodG9kbykge1xuXHRcdFx0XHRcdGZvciAodmFyIHEgaW4gcXVlcnkpIHtcblx0XHRcdFx0XHRcdGlmIChxdWVyeVtxXSAhPT0gdG9kb1txXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHR9KSgpO1xuXHR9XG5cblx0ZmluZEFsbCAoKSB7XG5cdFx0cmV0dXJuIChmdW5jdGlvbiAqZmluZEFsbEdlbmVyYXRvcihkYk5hbWUpe1xuXHRcdFx0eWllbGQgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2RiTmFtZV0pLnRvZG9zO1xuXHRcdH0pKHRoaXMuX2RiTmFtZSk7XG5cdH1cblxuXHRzYXZlICh1cGRhdGVEYXRhLCBpZD1mYWxzZSkge1xuXHRcdHZhciBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbdGhpcy5fZGJOYW1lXSk7XG5cdFx0dmFyIHRvZG9zID0gZGF0YS50b2RvcztcblxuXHRcdC8vIElmIGFuIElEIHdhcyBhY3R1YWxseSBnaXZlbiwgZmluZCB0aGUgaXRlbSBhbmQgdXBkYXRlIGVhY2ggcHJvcGVydHlcblx0XHRpZiAoaWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0b2Rvcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRpZiAodG9kb3NbaV0uaWQgPT09IGlkKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIHVwZGF0ZURhdGEpIHtcblx0XHRcdFx0XHRcdHRvZG9zW2ldW2tleV0gPSB1cGRhdGVEYXRhW2tleV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGxvY2FsU3RvcmFnZVt0aGlzLl9kYk5hbWVdID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cblx0XHRcdHJldHVybiAoZnVuY3Rpb24gKnVwZGF0ZUdlbmVyYXRvcihkYk5hbWUpe1xuXHRcdFx0XHR5aWVsZCBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtkYk5hbWVdKS50b2Rvcztcblx0XHRcdH0pKHRoaXMuX2RiTmFtZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEdlbmVyYXRlIGFuIElEXG5cdFx0XHR1cGRhdGVEYXRhLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHRcdHRvZG9zLnB1c2godXBkYXRlRGF0YSk7XG5cdFx0XHRsb2NhbFN0b3JhZ2VbdGhpcy5fZGJOYW1lXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG5cdFx0XHRyZXR1cm4gKGZ1bmN0aW9uICp1cGRhdGVHZW5lcmF0b3IoKXtcblx0XHRcdFx0eWllbGQgW3VwZGF0ZURhdGFdO1xuXHRcdFx0fSkoKTtcblx0XHR9XG5cdH1cblxuXHRyZW1vdmUgKGlkKSB7XG5cdFx0dmFyIGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVt0aGlzLl9kYk5hbWVdKTtcblx0XHR2YXIgdG9kb3MgPSBkYXRhLnRvZG9zO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRvZG9zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAodG9kb3NbaV0uaWQgPT0gaWQpIHtcblx0XHRcdFx0dG9kb3Muc3BsaWNlKGksIDEpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsb2NhbFN0b3JhZ2VbdGhpcy5fZGJOYW1lXSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXHRcdHJldHVybiAoZnVuY3Rpb24gKnJlbW92ZUdlbihkYk5hbWUpe1xuXHRcdFx0eWllbGQgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbZGJOYW1lXSkudG9kb3M7XG5cdFx0fSkodGhpcy5fZGJOYW1lKTtcblx0fVxuXG5cdGRyb3AgKCkge1xuXHRcdGxvY2FsU3RvcmFnZVt0aGlzLl9kYk5hbWVdID0gSlNPTi5zdHJpbmdpZnkoe3RvZG9zOiBbXX0pO1xuXHRcdHJldHVybiAoZnVuY3Rpb24gKmRyb3BHZW5lcmF0b3IoZGJOYW1lKXtcblx0XHRcdHlpZWxkIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW3RoaXMuX2RiTmFtZV0pLnRvZG9zO1xuXHRcdH0pKHRoaXMuX2RiTmFtZSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBUb2RvQ3RybCB7XG5cblx0Y29uc3RydWN0b3IobW9kZWwsIHZpZXcpe1xuXHRcdHRoaXMubW9kZWwgPSBtb2RlbDtcblx0XHR0aGlzLnZpZXcgPSB2aWV3O1xuXHRcdHRoaXMuX2F0dGFjaEV2ZW50TGlzdGVuZXJzKCk7XG5cdH1cblxuXHQvKipcblx0ICogTG9hZHMgYW5kIGluaXRpYWxpc2VzIHRoZSB2aWV3XG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSAnJyB8ICdhY3RpdmUnIHwgJ2NvbXBsZXRlZCdcblx0ICovXG5cdHNldFZpZXcgKGxvY2F0aW9uSGFzaCkge1xuXHRcdHZhciByb3V0ZSA9IGxvY2F0aW9uSGFzaC5zcGxpdCgnLycpWzFdO1xuXHRcdHZhciBwYWdlID0gcm91dGUgfHwgJyc7XG5cdFx0dGhpcy5fdXBkYXRlRmlsdGVyU3RhdGUocGFnZSk7XG5cdH1cblxuXHQvKipcblx0ICogQW4gZXZlbnQgdG8gZmlyZSBvbiBsb2FkLiBXaWxsIGdldCBhbGwgaXRlbXMgYW5kIGRpc3BsYXkgdGhlbSBpbiB0aGVcblx0ICogdG9kby1saXN0XG5cdCAqL1xuXHRzaG93QWxsICgpIHtcblx0XHR2YXIgdG9kb3MgPSB0aGlzLm1vZGVsLnJlYWQoKS5uZXh0KCk7XG5cdFx0dGhpcy52aWV3LnJlbmRlcignc2hvd0VudHJpZXMnLCB0b2Rvcy52YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyBhbGwgYWN0aXZlIHRhc2tzXG5cdCAqL1xuXHRzaG93QWN0aXZlICgpIHtcblx0XHR2YXIgYWN0aXZlVG9kb3MgPSB0aGlzLm1vZGVsLnJlYWQoe2NvbXBsZXRlZDogZmFsc2V9KS5uZXh0KCk7XG5cdFx0dGhpcy52aWV3LnJlbmRlcignc2hvd0VudHJpZXMnLCBhY3RpdmVUb2Rvcy52YWx1ZSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVuZGVycyBhbGwgY29tcGxldGVkIHRhc2tzXG5cdCAqL1xuXHRzaG93Q29tcGxldGVkICgpIHtcblx0XHR2YXIgY29tcGxldGVkVG9kb3MgPSB0aGlzLm1vZGVsLnJlYWQoe2NvbXBsZXRlZDogdHJ1ZX0pLm5leHQoKTtcblx0XHR0aGlzLnZpZXcucmVuZGVyKCdzaG93RW50cmllcycsIGNvbXBsZXRlZFRvZG9zLnZhbHVlKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBbiBldmVudCB0byBmaXJlIHdoZW5ldmVyIHlvdSB3YW50IHRvIGFkZCBhbiBpdGVtLiBTaW1wbHkgcGFzcyBpbiB0aGUgZXZlbnRcblx0ICogb2JqZWN0IGFuZCBpdCdsbCBoYW5kbGUgdGhlIERPTSBpbnNlcnRpb24gYW5kIHNhdmluZyBvZiB0aGUgbmV3IGl0ZW0uXG5cdCAqL1xuXHRhZGRJdGVtICh0aXRsZSkge1xuXHRcdGlmICh0aXRsZS50cmltKCkgPT09ICcnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RlbC5jcmVhdGUodGl0bGUpLm5leHQoKTtcblx0XHR0aGlzLnZpZXcucmVuZGVyKCdjbGVhck5ld1RvZG8nKTtcblx0XHR0aGlzLl9maWx0ZXIodHJ1ZSk7XG5cdH1cblxuXHQvKlxuXHQgKiBUcmlnZ2VycyB0aGUgaXRlbSBlZGl0aW5nIG1vZGUuXG5cdCAqL1xuXHRlZGl0SXRlbSAoaWQpIHtcblx0XHR2YXIgZGF0YSA9IHRoaXMubW9kZWwucmVhZChpZCkubmV4dCgpO1xuXHRcdHRoaXMudmlldy5yZW5kZXIoJ2VkaXRJdGVtJywge2lkOiBpZCwgdGl0bGU6IGRhdGEudmFsdWVbMF0udGl0bGV9KTtcblx0fVxuXG5cdC8qXG5cdCAqIEZpbmlzaGVzIHRoZSBpdGVtIGVkaXRpbmcgbW9kZSBzdWNjZXNzZnVsbHkuXG5cdCAqL1xuXHRlZGl0SXRlbVNhdmUgKGlkLCB0aXRsZSkge1xuXHRcdGlmICh0aXRsZS50cmltKCkpIHtcblx0XHRcdHRoaXMubW9kZWwudXBkYXRlKGlkLCB7dGl0bGU6IHRpdGxlfSkubmV4dCgpO1xuXHRcdFx0dGhpcy52aWV3LnJlbmRlcignZWRpdEl0ZW1Eb25lJywge2lkOiBpZCwgdGl0bGU6IHRpdGxlfSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVtb3ZlSXRlbShpZCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0ICogQ2FuY2VscyB0aGUgaXRlbSBlZGl0aW5nIG1vZGUuXG5cdCAqL1xuXHRlZGl0SXRlbUNhbmNlbCAoaWQpIHtcblx0XHR2YXIgZGF0YSA9IHRoaXMubW9kZWwucmVhZChpZCkubmV4dCgpO1xuXHRcdHRoaXMudmlldy5yZW5kZXIoJ2VkaXRJdGVtRG9uZScsIHtpZDogaWQsIHRpdGxlOiBkYXRhLnZhbHVlWzBdLnRpdGxlfSk7XG5cdH1cblxuXHQvKipcblx0ICogQnkgZ2l2aW5nIGl0IGFuIElEIGl0J2xsIGZpbmQgdGhlIERPTSBlbGVtZW50IG1hdGNoaW5nIHRoYXQgSUQsXG5cdCAqIHJlbW92ZSBpdCBmcm9tIHRoZSBET00gYW5kIGFsc28gcmVtb3ZlIGl0IGZyb20gc3RvcmFnZS5cblx0ICpcblx0ICogQHBhcmFtIHtudW1iZXJ9IGlkIFRoZSBJRCBvZiB0aGUgaXRlbSB0byByZW1vdmUgZnJvbSB0aGUgRE9NIGFuZFxuXHQgKiBzdG9yYWdlXG5cdCAqL1xuXHRyZW1vdmVJdGVtIChpZCkge1xuXHRcdHRoaXMubW9kZWwucmVtb3ZlKGlkKS5uZXh0KCk7XG5cdFx0dGhpcy52aWV3LnJlbmRlcigncmVtb3ZlSXRlbScsIGlkKTtcblx0XHR0aGlzLl9maWx0ZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBXaWxsIHJlbW92ZSBhbGwgY29tcGxldGVkIGl0ZW1zIGZyb20gdGhlIERPTSBhbmQgc3RvcmFnZS5cblx0ICovXG5cdHJlbW92ZUNvbXBsZXRlZEl0ZW1zICgpIHtcblx0XHR2YXIgY29tcGxldGVkID0gdGhpcy5tb2RlbC5yZWFkKHtjb21wbGV0ZWQ6IHRydWV9KS5uZXh0KCk7XG5cdFx0Y29tcGxldGVkLnZhbHVlLmZvckVhY2goaXRlbT0+IHtcblx0XHRcdHRoaXMucmVtb3ZlSXRlbShpdGVtLmlkKTtcblx0XHR9KTtcblx0XHR0aGlzLl9maWx0ZXIoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHaXZlIGl0IGFuIElEIG9mIGEgbW9kZWwgYW5kIGEgY2hlY2tib3ggYW5kIGl0IHdpbGwgdXBkYXRlIHRoZSBpdGVtXG5cdCAqIGluIHN0b3JhZ2UgYmFzZWQgb24gdGhlIGNoZWNrYm94J3Mgc3RhdGUuXG5cdCAqXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBpZCBUaGUgSUQgb2YgdGhlIGVsZW1lbnQgdG8gY29tcGxldGUgb3IgdW5jb21wbGV0ZVxuXHQgKiBAcGFyYW0ge29iamVjdH0gY2hlY2tib3ggVGhlIGNoZWNrYm94IHRvIGNoZWNrIHRoZSBzdGF0ZSBvZiBjb21wbGV0ZVxuXHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgb3Igbm90XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbnx1bmRlZmluZWR9IHNpbGVudCBQcmV2ZW50IHJlLWZpbHRlcmluZyB0aGUgdG9kbyBpdGVtc1xuXHQgKi9cblx0dG9nZ2xlQ29tcGxldGUgKGlkLCBjb21wbGV0ZWQsIHNpbGVudCkge1xuXHRcdHRoaXMubW9kZWwudXBkYXRlKGlkLCB7Y29tcGxldGVkOiBjb21wbGV0ZWR9KS5uZXh0KCk7XG5cdFx0dGhpcy52aWV3LnJlbmRlcignZWxlbWVudENvbXBsZXRlJyx7XG5cdFx0XHRpZDogaWQsXG5cdFx0XHRjb21wbGV0ZWQ6IGNvbXBsZXRlZFxuXHRcdH0pO1xuXG5cdFx0aWYgKCFzaWxlbnQpIHtcblx0XHRcdHRoaXMuX2ZpbHRlcigpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBXaWxsIHRvZ2dsZSBBTEwgY2hlY2tib3hlJ3Mgb24vb2ZmIHN0YXRlIGFuZCBjb21wbGV0ZW5lc3Mgb2YgbW9kZWxzLlxuXHQgKiBKdXN0IHBhc3MgaW4gdGhlIGV2ZW50IG9iamVjdC5cblx0ICovXG5cdHRvZ2dsZUFsbCAoY29tcGxldGVkKSB7XG5cdFx0dmFyIHRvZG9zID0gdGhpcy5tb2RlbC5yZWFkKHtjb21wbGV0ZWQ6ICFjb21wbGV0ZWR9KS5uZXh0KCk7XG5cdFx0dG9kb3MudmFsdWUuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdHRoaXMudG9nZ2xlQ29tcGxldGUoaXRlbS5pZCwgY29tcGxldGVkLCB0cnVlKTtcblx0XHR9KTtcblxuXHRcdHRoaXMuX2ZpbHRlcigpO1xuXHR9XHRcblxuXHRfYXR0YWNoRXZlbnRMaXN0ZW5lcnMgKCl7XG5cdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdHRoaXMudmlldy5iaW5kKCduZXdUb2RvJywgZnVuY3Rpb24gKHRpdGxlKSB7XG5cdFx0XHR0aGF0LmFkZEl0ZW0odGl0bGUpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy52aWV3LmJpbmQoJ2l0ZW1FZGl0JywgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHRoYXQuZWRpdEl0ZW0oaXRlbS5pZCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZpZXcuYmluZCgnaXRlbUVkaXREb25lJywgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHRoYXQuZWRpdEl0ZW1TYXZlKGl0ZW0uaWQsIGl0ZW0udGl0bGUpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy52aWV3LmJpbmQoJ2l0ZW1FZGl0Q2FuY2VsJywgZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHRoYXQuZWRpdEl0ZW1DYW5jZWwoaXRlbS5pZCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZpZXcuYmluZCgnaXRlbVJlbW92ZScsIGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUl0ZW0oaXRlbS5pZCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZpZXcuYmluZCgnaXRlbVRvZ2dsZScsIGZ1bmN0aW9uIChpdGVtKSB7XG5cdFx0XHR0aGF0LnRvZ2dsZUNvbXBsZXRlKGl0ZW0uaWQsIGl0ZW0uY29tcGxldGVkKTtcblx0XHR9KTtcblxuXHRcdHRoaXMudmlldy5iaW5kKCdyZW1vdmVDb21wbGV0ZWQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGF0LnJlbW92ZUNvbXBsZXRlZEl0ZW1zKCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZpZXcuYmluZCgndG9nZ2xlQWxsJywgZnVuY3Rpb24gKHN0YXR1cykge1xuXHRcdFx0dGhhdC50b2dnbGVBbGwoc3RhdHVzLmNvbXBsZXRlZCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlcyB0aGUgcGllY2VzIG9mIHRoZSBwYWdlIHdoaWNoIGNoYW5nZSBkZXBlbmRpbmcgb24gdGhlIHJlbWFpbmluZ1xuXHQgKiBudW1iZXIgb2YgdG9kb3MuXG5cdCAqL1xuXHRfdXBkYXRlQ291bnQgKCkge1xuXHRcdHZhciB0b2RvcyA9IHRoaXMubW9kZWwuZ2V0Q291bnQoKTtcblx0XHR0aGlzLnZpZXcucmVuZGVyKCd1cGRhdGVFbGVtZW50Q291bnQnLCB0b2Rvcy5hY3RpdmUpO1xuXHRcdHRoaXMudmlldy5yZW5kZXIoJ2NsZWFyQ29tcGxldGVkQnV0dG9uJywge1xuXHRcdFx0Y29tcGxldGVkOiB0b2Rvcy5jb21wbGV0ZWQsXG5cdFx0XHR2aXNpYmxlOiB0b2Rvcy5jb21wbGV0ZWQgPiAwXG5cdFx0fSk7XG5cblx0XHR0aGlzLnZpZXcucmVuZGVyKCd0b2dnbGVBbGwnLCB7Y2hlY2tlZDogdG9kb3MuY29tcGxldGVkID09PSB0b2Rvcy50b3RhbH0pO1xuXHRcdHRoaXMudmlldy5yZW5kZXIoJ2NvbnRlbnRCbG9ja1Zpc2liaWxpdHknLCB7dmlzaWJsZTogdG9kb3MudG90YWwgPiAwfSk7XG5cdH1cblxuXHQvKipcblx0ICogUmUtZmlsdGVycyB0aGUgdG9kbyBpdGVtcywgYmFzZWQgb24gdGhlIGFjdGl2ZSByb3V0ZS5cblx0ICogQHBhcmFtIHtib29sZWFufHVuZGVmaW5lZH0gZm9yY2UgIGZvcmNlcyBhIHJlLXBhaW50aW5nIG9mIHRvZG8gaXRlbXMuXG5cdCAqL1xuXHRfZmlsdGVyIChmb3JjZSkge1xuXHRcdHZhciBhY3RpdmVSb3V0ZSA9IHRoaXMuX2FjdGl2ZVJvdXRlLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5fYWN0aXZlUm91dGUuc3Vic3RyKDEpO1xuXG5cdFx0Ly8gVXBkYXRlIHRoZSBlbGVtZW50cyBvbiB0aGUgcGFnZSwgd2hpY2ggY2hhbmdlIHdpdGggZWFjaCBjb21wbGV0ZWQgdG9kb1xuXHRcdHRoaXMuX3VwZGF0ZUNvdW50KCk7XG5cblx0XHQvLyBJZiB0aGUgbGFzdCBhY3RpdmUgcm91dGUgaXNuJ3QgXCJBbGxcIiwgb3Igd2UncmUgc3dpdGNoaW5nIHJvdXRlcywgd2Vcblx0XHQvLyByZS1jcmVhdGUgdGhlIHRvZG8gaXRlbSBlbGVtZW50cywgY2FsbGluZzpcblx0XHQvLyAgIHRoaXMuc2hvd1tBbGx8QWN0aXZlfENvbXBsZXRlZF0oKTtcblx0XHRpZiAoZm9yY2UgfHwgdGhpcy5fbGFzdEFjdGl2ZVJvdXRlICE9PSAnQWxsJyB8fCB0aGlzLl9sYXN0QWN0aXZlUm91dGUgIT09IGFjdGl2ZVJvdXRlKSB7XG5cdFx0XHR0aGlzWydzaG93JyArIGFjdGl2ZVJvdXRlXSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xhc3RBY3RpdmVSb3V0ZSA9IGFjdGl2ZVJvdXRlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNpbXBseSB1cGRhdGVzIHRoZSBmaWx0ZXIgbmF2J3Mgc2VsZWN0ZWQgc3RhdGVzXG5cdCAqL1xuXHRfdXBkYXRlRmlsdGVyU3RhdGUgKGN1cnJlbnRQYWdlKSB7XG5cdFx0Ly8gU3RvcmUgYSByZWZlcmVuY2UgdG8gdGhlIGFjdGl2ZSByb3V0ZSwgYWxsb3dpbmcgdXMgdG8gcmUtZmlsdGVyIHRvZG9cblx0XHQvLyBpdGVtcyBhcyB0aGV5IGFyZSBtYXJrZWQgY29tcGxldGUgb3IgaW5jb21wbGV0ZS5cblx0XHR0aGlzLl9hY3RpdmVSb3V0ZSA9IGN1cnJlbnRQYWdlO1xuXG5cdFx0aWYgKGN1cnJlbnRQYWdlID09PSAnJykge1xuXHRcdFx0dGhpcy5fYWN0aXZlUm91dGUgPSAnQWxsJztcblx0XHR9XG5cblx0XHR0aGlzLl9maWx0ZXIoKTtcblxuXHRcdHRoaXMudmlldy5yZW5kZXIoJ3NldEZpbHRlcicsIGN1cnJlbnRQYWdlKTtcblx0fVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9DdHJsOyIsImNsYXNzIFRvZG9Nb2RlbCB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSkge1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cblxuICAgIGNyZWF0ZSh0aXRsZSkge1xuICAgICAgICB0aXRsZSA9IHRpdGxlIHx8ICcnO1xuXG4gICAgICAgIHZhciBuZXdJdGVtID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLnRyaW0oKSxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2VcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnNhdmUobmV3SXRlbSk7XG4gICAgfVxuXG4gICAgcmVhZChxdWVyeSkge1xuICAgICAgICB2YXIgcXVlcnlUeXBlID0gdHlwZW9mIHF1ZXJ5O1xuICAgICAgICBzd2l0Y2gocXVlcnlUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIChxdWVyeVR5cGUgPT09ICdmdW5jdGlvbicpOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZmluZEFsbCgpO1xuICAgICAgICAgICAgY2FzZSAocXVlcnlUeXBlID09PSAnc3RyaW5nJyk6XG4gICAgICAgICAgICBjYXNlIChxdWVyeVR5cGUgPT09ICdudW1iZXInKTpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmZpbmQoe2lkOiBwYXJzZUludChxdWVyeSwgMTApfSk7XG4gICAgICAgICAgICBkZWZhdWx0OiBcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmZpbmQocXVlcnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKGlkLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2Uuc2F2ZShkYXRhLCBpZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UucmVtb3ZlKGlkKTtcbiAgICB9XG5cbiAgICByZW1vdmVBbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZHJvcCgpO1xuICAgIH1cblxuICAgIGdldENvdW50KCkge1xuICAgICAgICB2YXIgdG9kb0NvdW50cyA9IHtcbiAgICAgICAgICAgIGFjdGl2ZTogMCxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRvZG9zID0gdGhpcy5zdG9yYWdlLmZpbmRBbGwoKS5uZXh0KCk7XG4gICAgICAgIHRvZG9zLnZhbHVlLmZvckVhY2godG9kbyA9PiB7XG4gICAgICAgICAgICBpZiAodG9kby5jb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0b2RvQ291bnRzLmNvbXBsZXRlZCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b2RvQ291bnRzLmFjdGl2ZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9kb0NvdW50cy50b3RhbCsrO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdG9kb0NvdW50cztcbiAgICB9XG5cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvTW9kZWw7IiwiY2xhc3MgVG9kb1RlbXBsYXRlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5kZWZhdWx0VGVtcGxhdGUgPVx0XG5cdFx0XHRcdCc8bGkgZGF0YS1pZD1cInt7aWR9fVwiIGNsYXNzPVwie3tjb21wbGV0ZWR9fVwiPicgK1xuXHRcdFx0XHQnPGRpdiBjbGFzcz1cInZpZXdcIj4nICtcblx0XHRcdFx0XHQnPGlucHV0IGNsYXNzPVwidG9nZ2xlXCIgdHlwZT1cImNoZWNrYm94XCIge3tjaGVja2VkfX0+JyArIFxuXHRcdFx0XHRcdCc8bGFiZWw+e3t0aXRsZX19PC9sYWJlbD4nICsgXG5cdFx0XHRcdFx0JzxidXR0b24gY2xhc3M9XCJkZXN0cm95XCI+PC9idXR0b24+JyArIFxuXHRcdFx0XHQnPC9kaXY+JyArXG5cdFx0XHQnPC9saT4nO1xuXHR9XG5cblx0c2hvdyAoZGF0YSkge1xuXHRcdHZhciBpLCBsO1xuXHRcdHZhciB2aWV3ID0gJyc7XG5cblx0XHRmb3IgKGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdHZhciB0ZW1wbGF0ZSA9IHRoaXMuZGVmYXVsdFRlbXBsYXRlO1xuXHRcdFx0dmFyIGNvbXBsZXRlZCA9ICcnO1xuXHRcdFx0dmFyIGNoZWNrZWQgPSAnJztcblxuXHRcdFx0aWYgKGRhdGFbaV0uY29tcGxldGVkKSB7XG5cdFx0XHRcdGNvbXBsZXRlZCA9ICdjb21wbGV0ZWQnO1xuXHRcdFx0XHRjaGVja2VkID0gJ2NoZWNrZWQnO1xuXHRcdFx0fVxuXG5cdFx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoJ3t7aWR9fScsIGRhdGFbaV0uaWQpO1xuXHRcdFx0dGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKCd7e3RpdGxlfX0nLCBkYXRhW2ldLnRpdGxlKTtcblx0XHRcdHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgne3tjb21wbGV0ZWR9fScsIGNvbXBsZXRlZCk7XG5cdFx0XHR0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoJ3t7Y2hlY2tlZH19JywgY2hlY2tlZCk7XG5cblx0XHRcdHZpZXcgPSB2aWV3ICsgdGVtcGxhdGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZpZXc7XG5cdH1cblxuXHRpdGVtQ291bnRlciAoYWN0aXZlVG9kb3MpIHtcblx0XHR2YXIgcGx1cmFsID0gYWN0aXZlVG9kb3MgPT09IDEgPyAnJyA6ICdzJztcblxuXHRcdHJldHVybiBgPHN0cm9uZz4ke2FjdGl2ZVRvZG9zfTwvc3Ryb25nPiBpdGVtJHtwbHVyYWx9IGxlZnRgO1xuXHR9XG5cdGNsZWFyQ29tcGxldGVkQnV0dG9uIChjb21wbGV0ZWRUb2Rvcykge1xuXHRcdHJldHVybiBjb21wbGV0ZWRUb2RvcyA+IDAgPyBgQ2xlYXIgY29tcGxldGVkICgke2NvbXBsZXRlZFRvZG9zfSlgIFxuXHRcdFx0XHRcdFx0XHRcdCAgOiAnJztcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb2RvVGVtcGxhdGU7IiwiY2xhc3MgVG9kb1ZpZXcge1xuXG4gICAgLyoqXG4gICAgICogVmlldyB0aGF0IGFic3RyYWN0cyBhd2F5IHRoZSBicm93c2VyJ3MgRE9NIGNvbXBsZXRlbHkuXG4gICAgICogSXQgaGFzIHR3byBzaW1wbGUgZW50cnkgcG9pbnRzOlxuICAgICAqXG4gICAgICogICAtIGJpbmQoZXZlbnROYW1lLCBoYW5kbGVyKVxuICAgICAqICAgICBUYWtlcyBhIHRvZG8gYXBwbGljYXRpb24gZXZlbnQgYW5kIHJlZ2lzdGVycyB0aGUgaGFuZGxlclxuICAgICAqICAgLSByZW5kZXIoY29tbWFuZCwgcGFyYW1ldGVyT2JqZWN0KVxuICAgICAqICAgICBSZW5kZXJzIHRoZSBnaXZlbiBjb21tYW5kIHdpdGggdGhlIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZSkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG5cbiAgICAgICAgdGhpcy5FTlRFUl9LRVkgPSAxMztcbiAgICAgICAgdGhpcy5FU0NBUEVfS0VZID0gMjc7XG5cbiAgICAgICAgdGhpcy4kdG9kb0xpc3QgPSBxcygnI3RvZG8tbGlzdCcpO1xuICAgICAgICB0aGlzLiR0b2RvSXRlbUNvdW50ZXIgPSBxcygnI3RvZG8tY291bnQnKTtcbiAgICAgICAgdGhpcy4kY2xlYXJDb21wbGV0ZWQgPSBxcygnI2NsZWFyLWNvbXBsZXRlZCcpO1xuICAgICAgICB0aGlzLiRtYWluID0gcXMoJyNtYWluJyk7XG4gICAgICAgIHRoaXMuJGZvb3RlciA9IHFzKCcjZm9vdGVyJyk7XG4gICAgICAgIHRoaXMuJHRvZ2dsZUFsbCA9IHFzKCcjdG9nZ2xlLWFsbCcpO1xuICAgICAgICB0aGlzLiRuZXdUb2RvID0gcXMoJyNuZXctdG9kbycpO1xuICAgIH1cblxuICAgIF9yZW1vdmVJdGVtIChpZCkge1xuICAgICAgICB2YXIgZWxlbSA9IHFzKCdbZGF0YS1pZD1cIicgKyBpZCArICdcIl0nKTtcblxuICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgdGhpcy4kdG9kb0xpc3QucmVtb3ZlQ2hpbGQoZWxlbSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfY2xlYXJDb21wbGV0ZWRCdXR0b24gKGNvbXBsZXRlZENvdW50LCB2aXNpYmxlKSB7XG4gICAgICAgIHRoaXMuJGNsZWFyQ29tcGxldGVkLmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGUuY2xlYXJDb21wbGV0ZWRCdXR0b24oY29tcGxldGVkQ291bnQpO1xuICAgICAgICB0aGlzLiRjbGVhckNvbXBsZXRlZC5zdHlsZS5kaXNwbGF5ID0gdmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgfVxuXG4gICBfc2V0RmlsdGVyIChjdXJyZW50UGFnZSkge1xuICAgICAgICBxcygnI2ZpbHRlcnMgLnNlbGVjdGVkJykuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgIHFzKCcjZmlsdGVycyBbaHJlZj1cIiMvJyArIGN1cnJlbnRQYWdlICsgJ1wiXScpLmNsYXNzTmFtZSA9ICdzZWxlY3RlZCc7XG4gICAgfVxuXG4gICAgX2VsZW1lbnRDb21wbGV0ZSAoaWQsIGNvbXBsZXRlZCkge1xuICAgICAgICB2YXIgbGlzdEl0ZW0gPSBxcygnW2RhdGEtaWQ9XCInICsgaWQgKyAnXCJdJyk7XG5cbiAgICAgICAgaWYgKCFsaXN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdEl0ZW0uY2xhc3NOYW1lID0gY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJztcblxuICAgICAgICAvLyBJbiBjYXNlIGl0IHdhcyB0b2dnbGVkIGZyb20gYW4gZXZlbnQgYW5kIG5vdCBieSBjbGlja2luZyB0aGUgY2hlY2tib3hcbiAgICAgICAgcXMoJ2lucHV0JywgbGlzdEl0ZW0pLmNoZWNrZWQgPSBjb21wbGV0ZWQ7XG4gICAgfVxuXG4gICBcdF9lZGl0SXRlbSAoaWQsIHRpdGxlKSB7XG4gICAgICAgIHZhciBsaXN0SXRlbSA9IHFzKCdbZGF0YS1pZD1cIicgKyBpZCArICdcIl0nKTtcblxuICAgICAgICBpZiAoIWxpc3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0SXRlbS5jbGFzc05hbWUgPSBsaXN0SXRlbS5jbGFzc05hbWUgKyAnIGVkaXRpbmcnO1xuXG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0LmNsYXNzTmFtZSA9ICdlZGl0JztcblxuICAgICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gdGl0bGU7XG4gICAgfVxuXG4gICAgX2VkaXRJdGVtRG9uZSAoaWQsIHRpdGxlKSB7XG4gICAgICAgIHZhciBsaXN0SXRlbSA9IHFzKCdbZGF0YS1pZD1cIicgKyBpZCArICdcIl0nKTtcblxuICAgICAgICBpZiAoIWxpc3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5wdXQgPSBxcygnaW5wdXQuZWRpdCcsIGxpc3RJdGVtKTtcbiAgICAgICAgbGlzdEl0ZW0ucmVtb3ZlQ2hpbGQoaW5wdXQpO1xuXG4gICAgICAgIGxpc3RJdGVtLmNsYXNzTmFtZSA9IGxpc3RJdGVtLmNsYXNzTmFtZS5yZXBsYWNlKCdlZGl0aW5nJywgJycpO1xuXG4gICAgICAgIHFzYSgnbGFiZWwnLCBsaXN0SXRlbSkuZm9yRWFjaChsYWJlbCA9PiB7XG4gICAgICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIgKHZpZXdDbWQsIHBhcmFtZXRlcikge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciB2aWV3Q29tbWFuZHMgPSB7XG4gICAgICAgICAgICBzaG93RW50cmllczogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoYXQuJHRvZG9MaXN0LmlubmVySFRNTCA9IHRoYXQudGVtcGxhdGUuc2hvdyhwYXJhbWV0ZXIpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZUl0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGF0Ll9yZW1vdmVJdGVtKHBhcmFtZXRlcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdXBkYXRlRWxlbWVudENvdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC4kdG9kb0l0ZW1Db3VudGVyLmlubmVySFRNTCA9IHRoYXQudGVtcGxhdGUuaXRlbUNvdW50ZXIocGFyYW1ldGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhckNvbXBsZXRlZEJ1dHRvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoYXQuX2NsZWFyQ29tcGxldGVkQnV0dG9uKHBhcmFtZXRlci5jb21wbGV0ZWQsIHBhcmFtZXRlci52aXNpYmxlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250ZW50QmxvY2tWaXNpYmlsaXR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC4kbWFpbi5zdHlsZS5kaXNwbGF5ID0gdGhhdC4kZm9vdGVyLnN0eWxlLmRpc3BsYXkgPSBwYXJhbWV0ZXIudmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlQWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC4kdG9nZ2xlQWxsLmNoZWNrZWQgPSBwYXJhbWV0ZXIuY2hlY2tlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRGaWx0ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGF0Ll9zZXRGaWx0ZXIocGFyYW1ldGVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjbGVhck5ld1RvZG86IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGF0LiRuZXdUb2RvLnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWxlbWVudENvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5fZWxlbWVudENvbXBsZXRlKHBhcmFtZXRlci5pZCwgcGFyYW1ldGVyLmNvbXBsZXRlZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdEl0ZW06IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGF0Ll9lZGl0SXRlbShwYXJhbWV0ZXIuaWQsIHBhcmFtZXRlci50aXRsZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdEl0ZW1Eb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5fZWRpdEl0ZW1Eb25lKHBhcmFtZXRlci5pZCwgcGFyYW1ldGVyLnRpdGxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2aWV3Q29tbWFuZHNbdmlld0NtZF0oKTtcbiAgICB9XG5cbiAgICBfaXRlbUlkIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBsaSA9ICRwYXJlbnQoZWxlbWVudCwgJ2xpJyk7XG4gICAgICAgIHJldHVybiBwYXJzZUludChsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSwgMTApO1xuICAgIH1cblxuICAgIF9iaW5kSXRlbUVkaXREb25lIChoYW5kbGVyKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgJGxpdmUoJyN0b2RvLWxpc3QgbGkgLmVkaXQnLCAnYmx1cicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtaXNjYW5jZWxlZCcpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGF0Ll9pdGVtSWQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLnZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRsaXZlKCcjdG9kby1saXN0IGxpIC5lZGl0JywgJ2tleXByZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gdGhhdC5FTlRFUl9LRVkpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGN1cnNvciBmcm9tIHRoZSBpbnB1dCB3aGVuIHlvdSBoaXQgZW50ZXIganVzdCBsaWtlIGlmIGl0XG4gICAgICAgICAgICAgICAgLy8gd2VyZSBhIHJlYWwgZm9ybVxuICAgICAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfYmluZEl0ZW1FZGl0Q2FuY2VsIChoYW5kbGVyKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgJGxpdmUoJyN0b2RvLWxpc3QgbGkgLmVkaXQnLCAna2V5dXAnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSB0aGF0LkVTQ0FQRV9LRVkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnZGF0YS1pc2NhbmNlbGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ibHVyKCk7XG5cbiAgICAgICAgICAgICAgICBoYW5kbGVyKHtpZDogdGhhdC5faXRlbUlkKHRoaXMpfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmQgKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnbmV3VG9kbycpIHtcbiAgICAgICAgICAgICRvbih0aGF0LiRuZXdUb2RvLCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIodGhhdC4kbmV3VG9kby52YWx1ZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAncmVtb3ZlQ29tcGxldGVkJykge1xuICAgICAgICAgICAgJG9uKHRoYXQuJGNsZWFyQ29tcGxldGVkLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ3RvZ2dsZUFsbCcpIHtcbiAgICAgICAgICAgICRvbih0aGF0LiR0b2dnbGVBbGwsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKHtjb21wbGV0ZWQ6IHRoaXMuY2hlY2tlZH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ2l0ZW1FZGl0Jykge1xuICAgICAgICAgICAgJGxpdmUoJyN0b2RvLWxpc3QgbGkgbGFiZWwnLCAnZGJsY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcih7aWQ6IHRoYXQuX2l0ZW1JZCh0aGlzKX0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gJ2l0ZW1SZW1vdmUnKSB7XG4gICAgICAgICAgICAkbGl2ZSgnI3RvZG8tbGlzdCAuZGVzdHJveScsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKHtpZDogdGhhdC5faXRlbUlkKHRoaXMpfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnaXRlbVRvZ2dsZScpIHtcbiAgICAgICAgICAgICRsaXZlKCcjdG9kby1saXN0IC50b2dnbGUnLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGF0Ll9pdGVtSWQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogdGhpcy5jaGVja2VkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnaXRlbUVkaXREb25lJykge1xuICAgICAgICAgICAgdGhhdC5fYmluZEl0ZW1FZGl0RG9uZShoYW5kbGVyKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSAnaXRlbUVkaXRDYW5jZWwnKSB7XG4gICAgICAgICAgICB0aGF0Ll9iaW5kSXRlbUVkaXRDYW5jZWwoaGFuZGxlcik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9WaWV3O1xuIiwiaW1wb3J0IFN0b3JlIGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IE1vZGVsIGZyb20gJy4vVG9kb01vZGVsJztcbmltcG9ydCBUZW1wbGF0ZSBmcm9tICcuL1RvZG9UZW1wbGF0ZSc7XG5pbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL1RvZG9DdHJsJztcbmltcG9ydCBWaWV3IGZyb20gJy4vVG9kb1ZpZXcnO1xuaW1wb3J0ICcuL0hlbHBlcnMnO1xuXG5jbGFzcyBUb2RvQXBwIHtcblx0Y29uc3RydWN0b3IobmFtZSkge1xuXHRcdHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yZShuYW1lKTtcblx0XHR0aGlzLm1vZGVsID0gbmV3IE1vZGVsKHRoaXMuc3RvcmFnZSk7XG5cdFx0dGhpcy50ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZSgpO1xuXHRcdHRoaXMudmlldyA9IG5ldyBWaWV3KHRoaXMudGVtcGxhdGUpO1xuXHRcdHRoaXMuY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHRoaXMubW9kZWwsIHRoaXMudmlldyk7XG5cdH1cblxuXHRzZXRWaWV3KCkge1xuXHRcdHRvZG8uY29udHJvbGxlci5zZXRWaWV3KGRvY3VtZW50LmxvY2F0aW9uLmhhc2gpO1xuXHR9XG5cbn1cblxudHJ5IHtcblx0dmFyIHRvZG8gPSBuZXcgVG9kb0FwcCgndG9kb3MnKTtcblx0JG9uKHdpbmRvdywgJ2xvYWQnLCB0b2RvLnNldFZpZXcpO1xuXHQkb24od2luZG93LCAnaGFzaGNoYW5nZScsIHRvZG8uc2V0Vmlldyk7XG59IGNhdGNoKGUpe1xuXHRjb25zb2xlLmxvZygnQXBwIENvdWxkIE5vdCBCZSBTdGFydGVkLicpO1xufVxuXG53aW5kb3cuYXBwID0ge1xuXHRDb250cm9sbGVyOiBDb250cm9sbGVyLFxuXHRNb2RlbDogTW9kZWwsXG5cdFRlbXBsYXRlOiBUZW1wbGF0ZSxcblx0VmlldzogVmlld1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kbzsiXX0=
