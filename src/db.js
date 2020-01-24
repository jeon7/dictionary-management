import Dexie from 'dexie';

const db = new Dexie('DictionariesDB');
db.version(1).stores({ dictionaries: '++id' });

export default db;
