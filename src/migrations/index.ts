import * as migration_20250317_133706 from './20250317_133706';
import * as migration_20250317_140136 from './20250317_140136';

export const migrations = [
  {
    up: migration_20250317_133706.up,
    down: migration_20250317_133706.down,
    name: '20250317_133706',
  },
  {
    up: migration_20250317_140136.up,
    down: migration_20250317_140136.down,
    name: '20250317_140136'
  },
];
