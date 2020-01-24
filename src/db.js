import Dexie from 'dexie';

const db = new Dexie('DictionariesDB');
db.version(2).stores({
  dictionaries: '++id, title',
  // all dictionary records in one table saved at the moment for some reasons .
  records: '++id, dictionary_title, domain, range'
});

export default db;
