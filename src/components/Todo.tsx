import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, ITodo, todoState } from "./atoms";

const List = styled.li`
  list-style-type: none;
  padding-left: 1rem;
  display: flex;
  font-size: 20px;
  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const Text = styled.span`
  flex: 1;
  width: 20rem;
  padding: 0.5rem;
  color: white;
  word-wrap: break-word;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${prop => prop.theme.activeColor};
  border-radius: 5px;
`;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0.3rem;
  color: white;
`

const Todo = ({ text, category, id }: ITodo) => {
  const setToDos = useSetRecoilState(todoState);
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
        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}
        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )}
        <Button onClick={onRemove}>Delete</Button>
      </Buttons>
    </List>
  );
};

export default Todo;
