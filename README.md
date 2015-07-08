# _channelData command runner

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
1. `1``
2. GUID of the object to be created

```javascript
[1, "<GUID>", "", " ", ""]
```

## Create Array 

Parameters:
1. `2``
2. GUID of the array to be created

```javascript
[2, "<GUID>", "", " ", ""]
```


## Set value property of object

This command sets a value property (integer or string) to Object

Parameters:
1. `4``
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
1. `4``
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
1. `7``
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
1. `8``
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
1. `12``
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
1. `13``
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
