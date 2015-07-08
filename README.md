# Data command runner

The first run-down of the command runner. When sending arbitary object data over network in socket.io channels the journal data must be deconstructed into journal commands which are sent over the channel to the receivers. 

The main file and journal are ment to be used together with (Channels)[https://github.com/terotests/_channels] which make possible forking the data into separate branches.

# Object 

Channel data can change only objects or arrays, individual values are always accessed through the object properties.

Example of an object representing SVG entity might be something like this:

```javascript
{
  data : {
      x : 100,
      y : 100,
      fill : "red",
      type : "rect",
  },
  __id : "m6cq0z12pckp4zb5psbvfvlp4l"
}
```

This corresponds plain JS object:

```javascript
{ x : 100, y : 100, fill : "red", type : "rect"
```

Each nested object structure will always have the wrapper structure included, for example JavaScript object

```javascript
{ x : 100, y : 200, subObject : { x : 150 } }
```

Would be represented as:

```javascript
{
  data : {
      x : 100,
      y : 200,
      subObject : {  // Object or Array has always the __id and data
            data : {
              x : 150
            },
            __id : "l2f2e887u6u3207oekk3mxcz93"
      }
  },
  __id : "m6cq0z12pckp4zb5psbvfvlp4l"
}
```


To change the value of the object a `command` must be run. The purpose of the command
is 
 
  1. to record the action performed to the journal
  2. create events for workers listening to the action
  3. to abstract the object interface over the network

Creating actions as commands gives also the benefit of the command history thus creates history ready to be used for undo / redo actions.


# Action 

Action is intent to change the value of the object into something else. Action data looks like this:

```javascript
[4, "x", 120, 100, "m6cq0z12pckp4zb5psbvfvlp4l"]
```

The `4` represents the action code for "setProperty". Currently supported actions are:

( copied from the actual source code )

```javascript
    _cmds[1] = this._cmd_createObject;
    _cmds[2] = this._cmd_createArray;
    _cmds[4] = this._cmd_setProperty;
    _cmds[5] = this._cmd_setPropertyObject;
    _cmds[7] = this._cmd_pushToArray;
    _cmds[8] = this._cmd_removeObject;
    _cmds[10] = this._cmd_unsetProperty;
    _cmds[12] = this._cmd_moveToIndex;
    _cmds[13] = this._cmd_aceCmd;
```

## Create Object 

Creates a new Object in the channels object cache. This object can then be added into arrays or set into properties of objects.

Parameters:

1. `1`
2. GUID of the object to be created

```javascript
[1, "<GUID>", "", " ", ""]
```

## Create Array 

Parameters:

1. `2`
2. GUID of the array to be created

```javascript
[2, "<GUID>", "", " ", ""]
```


## Set value property of object

This command sets a value property (integer or string) to Object

Parameters:

1. `4`
2. the property name
3. new value
4. old value
5. GUID of the Object to be modified

```javascript
[4, "x", 120, 100, "<GUID>"]
```

## Set property to Object value

This command sets a property of an object to `Object` value. It will update the parent pointer at the object.

Parameters:

1. `4`
2. the property name
3. GUID of the Object to be added to the property
4. -
5. GUID of the Object to be modified

```javascript
 [5, "propObj", "<GUID>", 0, "<ParentGUID>"]
```

## Push item to array

Array can only have object values, because scalar values can not be reliably identified in the Array structure.

Parameters:

1. `7`
2. -
3. GUID of the Object to be pushed
4. -
5. GUID of the Array to be modified

```javascript
 [7, 0, "<GUID>", 0, "<ParentGUID>"]
```

## Remove item from Array

Array can only have object values, because scalar values can not be reliably identified in the Array structure.

Parameters:

1. `8`
2. -
3. GUID of the Object to be removed
4. -
5. GUID of the Array to be modified

```javascript
 [8, 0, "<GUID>", 0, "<ParentGUID>"]
```

## Move item in Array

Moves object item in the array

Parameters:

1. `12`
2. GUID of the Object to be removed
3. New index inside the array
4. -
5. GUID of the Array to be modified

```javascript
   [12, "<GUID>", 3, 0, "<ParentGUID>"]
```

## Run ACE editor command to string value

Runs optimized ACE editor "like" commands to string. The values are compressed using
class `aceCmdConvert` 

Parameters:

1. `13`
2. GUID of the Object to be removed
3. New index inside the array
4. -
5. GUID of the Array to be modified

```javascript
var aceCmds = [[1,0,0,0,1,"a"],[1,0,1,0,2,"b"],[1,0,2,0,3,"c"],[1,0,3,0,4,"d"],[1,0,4,0,5,"e"],
               [1,0,5,0,6,"f"],[1,0,6,0,7,"g"],[1,0,7,0,8,"h"]];

data.execCmd( [13, "aceData", aceCmds, "", "<GUID>"], true);
// the value will be "abcdefgh"
```

# Setting up a test channel data

The `_channelData` constructor accepts the channel ID, main Data and journal commands 

```javascript
var dataTest = _channelData( "channel1", 
                        { 
                            data : {
                                myName : "John",
                                subObj : {
                                   data : {
                                        myName : "Jane"  
                                   },
                                   __id : "id124" 
                                },
                                subArray : {
                                   data : [],
                                   __id : "array1" 
                                }
                            },
                            __id : "id123"
                        }, [] );
```

After setup you can run commands against the channel:

```javascript
dataTest.execCmd( [4, "myName", "Mark", "John", "id124"], true);
```

## Getting the plain JSON data out

```javascript
dataTest.getData();         // returns data with __id values
dataTest.toPlainData();     // returns data as regular JavaScript object with no __id values
```

















   

 


   
#### Class channelObjects





   
    
    
    
    


   
      
            
#### Class aceCmdConvert


- [fromAce](README.md#aceCmdConvert_fromAce)
- [runToAce](README.md#aceCmdConvert_runToAce)
- [runToLineObj](README.md#aceCmdConvert_runToLineObj)
- [runToString](README.md#aceCmdConvert_runToString)
- [simplify](README.md#aceCmdConvert_simplify)



   


   



      
    
      
            
#### Class _channelData


- [_addToCache](README.md#_channelData__addToCache)
- [_classFactory](README.md#_channelData__classFactory)
- [_cmd](README.md#_channelData__cmd)
- [_createModelCommands](README.md#_channelData__createModelCommands)
- [_createNewModel](README.md#_channelData__createNewModel)
- [_find](README.md#_channelData__find)
- [_findObjects](README.md#_channelData__findObjects)
- [_getObjectHash](README.md#_channelData__getObjectHash)
- [_prepareData](README.md#_channelData__prepareData)
- [_wrapData](README.md#_channelData__wrapData)
- [getData](README.md#_channelData_getData)
- [indexOf](README.md#_channelData_indexOf)
- [toPlainData](README.md#_channelData_toPlainData)
- [writeCommand](README.md#_channelData_writeCommand)



   
    
##### trait _dataTrait

- [addController](README.md#_dataTrait_addController)
- [clone](README.md#_dataTrait_clone)
- [emitValue](README.md#_dataTrait_emitValue)
- [guid](README.md#_dataTrait_guid)
- [isArray](README.md#_dataTrait_isArray)
- [isFunction](README.md#_dataTrait_isFunction)
- [isObject](README.md#_dataTrait_isObject)


    
    
    
##### trait commad_trait

- [_cmd_aceCmd](README.md#commad_trait__cmd_aceCmd)
- [_cmd_createArray](README.md#commad_trait__cmd_createArray)
- [_cmd_createObject](README.md#commad_trait__cmd_createObject)
- [_cmd_moveToIndex](README.md#commad_trait__cmd_moveToIndex)
- [_cmd_pushToArray](README.md#commad_trait__cmd_pushToArray)
- [_cmd_removeObject](README.md#commad_trait__cmd_removeObject)
- [_cmd_setProperty](README.md#commad_trait__cmd_setProperty)
- [_cmd_setPropertyObject](README.md#commad_trait__cmd_setPropertyObject)
- [_cmd_unsetProperty](README.md#commad_trait__cmd_unsetProperty)
- [_fireListener](README.md#commad_trait__fireListener)
- [_moveCmdListToParent](README.md#commad_trait__moveCmdListToParent)
- [execCmd](README.md#commad_trait_execCmd)


    
    


   
      
    
      
    



      
    





   
# Class channelObjects


The class has following internal singleton variables:
        
        
### channelObjects::constructor( options )

```javascript

```
        


   
    
    
    
    


   
      
            
# Class aceCmdConvert


The class has following internal singleton variables:
        
        
### <a name="aceCmdConvert_fromAce"></a>aceCmdConvert::fromAce(cmdList)


```javascript


var newList = [];

cmdList.forEach( function(cmd) {
    
    var range = cmd.range;
    if(cmd.action=="insertText") {
        newList.push([
                1, 
                range.start.row,
                range.start.column,
                range.end.row,
                range.end.column,
                cmd.text
            ])
    }
    if(cmd.action=="removeText") {
        newList.push([
                2, 
                range.start.row,
                range.start.column,
                range.end.row,
                range.end.column,
                cmd.text
            ])
    }
    if(cmd.action=="insertLines") {
        newList.push([
                3, 
                range.start.row,
                range.start.column,
                range.end.row,
                range.end.column,
                cmd.lines
            ])
    }
    if(cmd.action=="removeLines") {
        newList.push([
                4, 
                range.start.row,
                range.start.column,
                range.end.row,
                range.end.column,
                cmd.lines,
                cmd.nl
            ])
    }
    
    
});

return newList;

/*
{"action":"insertText","range":{"start":{"row":0,"column":0},
    "end":{"row":0,"column":1}},"text":"d"}
*/
```

### aceCmdConvert::constructor( onFulfilled, onRejected )

```javascript

```
        
### <a name="aceCmdConvert_runToAce"></a>aceCmdConvert::runToAce(cmdList)


```javascript


var newList = [],
    _convert = ["",
        "insertText","removeText","insertLines", "removeLines"
    ];

cmdList.forEach( function(cmd) {
    
    var c ={
            action : _convert[cmd[0]],
            range : {
                start : { row : cmd[1], column : cmd[2]},
                end   : { row : cmd[3], column : cmd[4]}
            }
        };
    if(cmd[0]<3) {
        c.text = cmd[5];
    } else {
        c.lines = cmd[5];
    }
    if(cmd[0]==4) c.nl = cmd[6] || "\n";
    newList.push(c);
    
});

return newList;

/*
{"action":"insertText","range":{"start":{"row":0,"column":0},
    "end":{"row":0,"column":1}},"text":"d"}
*/
```

### <a name="aceCmdConvert_runToLineObj"></a>aceCmdConvert::runToLineObj(lines, cmdList)


```javascript

cmdList.forEach( function(cmd) {
    var row = cmd[1],
        col = cmd[2],
        endRow = cmd[3],
        endCol = cmd[4];
    if(cmd[0]==1) {
        if(cmd[5]=="\n") {
            // add the newline can be a bit tricky
            var line = lines.item(row);
            if(!line) {
                lines.insertAt(row, { text : "" });
                lines.insertAt(row+1, { text : "" });
            } else {
                var txt = line.text();
                line.text( txt.slice(0,col) );
                var newLine = {
                    text : txt.slice(col) || ""
                };
                lines.insertAt(row+1, newLine);
            }
            //lines[row] = line.slice(0,col);
            //var newLine = line.slice(col) || "";
            //lines.splice(row+1, 0, newLine);
        } else {
            var line = lines.item(row);
            if(!line) {
                lines.insertAt(row, { text : cmd[5] });
            } else {
                var txt = line.text();
                line.text( txt.slice(0, col) + cmd[5] + txt.slice(col) );
                // lines[row] = line.slice(0, col) + cmd[5] + line.slice(col);
            }
        }
    }
    if(cmd[0]==2) {
        if(cmd[5]=="\n") {
            // removing the newline can be a bit tricky
            // lines[row]
            var thisLine = lines.item(row),
                nextLine = lines.item( row+1 );
            
            // lines[row] = thisLine + nextLine;
            // lines.splice(row+1, 1); // remove the line...
            var txt1 = "", txt2 = "";
            if(thisLine) txt1 = thisLine.text();
            if(nextLine) txt2 = nextLine.text();
            if(!thisLine) {
                lines.insertAt(row, { text : "" });
            } else {
                thisLine.text( txt1 + txt2 );
            }
            if(nextLine) nextLine.remove();
        } else {
            var line = lines.item(row),
                txt = line.text();
            line.text( txt.slice(0, col) + txt.slice(endCol) );
            //  str.slice(0, 4) + str.slice(5, str.length))
            // lines[row] = line.slice(0, col) + line.slice(endCol);
        }
    }    
    if(cmd[0]==3) {
        var cnt = endRow - row;
        for(var i=0; i<cnt; i++) {
            // var line = lines.item(row+i);
            lines.insertAt(row+i, { text : cmd[5][i] });
            // lines.splice(row+i, 0, cmd[5][i]);
        }         
    }
    if(cmd[0]==4) {
        var cnt = endRow - row;
        for(var i=0; i<cnt; i++) {
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

```

### <a name="aceCmdConvert_runToString"></a>aceCmdConvert::runToString(str, cmdList)


```javascript

if( !cmdList || ( typeof(str)=="undefined")) {
    return "";
}
str = str+"";

var lines = str.split("\n");

cmdList.forEach( function(cmd) {
    var row = cmd[1],
        col = cmd[2],
        endRow = cmd[3],
        endCol = cmd[4];
    if(cmd[0]==1) {
        if(cmd[5]=="\n") {
            // add the newline can be a bit tricky
            var line = lines[row] || "";
            lines[row] = line.slice(0,col);
            var newLine = line.slice(col) || "";
            lines.splice(row+1, 0, newLine);
        } else {
            var line = lines[row] || "";
            lines[row] = line.slice(0, col) + cmd[5] + line.slice(col);
        }
    }
    if(cmd[0]==2) {
        if(cmd[5]=="\n") {
            // removing the newline can be a bit tricky
            // lines[row]
            var thisLine = lines[row] || "",
                nextLine = lines[row+1] || "";
            lines[row] = thisLine + nextLine;
            lines.splice(row+1, 1); // remove the line...
        } else {
            var line = lines[row] || "";
            // str.slice(0, 4) + str.slice(5, str.length))
            lines[row] = line.slice(0, col) + line.slice(endCol);
        }
    }    
    if(cmd[0]==3) {
        var cnt = endRow - row;
        for(var i=0; i<cnt; i++) {
            lines.splice(row+i, 0, cmd[5][i]);
        }         
    }
    if(cmd[0]==4) {
        var cnt = endRow - row;
        for(var i=0; i<cnt; i++) {
            lines.splice(row, 1);
        }       
    }    
    
});

return lines.join("\n");
```

### <a name="aceCmdConvert_simplify"></a>aceCmdConvert::simplify(cmdList)


```javascript

// [[1,0,0,0,1,"a"],[1,0,1,0,2,"b"],[1,0,2,0,3,"c"],[1,0,3,0,4,"e"],[1,0,4,0,5,"d"],
// [1,0,5,0,6,"e"],[1,0,6,0,7,"f"],[1,0,7,0,8,"g"]]
var newList = [],
    lastCmd,
    lastCol,
    lastRow,
    collect = null;

cmdList.forEach( function(cmd) {
    
    if(lastCmd && (cmd[0]==1) && (lastCmd[0]==1) && (cmd[3]==cmd[1]) && (lastCmd[1]==cmd[1]) && (lastCmd[3]==cmd[3]) && (lastCmd[4]==cmd[2]) ) {
        if(!collect) {
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
        if(collect) {
            newList.push(collect);
            collect = null;
        } 
        if(cmd[0]==1) {
            collect = cmd.slice();
        } else {
            newList.push(cmd);
        }
    }
    lastCmd = cmd;
});
if(collect) newList.push(collect);
return newList;
```



   


   



      
    
      
            
# Class _channelData


The class has following internal singleton variables:
        
* _instanceCache
        
        
### <a name="_channelData__addToCache"></a>_channelData::_addToCache(data)


```javascript

if(data && data.__id) {
    this._objectHash[data.__id] = data;
}
```

### <a name="_channelData__classFactory"></a>_channelData::_classFactory(id)


```javascript

if(!_instanceCache) _instanceCache = {};

if(_instanceCache[id]) return _instanceCache[id];

_instanceCache[id] = this;
```

### <a name="_channelData__cmd"></a>_channelData::_cmd(cmd, obj, targetObj)

In the future can be used to initiate events, if required.
```javascript

```

### <a name="_channelData__createModelCommands"></a>_channelData::_createModelCommands(obj, parentObj, intoList)


```javascript

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

if(!intoList) intoList = [];

var data;

if(obj.data && obj.__id ) {
    data = obj.data;
} else {
    data = obj;
}

if(this.isObject(data) || this.isArray(data)) {
    
    var newObj;
    
    if(obj.__id) {
        newObj = obj;
    } else {
        newObj = {
            data : data,
            __id : this.guid()
        }
    }
    
    if(this.isArray(data)) {
        var cmd = [2, newObj.__id, [], null, newObj.__id];
    } else {
        var cmd = [1, newObj.__id, {}, null, newObj.__id];
    }
    if(parentObj) {
        newObj.__p = parentObj.__id;
        // this._moveCmdListToParent( newObj );
    }
    intoList.push( cmd );

    // Then, check for the member variables...
    for(var n in data) {
        if(data.hasOwnProperty(n)) {
            var value = data[n];
            if(this.isObject(value) || this.isArray(value)) {
                // Then create a new...
                var oo = this._createModelCommands( value, newObj, intoList );
                var cmd = [5, n, oo.__id, null, newObj.__id];
                intoList.push( cmd );
            } else {
                var cmd = [4, n, value, null, newObj.__id];
                intoList.push( cmd );
            }
        }
    }
    
    return newObj;
} else {
    
}



/*
var newObj = {
    data : data,
    __id : this.guid()
}
*/
```

### <a name="_channelData__createNewModel"></a>_channelData::_createNewModel(data, parentObj)


```javascript

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

if(this.isObject(data) || this.isArray(data)) {
    
    var newObj = {
        data : data,
        __id : this.guid()
    }
    
    this._objectHash[newObj.__id] = newObj;
    
    if(this.isArray(data)) {
        var cmd = [2, newObj.__id, [], null, newObj.__id];
    } else {
        var cmd = [1, newObj.__id, {}, null, newObj.__id];
    }

    if(parentObj) {
        newObj.__p = parentObj.__id;
        // this._moveCmdListToParent( newObj );
    }
    this.writeCommand(cmd, newObj);
    
    // Then, check for the member variables...
    for(var n in data) {
        if(data.hasOwnProperty(n)) {
            var value = data[n];
            if(this.isObject(value) || this.isArray(value)) {
                // Then create a new...
                var oo = this._createNewModel( value, newObj );
                newObj.data[n] = oo;
                var cmd = [5, n, oo.__id, null, newObj.__id];
                this.writeCommand(cmd, newObj);
                this._moveCmdListToParent( oo );
            } else {
                var cmd = [4, n, value, null, newObj.__id];
                this.writeCommand(cmd, newObj);
            }
        }
    }
    
    return newObj;
    
} else {
    
}


/*
var newObj = {
    data : data,
    __id : this.guid()
}
*/
```

### <a name="_channelData__find"></a>_channelData::_find(id)


```javascript
return this._objectHash[id];
```

### <a name="_channelData__findObjects"></a>_channelData::_findObjects(data, parentId, whenReady)


```javascript

if(!data) return null;

if(!this.isObject(data)) return data;

data = this._wrapData( data );
if(data.__id) {
    this._objectHash[data.__id] = data;
}

var me = this;
if(parentId) {
    data.__p = parentId;
}
if(data.data) {
    var sub = data.data;
    for(var n in sub) {
        if(sub.hasOwnProperty(n)) {
            var p = sub[n];
            if(this.isObject(p)) {
                var newData = this._findObjects(p, data.__id);
                if(newData !== p ) {
                    data.data[n] = newData;
                }
            }
        }
    }
}
return data;
```

### <a name="_channelData__getObjectHash"></a>_channelData::_getObjectHash(t)


```javascript
return this._objectHash;
```

### <a name="_channelData__prepareData"></a>_channelData::_prepareData(data)


```javascript
var d = this._wrapData( data );
if(!this._objectHash[d.__id]) {
    d = this._findObjects( d );
}
return d;
```

### <a name="_channelData__wrapData"></a>_channelData::_wrapData(data, parent)


```javascript

// if instance of this object...
if(data && data._wrapData) {
    // we can use the same pointer to this data
    return data._data;
}

// if the data is "well formed"
if(data.__id && data.data) return data;

// if new data, then we must create a new object and return it

var newObj = this._createNewModel( data );
/*
var newObj = {
    data : data,
    __id : this.guid()
}
*/
return newObj;
```

### <a name="_channelData_getData"></a>_channelData::getData(t)


```javascript
return this._data;
```

### <a name="_channelData_indexOf"></a>_channelData::indexOf(item)


```javascript

if(!item) item = this._data;

if(!this.isObject(item)) {
    item = this._find( item );
}
if(!item) return;

var parent = this._find( item.__p);

if(!parent) return;
if(!this.isArray( parent.data)) return;

return parent.data.indexOf( item );

```

### _channelData::constructor( channelId, mainData, journalCmds )

```javascript

// if no mainData defined, exit immediately
if(!mainData) return;
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
if(!this._objectHash) {
    this._objectHash = {};
}

var me = this;
this._data = mainData;

var newData = this._findObjects(mainData);
if(newData != mainData ) this._data = newData;

// Then, the journal commands should be run on the object

if(journalCmds && this.isArray(journalCmds)) {
    journalCmds.forEach( function(c) {
        me.execCmd( c, true );
    });
}


```
        
### <a name="_channelData_toPlainData"></a>_channelData::toPlainData(obj)


```javascript

if(!obj) obj = this._data;

if(!this.isObject(obj)) return obj;

var plain;

if( obj.getData ) obj = obj.getData();

if(this.isArray(obj.data)) {
    plain = [];
    var len = obj.data.length;
    for(var i=0; i<len; i++) {
        plain[i] = this.toPlainData( obj.data[i] );
    }
} else {
    plain = {};
    for( var n in obj.data) {
        if(obj.data.hasOwnProperty(n)) {
            plain[n] = this.toPlainData(obj.data[n]);
        }
    }
}

return plain;
```

### <a name="_channelData_writeCommand"></a>_channelData::writeCommand(a)


```javascript
if(!this._cmdBuffer) this._cmdBuffer = [];
this._cmdBuffer.push(a);

```



   
    
## trait _dataTrait

The class has following internal singleton variables:
        
* _eventOn
        
* _commands
        
        
### <a name="_dataTrait_addController"></a>_dataTrait::addController(c)


```javascript
if(!this._controllers)
    this._controllers = [];
    
if(this._controllers.indexOf(c)>=0) return;

this._controllers.push(c);
```

### <a name="_dataTrait_clone"></a>_dataTrait::clone(t)


```javascript
return _data(this.serialize());
```

### <a name="_dataTrait_emitValue"></a>_dataTrait::emitValue(scope, data)


```javascript
if(this._processingEmit) return this;

this._processingEmit = true;
// adding controllers to the data...
if(this._controllers) {
    var cnt = 0;
    for(var i=0; i<this._controllers.length; i++) {
        var c = this._controllers[i];
        if(c[scope]) {
           c[scope](data);
           cnt++;
        }
    }
    this._processingEmit = false;
    if(cnt>0) return this;
}
/*
if(this._controller) {
    if(this._controller[scope]) {
       this._controller[scope](data);
       return;
    }
}
*/

if(this._valueFn && this._valueFn[scope]) {
    this._valueFn[scope](data);
} else {
    if(this._parent) {
        if(!this._parent.emitValue) {
            // console.log("Strange... no emit value in ", this._parent);
        } else {
            this._parent.emitValue(scope,data);
        }
    }
}
this._processingEmit = false;
```

### <a name="_dataTrait_guid"></a>_dataTrait::guid(t)


```javascript

return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
        
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
```

### _dataTrait::constructor( data, options, notUsed, notUsed2 )

```javascript

```
        
### <a name="_dataTrait_isArray"></a>_dataTrait::isArray(t)


```javascript

if(typeof(t)=="undefined") return this.__isA;

return Object.prototype.toString.call( t ) === '[object Array]';
```

### <a name="_dataTrait_isFunction"></a>_dataTrait::isFunction(fn)


```javascript
return Object.prototype.toString.call(fn) == '[object Function]';
```

### <a name="_dataTrait_isObject"></a>_dataTrait::isObject(t)


```javascript

if(typeof(t)=="undefined") return this.__isO;

return t === Object(t);
```


    
    
    
## trait commad_trait

The class has following internal singleton variables:
        
* _listeners
        
* _execInfo
        
* _doingRemote
        
* _cmds
        
        
### <a name="commad_trait__cmd_aceCmd"></a>commad_trait::_cmd_aceCmd(a, isRemote)


```javascript
var obj = this._find( a[4] ),
    prop = a[1];

var conv = aceCmdConvert();
obj.data[prop] = conv.runToString( obj.data[prop], a[2]);

_doingRemote = isRemote;

var tmpCmd = [4, prop, obj.data[prop], null, a[4] ];
this._cmd(tmpCmd, obj, null);      

if(!isRemote) {
    this.writeCommand(a); 
} else {
    this._cmd(a, obj, null);
}
_doingRemote = false;
this._fireListener(obj, prop);
```

### <a name="commad_trait__cmd_createArray"></a>commad_trait::_cmd_createArray(a, isRemote)


```javascript
var newObj = { data : [], __id : a[1] }
var hash = this._getObjectHash();
hash[newObj.__id] = newObj;
if(!(isRemote )) {
    this.writeCommand(a, newObj);
} 
```

### <a name="commad_trait__cmd_createObject"></a>commad_trait::_cmd_createObject(a, isRemote)


```javascript
var newObj = { data : {}, __id : a[1] }
var hash = this._getObjectHash();
hash[newObj.__id] = newObj;
if(!(isRemote)) {
    this.writeCommand(a, newObj);
} 
```

### <a name="commad_trait__cmd_moveToIndex"></a>commad_trait::_cmd_moveToIndex(a, isRemote)


```javascript
var obj = this._find( a[4] ),
    prop = "*",
    len = obj.data.length,
    targetObj,
    i = 0;

for(i=0; i< len; i++) {
    var m = obj.data[i];
    if(m.__id == a[1]) {
        targetObj = m;
        break;
    }
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
if(targetObj) {
    var targetIndex = parseInt(a[2]);

    _execInfo.fromIndex = i;
    
    obj.data.splice(i, 1);
    obj.data.splice(targetIndex, 0, targetObj);
    this._cmd(a, obj, targetObj);
    
    if(!(isRemote || _isRemoteUpdate)) {
        this.writeCommand(a);
    }           
    
}
```

### <a name="commad_trait__cmd_pushToArray"></a>commad_trait::_cmd_pushToArray(a, isRemote)


```javascript
var parentObj = this._find( a[4] ),
    insertedObj = this._find( a[2] ),
    prop = "*",
    index = parentObj.data.length; // might check if valid...

// Moving the object in the array
if( parentObj && insertedObj) {
    
    // Do not isert the item into the array 2 times, test for that error
    if(!insertedObj.__p || ( insertedObj.__p != parentObj.__id) ) {
    
        // now the object is in the array...
        parentObj.data.push( insertedObj );
        insertedObj.__p = parentObj.__id;
        this._cmd(a, parentObj, insertedObj);
        
        // ?? is this required in this particular case??
        
        this._moveCmdListToParent(insertedObj);
        
        // Saving the write to root document
        if(!isRemote) {
            this.writeCommand(a);
        }  
    }
}
```

### <a name="commad_trait__cmd_removeObject"></a>commad_trait::_cmd_removeObject(a, isRemote)


```javascript

var parentObj = this._find( a[4] ),
    removedItem = this._find( a[2] ),
    prop = "*",
    index = parentObj.data.indexOf( removedItem ); // might check if valid...

// Moving the object in the array
if( parentObj && removedItem) {

    // now the object is in the array...
    parentObj.data.splice( index, 1 );
    
    // Adding extra information to the object about it's removal
    removedItem.__removedAt = index;
    
    this._cmd(a, parentObj, removedItem);
    removedItem.__p = null; // must be set to null...
    
    // Saving the write to root document
    if(!isRemote) {
        this.writeCommand(a);
    }        
    
}
```

### <a name="commad_trait__cmd_setProperty"></a>commad_trait::_cmd_setProperty(a, isRemote)


```javascript
var obj = this._find( a[4] ),
    prop = a[1];

if(obj) {
    
    _execInfo.oldValue = obj.data[prop];
    
    obj.data[prop] = a[2]; // value is now set...
    this._cmd(a, obj, null);
    
    // Saving the write to root document
    if(!isRemote) {
        this.writeCommand(a);
    } 
    this._fireListener(obj, prop);

}
```

### <a name="commad_trait__cmd_setPropertyObject"></a>commad_trait::_cmd_setPropertyObject(a, isRemote)


```javascript
var obj = this._find( a[4] ),
    prop = a[1],
    setObj = this._find( a[2] );

if(!obj) return;
if(!setObj) return;        

obj.data[prop] = setObj; // value is now set...
setObj.__p = obj.__id; // The parent relationship
this._cmd(a, obj, setObj);

if(!isRemote) {
    this._moveCmdListToParent(setObj);
    this.writeCommand(a);
} 
```

### <a name="commad_trait__cmd_unsetProperty"></a>commad_trait::_cmd_unsetProperty(a, isRemote)


```javascript
var obj = this._find( a[4] ),
    prop = a[1];

if(obj && prop) {
    // unsetting a property does not work right now...
    delete obj.data[prop];
    if(!isRemote) this.writeCommand(a);
}         

       
```

### <a name="commad_trait__fireListener"></a>commad_trait::_fireListener(obj, prop)


```javascript
if(_listeners) {
    var lName = obj.__id+"::"+prop,
        eList = _listeners[lName];
    if(eList) {
        eList.forEach( function(fn) {
            fn( obj, obj.data[prop] );
        })
    }
}
```

### <a name="commad_trait__moveCmdListToParent"></a>commad_trait::_moveCmdListToParent(t)


```javascript

```

### <a name="commad_trait_execCmd"></a>commad_trait::execCmd(a, isRemote)


```javascript

var c = _cmds[a[0]];
if(c) {
    return c.apply(this, [a, isRemote]);
}
```

### commad_trait::constructor( t )

```javascript
if(!_listeners) {
    _listeners = {};
    _execInfo = {};
}


if(!_cmds) {
    
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
    
}
```
        

    
    


   
      
    
      
    



      
    




