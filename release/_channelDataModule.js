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
         * @param Array cmdList
         */
        _myTrait_.reverse = function (cmdList) {

          var newList = [];

          cmdList.forEach(function (oldCmd) {

            var cmd = oldCmd.slice(); // create a copy of the old command

            var row = cmd[1],
                col = cmd[2],
                endRow = cmd[3],
                endCol = cmd[4];

            // add characters...
            if (cmd[0] == 1) {
              cmd[0] = 2;
              newList.unshift(cmd);
              return; // this simple ???
            }
            if (cmd[0] == 2) {
              cmd[0] = 1;
              newList.unshift(cmd);
              return; // this simple ???
            }
            if (cmd[0] == 3) {
              cmd[0] = 4;
              newList.unshift(cmd);
              return; // this simple ???     
              /*
              var cnt = endRow - row;
              for(var i=0; i<cnt; i++) {
              lines.splice(row+i, 0, cmd[5][i]);
              } 
              */
            }
            if (cmd[0] == 4) {
              cmd[0] = 3;
              newList.unshift(cmd);
              return; // this simple ???  
              /*
              var cnt = endRow - row;
              for(var i=0; i<cnt; i++) {
              lines.splice(row, 1);
              } 
              */
            }
          });

          return newList;
        };

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

        // Initialize static variables here...

        /**
         * @param float t
         */
        _myTrait_.guid = function (t) {
          return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        };

        /**
         * @param float t
         */
        _myTrait_.isArray = function (t) {
          return t instanceof Array;
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

          if (!obj || !prop) return false;
          if (typeof obj.data[prop] != "string") return false;

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

          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_createArray = function (a, isRemote) {
          var objId = a[1];
          if (!objId) return {
            error: 21,
            cmd: a,
            text: "Object ID was null or undefined"
          };

          var hash = this._getObjectHash();
          if (hash[objId]) return {
            error: 22,
            cmd: a,
            text: "Object with same ID (" + objId + ") was alredy created"
          };

          var newObj = {
            data: [],
            __id: objId
          };
          hash[newObj.__id] = newObj;

          // it is orphan object...
          this._data.__orphan.push(newObj);

          if (!isRemote) {
            this.writeCommand(a, newObj);
          }
          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_createObject = function (a, isRemote) {

          var objId = a[1];

          if (!objId) return {
            error: 11,
            cmd: a,
            text: "Object ID was null or undefined"
          };

          var hash = this._getObjectHash();

          if (hash[objId]) return {
            error: 12,
            cmd: a,
            text: "Object with same ID (" + objId + ") was alredy created"
          };

          var newObj = {
            data: {},
            __id: objId
          };
          hash[newObj.__id] = newObj;

          // it is orphan object...
          this._data.__orphan.push(newObj);

          // --- adding to the data object...

          if (!isRemote) {
            this.writeCommand(a, newObj);
          }
          return true;
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

          if (!obj) return {
            error: 2,
            cmd: 1,
            text: "Object with ID (" + a[4] + ") did not exist"
          };

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
            return {
              error: 121,
              cmd: a,
              text: "The old index was not what expected: " + oldIndex + " cmd have " + a[3]
            };
          }

          if (!targetObj) {
            return {
              error: 122,
              cmd: a,
              text: "Object to be moved (" + a[1] + ") was not in the array"
            };
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

          var targetIndex = parseInt(a[2]);
          if (isNaN(targetIndex)) return {
            error: 123,
            cmd: a,
            text: "Target index (" + targetIndex + ") was not a number"
          };

          if (obj.data.length <= i || i < 0) return {
            error: 124,
            cmd: a,
            text: "Invalid original index (" + i + ") given"
          };

          _execInfo.fromIndex = i;

          obj.data.splice(i, 1);
          obj.data.splice(targetIndex, 0, targetObj);
          this._cmd(a, null, a[1]);

          if (!isRemote) {
            this.writeCommand(a);
          }
          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_pushToArray = function (a, isRemote) {

          var parentObj = this._find(a[4]),
              insertedObj = this._find(a[2]),
              toIndex = parseInt(a[1]),
              oldPos = a[3],
              // old position can also be "null"
          prop = "*",
              index = parentObj.data.length; // might check if valid...

          if (!parentObj) return {
            error: 71,
            cmd: a,
            text: "Did not find object with ID (" + a[4] + ") "
          };

          if (!insertedObj) return {
            error: 72,
            cmd: a,
            text: "Did not find object with ID (" + a[2] + ") "
          };

          // NOTE: deny inserting object which already has been inserted
          if (insertedObj.__p) return {
            error: 73,
            cmd: a,
            text: "The object already had a parent - need to remove first (" + a[2] + ") "
          };

          if (isNaN(toIndex)) return {
            error: 74,
            cmd: a,
            text: "toIndex was not a number"
          };
          if (!this.isArray(parentObj.data)) return {
            error: 75,
            cmd: a,
            text: "Target Object was not an array"
          };
          if (toIndex > parentObj.data.length || toIndex < 0) return {
            error: 76,
            cmd: a,
            text: "toIndex out of range"
          };

          parentObj.data.splice(toIndex, 0, insertedObj);

          insertedObj.__p = parentObj.__id;

          this._cmd(a, null, a[2]);

          // remove from orphans
          var ii = this._data.__orphan.indexOf(insertedObj);
          if (ii >= 0) {
            this._data.__orphan.splice(ii, 1);
          }
          // this._moveCmdListToParent(insertedObj);

          // Saving the write to root document
          if (!isRemote) {
            this.writeCommand(a);
          }

          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_removeObject = function (a, isRemote) {

          var parentObj = this._find(a[4]),
              removedItem = this._find(a[2]),
              oldPosition = parseInt(a[1]),
              prop = "*";

          if (!parentObj) return {
            error: 81,
            cmd: a,
            text: "Did not find object with ID (" + a[4] + ") "
          };

          if (!removedItem) return {
            error: 82,
            cmd: a,
            text: "Did not find object with ID (" + a[2] + ") "
          };

          // NOTE: deny inserting object which already has been inserted
          if (!removedItem.__p) return {
            error: 83,
            cmd: a,
            text: "The removed item did not have a parent (" + a[2] + ") "
          };

          var index = parentObj.data.indexOf(removedItem); // might check if valid...
          if (isNaN(oldPosition)) return {
            error: 84,
            cmd: a,
            text: "oldPosition was not a number"
          };
          if (oldPosition != index) return {
            error: 85,
            cmd: a,
            text: "oldPosition was not same as current position"
          };

          // now the object is in the array...
          parentObj.data.splice(index, 1);

          // removed at should not be necessary because journal has the data
          // removedItem.__removedAt = index;

          this._cmd(a, null, a[2]);

          removedItem.__p = null; // must be set to null...

          // remove from orphans
          var ii = this._data.__orphan.indexOf(removedItem);
          if (ii < 0) {
            this._data.__orphan.push(removedItem);
          }

          // Saving the write to root document
          if (!isRemote) {
            this.writeCommand(a);
          }

          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_setMeta = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (!prop) return false;

          if (prop == "data") return false;
          if (prop == "__id") return false;

          if (obj) {

            if (obj[prop] == a[2]) return false;

            obj[prop] = a[2]; // value is now set...
            this._cmd(a, obj, null);

            // Saving the write to root document
            if (!isRemote) {
              this.writeCommand(a);
            }
            return true;
          } else {
            return false;
          }
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_setProperty = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (!obj) return {
            error: 41,
            cmd: a,
            text: "Did not find object with ID (" + a[4] + ") "
          };

          if (!prop) return {
            error: 42,
            cmd: a,
            text: "The property was not defined (" + a[1] + ") "
          };

          var oldValue = obj.data[prop];

          if (oldValue == a[2]) return {
            error: 43,
            cmd: a,
            text: "Trying to set the same value to the object twice"
          };

          if (typeof oldValue != "undefined") {
            if (oldValue != a[3]) return {
              error: 44,
              cmd: a,
              text: "The old value was not the same as the current value"
            };
          } else {
            if (this.isObject(oldValue) || this.isArray(oldValue)) return {
              error: 45,
              cmd: a,
              text: "Trying to set Object or Array value to a scalar property"
            };
          }

          obj.data[prop] = a[2]; // value is now set...
          this._cmd(a, obj, null);

          // Saving the write to root document
          if (!isRemote) {
            this.writeCommand(a);
          }
          this._fireListener(obj, prop);

          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_setPropertyObject = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1],
              setObj = this._find(a[2]);

          if (!obj) return {
            error: 51,
            cmd: a,
            text: "Did not find object with ID (" + a[4] + ") "
          };

          if (!prop) return {
            error: 52,
            cmd: a,
            text: "The property was not defined (" + a[1] + ") "
          };

          // if(!obj || !prop)   return false;
          // if(!setObj)         return false;

          if (!setObj) return {
            error: 53,
            cmd: a,
            text: "Could not find the Object to be set with ID (" + a[2] + ") "
          };

          if (typeof obj.data[prop] != "undefined") return {
            error: 54,
            cmd: a,
            text: "The property (" + a[1] + ") was already set, try unsetting first "
          };

          obj.data[prop] = setObj; // value is now set...
          setObj.__p = obj.__id; // The parent relationship

          this._cmd(a, null, a[2]);

          var ii = this._data.__orphan.indexOf(setObj);
          if (ii >= 0) {
            this._data.__orphan.splice(ii, 1);
          }

          if (!isRemote) {
            this._moveCmdListToParent(setObj);
            this.writeCommand(a);
          }
          return true;
        };

        /**
         * @param float a
         * @param float isRemote
         */
        _myTrait_._cmd_unsetProperty = function (a, isRemote) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (!obj) return {
            error: 101,
            cmd: a,
            text: "Did not find object with ID (" + a[4] + ") "
          };

          if (!prop) return {
            error: 102,
            cmd: a,
            text: "The property was not defined (" + a[1] + ") "
          };

          if (this.isArray(obj.data[prop])) return {
            error: 103,
            cmd: a,
            text: "The Object data was Array (" + a[4] + ") "
          };

          delete obj.data[prop];
          if (!isRemote) this.writeCommand(a);

          return true;
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
        _myTrait_._reverse_aceCmd = function (a) {

          var obj = this._find(a[4]),
              prop = a[1];

          var conv = aceCmdConvert();

          var newCmds = conv.reverse(a[2]);

          var tmpCmd = [4, prop, obj.data[prop], null, a[4]];
          var tmpCmd2 = [13, prop, newCmds, null, a[4]];

          var s = conv.runToString(obj.data[prop], newCmds);
          obj.data[prop] = s;

          // TODO: check that these work, may not be good idea to do both
          this._cmd(tmpCmd);
          this._cmd(tmpCmd2);
        };

        /**
         * @param float a
         */
        _myTrait_._reverse_createObject = function (a) {
          var objId = a[1];
          var hash = this._getObjectHash();

          var o = hash[objId];

          delete hash[objId];

          var ii = this._data.__orphan.indexOf(o);

          if (ii >= 0) {
            this._data.__orphan.splice(ii, 1);
          }
        };

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

            this._cmd(tmpCmd, null, tmpCmd[1]);
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

              this._cmd(tmpCmd, null, tmpCmd[2]);
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

            this._cmd(tmpCmd, null, a[2]);

            // remove from orphans
            var ii = this._data.__orphan.indexOf(removedItem);
            if (ii >= 0) {
              this._data.__orphan.splice(ii, 1);
            }

            removedItem.__p = a[4];
          }
        };

        /**
         * @param Array a
         */
        _myTrait_._reverse_setMeta = function (a) {
          var obj = this._find(a[4]),
              prop = a[1];

          if (obj) {
            var tmpCmd = [3, prop, a[3], a[2], a[4]];
            obj[prop] = a[3]; // the old value
            this._cmd(tmpCmd);
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
         * @param float a
         */
        _myTrait_._reverse_setPropertyObject = function (a) {

          var obj = this._find(a[4]),
              prop = a[1],
              setObj = this._find(a[2]);

          if (!obj) return;
          if (!setObj) return;

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
            this._cmd(tmpCmd, null, removedObj.__id);
          }
        };

        /**
         * @param float a
         * @param float isRemote
         * @param float isRedo
         */
        _myTrait_.execCmd = function (a, isRemote, isRedo) {

          try {
            if (!this.isArray(a)) return false;
            var c = _cmds[a[0]];
            if (c) {
              var rv = c.apply(this, [a, isRemote]);
              if (rv === true && !isRedo) this.writeLocalJournal(a);
              return rv;
            } else {
              return {
                error: 199,
                text: "Invalid command"
              };
            }
          } catch (e) {
            var txt = "";
            if (e && e.message) txt = e.message;
            return {
              error: 199,
              cmd: a,
              text: "Exception raised " + txt
            };
          }
        };

        /**
         * @param Int i
         */
        _myTrait_.getJournalCmd = function (i) {

          return this._journal[i];
        };

        /**
         * @param float t
         */
        _myTrait_.getJournalLine = function (t) {
          return this._journalPointer;
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
            _cmds[3] = this._cmd_setMeta;
            _cmds[4] = this._cmd_setProperty;
            _cmds[5] = this._cmd_setPropertyObject;
            _cmds[7] = this._cmd_pushToArray;
            _cmds[8] = this._cmd_removeObject;
            _cmds[10] = this._cmd_unsetProperty;
            _cmds[12] = this._cmd_moveToIndex;
            _cmds[13] = this._cmd_aceCmd;

            _reverseCmds[1] = this._reverse_createObject;
            _reverseCmds[3] = this._reverse_setMeta;
            _reverseCmds[4] = this._reverse_setProperty;
            _reverseCmds[5] = this._reverse_setPropertyObject;
            _reverseCmds[7] = this._reverse_pushToArray;
            _reverseCmds[8] = this._reverse_removeObject;
            _reverseCmds[10] = this._reverse_unsetProperty;
            _reverseCmds[12] = this._reverse_moveToIndex;
            _reverseCmds[13] = this._reverse_aceCmd;
            // _reverse_setPropertyObject
          }
        });

        /**
         * @param float n
         */
        _myTrait_.redo = function (n) {
          // if one line in buffer line == 1
          var line = this.getJournalLine();
          n = n || 1;
          while (n-- > 0) {

            var cmd = this._journal[line];
            if (!cmd) return;

            this.execCmd(cmd, false, true);
            line++;
            this._journalPointer++;
          }
        };

        /**
         * This function reverses a given command. There may be cases when the command parameters make the command itself non-reversable. It is the responsibility of the framework to make sure all commands remain reversable.
         * @param float a
         */
        _myTrait_.reverseCmd = function (a) {
          console.log("reversing command ", a);
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
            var cmd = this._journal[line - 1];
            this.reverseCmd(cmd);
            line--;
            this._journalPointer--;
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
            var cmd = this._journal[line - 1];
            this.reverseCmd(cmd);
            line--;
            this._journalPointer--;
          }
        };

        /**
         * @param int n
         */
        _myTrait_.undo = function (n) {

          if (n === 0) return;
          if (typeof n == "undefined") n = 1;

          this.reverseNLines(n);
        };

        /**
         * @param Array cmd
         */
        _myTrait_.writeLocalJournal = function (cmd) {

          if (this._journal) {
            // truncate on write if length > journalPointer
            if (this._journal.length > this._journalPointer) {
              this._journal.length = this._journalPointer;
            }
            this._journal.push(cmd);
            this._journalPointer++;
          }
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
         * @param String UUID1
         * @param String UUID2
         */
        _myTrait_._cmd = function (cmd, UUID1, UUID2) {

          var cmdIndex = cmd[0],
              UUID = cmd[4];

          this._wCmd(cmdIndex, UUID, cmd);

          if (UUID2 && UUID2 != UUID) this._wCmd(cmdIndex, UUID2, cmd);
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
         * @param int cmdIndex
         * @param float UUID
         * @param float cmd
         */
        _myTrait_._wCmd = function (cmdIndex, UUID, cmd) {

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
          this._channelId = channelId;
          this._data = mainData;
          if (!this._data.__orphan) {
            this._data.__orphan = [];
          }
          this._workers = {};
          this._journal = journalCmds || [];
          this._journalPointer = this._journal.length;

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

          if (typeof obj == "undefined") obj = this._data;

          if (!this.isObject(obj)) return obj;

          var plain;

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

    // the subclass definition comes around here then

    // The class definition is here...
    var diffEngine_prototype = function diffEngine_prototype() {
      // Then create the traits and subclasses for this class here...

      // trait comes here...

      (function (_myTrait_) {
        var _eventOn;
        var _commands;

        // Initialize static variables here...

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

      (function (_myTrait_) {
        var _all;
        var _data1;
        var _data2;
        var _up;
        var _reals;
        var _missing;
        var _added;
        var _parents;

        // Initialize static variables here...

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
              var cmd = [2, newObj.__fork || newObj.__id, [], null, newObj.__fork || newObj.__id];
            } else {
              var cmd = [1, newObj.__fork || newObj.__id, {}, null, newObj.__fork || newObj.__id];
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
                  var cmd = [5, n, oo.__fork || oo.__id, null, newObj.__fork || newObj.__id];
                  intoList.push(cmd);
                } else {
                  var cmd = [4, n, value, null, newObj.__fork || newObj.__id];
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
         * @param float t
         */
        _myTrait_.addedObjects = function (t) {

          var res = [];

          for (var id in _data2) {
            if (_data2.hasOwnProperty(id)) {
              if (!_data1[id]) {
                res.push(id);
                _added[id] = _data2[id];
              }
            }
          }

          return res;
        };

        /**
         * @param float t
         */
        _myTrait_.commonObjects = function (t) {
          var res = [];

          for (var id in _all) {
            if (_data1[id] && _data2[id]) {
              res.push(id);
            }
          }

          return res;
        };

        /**
         * @param float data1
         * @param float data2
         */
        _myTrait_.compareFiles = function (data1, data2) {

          // these are static global for the diff engine, the results are one-time only
          _data1 = {};
          _data2 = {};
          _all = {};
          _reals = {};
          _missing = {};
          _added = {};
          _parents = {};

          this.findObjects(data1, _data1);
          this.findObjects(data2, _data2);

          var details = {
            missing: this.missingObjects(),
            added: this.addedObjects(),
            common: this.commonObjects(),
            cMod: [],
            cmds: []
          };

          var me = this;
          details.common.forEach(function (id) {
            var diff = me.objectDiff(_data1[id], _data2[id]);
            details.cMod.push(diff);
          });

          var me = this;
          details.added.forEach(function (cid) {
            var cmdList = [];
            var obj = _all[cid];
            me._createModelCommands(obj, null, cmdList);

            cmdList.forEach(function (cmd) {
              details.cmds.push(cmd);
            });
          });
          details.cMod.forEach(function (c) {
            c.cmds.forEach(function (cc) {
              details.cmds.push(cc);
            });
          });

          return details;
        };

        /**
         * @param float data
         * @param float saveTo
         * @param float parentObj
         */
        _myTrait_.findObjects = function (data, saveTo, parentObj) {

          if (data && data.__id) {
            saveTo[data.__fork || data.__id] = data;
            _all[data.__fork || data.__id] = data;
            _reals[data.__id] = data;
          }

          if (data.data) {
            var sub = data.data;
            for (var n in sub) {
              if (sub.hasOwnProperty(n)) {
                var p = sub[n];
                if (this.isObject(p)) {
                  _parents[p.__fork || p.__id] = data.__fork || data.__id;
                  this.findObjects(p, saveTo);
                }
              }
            }
          }
        };

        if (_myTrait_.__traitInit && !_myTrait_.hasOwnProperty("__traitInit")) _myTrait_.__traitInit = _myTrait_.__traitInit.slice();
        if (!_myTrait_.__traitInit) _myTrait_.__traitInit = [];
        _myTrait_.__traitInit.push(function (t) {});

        /**
         * @param float t
         */
        _myTrait_.missingObjects = function (t) {

          var res = [];

          for (var id in _data1) {
            if (_data1.hasOwnProperty(id)) {
              if (!_data2[id]) {
                _missing[id] = _data1[id];
                res.push(id);
              }
            }
          }

          return res;
        };

        /**
         * @param float obj1
         * @param float obj2
         */
        _myTrait_.objectDiff = function (obj1, obj2) {
          var res = {
            modified: [],
            posMoved: [],
            sourcesAndTargets: [],
            cmds: []
          };

          if (obj1.data && obj2.data && this.isObject(obj1.data) && !this.isArray(obj1.data)) {
            var sub = obj1.data,
                hadProps = {};
            for (var n in obj2.data) {
              if (obj2.data.hasOwnProperty(n)) {
                var v = sub[n],
                    objid = obj1.__fork || obj1.__id;
                if (!this.isObject(v) && !this.isArray(v)) {
                  hadProps[n] = true;
                  var v2 = obj2.data[n];
                  if (obj2.data[n] != v) {
                    if (this.isObject(v) || this.isObject(v2)) {
                      if (v2 && v2.__id) {
                        res.cmds.push([5, n, obj2.data[n].__id, null, objid]);
                      } else {
                        res.cmds.push([10, n, v.__id, null, objid]);
                      }
                    } else {
                      res.modified.push({
                        id: objid,
                        prop: n,
                        from: v,
                        to: obj2.data[n]
                      });
                      res.cmds.push([4, n, obj2.data[n], v, objid]);
                    }
                  }
                } else {}
              }
            }
            for (var n in obj1.data) {
              if (obj1.data.hasOwnProperty(n)) {
                if (hadProps[n]) continue;
                var v = obj1.data[n],
                    objid = obj1.__id;

                if (this.isObject(v) && !this.isArray(v)) {
                  var v2 = obj2.data[n];
                  if (!v2 && v && v.__id) {
                    res.cmds.push([10, n, v.__id, null, objid]);
                  }
                }
              }
            }
          }
          if (this.isArray(obj1.data)) {

            var arr1 = obj1.data,
                arr2 = obj2.data,
                sourceArray = [],
                targetArray = [],
                len1 = arr1.length,
                len2 = arr2.length;
            // insert
            // [7, 0, <insertedID>, 0, <parentId>]

            // remove
            // [8, 0, <insertedID>, 0, <parentId>]       
            for (var i = 0; i < len1; i++) {
              var o = arr1[i];
              if (this.isObject(o)) {
                var activeId = o.__fork || o.__id;
                if (!_missing[activeId]) {
                  sourceArray.push(activeId);
                } else {
                  // res.cmds.push("remove "+activeId);
                  res.cmds.push([8, 0, activeId, 0, _parents[activeId]]);
                }
              }
            }
            var indexArr = {},
                reverseIndex = {},
                sourceReverseIndex = {};
            for (var i = 0; i < len2; i++) {
              var o = arr2[i];
              if (this.isObject(o)) {
                var activeId = o.__fork || o.__id;
                indexArr[activeId] = i;
                reverseIndex[i] = activeId;
                if (_added[activeId]) {
                  sourceArray.push(activeId);
                  // res.cmds.push("insert "+activeId);
                  res.cmds.push([7, i, activeId, 0, _parents[activeId]]);
                }
                targetArray.push(activeId);
              }
            }

            var list = [],
                i = 0;
            sourceArray.forEach(function (id) {
              list.push(indexArr[id]);
              sourceReverseIndex[id] = i;
              i++;
            });

            res.restackIndex = indexArr;
            res.restackList = list;
            res.reverseIndex = reverseIndex;
            res.restack = this.restackOps(list);

            // insert
            // [7, 0, <insertedID>, 0, <parentId>]

            // remove
            // [8, 0, <insertedID>, 0, <parentId>]

            // move
            // [12, <insertedID>, <index>, 0, <parentId>]      

            var cmdList = [],
                sourceArrayWork = sourceArray.slice();

            res.restack.forEach(function (c) {
              if (c[0] == "a") {
                var moveItemId = reverseIndex[c[1]],
                    aboveItemId = reverseIndex[c[2]],
                    atIndex = indexArr[aboveItemId],
                    fromIndex = sourceArrayWork.indexOf(moveItemId);

                sourceArrayWork.splice(fromIndex, 1);
                var toIndex = sourceArrayWork.indexOf(aboveItemId);
                sourceArrayWork.splice(toIndex, 0, moveItemId);

                var obj = _all[moveItemId];

                res.cmds.push([12, moveItemId, toIndex, fromIndex, _parents[moveItemId]]);
                //             cmdList.push(" move item "+moveItemId+" above "+aboveItemId+ " from "+fromIndex+ " to "+toIndex);
              } else {
                var moveItemId = reverseIndex[c[1]],
                    aboveItemId = reverseIndex[c[2]],
                    atIndex = indexArr[aboveItemId],
                    fromIndex = sourceArrayWork.indexOf(moveItemId);
                sourceArrayWork.splice(fromIndex, 1);
                var toIndex = sourceArrayWork.indexOf(aboveItemId) + 1;
                sourceArrayWork.splice(toIndex, 0, moveItemId);
                // cmdList.push(" move item "+moveItemId+" above "+aboveItemId+ " from "+fromIndex+ " to "+toIndex); 
                res.cmds.push([12, moveItemId, toIndex, fromIndex, _parents[moveItemId]]);
              }
            });
            res.stackCmds = cmdList;
            res.sourceArrayWork = sourceArrayWork;

            res.sourcesAndTargets.push([sourceArray, targetArray]);
          }

          return res;
        };

        /**
         * @param float input
         */
        _myTrait_.restackOps = function (input) {
          var moveCnt = 0,
              cmds = [];

          function restack(input) {
            var data = input.slice(0);
            var dataIn = input.slice(0);
            var goalIn = input.slice(0).sort(function (a, b) {
              return a - b;
            });

            var mapper = {};
            var indexes = {};
            // Testing this kind of simple system...
            for (var i = 0; i < dataIn.length; i++) {
              var mm = goalIn.indexOf(dataIn[i]);
              mapper[dataIn[i]] = mm;
              indexes[mm] = dataIn[i];
              data[i] = mm;
            }

            var goal = data.slice(0).sort(function (a, b) {
              return a - b;
            });

            var minValue = data[0],
                maxValue = data[0],
                partDiffs = [],
                partCum = 0,
                avgDiff = (function () {
              var i = 0,
                  len = data.length,
                  df = 0;
              for (; i < len; i++) {
                var v = data[i];
                if (v > maxValue) maxValue = v;
                if (v < minValue) minValue = v;
                if (i > 0) partDiffs.push(goal[i] - goal[i - 1]);
                if (i > 0) partCum += Math.abs(goal[i] - goal[i - 1]);
                df += Math.abs(v - goal[i]);
              }
              partCum = partCum / len;
              return df / len;
            })();

            partDiffs.sort(function (a, b) {
              return a - b;
            });
            var minDelta = partDiffs[0];

            // collects one "acceptable" array
            var accept = function accept(fn) {
              var collect = function collect(i, sx, last) {
                var res = [];
                var len = data.length;
                if (!sx) sx = 0;
                for (; i < len; i++) {
                  var v = data[i];
                  if (v - last == 1) {
                    res.push(v);
                    last = v;
                    continue;
                  }
                  var gi = i + sx;
                  if (gi < 0) gi = 0;
                  if (gi >= len) gi = len - 1;
                  if (fn(v, goal[gi], v, last, i, len)) {
                    if (data[i + 1] && data[i + 1] < v && data[i + 1] > last) {} else {
                      res.push(v);
                      last = v;
                    }
                  }
                }
                return res;
              };

              var m = [];
              var ii = 0,
                  a = 0;
              // small tricks to improve the algo, just for comp's sake...
              while (a < 0.1) {
                for (var sx = -5; sx <= 5; sx++) m.push(collect(Math.floor(data.length * a), sx, minValue - 1));
                a += 0.05;
              }
              m.sort(function (a, b) {
                return b.length - a.length;
              });
              return m[0];
            };

            // different search agents...
            var test = [accept(function (dv, gv, v, last, i, len) {
              // console.log(Math.abs(v-last)+" vs "+partCum);
              if (v < last) return false;
              if (i > 0) if (Math.abs(v - last) > partDiffs[i - 1]) return false;
              if (Math.abs(v - last) > avgDiff) return false;
              if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
              if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (Math.abs(v - last) > avgDiff) return false;
              if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
              if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (Math.abs(v - last) > avgDiff) return false;
              if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
              if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
              if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (Math.abs(dv - gv) <= avgDiff && v >= last) return true;
              if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (Math.abs(v - last) < partCum) return true;
              if (Math.abs(dv - gv) <= partCum && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v > last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (Math.abs(v - last) > avgDiff) return false;
              if (Math.abs(dv - gv) <= avgDiff && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (i > 0) if (Math.abs(v - last) > avgDiff) return false;
              if (Math.abs(dv - gv) <= avgDiff * (i / len) && v >= last) return true;
              if (i > 0) if (Math.abs(last - v) <= avgDiff * (i / len) && v >= last) return true;
              return false;
            }), accept(function (dv, gv, v, last, i, len) {
              if (v < last) return false;
              if (last >= minValue) {
                if (v >= last) return true;
              } else {
                if (v == minValue) return true;
              }
              return false;
            })];

            // choose between algorithms
            var okVals = [],
                maxSet = 0;
            for (var i = 0; i < test.length; i++) {
              var set = test[i];
              if (set.length > maxSet) {
                okVals = set;
                maxSet = set.length;
              }
            }
            // if nothing, take something
            if (okVals.length == 0) okVals = [goal[Math.floor(goal.length / 2)]];

            // divide the list to big and small
            var big = [],
                small = [];
            var divide = (function () {
              var min = minValue,
                  max = okVals[0],
                  okLen = okVals.length,
                  oki = data.indexOf(max),
                  index = 0;

              var i = 0,
                  len = data.length;
              for (; i < len; i++) {
                var v = data[i];
                if (v >= min && v <= max && i <= oki) {
                  big.push(v);
                  min = v;
                } else {
                  small.push(v);
                }
                if (v == max) {
                  min = v;
                  if (index < okLen - 1) {
                    index++;
                    max = okVals[index];
                    oki = data.indexOf(max);
                  } else {
                    max = maxValue;
                    oki = len + 1;
                  }
                }
              }
            })();

            // sort the small list before joining them
            small.sort(function (a, b) {
              return a - b;
            });

            //console.log(big);
            //console.log(small);

            var joinThem = (function () {
              var si = 0,
                  bi = 0,
                  lastb = big[0],
                  slen = small.length;
              while (si < slen) {
                var b = big[bi],
                    s = small[si];
                if (typeof b == "undefined") {
                  while (si < slen) {
                    cmds.push(["b", indexes[s], indexes[lastb]]);
                    // restackXBelowY(dataIn, indexes[s], indexes[lastb]);
                    lastb = s;
                    si++;
                    s = small[si];
                  }
                  return;
                }
                if (b < s) {
                  // console.log("B was smaller");
                  lastb = b;
                  bi++;
                } else {
                  cmds.push(["a", indexes[s], indexes[b]]);
                  // restackXAboveY(dataIn, indexes[s], indexes[b]);
                  si++;
                }
              }
            })();

            // console.log(dataIn);
            return data; // actually the return value is not used for anything  
          }
          restack(input);

          return cmds;
        };
      })(this);
    };

    var diffEngine = function diffEngine(a, b, c, d, e, f, g, h) {
      var m = this,
          res;
      if (m instanceof diffEngine) {
        var args = [a, b, c, d, e, f, g, h];
        if (m.__factoryClass) {
          m.__factoryClass.forEach(function (initF) {
            res = initF.apply(m, args);
          });
          if (typeof res == "function") {
            if (res._classInfo.name != diffEngine._classInfo.name) return new res(a, b, c, d, e, f, g, h);
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
      } else return new diffEngine(a, b, c, d, e, f, g, h);
    };
    // inheritance is here

    diffEngine._classInfo = {
      name: "diffEngine"
    };
    diffEngine.prototype = new diffEngine_prototype();

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

// skip, if next should be taken instead