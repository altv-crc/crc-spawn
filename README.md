# [CRC][TS] Select Character

<sup>Supported by <a href="https://github.com/orgs/altv-crc/">CRC</a></sup>

![](https://i.imgur.com/VCpvEJ6.png)

Spawns a fresh character, or uses existing `pos` to spawn the player.

## Requires

- [CRC DB](https://github.com/altv-crc/crc-db)
- Login Plugin (Choose 1)
  - [CRC Dicord Login](https://github.com/altv-crc/crc-discord-login)
  - [CRC Login](https://github.com/altv-crc/crc-login)
- [CRC Select Character](https://github.com/altv-crc/crc-select-character)
- [CRC Create Character](https://github.com/altv-crc/crc-create-character)
- [CRC Appearance](https://github.com/altv-crc/crc-appearance)

_Highly recommended to get the extension, for better event handling._

## Installation

1. Create a folder in your `src` folder called `crc-spawn`.

2. Add the `TypeScript` files from this resource, to that folder.

3. Modify `server.toml` and ensure it loads whatever you named the folder.

In the case of the example above it should be `crc-spawn`.

```
resources = [ 
    ...
    'crc-spawn'
    ...
]
```

_Your resource structure may vary_

## Developers

Spawning will auto synchronize a character to allow for `crc` to have data set against the character.

This means you can use the `crc.data.setValue` methods to update database data with any key / value pair.

### Server Events

#### crc-spawn-new-spawn

Called when a `pos` in the document has never been set; and has been set for the first time.

```ts
alt.on('crc-spawn-new-spawn', (player: alt.Player) => {})
```

#### crc-spawn-spawned

Called for all spawn instances. Called immediately after a character has been spawned and synchronized.

```ts
alt.on('crc-spawn-spawned', (player: alt.Player) => {})
```