import { FiPlusSquare } from "react-icons/fi";
import { Container } from "./styles";
import { RiShutDownLine } from "react-icons/ri";
import HeaderProps from "../../types/HeaderProps";
import { useAuth } from "../../hooks/useAuth";

export default function Header({ openModal }: HeaderProps) {
  const { handleLogout, isLogged } = useAuth();
  return (
    <Container>
      <header>
        {isLogged && (
          <>
            <button type="button" onClick={openModal}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>

            <button onClick={handleLogout}>
              <div className="icon">
                <RiShutDownLine size={24} color="#fff" />
              </div>
            </button>
          </>
        )}
      </header>
    </Container>
  );
}
