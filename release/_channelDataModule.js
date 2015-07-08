// The code template begins here
"use strict";

(function () {

  var __amdDefs__ = {};

  // The class definition is here...
  var channelObjects_prototype = function channelObjects_prototype() {
    // Then create the traits and subclasses for this class here...

    // the subclass definition comes around here then

    // The class definition is here...
    var aceCmdConvert_prototype = function aceCmdConvert_prototype() {
      // Then create the traits and subclasses for this class here...

      (function (_myTrait_) {

        // Initialize static variables here...

        /**
         * @param float cmdList
         */
        _myTrait_.fromAce = function (cmdList) {

          var newList = [];

          cmdList.forEach(function (cmd) {

            var range = cmd.range;
            if (cmd.action == "insertText") {
              newList.push([1, range.start.row, range.start.column, range.end.row, range.end.column, cmd.text]);
            }
            if (cmd.action == "removeText") {
              newList.push([2, range.start.row, range.start.column, range.end.row, range.end.column, cmd.text]);
            }
            if (cmd.action == "insertLines") {
              newList.push([3, range.start.row, range.start.column, range.end.row, range.end.column, cmd.lines]);
            }
            if (cmd.action == "removeLines") {
              newList.push([4, range.start.row, range.start.column, range.end.row, range.end.column, cmd.lines, cmd.nl]);
            }
          });

          return newList;

          /*
          {"action":"insertText","range":{"start":{"row":0,"column":0},
          "end":{"row":0,"column":1}},"text":"d"}
          */
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (onFulfilled, onRejected) {});

        /**
         * @param float cmdList
         */
        _myTrait_.runToAce = function (cmdList) {

          var newList = [],
              _convert = ["", "insertText", "removeText", "insertLines", "removeLines"];

          cmdList.forEach(function (cmd) {

            var c = {
              action: _convert[cmd[0]],
              range: {
                start: {
                  row: cmd[1],
                  column: cmd[2]
                },
                end: {
                  row: cmd[3],
                  column: cmd[4]
                }
              }
            };
            if (cmd[0] < 3) {
              c.text = cmd[5];
            } else {
              c.lines = cmd[5];
            }
            if (cmd[0] == 4) c.nl = cmd[6] || "\n";
            newList.push(c);
          });

          return newList;

          /*
          {"action":"insertText","range":{"start":{"row":0,"column":0},
          "end":{"row":0,"column":1}},"text":"d"}
          */
        };

        /**
         * @param Object lines
         * @param float cmdList
         */
        _myTrait_.runToLineObj = function (lines, cmdList) {

          cmdList.forEach(function (cmd) {
            var row = cmd[1],
                col = cmd[2],
                endRow = cmd[3],
                endCol = cmd[4];
            if (cmd[0] == 1) {
              if (cmd[5] == "\n") {
                // add the newline can be a bit tricky
                var line = lines.item(row);
                if (!line) {
                  lines.insertAt(row, {
                    text: ""
                  });
                  lines.insertAt(row + 1, {
                    text: ""
                  });
                } else {
                  var txt = line.text();
                  line.text(txt.slice(0, col));
                  var newLine = {
                    text: txt.slice(col) || ""
                  };
                  lines.insertAt(row + 1, newLine);
                }
                //lines[row] = line.slice(0,col);
                //var newLine = line.slice(col) || "";
                //lines.splice(row+1, 0, newLine);
              } else {
                var line = lines.item(row);
                if (!line) {
                  lines.insertAt(row, {
                    text: cmd[5]
                  });
                } else {
                  var txt = line.text();
                  line.text(txt.slice(0, col) + cmd[5] + txt.slice(col));
                  // lines[row] = line.slice(0, col) + cmd[5] + line.slice(col);
                }
              }
            }
            if (cmd[0] == 2) {
              if (cmd[5] == "\n") {
                // removing the newline can be a bit tricky
                // lines[row]
                var thisLine = lines.item(row),
                    nextLine = lines.item(row + 1);

                // lines[row] = thisLine + nextLine;
                // lines.splice(row+1, 1); // remove the line...
                var txt1 = "",
                    txt2 = "";
                if (thisLine) txt1 = thisLine.text();
                if (nextLine) txt2 = nextLine.text();
                if (!thisLine) {
                  lines.insertAt(row, {
                    text: ""
                  });
                } else {
                  thisLine.text(txt1 + txt2);
                }
                if (nextLine) nextLine.remove();
              } else {
                var line = lines.item(row),
                    txt = line.text();
                line.text(txt.slice(0, col) + txt.slice(endCol));
                //  str.slice(0, 4) + str.slice(5, str.length))
                // lines[row] = line.slice(0, col) + line.slice(endCol);
              }
            }
            if (cmd[0] == 3) {
              var cnt = endRow - row;
              for (var i = 0; i < cnt; i++) {
                // var line = lines.item(row+i);
                lines.insertAt(row + i, {
                  text: cmd[5][i]
                });
                // lines.splice(row+i, 0, cmd[5][i]);
              }
            }
            if (cmd[0] == 4) {
              var cnt = endRow - row;
              for (var i = 0; i < cnt; i++) {
                var line = lines.item(row);
                line.remove();
                // lines.splice(row, 1);
              }
            }
          });
          /*
          tools.button().text("Insert to 1 ").on("click", function() {
          myT.lines.insertAt(1, { text : prompt("text")}); 
          });
          tools.button().text("Insert to 0 ").on("click", function() {
          myT.lines.insertAt(0, { text : prompt("text")}); 
          });
          tools.button().text("Split line 1").on("click", function() {
          var line1 = myT.lines.item(1);
          var txt = line1.text();
          var txt1 = txt.substring(0, 4),
          txt2 = txt.substring(4);
          line1.text(txt1);
          myT.lines.insertAt(2, { text : txt2 });
          });
          tools.button().text("Insert to N-1 ").on("click", function() {
          myT.lines.insertAt(myT.lines.length()-1, { text : prompt("text")}); 
          });
          tools.button().text("Insert to N ").on("click", function() {
          myT.lines.insertAt(myT.lines.length(), { text : prompt("text")}); 
          });
          */
        };

        /**
         * @param float str
         * @param float cmdList
         */
        _myTrait_.runToString = function (str, cmdList) {

          if (!cmdList || typeof str == "undefined") {
            return "";
          }
          str = str + "";

          var lines = str.split("\n");

          cmdList.forEach(function (cmd) {
            var row = cmd[1],
                col = cmd[2],
                endRow = cmd[3],
                endCol = cmd[4];
            if (cmd[0] == 1) {
              if (cmd[5] == "\n") {
                // add the newline can be a bit tricky
                var line = lines[row] || "";
                lines[row] = line.slice(0, col);
                var newLine = line.slice(col) || "";
                lines.splice(row + 1, 0, newLine);
              } else {
                var line = lines[row] || "";
                lines[row] = line.slice(0, col) + cmd[5] + line.slice(col);
              }
            }
            if (cmd[0] == 2) {
              if (cmd[5] == "\n") {
                // removing the newline can be a bit tricky
                // lines[row]
                var thisLine = lines[row] || "",
                    nextLine = lines[row + 1] || "";
                lines[row] = thisLine + nextLine;
                lines.splice(row + 1, 1); // remove the line...
              } else {
                var line = lines[row] || "";
                // str.slice(0, 4) + str.slice(5, str.length))
                lines[row] = line.slice(0, col) + line.slice(endCol);
              }
            }
            if (cmd[0] == 3) {
              var cnt = endRow - row;
              for (var i = 0; i < cnt; i++) {
                lines.splice(row + i, 0, cmd[5][i]);
              }
            }
            if (cmd[0] == 4) {
              var cnt = endRow - row;
              for (var i = 0; i < cnt; i++) {
                lines.splice(row, 1);
              }
            }
          });

          return lines.join("\n");
        };

        /**
         * @param array cmdList
         */
        _myTrait_.simplify = function (cmdList) {

          // [[1,0,0,0,1,"a"],[1,0,1,0,2,"b"],[1,0,2,0,3,"c"],[1,0,3,0,4,"e"],[1,0,4,0,5,"d"],
          // [1,0,5,0,6,"e"],[1,0,6,0,7,"f"],[1,0,7,0,8,"g"]]
          var newList = [],
              lastCmd,
              lastCol,
              lastRow,
              collect = null;

          cmdList.forEach(function (cmd) {

            if (lastCmd && cmd[0] == 1 && lastCmd[0] == 1 && cmd[3] == cmd[1] && lastCmd[1] == cmd[1] && lastCmd[3] == cmd[3] && lastCmd[4] == cmd[2]) {
              if (!collect) {
                collect = [];
                collect[0] = 1;
                collect[1] = lastCmd[1];
                collect[2] = lastCmd[2];
                collect[3] = cmd[3];
                collect[4] = cmd[4];
                collect[5] = lastCmd[5] + cmd[5];
              } else {
                collect[3] = cmd[3];
                collect[4] = cmd[4];
                collect[5] = collect[5] + cmd[5];
              }
            } else {
              if (collect) {
                newList.push(collect);
                collect = null;
              }
              if (cmd[0] == 1) {
                collect = cmd.slice();
              } else {
                newList.push(cmd);
              }
            }
            lastCmd = cmd;
          });
          if (collect) newList.push(collect);
          return newList;
        };
      })(this);
    };

    var aceCmdConvert = function aceCmdConvert(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof aceCmdConvert) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != aceCmdConvert._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new aceCmdConvert(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    aceCmdConvert._classInfo = {
      name: "aceCmdConvert"
    };
    aceCmdConvert.prototype = new aceCmdConvert_prototype();

    // the subclass definition comes around here then

    // The class definition is here...
    var _channelData_prototype = function _channelData_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

        /**
         * @param Object c
         */
        _myTrait_.addController = function (c) {
          if (!this._controllers) this._controllers = [];

          if (this._controllers.indexOf(c) >= 0) return;

          this._controllers.push(c);
        };

        /**
         * @param float t
         */
        _myTrait_.clone = function (t) {
          return _data(this.serialize());
        };

        /**
         * @param float scope
         * @param float data
         */
        _myTrait_.emitValue = function (scope, data) {
          if (this._processingEmit) return this;

          this._processingEmit = true;
          // adding controllers to the data...
          if (this._controllers) {
            var cnt = 0;
            for (var i = 0; i < this._controllers.length; i++) {
              var c = this._controllers[i];
              if (c[scope]) {
                c[scope](data);
                cnt++;
              }
            }
            this._processingEmit = false;
            if (cnt > 0) return this;
          }
          /*
          if(this._controller) {
          if(this._controller[scope]) {
          this._controller[scope](data);
          return;
          }
          }
          */

          if (this._valueFn && this._valueFn[scope]) {
            this._valueFn[scope](data);
          } else {
            if (this._parent) {
              if (!this._parent.emitValue) {} else {
                this._parent.emitValue(scope, data);
              }
            }
          }
          this._processingEmit = false;
        };

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {

          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

          //return Math.random();
          // return Math.random().toString(36);

          /*    
          return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
          */
          /*        
          function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();*/
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (data, options, notUsed, notUsed2) {});

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {

          if (typeof t == "undefined") return this.__isA;

          return Object.prototype.toString.call(t) === "[object Array]";
        };

        /**
         * @param float fn
         */
        _myTrait_.isFunction = function (fn) {
          return Object.prototype.toString.call(fn) == "[object Function]";
        };

        /**
         * @param float t
         */
        _myTrait_.isObject = function (t) {

          if (typeof t == "undefined") return this.__isO;

          return t === Object(t);
        };
      })(this);

      // trait comes here...

      (function (_myTrait_) {
        var _listeners;
        var _execInfo;
        var _doingRemote;
        var _cmds;
        var _reverseCmds;

        // Initialize static variables here...

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_aceCmd = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1];

          var conv = aceCmdConvert();
          obj.data[prop] = conv.runToString(obj.data[prop], a[2]);

          _doingRemote = isRemote;

          var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
          this._cmd(tmpCmd, obj, null);

          if (!isRemote) {
            this.writeCommand(a);
          } else {
            this._cmd(a, obj, null);
          }
          _doingRemote = false;
          this._fireListener(obj, prop);
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_createArray = function (a, isRemote) {
          var newObj = {
            data: [],
            __id: a[1]
          };
          var hash = this._getObjectHash();
          hash[newObj.__id] = newObj;
          if (!isRemote) {
            this.writeCommand(a, newObj);
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_createObject = function (a, isRemote) {
          var newObj = {
            data: {},
            __id: a[1]
          };
          var hash = this._getObjectHash();
          hash[newObj.__id] = newObj;
          if (!isRemote) {
            this.writeCommand(a, newObj);
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_moveToIndex = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

          var oldIndex = null;

          for (i = 0; i < len; i++) {
            var m = obj.data[i];
            if (m.__id == a[1]) {
              targetObj = m;
              oldIndex = i;
              break;
            }
          }

          if (oldIndex != a[3]) {
            throw "moveToIndex with invalid old index value";
            return;
          }

          // Questions here:
          // - should we move command list only on the parent object, not the child
          //  =>  this._moveCmdListToParent(targetObj); could be
          //      this._moveCmdListToParent(obj);
          // That is... where the command is really saved???
          // is the command actually written anywhere???
          //  - where is the writeCommand?
          //
          // Moving the object in the array
          if (targetObj) {
            var targetIndex = parseInt(a[2]);

            _execInfo.fromIndex = i;

            obj.data.splice(i, 1);
            obj.data.splice(targetIndex, 0, targetObj);
            this._cmd(a, obj, targetObj);

            if (!(isRemote || _isRemoteUpdate)) {
              this.writeCommand(a);
            }
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_pushToArray = function (a, isRemote) {

          // old position
          // [ "parentId", "index"]

          var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              toIndex = a[1],
              oldPos = a[3],
              // old position can also be "null"
          prop = "*",
              index = parentObj.data.length; // might check if valid...

          // Moving the object in the array
          if (parentObj && insertedObj) {

            // Do not isert the item into the array 2 times, test for that error
            if (!insertedObj.__p || insertedObj.__p != parentObj.__id) {

              // now the object is in the array...

              parentObj.data.splice(toIndex, 0, insertedObj);

              insertedObj.__p = parentObj.__id;
              this._cmd(a, parentObj, insertedObj);

              this._moveCmdListToParent(insertedObj);

              // Saving the write to root document
              if (!isRemote) {
                this.writeCommand(a);
              }
            }
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_removeObject = function (a, isRemote) {

          var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

          // Moving the object in the array
          if (parentObj && removedItem) {

            // now the object is in the array...
            parentObj.data.splice(index, 1);

            // Adding extra information to the object about it's removal
            removedItem.__removedAt = index;

            this._cmd(a, parentObj, removedItem);
            removedItem.__p = null; // must be set to null...

            // Saving the write to root document
            if (!isRemote) {
              this.writeCommand(a);
            }
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_setProperty = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (obj) {

            if (obj.data[prop] == a[2]) return;

            obj.data[prop] = a[2]; // value is now set...
            this._cmd(a, obj, null);

            // Saving the write to root document
            if (!isRemote) {
              this.writeCommand(a);
            }
            this._fireListener(obj, prop);
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_setPropertyObject = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1],
              setObj = this._find(a[2]);

          if (!obj) return;
          if (!setObj) return;

          obj.data[prop] = setObj; // value is now set...
          setObj.__p = obj.__id; // The parent relationship
          this._cmd(a, obj, setObj);

          if (!isRemote) {
            this._moveCmdListToParent(setObj);
            this.writeCommand(a);
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_unsetProperty = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (obj && prop) {
            // unsetting a property does not work right now...
            delete obj.data[prop];
            if (!isRemote) this.writeCommand(a);
          }
        };

        /**
         * @param float obj
         * @param float prop
         */
        _myTrait_._fireListener = function (obj, prop) {
          if (_listeners) {
            var lName = obj.__id + "::" + prop,
                eList = _listeners[lName];
            if (eList) {
              eList.forEach(function (fn) {
                fn(obj, obj.data[prop]);
              });
            }
          }
        };

        /**
         * @param float t
         */
        _myTrait_._moveCmdListToParent = function (t) {};

        /**
         * @param float a
         */
        _myTrait_._reverse_moveToIndex = function (a) {
          var obj = this._find(a[4]),
              prop = "*",
              len = obj.data.length,
              targetObj,
              i = 0;

          var oldIndex = null;

          for (i = 0; i < len; i++) {
            var m = obj.data[i];
            if (m.__id == a[1]) {
              targetObj = m;
              oldIndex = i;
              break;
            }
          }

          if (oldIndex != a[2]) {
            throw "_reverse_moveToIndex with invalid index value";
            return;
          }

          if (targetObj) {

            var targetIndex = parseInt(a[3]);

            obj.data.splice(i, 1);
            obj.data.splice(targetIndex, 0, targetObj);

            var tmpCmd = a.slice();
            tmpCmd[2] = targetIndex;
            tmpCmd[3] = a[2];

            this._cmd(tmpCmd);
          }
        };

        /**
         * @param float a
         */
        _myTrait_._reverse_pushToArray = function (a) {
          var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              prop = "*",
              index = parentObj.data.length;

          // Moving the object in the array
          if (parentObj && insertedObj) {

            var shouldBeAt = parentObj.data.length - 1;

            var item = parentObj.data[shouldBeAt];

            // old parent and old item id perhas should be also defined?
            if (item.__id == a[2]) {

              // the command which appears to be run, sent to the data listeners
              var tmpCmd = [8, shouldBeAt, item.__id, null, parentObj.__id];

              // too simple still...
              parentObj.data.splice(shouldBeAt, 1);

              this._cmd(tmpCmd);
            }
          }
        };

        /**
         * @param float a
         */
        _myTrait_._reverse_removeObject = function (a) {

          var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              oldPosition = a[1],
              prop = "*",
              index = parentObj.data.indexOf(removedItem); // might check if valid...

          // Moving the object in the array
          if (parentObj && removedItem) {

            // now the object is in the array...
            parentObj.data.splice(oldPosition, 0, removedItem);

            var tmpCmd = [7, oldPosition, a[2], null, a[4]];
            this._cmd(tmpCmd);

            removedItem.__p = a[4];
          }
        };

        /**
         * @param Array a
         */
        _myTrait_._reverse_setProperty = function (a) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (obj) {
            var tmpCmd = [4, prop, a[3], a[2], a[4]];
            obj.data[prop] = a[3]; // the old value
            this._cmd(tmpCmd);
          }
        };

        /**
         * Unfinished.
         * @param float a
         */
        _myTrait_._reverse_setPropertyObject = function (a) {

          var obj = this._find(a[4]),
              prop = a[1],
              setObj = this._find(a[2]);

          if (!obj) return;
          if (!setObj) return;

          // TODO problem: what if there was old object with some existing value
          // the old object should be saved before you can restore, simply deleting
          // the object is not good enough.

          delete obj.data[prop]; // removes the property object
          setObj.__p = null;

          var tmpCmd = [10, prop, null, null, a[4]];
          this._cmd(tmpCmd);
        };

        /**
         * @param Array a
         */
        _myTrait_._reverse_unsetProperty = function (a) {
          var obj = this._find(a[4]),
              removedObj = this._find(a[2]),
              prop = a[1];

          if (obj && prop && removedObj) {

            obj.data[prop] = removedObj;
            removedObj.__p = obj.__id; // The parent relationship

            var tmpCmd = [5, prop, removedObj.__id, 0, a[4]];
            this._cmd(tmpCmd);
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_.execCmd = function (a, isRemote) {

          var c = _cmds[a[0]];
          if (c) {
            var rv = c.apply(this, [a, isRemote]);
            this.writeLocalJournal(a);
            return rv;
          }
        };

        /**
         * @param float t
         */
        _myTrait_.getJournalLine = function (t) {
          return this._journal.length;
        };

        /**
         * @param float t
         */
        _myTrait_.getLocalJournal = function (t) {
          return this._journal;
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (t) {
          if (!_listeners) {
            _listeners = {};
            _execInfo = {};
          }

          if (!_cmds) {

            _reverseCmds = new Array(30);
            _cmds = new Array(30);

            _cmds[1] = this._cmd_createObject;
            _cmds[2] = this._cmd_createArray;
            _cmds[4] = this._cmd_setProperty;
            _cmds[5] = this._cmd_setPropertyObject;
            _cmds[7] = this._cmd_pushToArray;
            _cmds[8] = this._cmd_removeObject;
            _cmds[10] = this._cmd_unsetProperty;
            _cmds[12] = this._cmd_moveToIndex;
            _cmds[13] = this._cmd_aceCmd;

            _reverseCmds[4] = this._reverse_setProperty;
            _reverseCmds[5] = this._reverse_setPropertyObject;
            _reverseCmds[7] = this._reverse_pushToArray;
            _reverseCmds[8] = this._reverse_removeObject;
            _reverseCmds[10] = this._reverse_unsetProperty;
            _reverseCmds[12] = this._reverse_moveToIndex;
            // _reverse_setPropertyObject
          }
        });

        /**
         * This function reverses a given command. There may be cases when the command parameters make the command itself non-reversable. It is the responsibility of the framework to make sure all commands remain reversable.
         * @param float a
         */
        _myTrait_.reverseCmd = function (a) {
          var c = _reverseCmds[a[0]];
          if (c) {
            var rv = c.apply(this, [a]);
            return rv;
          }
        };

        /**
         * @param int n
         */
        _myTrait_.reverseNLines = function (n) {
          // if one line in buffer line == 1
          var line = this.getJournalLine();

          while (line - 1 >= 0 && n-- > 0) {
            var cmd = this._journal.pop();
            this.reverseCmd(cmd);
            line--;
          }
        };

        /**
         * 0 = reverse all commands, 1 = reverse to the first line etc.
         * @param int index
         */
        _myTrait_.reverseToLine = function (index) {
          // if one line in buffer line == 1
          var line = this.getJournalLine();

          while (line - 1 >= 0 && line > index) {
            var cmd = this._journal.pop();
            this.reverseCmd(cmd);
            line--;
          }
        };

        /**
         * @param Array cmd
         */
        _myTrait_.writeLocalJournal = function (cmd) {

          if (this._journal) this._journal.push(cmd);
        };
      })(this);

      (function (_myTrait_) {
        var _instanceCache;
        var _workerCmds;

        // Initialize static variables here...

        /**
         * @param float data
         */
        _myTrait_._addToCache = function (data) {

          if (data && data.__id) {
            this._objectHash[data.__id] = data;
          }
        };

        if (!_myTrait_.hasOwnProperty("__factoryClass")) _myTrait_.__factoryClass = [];
        _myTrait_.__factoryClass.push(function (id) {

          if (!_instanceCache) _instanceCache = {};

          if (_instanceCache[id]) return _instanceCache[id];

          _instanceCache[id] = this;
        });

        /**
         * In the future can be used to initiate events, if required.
         * @param float cmd
         * @param float obj
         * @param float targetObj
         */
        _myTrait_._cmd = function (cmd, obj, targetObj) {

          var cmdIndex = cmd[0],
              UUID = cmd[4];

          if (!this._workers[cmdIndex]) return;
          if (!this._workers[cmdIndex][UUID]) return;

          var workers = this._workers[cmdIndex][UUID];
          var me = this;

          var propFilter = cmd[1];
          var allProps = workers["*"],
              thisProp = workers[propFilter];

          if (allProps) {
            allProps.forEach(function (w) {
              var id = w[0],
                  options = w[1];
              var worker = _workerCmds[id];
              if (worker) {
                worker(cmd, options);
              }
            });
          }
          if (thisProp) {
            thisProp.forEach(function (w) {
              var id = w[0],
                  options = w[1];
              var worker = _workerCmds[id];
              if (worker) {
                worker(cmd, options);
              }
            });
          }
        };

        /**
         * @param float obj
         * @param float parentObj
         * @param float intoList
         */
        _myTrait_._createModelCommands = function (obj, parentObj, intoList) {

          /*
          _cmdIndex = {}; 
          _cmdIndex["createObject"] = 1;
          _cmdIndex["createArray"]  = 2;
          _cmdIndex["initProp"]  = 3;
          _cmdIndex["set"]  = 4;
          _cmdIndex["setMember"]  = 5;
          _cmdIndex["push"]  = 6;
          _cmdIndex["pushObj"]  = 7;
          _cmdIndex["removeItem"]  = 8;
          // reserved 9 for optimizations
          _cmdIndex["last"]  = 9;
          _cmdIndex["removeProperty"]  = 10;
          _cmdIndex["insertObjectAt"]  = 11;
          _cmdIndex["moveToIndex"]  = 12;
          */

          if (!intoList) intoList = [];

          var data;

          if (obj.data && obj.__id) {
            data = obj.data;
          } else {
            data = obj;
          }

          if (this.isObject(data) || this.isArray(data)) {

            var newObj;

            if (obj.__id) {
              newObj = obj;
            } else {
              newObj = {
                data: data,
                __id: this.guid()
              };
            }

            if (this.isArray(data)) {
              var cmd = [2, newObj.__id, [], null, newObj.__id];
            } else {
              var cmd = [1, newObj.__id, {}, null, newObj.__id];
            }
            if (parentObj) {
              newObj.__p = parentObj.__id;
              // this._moveCmdListToParent( newObj );
            }
            intoList.push(cmd);

            // Then, check for the member variables...
            for (var n in data) {
              if (data.hasOwnProperty(n)) {
                var value = data[n];
                if (this.isObject(value) || this.isArray(value)) {
                  // Then create a new...
                  var oo = this._createModelCommands(value, newObj, intoList);
                  var cmd = [5, n, oo.__id, null, newObj.__id];
                  intoList.push(cmd);
                } else {
                  var cmd = [4, n, value, null, newObj.__id];
                  intoList.push(cmd);
                }
              }
            }

            return newObj;
          } else {}

          /*
          var newObj = {
          data : data,
          __id : this.guid()
          }
          */
        };

        /**
         * @param Object data
         * @param float parentObj
         */
        _myTrait_._createNewModel = function (data, parentObj) {

          /*
          _cmdIndex = {}; 
          _cmdIndex["createObject"] = 1;
          _cmdIndex["createArray"]  = 2;
          _cmdIndex["initProp"]  = 3;
          _cmdIndex["set"]  = 4;
          _cmdIndex["setMember"]  = 5;
          _cmdIndex["push"]  = 6;
          _cmdIndex["pushObj"]  = 7;
          _cmdIndex["removeItem"]  = 8;
          // reserved 9 for optimizations
          _cmdIndex["last"]  = 9;
          _cmdIndex["removeProperty"]  = 10;
          _cmdIndex["insertObjectAt"]  = 11;
          _cmdIndex["moveToIndex"]  = 12;
          */

          if (this.isObject(data) || this.isArray(data)) {

            var newObj = {
              data: data,
              __id: this.guid()
            };

            this._objectHash[newObj.__id] = newObj;

            if (this.isArray(data)) {
              var cmd = [2, newObj.__id, [], null, newObj.__id];
            } else {
              var cmd = [1, newObj.__id, {}, null, newObj.__id];
            }

            if (parentObj) {
              newObj.__p = parentObj.__id;
              // this._moveCmdListToParent( newObj );
            }
            this.writeCommand(cmd, newObj);

            // Then, check for the member variables...
            for (var n in data) {
              if (data.hasOwnProperty(n)) {
                var value = data[n];
                if (this.isObject(value) || this.isArray(value)) {
                  // Then create a new...
                  var oo = this._createNewModel(value, newObj);
                  newObj.data[n] = oo;
                  var cmd = [5, n, oo.__id, null, newObj.__id];
                  this.writeCommand(cmd, newObj);
                  this._moveCmdListToParent(oo);
                } else {
                  var cmd = [4, n, value, null, newObj.__id];
                  this.writeCommand(cmd, newObj);
                }
              }
            }

            return newObj;
          } else {}

          /*
          var newObj = {
          data : data,
          __id : this.guid()
          }
          */
        };

        /**
         * @param float id
         */
        _myTrait_._find = function (id) {
          return this._objectHash[id];
        };

        /**
         * @param float data
         * @param float parentId
         * @param float whenReady
         */
        _myTrait_._findObjects = function (data, parentId, whenReady) {

          if (!data) return null;

          if (!this.isObject(data)) return data;

          data = this._wrapData(data);
          if (data.__id) {
            this._objectHash[data.__id] = data;
          }

          var me = this;
          if (parentId) {
            data.__p = parentId;
          }
          if (data.data) {
            var sub = data.data;
            for (var n in sub) {
              if (sub.hasOwnProperty(n)) {
                var p = sub[n];
                if (this.isObject(p)) {
                  var newData = this._findObjects(p, data.__id);
                  if (newData !== p) {
                    data.data[n] = newData;
                  }
                }
              }
            }
          }
          return data;
        };

        /**
         * @param float t
         */
        _myTrait_._getObjectHash = function (t) {
          return this._objectHash;
        };

        /**
         * @param Object data
         */
        _myTrait_._prepareData = function (data) {
          var d = this._wrapData(data);
          if (!this._objectHash[d.__id]) {
            d = this._findObjects(d);
          }
          return d;
        };

        /**
         * @param float data
         * @param float parent
         */
        _myTrait_._wrapData = function (data, parent) {

          // if instance of this object...
          if (data && data._wrapData) {
            // we can use the same pointer to this data
            return data._data;
          }

          // if the data is "well formed"
          if (data.__id && data.data) return data;

          // if new data, then we must create a new object and return it

          var newObj = this._createNewModel(data);
          /*
          var newObj = {
          data : data,
          __id : this.guid()
          }
          */
          return newObj;
        };

        /**
         * @param string workerID
         * @param Array cmdFilter
         * @param Object workerOptions
         */
        _myTrait_.createWorker = function (workerID, cmdFilter, workerOptions) {

          // cmdFilter could be something like this:
          // [ 4, 'x', null, null, 'GUID' ]
          // [ 8, null, null, null, 'GUID' ]

          var cmdIndex = cmdFilter[0],
              UUID = cmdFilter[4];

          if (!this._workers[cmdIndex]) {
            this._workers[cmdIndex] = {};
          }

          if (!this._workers[cmdIndex][UUID]) this._workers[cmdIndex][UUID] = {};

          var workers = this._workers[cmdIndex][UUID];

          var propFilter = cmdFilter[1];
          if (!propFilter) propFilter = "*";

          if (!workers[propFilter]) workers[propFilter] = [];

          workers[propFilter].push([workerID, workerOptions]);

          // The original worker implementation was something like this:

          // The worker has
          // 1. the Data item ID
          // 2. property name
          // 3. the worker function
          // 4. the view information
          // 5. extra params ( 4. and 5. could be simplified to options)

          /*
          var w = _dataLink._createWorker( 
          dataItem.__id, 
          vName, 
          _workers().fetch(9), 
          subTplDOM, {
           modelid : dataItem.__id,
           compiler : me,
           view : myView
          });
          */
        };

        /**
         * @param float t
         */
        _myTrait_.getData = function (t) {
          return this._data;
        };

        /**
         * @param float item
         */
        _myTrait_.indexOf = function (item) {

          if (!item) item = this._data;

          if (!this.isObject(item)) {
            item = this._find(item);
          }
          if (!item) return;

          var parent = this._find(item.__p);

          if (!parent) return;
          if (!this.isArray(parent.data)) return;

          return parent.data.indexOf(item);
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (channelId, mainData, journalCmds) {

          // if no mainData defined, exit immediately
          if (!mainData) return;
          /*
          The format of the main data is as follows : 
          {
          data : {
          key : value,
          subObject : {
            data : {}
            __id : "subGuid"
          }
          },
          __id : "someGuid"
          }
          */
          if (!this._objectHash) {
            this._objectHash = {};
          }

          var me = this;
          this._data = mainData;
          this._workers = {};
          this._journal = journalCmds || [];

          var newData = this._findObjects(mainData);
          if (newData != mainData) this._data = newData;

          // Then, the journal commands should be run on the object

          if (journalCmds && this.isArray(journalCmds)) {
            journalCmds.forEach(function (c) {
              me.execCmd(c, true);
            });
          }
        });

        /**
         * Notice that all channels are using the same commands.
         * @param Object cmdObject
         */
        _myTrait_.setWorkerCommands = function (cmdObject) {

          if (!_workerCmds) _workerCmds = {};

          for (var i in cmdObject) {
            if (cmdObject.hasOwnProperty(i)) {
              _workerCmds[i] = cmdObject[i];
            }
          }
          // _workerCmds
        };

        /**
         * @param float obj
         */
        _myTrait_.toPlainData = function (obj) {

          if (!obj) obj = this._data;

          if (!this.isObject(obj)) return obj;

          var plain;

          if (obj.getData) obj = obj.getData();

          if (this.isArray(obj.data)) {
            plain = [];
            var len = obj.data.length;
            for (var i = 0; i < len; i++) {
              plain[i] = this.toPlainData(obj.data[i]);
            }
          } else {
            plain = {};
            for (var n in obj.data) {
              if (obj.data.hasOwnProperty(n)) {
                plain[n] = this.toPlainData(obj.data[n]);
              }
            }
          }

          return plain;
        };

        /**
         * @param float a
         */
        _myTrait_.writeCommand = function (a) {
          if (!this._cmdBuffer) this._cmdBuffer = [];
          this._cmdBuffer.push(a);
        };
      })(this);
    };

    var _channelData = function _channelData(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof _channelData) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != _channelData._classInfo.name) return new res(a, b, c, d, e, f, g, h);
          } else {
            if (res) return res;
          }
        }
        if (m.__traitInit) {
          m.__traitInit.forEach(function (initF) {
            initF.apply(m, args);
          });
        } else {
          if (typeof m.init == "function") m.init.apply(m, args);
        }
      } else return new _channelData(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    _channelData._classInfo = {
      name: "_channelData"
    };
    _channelData.prototype = new _channelData_prototype();

    (function () {
      if (typeof define !== "undefined" && define !== null && define.amd != null) {
        __amdDefs__["_channelData"] = _channelData;
        this._channelData = _channelData;
      } else if (typeof module !== "undefined" && module !== null && module.exports != null) {
        module.exports["_channelData"] = _channelData;
      } else {
        this._channelData = _channelData;
      }
    }).call(new Function("return this")());

    (function (_myTrait_) {

      // Initialize static variables here...

      if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
      if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
      _myTrait_.__traitInit.push(function (options) {});
    })(this);
  };

  var channelObjects = function channelObjects(a, b, c, d, e, f, g, h) {
    var m = this,
        res;
    if (m instanceof channelObjects) {
      var args = [a, b, c, d, e, f, g, h];
      if (m.__factoryClass) {
        m.__factoryClass.forEach(function (initF) {
          res = initF.apply(m, args);
        });
        if (typeof res == "function") {
          if (res._classInfo.name != channelObjects._classInfo.name) return new res(a, b, c, d, e, f, g, h);
        } else {
          if (res) return res;
        }
      }
      if (m.__traitInit) {
        m.__traitInit.forEach(function (initF) {
          initF.apply(m, args);
        });
      } else {
        if (typeof m.init == "function") m.init.apply(m, args);
      }
    } else return new channelObjects(a, b, c, d, e, f, g, h);
  };
  // inheritance is here

  channelObjects._classInfo = {
    name: "channelObjects"
  };
  channelObjects.prototype = new channelObjects_prototype();

  if (typeof define !== "undefined" && define !== null && define.amd != null) {
    define(__amdDefs__);
  }
}).call(new Function("return this")());

// console.log("Strange... no emit value in ", this._parent);