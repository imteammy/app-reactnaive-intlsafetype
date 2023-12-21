import * as React from "react";
import { create } from "zustand";

export type Todos = {
  id: number;
  title: string;
  compleate: boolean;
};

export type TodoStore = {
  todos: Todos[];
  addTodo: (tetx: string) => void;
  removeTodo: (index: number) => void;
};

export const todoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: 0,
      title: "todo 1",
      compleate: false,
    },
  ],
  addTodo: (text: string) =>
    set(({ todos }) => ({
      todos: [
        ...todos,
        {
          id: todos.length + 1,
          title: text,
          compleate: false,
        },
      ],
    })),
  removeTodo: (index: number) =>
    set(({ todos }) => {
      const updatedTodos = todos.reduce((acc: Todos[], todo, i) => {
        if (i !== index) {
          acc.push({ ...todo, id: acc.length });
        }
        return acc;
      }, []);
      return { todos: updatedTodos };
    }),
}));

export function useTodoStore() {
  return <div>todoStore</div>;
}
