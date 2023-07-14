import * as alt from 'alt-server';

declare module 'alt-server' {
    interface ICustomEmitEvent {
        /**
         * Called when it's a brand new character spawning
         *
         * @memberof ICustomEmitEvent
         */
        'crc-spawn-new-spawn': (player: alt.Player) => void;

        /**
         * Called when it's a pre-existing character spawning
         *
         * @memberof ICustomEmitEvent
         */
        'crc-spawn-spawned': (player: alt.Player) => void;
    }
}
