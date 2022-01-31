import { atom, selector } from "recoil";

const todoData = localStorage.getItem("ToDos");
const todoJSON = JSON.parse(todoData as any);

const categoriesData = localStorage.getItem("Categories");
const categoriesJSON = JSON.parse(categoriesData as any);

export const categoriesState = atom<string[]>({
  key: "categories",
  default: categoriesJSON || ["TO_DO", "DOING", "DONE"],
});

export interface ITodo {
  text: string;
  id: number;
  category: string;
}

export const categoryState = atom<string>({
  key: "category",
  default: "TO_DO",
});

export const todoState = atom<ITodo[]>({
  key: "todo",
  default: todoJSON || [],
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todos = get(todoState);
    const category = get(categoryState);
    return todos.filter((todo) => todo.category === category);
  },
});
