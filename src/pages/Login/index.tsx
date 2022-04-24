import { Form, Container, Main } from "./styles";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import ReactLoading from "react-loading";
import { useForm } from "react-hook-form";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleLogin, isLoading } = useAuth();

  const handleSubmitForm = handleSubmit((data) => {
    handleLogin(data.email, data.password);
  });

  return (
    <Container>
      <Main>
        <Form onSubmit={handleSubmitForm}>
          <h1>Food Gourmet</h1>
          <input
            {...register("email", { required: true })}
            placeholder="E-mail"
          />
          {errors.email && <strong>E-mail obrigatório</strong>}

          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <strong>Password obrigatório</strong>}

          <button type="submit" data-testid="add-food-button">
            <p className="text">{isLoading ? "Carregando..." : "Entrar"}</p>
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
