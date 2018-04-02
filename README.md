# battlegrounds
PUBG Web API wrapper for nodejs

- [Installation](#install)
- [Usage](#usage)
- [Description](#description)
- [Examples](https://github.com/feed4rz/node-battlegrounds/tree/master/examples)
- [Classes](#classes)
- - [API](#api)
- - [Player](#player)
- - [Match](#match)


# Install
Clone this repo and include **index.js** or install via npm:
```
npm install battlegrounds
```


# Usage
Requiring a module returns [API](#api) class:
```JS
const battlegrounds = require('battlegrounds')

const api = new battlegrounds(APIKEY, 'pc-eu')

// Get a player
const res = await api.players({ names: ['shroud'] })
```


# Description
The main focus of this module is it's ease of use.

For example, getting a player returns its class that contains other properties methods of which can be used:
```JS
const res = await api.players({ names: ['shroud'] })

// Is a member of Player class
const player = res[0]

// Get first match. Match class is returned
const match = player.matches[0].get()
```


# Classes
List of all classes returned by a module

## API(apikey[, platform])
Is returned by module when required

- **apikey** - your apikey (you can get it [here](https://developer.playbattlegrounds.com))
- **platform** (optional) - default platform id to be included as a parameter in every method. Full list [here](https://documentation.playbattlegrounds.com/en/making-requests.html#regions)

### API.matches(params)
Currently return a single [Match](#match) class, defined by the following **params**:

- **id** - [Match](#match) id

### API.players(params)
Returns a list of [Player](#player) classes or a single [Player](#player) class depending on the **params**:

- **id** (optional) - [Player](#player) id. Method will return a single [Player](#player) class if provided.
- **ids** (optional) - An array of [Player](#player) ids. Method will return a list of [Player](#player) classes if provided.
- **names** (optional) - An array of [Player](#player) names. Method will also return a list of [Player](#player) classes.

**Note**: at least one of those parameters have to be provided, in other cases "MissingParameter" error will be thrown


## Player
Represents a Player. If only contains its **id**, **get** method has to be called to get full info about itself.

### Player.get()
Calls an API to get Player's full info and returns itself.

## Match
Represents a Match. If only contains its **id**, **get** method has to be called to get full info about itself.

### Match.get()
Calls an API to get Match's full info and returns itself.
