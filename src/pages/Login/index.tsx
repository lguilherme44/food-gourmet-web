import React, { useRef } from "react";
// import api from "../../services/api";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form, Container, Main } from "./styles";
import Input from "../../components/Input";
import { FiLogIn } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler = async (data) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message);
        });
      }
    }
  };

  return (
    <Container>
      <Main>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Food Gourmet</h1>
          <Input name="email" placeholder="E-mail" icon={HiOutlineMail} />
          <Input
            name="password"
            placeholder="Password"
            icon={RiLockPasswordLine}
          />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Entrar</p>
            <div className="icon">
              <FiLogIn size={24} />
            </div>
          </button>
        </Form>
      </Main>
    </Container>
  );
};

export default Login;
