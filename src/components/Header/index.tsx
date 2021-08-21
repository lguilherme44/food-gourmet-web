import { FiPlusSquare } from "react-icons/fi";
import HeaderProps from "../../types/HeaderProps";
import { Container } from "./styles";

export default function Header({ openModal }: HeaderProps) {
  return (
    <Container>
      <header>
        <h1>{/* <b>F</b>ood Gourmet */}</h1>
        <nav>
          <div>
            <button type="button" onClick={openModal}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
}
