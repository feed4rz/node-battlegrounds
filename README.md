# battlegrounds
PUBG Web [API](https://documentation.playbattlegrounds.com) wrapper for nodejs

- [Installation](#install)
- [To Do](#todo)
- [Usage](#usage)
- [Description](#description)
- [Examples](https://github.com/feed4rz/node-battlegrounds/tree/master/examples)
- [Classes](#classes)
- - [API](#apiapikey-platform)
- - [Player](#player)
- - [Match](#match)

# Todo
- Telemetry
- Rosters class (not yet introduced in API)
- Assets class
- Spectators class (not yet introduced in API)
- Rounds class (not yet introduced in API)

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
const res = await api.getPlayers({ names: ['shroud'] })
```


# Description
The main focus of this module is it's ease of use.

For example, getting a player returns its class that contains other properties methods of which can be used:
```JS
const res = await api.getPlayers({ names: ['shroud'] })

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

### API.getMatch(params)
Returns a [Match](#match) class

- **id** - [Match](#match) id

### API.getPlayers(params)
Returns a list of [Player](#player) classes

- **ids** (optional) - An array of [Player](#player) ids
- **names** (optional) - An array of [Player](#player) names

**Note**: at least one of those parameters have to be provided, in other cases "MissingParameter" error will be thrown

### API.getPlayer(params)
Returns a [Player](#player) class

- **id** - [Player](#player) id


## Player
Represents a Player. If only contains its **id**, [get](#playerget) method has to be called to get full info about itself.

- **id** - Player id. Has a format of ```account.x``` where x - 32 char hex
- **attributes**
- - **Name** - Player name
- - **shardId** - platform id (as described in [Usage](#usage))
- - **createdAt** - date when the object was created
- - **patchVersion**
- - **titleId**
- **matches** - An array of Player [Matches](#match)
- **assets** - An array of Player Assets

### Player.get()
Calls an API to get Player's full info and returns itself.

## Match
Represents a Match. If only contains its **id**, **get** method has to be called to get full info about itself.

- **id** - Match id. Has a format of ```a-b-b-b-c``` where a - 8 char hex, b - 4 char hex, c - 12 char hex
- **attributes**
- - **createdAt** - date when the object was created
- - **duration** - duration time in seconds
- - **gameMode** - game mode (for ex duo-fpp, squad-tpp, etc)
- - **patchVersion**
- - **shardId** - platform id (as described in [Usage](#usage))
- - **stats**
- - **tags**
- - **titleId**
- **rosters** - An array of Rosters
- **assets** - An array of Assets
- **rounds** - An array of Rounds
- **spectators** - An array of Spectators

### Match.get()
Calls an API to get Match's full info and returns itself.
