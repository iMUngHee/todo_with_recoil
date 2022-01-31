import React, { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState, todoSelector } from "./atoms";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

const Container = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  border-radius: 20px 20px 0 0;
  width: 40rem;
  height: 40rem;
  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const Form = styled.div`
  width: 100%;
  height: 4rem;
  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 30px;
  }
  display: flex;
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    color: ${(prop) => prop.theme.textColor};
    padding-left: 1rem;
    background: none;
    border: none;
    font-size: 15px;
    &:hover {
      color: #c4c4c4;
    }
    @media only screen and (max-width: 768px) {
      padding-left: 0.5rem;
      font-size: 10px;
    }
  }
  border-bottom: 1px solid white;
`;

const List = styled.div`
  width: 100%;
  height: 36rem;
  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 270px;
  }
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TodoList = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const toDos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoriesState);
  const onInput = (e: React.FocusEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setCategory(value as any);
  };
  console.log(categories);
  console.log(category);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [toDos]);
  return (
    <Container>
      <Form>
        <select value={category} onInput={onInput}>
          {categories?.map((category, idx) => {
            return (
              category && (
                <option key={idx} value={category}>
                  {category}
                </option>
              )
            );
          })}
        </select>
        <CreateTodo />
      </Form>
      <List>
        {toDos?.map((todo) => {
          return <Todo key={todo.id} {...todo} />;
        })}
        <div ref={scrollRef} />
      </List>
    </Container>
  );
};

export default TodoList;
