import * as migration_20250318_140134 from './20250318_140134';

export const migrations = [
  {
    up: migration_20250318_140134.up,
    down: migration_20250318_140134.down,
    name: '20250318_140134'
  },
];
