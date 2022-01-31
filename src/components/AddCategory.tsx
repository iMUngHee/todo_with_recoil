import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoriesState, categoryState } from "./atoms";

interface IForm {
  category: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40rem;
  background-color: ${(prop) => prop.theme.bgColor};
  border-radius: 10px;
  @media only screen and (max-width: 768px) {
    width: 300px;
    border-radius: 5px;
  }
`;

const Form = styled.form`
  flex: 1;
  display: flex;
`;

const Delete = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.8);
  @media only screen and (max-width: 768px) {
    font-size: 15px;
    padding: 0.5rem;
  }
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    padding: 0.1rem;
  }
`;

const Add = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  padding: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.8);
  @media only screen and (max-width: 768px) {
    font-size: 20px;
    padding: 0.5rem;
  }
`;

const AddCategory = () => {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setCategories = useSetRecoilState(categoriesState);
  const setCategory = useSetRecoilState(categoryState);
  const curCategory = useRecoilValue(categoryState);
  const onSubmit = ({ category }: IForm) => {
    setCategory(category);
    setCategories((prev) => {
      const newCategories = [...prev, category];
      localStorage.setItem("Categories", JSON.stringify(newCategories));
      return newCategories;
    });
    setValue("category", "");
  };
  const onRemove = () => {
    if (
      curCategory === "TO_DO" ||
      curCategory === "DOING" ||
      curCategory === "DONE" ||
      curCategory === ""
    )
      return;
    setCategories((prev) => {
      const updateList = prev?.filter((category) => category !== curCategory);
      localStorage.setItem("Categories", JSON.stringify(updateList));
      return updateList;
    });
    setCategory("TO_DO");
  };
  return (
    <Container>
      <Delete onClick={onRemove}>X</Delete>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("category")} placeholder="Add a custom category" />
        <Add>+</Add>
      </Form>
    </Container>
  );
};

export default AddCategory;
