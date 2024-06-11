import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { connectToDatabase } from './db';
import { getUserInfo, getUserList, UserInfo, UserListProps } from './userList';

export interface BudgetProps {
  id?: number;
  title: string;
  description: string;
  price: number;
  userId: number;
}

export const addBudget = async (budget: BudgetProps): Promise<boolean> => {
  const db: SQLiteDatabase = await connectToDatabase();
  const addItem = `
  INSERT INTO Budget (title, description, price, userId)
  VALUES (?, ?, ?, ?)
  `;
  const values = [
    budget.title,
    budget.description,
    budget.price,
    budget.userId,
  ];
  try {
    await db.executeSql(addItem, values);
    return true;
  } catch (error) {
    return false;
  }
};

export const getBudget = async (): Promise<BudgetProps[]> => {
  try {
    const db: SQLiteDatabase = await connectToDatabase();
    const budgetList: BudgetProps[] = [];
    const userInfo = await getUserInfo();
    const userList = await getUserList();
    const getCurrentUser: UserListProps | undefined = userList?.find(
      item => item?.phoneNumber === userInfo?.phoneNumber,
    );

    const results = await db.executeSql(
      `SELECT * FROM Budget WHERE id = ${getCurrentUser?.id}`,
    );
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        budgetList.push(result.rows.item(index));
      }
    });
    return budgetList;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get Contacts from database');
  }
};
