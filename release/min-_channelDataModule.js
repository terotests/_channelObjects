(function(){var t={},i=function(){var i=function(){!function(t){t.fromAce=function(t){var i=[];return t.forEach(function(t){var r=t.range;"insertText"==t.action&&i.push([1,r.start.row,r.start.column,r.end.row,r.end.column,t.text]),"removeText"==t.action&&i.push([2,r.start.row,r.start.column,r.end.row,r.end.column,t.text]),"insertLines"==t.action&&i.push([3,r.start.row,r.start.column,r.end.row,r.end.column,t.lines]),"removeLines"==t.action&&i.push([4,r.start.row,r.start.column,r.end.row,r.end.column,t.lines,t.nl])}),i},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){}),t.reverse=function(t){var i=[];return t.forEach(function(t){{var r=t.slice();r[1],r[2],r[3],r[4]}return 1==r[0]?(r[0]=2,void i.unshift(r)):2==r[0]?(r[0]=1,void i.unshift(r)):3==r[0]?(r[0]=4,void i.unshift(r)):4==r[0]?(r[0]=3,void i.unshift(r)):void 0}),i},t.runToAce=function(t){var i=[],r=["","insertText","removeText","insertLines","removeLines"];return t.forEach(function(t){var n={action:r[t[0]],range:{start:{row:t[1],column:t[2]},end:{row:t[3],column:t[4]}}};t[0]<3?n.text=t[5]:n.lines=t[5],4==t[0]&&(n.nl=t[6]||"\n"),i.push(n)}),i},t.runToLineObj=function(t,i){i.forEach(function(i){var r=i[1],n=i[2],e=i[3],a=i[4];if(1==i[0])if("\n"==i[5]){var s=t.item(r);if(s){var _=s.text();s.text(_.slice(0,n));var o={text:_.slice(n)||""};t.insertAt(r+1,o)}else t.insertAt(r,{text:""}),t.insertAt(r+1,{text:""})}else{var s=t.item(r);if(s){var _=s.text();s.text(_.slice(0,n)+i[5]+_.slice(n))}else t.insertAt(r,{text:i[5]})}if(2==i[0])if("\n"==i[5]){var f=t.item(r),c=t.item(r+1),u="",d="";f&&(u=f.text()),c&&(d=c.text()),f?f.text(u+d):t.insertAt(r,{text:""}),c&&c.remove()}else{var s=t.item(r),_=s.text();s.text(_.slice(0,n)+_.slice(a))}if(3==i[0])for(var h=e-r,l=0;h>l;l++)t.insertAt(r+l,{text:i[5][l]});if(4==i[0])for(var h=e-r,l=0;h>l;l++){var s=t.item(r);s.remove()}})},t.runToString=function(t,i){if(!i||"undefined"==typeof t)return"";t+="";var r=t.split("\n");return i.forEach(function(t){var i=t[1],n=t[2],e=t[3],a=t[4];if(1==t[0])if("\n"==t[5]){var s=r[i]||"";r[i]=s.slice(0,n);var _=s.slice(n)||"";r.splice(i+1,0,_)}else{var s=r[i]||"";r[i]=s.slice(0,n)+t[5]+s.slice(n)}if(2==t[0])if("\n"==t[5]){var o=r[i]||"",f=r[i+1]||"";r[i]=o+f,r.splice(i+1,1)}else{var s=r[i]||"";r[i]=s.slice(0,n)+s.slice(a)}if(3==t[0])for(var c=e-i,u=0;c>u;u++)r.splice(i+u,0,t[5][u]);if(4==t[0])for(var c=e-i,u=0;c>u;u++)r.splice(i,1)}),r.join("\n")},t.simplify=function(t){var i,r=[],n=null;return t.forEach(function(t){i&&1==t[0]&&1==i[0]&&t[3]==t[1]&&i[1]==t[1]&&i[3]==t[3]&&i[4]==t[2]?n?(n[3]=t[3],n[4]=t[4],n[5]=n[5]+t[5]):(n=[],n[0]=1,n[1]=i[1],n[2]=i[2],n[3]=t[3],n[4]=t[4],n[5]=i[5]+t[5]):(n&&(r.push(n),n=null),1==t[0]?n=t.slice():r.push(t)),i=t}),n&&r.push(n),r}}(this)},r=function(t,i,n,e,a,s,_,o){var f,c=this;if(!(c instanceof r))return new r(t,i,n,e,a,s,_,o);var u=[t,i,n,e,a,s,_,o];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,u)}),"function"==typeof f){if(f._classInfo.name!=r._classInfo.name)return new f(t,i,n,e,a,s,_,o)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,u)}):"function"==typeof c.init&&c.init.apply(c,u)};r._classInfo={name:"aceCmdConvert"},r.prototype=new i;var n=function(){!function(t){t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.isArray=function(t){return t instanceof Array},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return t===Object(t)}}(this),function(t){var i,n,e,a,s;t._cmd_aceCmd=function(t,i){var n=this._find(t[4]),a=t[1];if(!n||!a)return!1;if("string"!=typeof n.data[a])return!1;var s=r();n.data[a]=s.runToString(n.data[a],t[2]),e=i;var _=[4,a,n.data[a],null,t[4]];return this._cmd(_,n,null),i?this._cmd(t,n,null):this.writeCommand(t),e=!1,this._fireListener(n,a),!0},t._cmd_createArray=function(t,i){var r=t[1];if(!r)return!1;var n=this._getObjectHash();if(n[r])return!1;var e={data:[],__id:r};return n[e.__id]=e,i||this.writeCommand(t,e),!0},t._cmd_createObject=function(t,i){var r=t[1];if(!r)return!1;var n=this._getObjectHash();if(n[r])return!1;var e={data:{},__id:r};return n[e.__id]=e,i||this.writeCommand(t,e),!0},t._cmd_moveToIndex=function(t,i){var r,e=this._find(t[4]),a=e.data.length,s=0;if(!e)return!1;var _=null;for(s=0;a>s;s++){var o=e.data[s];if(o.__id==t[1]){r=o,_=s;break}}if(_!=t[3]||!r)return!1;var f=parseInt(t[2]);return isNaN(f)?!1:e.data.length<=s?!1:(n.fromIndex=s,e.data.splice(s,1),e.data.splice(f,0,r),this._cmd(t,e,r),i||this.writeCommand(t),!0)},t._cmd_pushToArray=function(t,i){{var r=this._find(t[4]),n=this._find(t[2]),e=parseInt(t[1]);t[3],r.data.length}if(!r||!n)return!1;if(n.__p)return!1;if(isNaN(e))return!1;if(this.isArray(r.data))return e>r.data.length?!1:(r.data.splice(e,0,n),n.__p=r.__id,this._cmd(t,r,n),this._moveCmdListToParent(n),i||this.writeCommand(t),!0)},t._cmd_removeObject=function(t,i){var r=this._find(t[4]),n=this._find(t[2]),e=parseInt(t[1]);if(!r||!n)return!1;if(!n.__p)return!1;var a=r.data.indexOf(n);return isNaN(e)?!1:e!=a?!1:(r.data.splice(a,1),this._cmd(t,r,n),n.__p=null,i||this.writeCommand(t),!0)},t._cmd_setMeta=function(t,i){var r=this._find(t[4]),n=t[1];return n?"data"==n?!1:"__id"==n?!1:r?r[n]==t[2]?!1:(r[n]=t[2],this._cmd(t,r,null),i||this.writeCommand(t),!0):!1:!1},t._cmd_setProperty=function(t,i){var r=this._find(t[4]),n=t[1];if(!r||!n)return!1;var e=r.data[n];if(e==t[2])return!1;if("undefined"!=typeof e){if(e!=t[3])return!1}else if(this.isObject(e)||this.isArray(e))return!1;return r.data[n]=t[2],this._cmd(t,r,null),i||this.writeCommand(t),this._fireListener(r,n),!0},t._cmd_setPropertyObject=function(t,i){var r=this._find(t[4]),n=t[1],e=this._find(t[2]);return r&&n&&e?"undefined"!=typeof r.data[n]?!1:(r.data[n]=e,e.__p=r.__id,this._cmd(t,r,e),i||(this._moveCmdListToParent(e),this.writeCommand(t)),!0):!1},t._cmd_unsetProperty=function(t,i){var r=this._find(t[4]),n=t[1];return r&&n&&this.isObject(r.data[n])?(delete r.data[n],i||this.writeCommand(t),!0):!1},t._fireListener=function(t,r){if(i){var n=t.__id+"::"+r,e=i[n];e&&e.forEach(function(i){i(t,t.data[r])})}},t._moveCmdListToParent=function(){},t._reverse_aceCmd=function(t){var i=this._find(t[4]),n=t[1],e=r(),a=e.reverse(t[2]),s=[4,n,i.data[n],null,t[4]],_=[13,n,a,null,t[4]],o=e.runToString(i.data[n],a);i.data[n]=o,this._cmd(s),this._cmd(_)},t._reverse_createObject=function(t){var i=t[1],r=this._getObjectHash();delete r[i]},t._reverse_moveToIndex=function(t){var i,r=this._find(t[4]),n=r.data.length,e=0,a=null;for(e=0;n>e;e++){var s=r.data[e];if(s.__id==t[1]){i=s,a=e;break}}if(a!=t[2])throw"_reverse_moveToIndex with invalid index value";if(i){var _=parseInt(t[3]);r.data.splice(e,1),r.data.splice(_,0,i);var o=t.slice();o[2]=_,o[3]=t[2],this._cmd(o)}},t._reverse_pushToArray=function(t){{var i=this._find(t[4]),r=this._find(t[2]);i.data.length}if(i&&r){var n=i.data.length-1,e=i.data[n];if(e.__id==t[2]){var a=[8,n,e.__id,null,i.__id];i.data.splice(n,1),this._cmd(a)}}},t._reverse_removeObject=function(t){{var i=this._find(t[4]),r=this._find(t[2]),n=t[1];i.data.indexOf(r)}if(i&&r){i.data.splice(n,0,r);var e=[7,n,t[2],null,t[4]];this._cmd(e),r.__p=t[4]}},t._reverse_setMeta=function(t){var i=this._find(t[4]),r=t[1];if(i){var n=[3,r,t[3],t[2],t[4]];i[r]=t[3],this._cmd(n)}},t._reverse_setProperty=function(t){var i=this._find(t[4]),r=t[1];if(i){var n=[4,r,t[3],t[2],t[4]];i.data[r]=t[3],this._cmd(n)}},t._reverse_setPropertyObject=function(t){var i=this._find(t[4]),r=t[1],n=this._find(t[2]);if(i&&n){delete i.data[r],n.__p=null;var e=[10,r,null,null,t[4]];this._cmd(e)}},t._reverse_unsetProperty=function(t){var i=this._find(t[4]),r=this._find(t[2]),n=t[1];if(i&&n&&r){i.data[n]=r,r.__p=i.__id;var e=[5,n,r.__id,0,t[4]];this._cmd(e)}},t.execCmd=function(t,i,r){try{if(!this.isArray(t))return!1;var n=a[t[0]];if(n){var e=n.apply(this,[t,i]);return e&&!r&&this.writeLocalJournal(t),e}return!1}catch(s){return!1}},t.getJournalLine=function(){return this._journalPointer},t.getLocalJournal=function(){return this._journal},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){i||(i={},n={}),a||(s=new Array(30),a=new Array(30),a[1]=this._cmd_createObject,a[2]=this._cmd_createArray,a[3]=this._cmd_setMeta,a[4]=this._cmd_setProperty,a[5]=this._cmd_setPropertyObject,a[7]=this._cmd_pushToArray,a[8]=this._cmd_removeObject,a[10]=this._cmd_unsetProperty,a[12]=this._cmd_moveToIndex,a[13]=this._cmd_aceCmd,s[3]=this._reverse_setMeta,s[4]=this._reverse_setProperty,s[5]=this._reverse_setPropertyObject,s[7]=this._reverse_pushToArray,s[8]=this._reverse_removeObject,s[10]=this._reverse_unsetProperty,s[12]=this._reverse_moveToIndex,s[13]=this._reverse_aceCmd)}),t.redo=function(t){var i=this.getJournalLine();for(t=t||1;t-->0;){var r=this._journal[i];if(!r)return;this.execCmd(r,!1,!0),i++,this._journalPointer++}},t.reverseCmd=function(t){console.log("reversing command ",t);var i=s[t[0]];if(i){var r=i.apply(this,[t]);return r}},t.reverseNLines=function(t){for(var i=this.getJournalLine();i-1>=0&&t-->0;){var r=this._journal[i-1];this.reverseCmd(r),i--,this._journalPointer--}},t.reverseToLine=function(t){for(var i=this.getJournalLine();i-1>=0&&i>t;){var r=this._journal[i-1];this.reverseCmd(r),i--,this._journalPointer--}},t.undo=function(t){0!==t&&("undefined"==typeof t&&(t=1),this.reverseNLines(t))},t.writeLocalJournal=function(t){this._journal&&(this._journal.length>this._journalPointer&&(this._journal.length=this._journalPointer),this._journal.push(t),this._journalPointer++)}}(this),function(t){var i,r;t._addToCache=function(t){t&&t.__id&&(this._objectHash[t.__id]=t)},t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t){return i||(i={}),i[t]?i[t]:void(i[t]=this)}),t._cmd=function(t){var i=t[0],n=t[4];if(this._workers[i]&&this._workers[i][n]){var e=this._workers[i][n],a=t[1],s=e["*"],_=e[a];s&&s.forEach(function(i){var n=i[0],e=i[1],a=r[n];a&&a(t,e)}),_&&_.forEach(function(i){var n=i[0],e=i[1],a=r[n];a&&a(t,e)})}},t._createModelCommands=function(t,i,r){r||(r=[]);var n;if(n=t.data&&t.__id?t.data:t,this.isObject(n)||this.isArray(n)){var e;if(e=t.__id?t:{data:n,__id:this.guid()},this.isArray(n))var a=[2,e.__id,[],null,e.__id];else var a=[1,e.__id,{},null,e.__id];i&&(e.__p=i.__id),r.push(a);for(var s in n)if(n.hasOwnProperty(s)){var _=n[s];if(this.isObject(_)||this.isArray(_)){var o=this._createModelCommands(_,e,r),a=[5,s,o.__id,null,e.__id];r.push(a)}else{var a=[4,s,_,null,e.__id];r.push(a)}}return e}},t._createNewModel=function(t,i){if(this.isObject(t)||this.isArray(t)){var r={data:t,__id:this.guid()};if(this._objectHash[r.__id]=r,this.isArray(t))var n=[2,r.__id,[],null,r.__id];else var n=[1,r.__id,{},null,r.__id];i&&(r.__p=i.__id),this.writeCommand(n,r);for(var e in t)if(t.hasOwnProperty(e)){var a=t[e];if(this.isObject(a)||this.isArray(a)){var s=this._createNewModel(a,r);r.data[e]=s;var n=[5,e,s.__id,null,r.__id];this.writeCommand(n,r),this._moveCmdListToParent(s)}else{var n=[4,e,a,null,r.__id];this.writeCommand(n,r)}}return r}},t._find=function(t){return this._objectHash[t]},t._findObjects=function(t,i){if(!t)return null;if(!this.isObject(t))return t;t=this._wrapData(t),t.__id&&(this._objectHash[t.__id]=t);if(i&&(t.__p=i),t.data){var r=t.data;for(var n in r)if(r.hasOwnProperty(n)){var e=r[n];if(this.isObject(e)){var a=this._findObjects(e,t.__id);a!==e&&(t.data[n]=a)}}}return t},t._getObjectHash=function(){return this._objectHash},t._prepareData=function(t){var i=this._wrapData(t);return this._objectHash[i.__id]||(i=this._findObjects(i)),i},t._wrapData=function(t){if(t&&t._wrapData)return t._data;if(t.__id&&t.data)return t;var i=this._createNewModel(t);return i},t.createWorker=function(t,i,r){var n=i[0],e=i[4];this._workers[n]||(this._workers[n]={}),this._workers[n][e]||(this._workers[n][e]={});var a=this._workers[n][e],s=i[1];s||(s="*"),a[s]||(a[s]=[]),a[s].push([t,r])},t.getData=function(){return this._data},t.indexOf=function(t){if(t||(t=this._data),this.isObject(t)||(t=this._find(t)),t){var i=this._find(t.__p);if(i&&this.isArray(i.data))return i.data.indexOf(t)}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,i,r){if(i){this._objectHash||(this._objectHash={});var n=this;this._channelId=t,this._data=i,this._workers={},this._journal=r||[],this._journalPointer=this._journal.length;var e=this._findObjects(i);e!=i&&(this._data=e),r&&this.isArray(r)&&r.forEach(function(t){n.execCmd(t,!0)})}}),t.setWorkerCommands=function(t){r||(r={});for(var i in t)t.hasOwnProperty(i)&&(r[i]=t[i])},t.toPlainData=function(t){if("undefined"==typeof t&&(t=this._data),!this.isObject(t))return t;var i;if(this.isArray(t.data)){i=[];for(var r=t.data.length,n=0;r>n;n++)i[n]=this.toPlainData(t.data[n])}else{i={};for(var e in t.data)t.data.hasOwnProperty(e)&&(i[e]=this.toPlainData(t.data[e]))}return i},t.writeCommand=function(t){this._cmdBuffer||(this._cmdBuffer=[]),this._cmdBuffer.push(t)}}(this)},e=function(t,i,r,n,a,s,_,o){var f,c=this;if(!(c instanceof e))return new e(t,i,r,n,a,s,_,o);var u=[t,i,r,n,a,s,_,o];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,u)}),"function"==typeof f){if(f._classInfo.name!=e._classInfo.name)return new f(t,i,r,n,a,s,_,o)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,u)}):"function"==typeof c.init&&c.init.apply(c,u)};e._classInfo={name:"_channelData"},e.prototype=new n,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._channelData=e,this._channelData=e):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._channelData=e:this._channelData=e}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},r=function(t,i,n,e,a,s,_,o){var f,c=this;if(!(c instanceof r))return new r(t,i,n,e,a,s,_,o);var u=[t,i,n,e,a,s,_,o];if(c.__factoryClass)if(c.__factoryClass.forEach(function(t){f=t.apply(c,u)}),"function"==typeof f){if(f._classInfo.name!=r._classInfo.name)return new f(t,i,n,e,a,s,_,o)}else if(f)return f;c.__traitInit?c.__traitInit.forEach(function(t){t.apply(c,u)}):"function"==typeof c.init&&c.init.apply(c,u)};r._classInfo={name:"channelObjects"},r.prototype=new i,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());