import { atom, selector } from "recoil";

const todoData = localStorage.getItem("ToDos");
const todoJSON = JSON.parse(todoData as any);

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface ITodo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
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
    if (category === Categories.TO_DO)
      return todos.filter((todo) => todo.category === Categories.TO_DO);
    if (category === Categories.DOING)
      return todos.filter((todo) => todo.category === Categories.DOING);
    if (category === Categories.DONE)
      return todos.filter((todo) => todo.category === Categories.DONE);
  },
});
