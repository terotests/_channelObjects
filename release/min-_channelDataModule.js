(function(){var t={},i=function(){var i=function(){!function(t){t.fromAce=function(t){var i=[];return t.forEach(function(t){var n=t.range;"insertText"==t.action&&i.push([1,n.start.row,n.start.column,n.end.row,n.end.column,t.text]),"removeText"==t.action&&i.push([2,n.start.row,n.start.column,n.end.row,n.end.column,t.text]),"insertLines"==t.action&&i.push([3,n.start.row,n.start.column,n.end.row,n.end.column,t.lines]),"removeLines"==t.action&&i.push([4,n.start.row,n.start.column,n.end.row,n.end.column,t.lines,t.nl])}),i},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){}),t.reverse=function(t){var i=[];return t.forEach(function(t){{var n=t.slice();n[1],n[2],n[3],n[4]}return 1==n[0]?(n[0]=2,void i.unshift(n)):2==n[0]?(n[0]=1,void i.unshift(n)):3==n[0]?(n[0]=4,void i.unshift(n)):4==n[0]?(n[0]=3,void i.unshift(n)):void 0}),i},t.runToAce=function(t){var i=[],n=["","insertText","removeText","insertLines","removeLines"];return t.forEach(function(t){var e={action:n[t[0]],range:{start:{row:t[1],column:t[2]},end:{row:t[3],column:t[4]}}};t[0]<3?e.text=t[5]:e.lines=t[5],4==t[0]&&(e.nl=t[6]||"\n"),i.push(e)}),i},t.runToLineObj=function(t,i){i.forEach(function(i){var n=i[1],e=i[2],r=i[3],a=i[4];if(1==i[0])if("\n"==i[5]){var s=t.item(n);if(s){var _=s.text();s.text(_.slice(0,e));var o={text:_.slice(e)||""};t.insertAt(n+1,o)}else t.insertAt(n,{text:""}),t.insertAt(n+1,{text:""})}else{var s=t.item(n);if(s){var _=s.text();s.text(_.slice(0,e)+i[5]+_.slice(e))}else t.insertAt(n,{text:i[5]})}if(2==i[0])if("\n"==i[5]){var c=t.item(n),f=t.item(n+1),u="",h="";c&&(u=c.text()),f&&(h=f.text()),c?c.text(u+h):t.insertAt(n,{text:""}),f&&f.remove()}else{var s=t.item(n),_=s.text();s.text(_.slice(0,e)+_.slice(a))}if(3==i[0])for(var d=r-n,l=0;d>l;l++)t.insertAt(n+l,{text:i[5][l]});if(4==i[0])for(var d=r-n,l=0;d>l;l++){var s=t.item(n);s.remove()}})},t.runToString=function(t,i){if(!i||"undefined"==typeof t)return"";t+="";var n=t.split("\n");return i.forEach(function(t){var i=t[1],e=t[2],r=t[3],a=t[4];if(1==t[0])if("\n"==t[5]){var s=n[i]||"";n[i]=s.slice(0,e);var _=s.slice(e)||"";n.splice(i+1,0,_)}else{var s=n[i]||"";n[i]=s.slice(0,e)+t[5]+s.slice(e)}if(2==t[0])if("\n"==t[5]){var o=n[i]||"",c=n[i+1]||"";n[i]=o+c,n.splice(i+1,1)}else{var s=n[i]||"";n[i]=s.slice(0,e)+s.slice(a)}if(3==t[0])for(var f=r-i,u=0;f>u;u++)n.splice(i+u,0,t[5][u]);if(4==t[0])for(var f=r-i,u=0;f>u;u++)n.splice(i,1)}),n.join("\n")},t.simplify=function(t){var i,n=[],e=null;return t.forEach(function(t){i&&1==t[0]&&1==i[0]&&t[3]==t[1]&&i[1]==t[1]&&i[3]==t[3]&&i[4]==t[2]?e?(e[3]=t[3],e[4]=t[4],e[5]=e[5]+t[5]):(e=[],e[0]=1,e[1]=i[1],e[2]=i[2],e[3]=t[3],e[4]=t[4],e[5]=i[5]+t[5]):(e&&(n.push(e),e=null),1==t[0]?e=t.slice():n.push(t)),i=t}),e&&n.push(e),n}}(this)},n=function(t,i,e,r,a,s,_,o){var c,f=this;if(!(f instanceof n))return new n(t,i,e,r,a,s,_,o);var u=[t,i,e,r,a,s,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=n._classInfo.name)return new c(t,i,e,r,a,s,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};n._classInfo={name:"aceCmdConvert"},n.prototype=new i;var e=function(){!function(t){t.addController=function(t){this._controllers||(this._controllers=[]),this._controllers.indexOf(t)>=0||this._controllers.push(t)},t.clone=function(){return _data(this.serialize())},t.emitValue=function(t,i){if(this._processingEmit)return this;if(this._processingEmit=!0,this._controllers){for(var n=0,e=0;e<this._controllers.length;e++){var r=this._controllers[e];r[t]&&(r[t](i),n++)}if(this._processingEmit=!1,n>0)return this}this._valueFn&&this._valueFn[t]?this._valueFn[t](i):this._parent&&this._parent.emitValue&&this._parent.emitValue(t,i),this._processingEmit=!1},t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){}),t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var i,e,r,a,s;t._cmd_aceCmd=function(t,i){var e=this._find(t[4]),a=t[1],s=n();e.data[a]=s.runToString(e.data[a],t[2]),r=i;var _=[4,a,e.data[a],null,t[4]];this._cmd(_,e,null),i?this._cmd(t,e,null):this.writeCommand(t),r=!1,this._fireListener(e,a)},t._cmd_createArray=function(t,i){var n={data:[],__id:t[1]},e=this._getObjectHash();e[n.__id]=n,i||this.writeCommand(t,n)},t._cmd_createObject=function(t,i){var n={data:{},__id:t[1]},e=this._getObjectHash();e[n.__id]=n,i||this.writeCommand(t,n)},t._cmd_moveToIndex=function(t,i){var n,r=this._find(t[4]),a=r.data.length,s=0,_=null;for(s=0;a>s;s++){var o=r.data[s];if(o.__id==t[1]){n=o,_=s;break}}if(_!=t[3])throw"moveToIndex with invalid old index value";if(n){var c=parseInt(t[2]);e.fromIndex=s,r.data.splice(s,1),r.data.splice(c,0,n),this._cmd(t,r,n),i||_isRemoteUpdate||this.writeCommand(t)}},t._cmd_pushToArray=function(t,i){{var n=this._find(t[4]),e=this._find(t[2]),r=t[1];t[3],n.data.length}n&&e&&(e.__p&&e.__p==n.__id||(n.data.splice(r,0,e),e.__p=n.__id,this._cmd(t,n,e),this._moveCmdListToParent(e),i||this.writeCommand(t)))},t._cmd_removeObject=function(t,i){var n=this._find(t[4]),e=this._find(t[2]),r=n.data.indexOf(e);n&&e&&(n.data.splice(r,1),e.__removedAt=r,this._cmd(t,n,e),e.__p=null,i||this.writeCommand(t))},t._cmd_setMeta=function(t,i){var n=this._find(t[4]),e=t[1];if(n){if(n[e]==t[2])return;n[e]=t[2],this._cmd(t,n,null),i||this.writeCommand(t)}},t._cmd_setProperty=function(t,i){var n=this._find(t[4]),e=t[1];if(n){if(n.data[e]==t[2])return;n.data[e]=t[2],this._cmd(t,n,null),i||this.writeCommand(t),this._fireListener(n,e)}},t._cmd_setPropertyObject=function(t,i){var n=this._find(t[4]),e=t[1],r=this._find(t[2]);n&&r&&(n.data[e]=r,r.__p=n.__id,this._cmd(t,n,r),i||(this._moveCmdListToParent(r),this.writeCommand(t)))},t._cmd_unsetProperty=function(t,i){var n=this._find(t[4]),e=t[1];n&&e&&(delete n.data[e],i||this.writeCommand(t))},t._fireListener=function(t,n){if(i){var e=t.__id+"::"+n,r=i[e];r&&r.forEach(function(i){i(t,t.data[n])})}},t._moveCmdListToParent=function(){},t._reverse_aceCmd=function(t){var i=this._find(t[4]),e=t[1],r=n(),a=r.reverse(t[2]),s=[4,e,i.data[e],null,t[4]],_=[13,e,a,null,t[4]],o=r.runToString(i.data[e],a);i.data[e]=o,this._cmd(s),this._cmd(_)},t._reverse_createObject=function(t){var i=t[1],n=this._getObjectHash();delete n[i]},t._reverse_moveToIndex=function(t){var i,n=this._find(t[4]),e=n.data.length,r=0,a=null;for(r=0;e>r;r++){var s=n.data[r];if(s.__id==t[1]){i=s,a=r;break}}if(a!=t[2])throw"_reverse_moveToIndex with invalid index value";if(i){var _=parseInt(t[3]);n.data.splice(r,1),n.data.splice(_,0,i);var o=t.slice();o[2]=_,o[3]=t[2],this._cmd(o)}},t._reverse_pushToArray=function(t){{var i=this._find(t[4]),n=this._find(t[2]);i.data.length}if(i&&n){var e=i.data.length-1,r=i.data[e];if(r.__id==t[2]){var a=[8,e,r.__id,null,i.__id];i.data.splice(e,1),this._cmd(a)}}},t._reverse_removeObject=function(t){{var i=this._find(t[4]),n=this._find(t[2]),e=t[1];i.data.indexOf(n)}if(i&&n){i.data.splice(e,0,n);var r=[7,e,t[2],null,t[4]];this._cmd(r),n.__p=t[4]}},t._reverse_setMeta=function(t){var i=this._find(t[4]),n=t[1];if(i){var e=[3,n,t[3],t[2],t[4]];i[n]=t[3],this._cmd(e)}},t._reverse_setProperty=function(t){var i=this._find(t[4]),n=t[1];if(i){var e=[4,n,t[3],t[2],t[4]];i.data[n]=t[3],this._cmd(e)}},t._reverse_setPropertyObject=function(t){var i=this._find(t[4]),n=t[1],e=this._find(t[2]);if(i&&e){delete i.data[n],e.__p=null;var r=[10,n,null,null,t[4]];this._cmd(r)}},t._reverse_unsetProperty=function(t){var i=this._find(t[4]),n=this._find(t[2]),e=t[1];if(i&&e&&n){i.data[e]=n,n.__p=i.__id;var r=[5,e,n.__id,0,t[4]];this._cmd(r)}},t.execCmd=function(t,i,n){var e=a[t[0]];if(e){var r=e.apply(this,[t,i]);return n||this.writeLocalJournal(t),r}},t.getJournalLine=function(){return this._journalPointer},t.getLocalJournal=function(){return this._journal},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){i||(i={},e={}),a||(s=new Array(30),a=new Array(30),a[1]=this._cmd_createObject,a[2]=this._cmd_createArray,a[3]=this._cmd_setMeta,a[4]=this._cmd_setProperty,a[5]=this._cmd_setPropertyObject,a[7]=this._cmd_pushToArray,a[8]=this._cmd_removeObject,a[10]=this._cmd_unsetProperty,a[12]=this._cmd_moveToIndex,a[13]=this._cmd_aceCmd,s[3]=this._reverse_setMeta,s[4]=this._reverse_setProperty,s[5]=this._reverse_setPropertyObject,s[7]=this._reverse_pushToArray,s[8]=this._reverse_removeObject,s[10]=this._reverse_unsetProperty,s[12]=this._reverse_moveToIndex,s[13]=this._reverse_aceCmd)}),t.redo=function(t){var i=this.getJournalLine();for(t=t||1;t-->0;){var n=this._journal[i];if(!n)return;this.execCmd(n,!1,!0),i++,this._journalPointer++}},t.reverseCmd=function(t){var i=s[t[0]];if(i){var n=i.apply(this,[t]);return n}},t.reverseNLines=function(t){for(var i=this.getJournalLine();i-1>=0&&t-->0;){var n=this._journal[i-1];this.reverseCmd(n),i--,this._journalPointer--}},t.reverseToLine=function(t){for(var i=this.getJournalLine();i-1>=0&&i>t;){var n=this._journal[i-1];this.reverseCmd(n),i--,this._journalPointer--}},t.undo=function(t){this.reverseNLines(t||1)},t.writeLocalJournal=function(t){this._journal&&(this._journal.length>this._journalPointer&&(this._journal.length=this._journalPointer),this._journal.push(t),this._journalPointer++)}}(this),function(t){var i,n;t._addToCache=function(t){t&&t.__id&&(this._objectHash[t.__id]=t)},t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t){return i||(i={}),i[t]?i[t]:void(i[t]=this)}),t._cmd=function(t){var i=t[0],e=t[4];if(this._workers[i]&&this._workers[i][e]){var r=this._workers[i][e],a=t[1],s=r["*"],_=r[a];s&&s.forEach(function(i){var e=i[0],r=i[1],a=n[e];a&&a(t,r)}),_&&_.forEach(function(i){var e=i[0],r=i[1],a=n[e];a&&a(t,r)})}},t._createModelCommands=function(t,i,n){n||(n=[]);var e;if(e=t.data&&t.__id?t.data:t,this.isObject(e)||this.isArray(e)){var r;if(r=t.__id?t:{data:e,__id:this.guid()},this.isArray(e))var a=[2,r.__id,[],null,r.__id];else var a=[1,r.__id,{},null,r.__id];i&&(r.__p=i.__id),n.push(a);for(var s in e)if(e.hasOwnProperty(s)){var _=e[s];if(this.isObject(_)||this.isArray(_)){var o=this._createModelCommands(_,r,n),a=[5,s,o.__id,null,r.__id];n.push(a)}else{var a=[4,s,_,null,r.__id];n.push(a)}}return r}},t._createNewModel=function(t,i){if(this.isObject(t)||this.isArray(t)){var n={data:t,__id:this.guid()};if(this._objectHash[n.__id]=n,this.isArray(t))var e=[2,n.__id,[],null,n.__id];else var e=[1,n.__id,{},null,n.__id];i&&(n.__p=i.__id),this.writeCommand(e,n);for(var r in t)if(t.hasOwnProperty(r)){var a=t[r];if(this.isObject(a)||this.isArray(a)){var s=this._createNewModel(a,n);n.data[r]=s;var e=[5,r,s.__id,null,n.__id];this.writeCommand(e,n),this._moveCmdListToParent(s)}else{var e=[4,r,a,null,n.__id];this.writeCommand(e,n)}}return n}},t._find=function(t){return this._objectHash[t]},t._findObjects=function(t,i){if(!t)return null;if(!this.isObject(t))return t;t=this._wrapData(t),t.__id&&(this._objectHash[t.__id]=t);if(i&&(t.__p=i),t.data){var n=t.data;for(var e in n)if(n.hasOwnProperty(e)){var r=n[e];if(this.isObject(r)){var a=this._findObjects(r,t.__id);a!==r&&(t.data[e]=a)}}}return t},t._getObjectHash=function(){return this._objectHash},t._prepareData=function(t){var i=this._wrapData(t);return this._objectHash[i.__id]||(i=this._findObjects(i)),i},t._wrapData=function(t){if(t&&t._wrapData)return t._data;if(t.__id&&t.data)return t;var i=this._createNewModel(t);return i},t.createWorker=function(t,i,n){var e=i[0],r=i[4];this._workers[e]||(this._workers[e]={}),this._workers[e][r]||(this._workers[e][r]={});var a=this._workers[e][r],s=i[1];s||(s="*"),a[s]||(a[s]=[]),a[s].push([t,n])},t.getData=function(){return this._data},t.indexOf=function(t){if(t||(t=this._data),this.isObject(t)||(t=this._find(t)),t){var i=this._find(t.__p);if(i&&this.isArray(i.data))return i.data.indexOf(t)}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,i,n){if(i){this._objectHash||(this._objectHash={});var e=this;this._data=i,this._workers={},this._journal=n||[],this._journalPointer=this._journal.length;var r=this._findObjects(i);r!=i&&(this._data=r),n&&this.isArray(n)&&n.forEach(function(t){e.execCmd(t,!0)})}}),t.setWorkerCommands=function(t){n||(n={});for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])},t.toPlainData=function(t){if("undefined"==typeof t&&(t=this._data),!this.isObject(t))return t;var i;if(this.isArray(t.data)){i=[];for(var n=t.data.length,e=0;n>e;e++)i[e]=this.toPlainData(t.data[e])}else{i={};for(var r in t.data)t.data.hasOwnProperty(r)&&(i[r]=this.toPlainData(t.data[r]))}return i},t.writeCommand=function(t){this._cmdBuffer||(this._cmdBuffer=[]),this._cmdBuffer.push(t)}}(this)},r=function(t,i,n,e,a,s,_,o){var c,f=this;if(!(f instanceof r))return new r(t,i,n,e,a,s,_,o);var u=[t,i,n,e,a,s,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=r._classInfo.name)return new c(t,i,n,e,a,s,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};r._classInfo={name:"_channelData"},r.prototype=new e,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._channelData=r,this._channelData=r):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._channelData=r:this._channelData=r}.call(new Function("return this")());var a=function(){!function(t){t.addController=function(t){this._controllers||(this._controllers=[]),this._controllers.indexOf(t)>=0||this._controllers.push(t)},t.clone=function(){return _data(this.serialize())},t.emitValue=function(t,i){if(this._processingEmit)return this;if(this._processingEmit=!0,this._controllers){for(var n=0,e=0;e<this._controllers.length;e++){var r=this._controllers[e];r[t]&&(r[t](i),n++)}if(this._processingEmit=!1,n>0)return this}this._valueFn&&this._valueFn[t]?this._valueFn[t](i):this._parent&&this._parent.emitValue&&this._parent.emitValue(t,i),this._processingEmit=!1},t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){}),t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){t.doesConflict=function(t){var i={error:!1},n=this._channel.getJournalLine();return n==t.from?(i.ok=!0,i):n<t.from?(i.error=!0,i.reason="the journals are out of sync",i):void 0},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._channel=t}),t.validityCheck=function(t){var i=(this._channel.getJournalLine(),this._channel),n=[],e={invalidCmds:[],invalidPrevSet:[],valid:n};if(!t||!this.isArray(t.changes))return e;for(var r=t.changes,a={},s={},_={},o=0;o<r.length;o++){var c=r[o];if(this.isArray(c)){var f=c[0];if(1!=f&&2!=f)if(3!=f)if(4!=f)if(5!=f)if(7!=f);else{var u=c[4],h=c[2],d=parseInt(c[1]);if(isNaN(d)){e.invalidCmds.push(c);continue}var l=i._find(u),v=i._find(h);if(!v&&!s[h]){e.invalidCmds.push(c);continue}if(!l||!this.isArray(l.data)){e.invalidCmds.push(c);continue}n.push(c)}else{var u=c[4],h=c[2],d=c[1];if(!d){e.invalidCmds.push(c);continue}var l=i._find(u),v=i._find(h);if(!l&&!s[u]||!v&&!s[h]){e.invalidCmds.push(c);continue}n.push(c)}else{var u=c[4],d=c[1];if(!d){e.invalidCmds.push(c);continue}var m=i._find(u);if(!(m&&this.isObject(m.data)||s[c[4]])){e.invalidCmds.push(c);continue}if(m.data[d]!=c[3]&&(!a[u]||"undefined"==typeof a[u][d]||a[u][d]!=c[3])){e.invalidPrevSet.push(c);continue}a[u]||(a[u]={}),a[u][d]=c[2],n.push(c)}else n.push(c);else{var m=i._find(c[1]);m?e.invalidCmds.push(c):(1==f&&(s[c[1]]=!0),2==f&&(_[c[1]]=!0),n.push(c))}}else e.invalidCmds.push(c)}}}(this)},s=function(t,i,n,e,r,a,_,o){var c,f=this;if(!(f instanceof s))return new s(t,i,n,e,r,a,_,o);var u=[t,i,n,e,r,a,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=s._classInfo.name)return new c(t,i,n,e,r,a,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};s._classInfo={name:"changeFrame"},s.prototype=new a,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.changeFrame=s,this.changeFrame=s):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.changeFrame=s:this.changeFrame=s}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},n=function(t,i,e,r,a,s,_,o){var c,f=this;if(!(f instanceof n))return new n(t,i,e,r,a,s,_,o);var u=[t,i,e,r,a,s,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,u)}),"function"==typeof c){if(c._classInfo.name!=n._classInfo.name)return new c(t,i,e,r,a,s,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,u)}):"function"==typeof f.init&&f.init.apply(f,u)};n._classInfo={name:"channelObjects"},n.prototype=new i,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());