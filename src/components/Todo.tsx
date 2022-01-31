import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, ITodo, todoState } from "./atoms";

const List = styled.li`
  list-style-type: none;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  font-size: 20px;
  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
  @media only screen and (max-width: 768px) {
    padding-left: 0.3rem;
    font-size: 10px;
  }
`;

const Text = styled.span`
  flex: 1;
  width: 20rem;
  padding: 1rem;
  @media only screen and (max-width: 768px) {
    padding: 0.4rem;
    width: 150px;
  }
  color: white;
  word-wrap: break-word;
`;

const Buttons = styled.div`
  display: flex;
  background-color: ${(prop) => prop.theme.activeColor};
  border-radius: 10px 0 0 10px;
  @media only screen and (max-width: 768px) {
    border-radius: 2px 0px 0px 2px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 0.3rem;
  color: #aece9f;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0.05rem;
  }
`;

const Todo = ({ text, category, id }: ITodo) => {
  const setToDos = useSetRecoilState(todoState);
  const categories = useRecoilValue(categoriesState);
  const exCategories = categories.filter((cur) => cur !== category);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const update = { text, id, category: name as ITodo["category"] };
      const updateList = [
        ...prev.slice(0, targetIndex),
        update,
        ...prev.slice(targetIndex + 1),
      ];
      localStorage.setItem("ToDos", JSON.stringify(updateList));
      return updateList;
    });
  };
  const onRemove = () => {
    setToDos((prev) => {
      const updateList = prev.filter((todo) => +id !== todo.id);
      localStorage.setItem("ToDos", JSON.stringify(updateList));
      return updateList;
    });
  };
  return (
    <List>
      <Text>{text}</Text>
      <Buttons>
        {exCategories.map((category, idx) => (
          <Button key={idx} name={category} onClick={onClick}>
            {category}
          </Button>
        ))}
        <Button onClick={onRemove}>Delete</Button>
      </Buttons>
    </List>
  );
};

export default Todo;
