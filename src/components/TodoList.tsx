import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, todoSelector } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Container = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  margin: 0 auto;
  border-radius: 20px;
  width: 40rem;
  height: 40rem;
`;

const Form = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  select {
    color: ${prop => prop.theme.textColor};
    padding-left: 1rem;
    background: none;
    border: none;
    font-size: 15px;
  }
  border-bottom: 1px solid white;
`;
const List = styled.div`
  width: 100%;
  height: 36rem;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const TodoList = () => {
  const toDos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e: React.FocusEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as any);
  };
  return (
    <Container>
      <Form>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <CreateTodo />
      </Form>
      <List>
        {toDos?.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
