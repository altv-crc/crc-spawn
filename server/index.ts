import * as alt from 'alt-server';
import * as shared from 'alt-shared';
import * as crc from '@stuyk/cross-resource-cache';

const defaultSpawn = new alt.Vector3(0, 0, 72);

crc.database.onReady(() => {});

interface Character {
    _id: string;
    pos: alt.Vector3;
    appearance: shared.Appearance;
}

crc.events.onSync(async (entity: alt.Entity) => {
    if (!(entity instanceof alt.Player)) {
        return;
    }

    alt.logDebug('crc-spawn | Synchronized Character... Spawning...');
    alt.emit('crc-appearance-apply', entity, crc.data.getValue<shared.Appearance>(entity, 'appearance'));

    const pos = crc.data.getValue<alt.Vector3>(entity, 'pos');

    if (!pos) {
        alt.logDebug('crc-spawn | Fresh Spawn');
        entity.pos = defaultSpawn;
        await crc.data.setValue(entity, 'pos', defaultSpawn);
        alt.emit('crc-spawn-new-spawn', entity);
    } else {
        alt.logDebug('crc-spawn | Existing Spawn');
        entity.pos = pos;
    }

    entity.dimension = 0;
    entity.visible = true;
    entity.frozen = false;

    alt.emit('crc-spawn-spawned', entity);
});

async function handleSpawn(player: alt.Player, _id: string) {
    const character = await crc.database.get<Character>({ _id }, 'characters');
    if (!character) {
        player.kick(`Character is unavailable. Rejoin.`);
        return;
    }

    alt.logDebug(`crc-spawn | Attempting to synchronize character... ${_id}`);
    await crc.data.sync(player, _id, 'characters');
}

alt.on('crc-select-character-finish', handleSpawn);
alt.on('crc-create-character-finish', handleSpawn);
