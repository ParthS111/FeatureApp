import { ResultSet, SQLiteDatabase } from 'react-native-sqlite-storage';
import { connectToDatabase } from './db';

export interface UserListProps {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

export const UserInfo = async (userInfo: UserListProps) => {
  const db: SQLiteDatabase = await connectToDatabase();

  const userInfoQuery = `
  INSERT INTO UserInfo (firstName, lastName, password, phoneNumber)
  VALUES ( ?,?,?,?)`;
  const values = [
    userInfo.firstName,
    userInfo.lastName,
    userInfo.password,
    userInfo.phoneNumber,
  ];
  console.log(values);

  try {
    const result = await db.executeSql(userInfoQuery, values);
    console.log(result, '<===result');

    return result;
  } catch (error) {
    console.error(error);
    throw Error('Failed to add contact');
  }
};

export const getUserInfo = async (): Promise<UserListProps | null> => {
  try {
    const db: SQLiteDatabase = await connectToDatabase();
    const getUserInfoQuery = `SELECT * FROM UserInfo`;
    const [resultSet]: [ResultSet] = await db.executeSql(getUserInfoQuery);

    if (resultSet.rows.length > 0) {
      return resultSet.rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

export const addContact = async (userList: UserListProps) => {
  const db: SQLiteDatabase = await connectToDatabase();
  const insertQuery = `
     INSERT INTO UserList (firstName, lastName,password, phoneNumber)
     VALUES (?, ?, ?, ?)
   `;
  const values = [
    userList.firstName,
    userList.lastName,
    userList.password,
    userList.phoneNumber,
  ];
  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw Error('Failed to add contact');
  }
};

export const getContacts = async (): Promise<UserListProps[]> => {
  try {
    const db: SQLiteDatabase = await connectToDatabase();
    const contacts: UserListProps[] = [];
    const results = await db.executeSql('SELECT * FROM UserList');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        contacts.push(result.rows.item(index));
      }
    });
    return contacts;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Contacts from database');
  }
};
