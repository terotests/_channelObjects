(function(){var t={},i=function(){var i=function(){!function(t){t.fromAce=function(t){var i=[];return t.forEach(function(t){var n=t.range;"insertText"==t.action&&i.push([1,n.start.row,n.start.column,n.end.row,n.end.column,t.text]),"removeText"==t.action&&i.push([2,n.start.row,n.start.column,n.end.row,n.end.column,t.text]),"insertLines"==t.action&&i.push([3,n.start.row,n.start.column,n.end.row,n.end.column,t.lines]),"removeLines"==t.action&&i.push([4,n.start.row,n.start.column,n.end.row,n.end.column,t.lines,t.nl])}),i},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){}),t.reverse=function(t){var i=[];return t.forEach(function(t){{var n=t.slice();n[1],n[2],n[3],n[4]}return 1==n[0]?(n[0]=2,void i.unshift(n)):2==n[0]?(n[0]=1,void i.unshift(n)):3==n[0]?(n[0]=4,void i.unshift(n)):4==n[0]?(n[0]=3,void i.unshift(n)):void 0}),i},t.runToAce=function(t){var i=[],n=["","insertText","removeText","insertLines","removeLines"];return t.forEach(function(t){var r={action:n[t[0]],range:{start:{row:t[1],column:t[2]},end:{row:t[3],column:t[4]}}};t[0]<3?r.text=t[5]:r.lines=t[5],4==t[0]&&(r.nl=t[6]||"\n"),i.push(r)}),i},t.runToLineObj=function(t,i){i.forEach(function(i){var n=i[1],r=i[2],e=i[3],a=i[4];if(1==i[0])if("\n"==i[5]){var s=t.item(n);if(s){var _=s.text();s.text(_.slice(0,r));var o={text:_.slice(r)||""};t.insertAt(n+1,o)}else t.insertAt(n,{text:""}),t.insertAt(n+1,{text:""})}else{var s=t.item(n);if(s){var _=s.text();s.text(_.slice(0,r)+i[5]+_.slice(r))}else t.insertAt(n,{text:i[5]})}if(2==i[0])if("\n"==i[5]){var c=t.item(n),f=t.item(n+1),h="",u="";c&&(h=c.text()),f&&(u=f.text()),c?c.text(h+u):t.insertAt(n,{text:""}),f&&f.remove()}else{var s=t.item(n),_=s.text();s.text(_.slice(0,r)+_.slice(a))}if(3==i[0])for(var d=e-n,l=0;d>l;l++)t.insertAt(n+l,{text:i[5][l]});if(4==i[0])for(var d=e-n,l=0;d>l;l++){var s=t.item(n);s.remove()}})},t.runToString=function(t,i){if(!i||"undefined"==typeof t)return"";t+="";var n=t.split("\n");return i.forEach(function(t){var i=t[1],r=t[2],e=t[3],a=t[4];if(1==t[0])if("\n"==t[5]){var s=n[i]||"";n[i]=s.slice(0,r);var _=s.slice(r)||"";n.splice(i+1,0,_)}else{var s=n[i]||"";n[i]=s.slice(0,r)+t[5]+s.slice(r)}if(2==t[0])if("\n"==t[5]){var o=n[i]||"",c=n[i+1]||"";n[i]=o+c,n.splice(i+1,1)}else{var s=n[i]||"";n[i]=s.slice(0,r)+s.slice(a)}if(3==t[0])for(var f=e-i,h=0;f>h;h++)n.splice(i+h,0,t[5][h]);if(4==t[0])for(var f=e-i,h=0;f>h;h++)n.splice(i,1)}),n.join("\n")},t.simplify=function(t){var i,n=[],r=null;return t.forEach(function(t){i&&1==t[0]&&1==i[0]&&t[3]==t[1]&&i[1]==t[1]&&i[3]==t[3]&&i[4]==t[2]?r?(r[3]=t[3],r[4]=t[4],r[5]=r[5]+t[5]):(r=[],r[0]=1,r[1]=i[1],r[2]=i[2],r[3]=t[3],r[4]=t[4],r[5]=i[5]+t[5]):(r&&(n.push(r),r=null),1==t[0]?r=t.slice():n.push(t)),i=t}),r&&n.push(r),n}}(this)},n=function(t,i,r,e,a,s,_,o){var c,f=this;if(!(f instanceof n))return new n(t,i,r,e,a,s,_,o);var h=[t,i,r,e,a,s,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=n._classInfo.name)return new c(t,i,r,e,a,s,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};n._classInfo={name:"aceCmdConvert"},n.prototype=new i;var r=function(){!function(t){t.addController=function(t){this._controllers||(this._controllers=[]),this._controllers.indexOf(t)>=0||this._controllers.push(t)},t.clone=function(){return _data(this.serialize())},t.emitValue=function(t,i){if(this._processingEmit)return this;if(this._processingEmit=!0,this._controllers){for(var n=0,r=0;r<this._controllers.length;r++){var e=this._controllers[r];e[t]&&(e[t](i),n++)}if(this._processingEmit=!1,n>0)return this}this._valueFn&&this._valueFn[t]?this._valueFn[t](i):this._parent&&this._parent.emitValue&&this._parent.emitValue(t,i),this._processingEmit=!1},t.guid=function(){return Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){}),t.isArray=function(t){return"undefined"==typeof t?this.__isA:"[object Array]"===Object.prototype.toString.call(t)},t.isFunction=function(t){return"[object Function]"==Object.prototype.toString.call(t)},t.isObject=function(t){return"undefined"==typeof t?this.__isO:t===Object(t)}}(this),function(t){var i,r,e,a,s;t._cmd_aceCmd=function(t,i){var r=this._find(t[4]),a=t[1],s=n();r.data[a]=s.runToString(r.data[a],t[2]),e=i;var _=[4,a,r.data[a],null,t[4]];this._cmd(_,r,null),i?this._cmd(t,r,null):this.writeCommand(t),e=!1,this._fireListener(r,a)},t._cmd_createArray=function(t,i){var n={data:[],__id:t[1]},r=this._getObjectHash();r[n.__id]=n,i||this.writeCommand(t,n)},t._cmd_createObject=function(t,i){var n={data:{},__id:t[1]},r=this._getObjectHash();r[n.__id]=n,i||this.writeCommand(t,n)},t._cmd_moveToIndex=function(t,i){var n,e=this._find(t[4]),a=e.data.length,s=0,_=null;for(s=0;a>s;s++){var o=e.data[s];if(o.__id==t[1]){n=o,_=s;break}}if(_!=t[3])throw"moveToIndex with invalid old index value";if(n){var c=parseInt(t[2]);r.fromIndex=s,e.data.splice(s,1),e.data.splice(c,0,n),this._cmd(t,e,n),i||_isRemoteUpdate||this.writeCommand(t)}},t._cmd_pushToArray=function(t,i){{var n=this._find(t[4]),r=this._find(t[2]),e=t[1];t[3],n.data.length}n&&r&&(r.__p&&r.__p==n.__id||(n.data.splice(e,0,r),r.__p=n.__id,this._cmd(t,n,r),this._moveCmdListToParent(r),i||this.writeCommand(t)))},t._cmd_removeObject=function(t,i){var n=this._find(t[4]),r=this._find(t[2]),e=n.data.indexOf(r);n&&r&&(n.data.splice(e,1),r.__removedAt=e,this._cmd(t,n,r),r.__p=null,i||this.writeCommand(t))},t._cmd_setProperty=function(t,i){var n=this._find(t[4]),r=t[1];if(n){if(n.data[r]==t[2])return;n.data[r]=t[2],this._cmd(t,n,null),i||this.writeCommand(t),this._fireListener(n,r)}},t._cmd_setPropertyObject=function(t,i){var n=this._find(t[4]),r=t[1],e=this._find(t[2]);n&&e&&(n.data[r]=e,e.__p=n.__id,this._cmd(t,n,e),i||(this._moveCmdListToParent(e),this.writeCommand(t)))},t._cmd_unsetProperty=function(t,i){var n=this._find(t[4]),r=t[1];n&&r&&(delete n.data[r],i||this.writeCommand(t))},t._fireListener=function(t,n){if(i){var r=t.__id+"::"+n,e=i[r];e&&e.forEach(function(i){i(t,t.data[n])})}},t._moveCmdListToParent=function(){},t._reverse_aceCmd=function(t){var i=this._find(t[4]),r=t[1],e=n(),a=e.reverse(t[2]),s=[4,r,i.data[r],null,t[4]],_=[13,r,a,null,t[4]],o=e.runToString(i.data[r],a);i.data[r]=o,this._cmd(s),this._cmd(_)},t._reverse_moveToIndex=function(t){var i,n=this._find(t[4]),r=n.data.length,e=0,a=null;for(e=0;r>e;e++){var s=n.data[e];if(s.__id==t[1]){i=s,a=e;break}}if(a!=t[2])throw"_reverse_moveToIndex with invalid index value";if(i){var _=parseInt(t[3]);n.data.splice(e,1),n.data.splice(_,0,i);var o=t.slice();o[2]=_,o[3]=t[2],this._cmd(o)}},t._reverse_pushToArray=function(t){{var i=this._find(t[4]),n=this._find(t[2]);i.data.length}if(i&&n){var r=i.data.length-1,e=i.data[r];if(e.__id==t[2]){var a=[8,r,e.__id,null,i.__id];i.data.splice(r,1),this._cmd(a)}}},t._reverse_removeObject=function(t){{var i=this._find(t[4]),n=this._find(t[2]),r=t[1];i.data.indexOf(n)}if(i&&n){i.data.splice(r,0,n);var e=[7,r,t[2],null,t[4]];this._cmd(e),n.__p=t[4]}},t._reverse_setProperty=function(t){var i=this._find(t[4]),n=t[1];if(i){var r=[4,n,t[3],t[2],t[4]];i.data[n]=t[3],this._cmd(r)}},t._reverse_setPropertyObject=function(t){var i=this._find(t[4]),n=t[1],r=this._find(t[2]);if(i&&r){delete i.data[n],r.__p=null;var e=[10,n,null,null,t[4]];this._cmd(e)}},t._reverse_unsetProperty=function(t){var i=this._find(t[4]),n=this._find(t[2]),r=t[1];if(i&&r&&n){i.data[r]=n,n.__p=i.__id;var e=[5,r,n.__id,0,t[4]];this._cmd(e)}},t.execCmd=function(t,i){var n=a[t[0]];if(n){var r=n.apply(this,[t,i]);return this.writeLocalJournal(t),r}},t.getJournalLine=function(){return this._journalPointer},t.getLocalJournal=function(){return this._journal},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){i||(i={},r={}),a||(s=new Array(30),a=new Array(30),a[1]=this._cmd_createObject,a[2]=this._cmd_createArray,a[4]=this._cmd_setProperty,a[5]=this._cmd_setPropertyObject,a[7]=this._cmd_pushToArray,a[8]=this._cmd_removeObject,a[10]=this._cmd_unsetProperty,a[12]=this._cmd_moveToIndex,a[13]=this._cmd_aceCmd,s[4]=this._reverse_setProperty,s[5]=this._reverse_setPropertyObject,s[7]=this._reverse_pushToArray,s[8]=this._reverse_removeObject,s[10]=this._reverse_unsetProperty,s[12]=this._reverse_moveToIndex,s[13]=this._reverse_aceCmd)}),t.redo=function(t){var i=this.getJournalLine();for(t=t||1;t-->0;){var n=this._journal[i];if(!n)return;this.execCmd(n),i++,this._journalPointer++}},t.reverseCmd=function(t){var i=s[t[0]];if(i){var n=i.apply(this,[t]);return n}},t.reverseNLines=function(t){for(var i=this.getJournalLine();i-1>=0&&t-->0;){var n=this._journal[i-1];this.reverseCmd(n),i--,this._journalPointer--}},t.reverseToLine=function(t){for(var i=this.getJournalLine();i-1>=0&&i>t;){var n=this._journal[i-1];this.reverseCmd(n),i--,this._journalPointer--}},t.undo=function(t){this.reverseNLines(t||1)},t.writeLocalJournal=function(t){this._journal&&(this._journal.length>this._journalPointer&&(this._journal.length=this._journalPointer),this._journal.push(t),this._journalPointer++)}}(this),function(t){var i,n;t._addToCache=function(t){t&&t.__id&&(this._objectHash[t.__id]=t)},t.hasOwnProperty("__factoryClass")||(t.__factoryClass=[]),t.__factoryClass.push(function(t){return i||(i={}),i[t]?i[t]:void(i[t]=this)}),t._cmd=function(t){var i=t[0],r=t[4];if(this._workers[i]&&this._workers[i][r]){var e=this._workers[i][r],a=t[1],s=e["*"],_=e[a];s&&s.forEach(function(i){var r=i[0],e=i[1],a=n[r];a&&a(t,e)}),_&&_.forEach(function(i){var r=i[0],e=i[1],a=n[r];a&&a(t,e)})}},t._createModelCommands=function(t,i,n){n||(n=[]);var r;if(r=t.data&&t.__id?t.data:t,this.isObject(r)||this.isArray(r)){var e;if(e=t.__id?t:{data:r,__id:this.guid()},this.isArray(r))var a=[2,e.__id,[],null,e.__id];else var a=[1,e.__id,{},null,e.__id];i&&(e.__p=i.__id),n.push(a);for(var s in r)if(r.hasOwnProperty(s)){var _=r[s];if(this.isObject(_)||this.isArray(_)){var o=this._createModelCommands(_,e,n),a=[5,s,o.__id,null,e.__id];n.push(a)}else{var a=[4,s,_,null,e.__id];n.push(a)}}return e}},t._createNewModel=function(t,i){if(this.isObject(t)||this.isArray(t)){var n={data:t,__id:this.guid()};if(this._objectHash[n.__id]=n,this.isArray(t))var r=[2,n.__id,[],null,n.__id];else var r=[1,n.__id,{},null,n.__id];i&&(n.__p=i.__id),this.writeCommand(r,n);for(var e in t)if(t.hasOwnProperty(e)){var a=t[e];if(this.isObject(a)||this.isArray(a)){var s=this._createNewModel(a,n);n.data[e]=s;var r=[5,e,s.__id,null,n.__id];this.writeCommand(r,n),this._moveCmdListToParent(s)}else{var r=[4,e,a,null,n.__id];this.writeCommand(r,n)}}return n}},t._find=function(t){return this._objectHash[t]},t._findObjects=function(t,i){if(!t)return null;if(!this.isObject(t))return t;t=this._wrapData(t),t.__id&&(this._objectHash[t.__id]=t);if(i&&(t.__p=i),t.data){var n=t.data;for(var r in n)if(n.hasOwnProperty(r)){var e=n[r];if(this.isObject(e)){var a=this._findObjects(e,t.__id);a!==e&&(t.data[r]=a)}}}return t},t._getObjectHash=function(){return this._objectHash},t._prepareData=function(t){var i=this._wrapData(t);return this._objectHash[i.__id]||(i=this._findObjects(i)),i},t._wrapData=function(t){if(t&&t._wrapData)return t._data;if(t.__id&&t.data)return t;var i=this._createNewModel(t);return i},t.createWorker=function(t,i,n){var r=i[0],e=i[4];this._workers[r]||(this._workers[r]={}),this._workers[r][e]||(this._workers[r][e]={});var a=this._workers[r][e],s=i[1];s||(s="*"),a[s]||(a[s]=[]),a[s].push([t,n])},t.getData=function(){return this._data},t.indexOf=function(t){if(t||(t=this._data),this.isObject(t)||(t=this._find(t)),t){var i=this._find(t.__p);if(i&&this.isArray(i.data))return i.data.indexOf(t)}},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t,i,n){if(i){this._objectHash||(this._objectHash={});var r=this;this._data=i,this._workers={},this._journal=n||[],this._journalPointer=this._journal.length;var e=this._findObjects(i);e!=i&&(this._data=e),n&&this.isArray(n)&&n.forEach(function(t){r.execCmd(t,!0)})}}),t.setWorkerCommands=function(t){n||(n={});for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i])},t.toPlainData=function(t){if("undefined"==typeof t&&(t=this._data),!this.isObject(t))return t;var i;if(this.isArray(t.data)){i=[];for(var n=t.data.length,r=0;n>r;r++)i[r]=this.toPlainData(t.data[r])}else{i={};for(var e in t.data)t.data.hasOwnProperty(e)&&(i[e]=this.toPlainData(t.data[e]))}return i},t.writeCommand=function(t){this._cmdBuffer||(this._cmdBuffer=[]),this._cmdBuffer.push(t)}}(this)},e=function(t,i,n,r,a,s,_,o){var c,f=this;if(!(f instanceof e))return new e(t,i,n,r,a,s,_,o);var h=[t,i,n,r,a,s,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=e._classInfo.name)return new c(t,i,n,r,a,s,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};e._classInfo={name:"_channelData"},e.prototype=new r,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t._channelData=e,this._channelData=e):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports._channelData=e:this._channelData=e}.call(new Function("return this")()),function(t){t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(){})}(this)},n=function(t,i,r,e,a,s,_,o){var c,f=this;if(!(f instanceof n))return new n(t,i,r,e,a,s,_,o);var h=[t,i,r,e,a,s,_,o];if(f.__factoryClass)if(f.__factoryClass.forEach(function(t){c=t.apply(f,h)}),"function"==typeof c){if(c._classInfo.name!=n._classInfo.name)return new c(t,i,r,e,a,s,_,o)}else if(c)return c;f.__traitInit?f.__traitInit.forEach(function(t){t.apply(f,h)}):"function"==typeof f.init&&f.init.apply(f,h)};n._classInfo={name:"channelObjects"},n.prototype=new i,"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());