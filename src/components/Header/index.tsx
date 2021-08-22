import { FiPlusSquare } from "react-icons/fi";
import HeaderProps from "../../types/HeaderProps";
import { Container } from "./styles";
import { RiShutDownLine } from "react-icons/ri";

export default function Header({ openModal }: HeaderProps) {
  return (
    <Container>
      <header>
        <button type="button" onClick={openModal}>
          <div className="text">Novo Prato</div>
          <div className="icon">
            <FiPlusSquare size={24} />
          </div>
        </button>

        <button>
          <div className="icon">
            <RiShutDownLine size={24} color="#c72828" />
          </div>
        </button>
      </header>
    </Container>
  );
}
