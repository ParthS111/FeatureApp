import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

export type Table = 'Contacts' | 'UserList' | 'UserInfo' | 'Budget';

export const connectToDatabase = async () => {
  return openDatabase(
    { name: 'BudgetApp.db', location: 'default' },
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const contactsQuery = `
     CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        name TEXT,
        phoneNumber TEXT
     )
    `;

  const userList = `
    CREATE TABLE IF NOT EXISTS UserList(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName Text,
        lastName Text,
        password Text,
        phoneNumber Text
    )
    `;
  const userInfo = `
    CREATE TABLE IF NOT EXISTS UserInfo(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName Text,
        lastName Text,
        password Text,
        phoneNumber Text
    )
    `;
  const budgetList = `
    CREATE TABLE IF NOT EXISTS Budget(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title Text,
      description Text,
      price INTEGER,
      userId INTEGER
    )
    `;
  try {
    await db.executeSql(contactsQuery);
    await db.executeSql(userList);
    await db.executeSql(userInfo);
    await db.executeSql(budgetList);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};

export const getTableNames = async (): Promise<string[]> => {
  try {
    const db = await connectToDatabase();
    const tableNames: string[] = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );

    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        tableNames.push(result.rows.item(index).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get table names from database');
  }
};

export const removeTable = async (tableName: Table) => {
  const db = await connectToDatabase();
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};

enablePromise(true);
