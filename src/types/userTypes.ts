import { Category } from "./categoryTypes";
export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
    categories: Category[];
}
  