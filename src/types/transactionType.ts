import { Category } from './categoryTypes'
import { Type } from './type'
export type TransactionType = {
    id: number;
    type: Type;
    category: Category;
    value: number;
    date: string;
    createdAt: string;
    updatedAt: string;
}
  