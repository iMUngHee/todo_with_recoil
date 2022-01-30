import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, todoState } from "./atoms";

interface IForm {
  todo: string;
}
const Form = styled.form`
  flex: 1;
  display: flex;
`;

const Input = styled.input`
  color: ${(prop) => prop.theme.activeColor};
  background: none;
  border: none;
  outline: none;
  flex: 1;
  padding: 1rem;
  font-size: 20px;
  &::placeholder {
    color: ${prop => prop.theme.textColor};
  }
`;
const Button = styled.button`
  color: ${(prop) => prop.theme.textColor};
  background: none;
  border: none;
  outline: none;
  padding-left: 1rem;
  padding-right: 2rem;
  font-size: 30px;
`;

const CreateTodo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const onSubmit = ({ todo }: IForm) => {
    setToDos((prev) => {
      const todos = [...prev, { text: todo, id: Date.now(), category }];
      localStorage.setItem("ToDos", JSON.stringify(todos));
      return todos;
    });
    setValue("todo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("todo", {
          required: "Please write a TODO.",
        })}
        placeholder="Write a to do"
      />
      <Button>+</Button>
    </Form>
  );
};

export default CreateTodo;
