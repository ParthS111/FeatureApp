import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { connectToDatabase } from './db';

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
