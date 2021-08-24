import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import EditFood from "../../types/EditFood";
import InputImage from "../InputImage";

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (data: EditFood) => void;
  editingFood: Record<string, any> | undefined;
}

export default function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood,
}: ModalEditFoodProps) {
  const formRef = useRef(null);

  const handleSubmit = async (data: EditFood) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Produto</h1>
        <InputImage name="image" placeholder="Selecione a imagem" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Produto</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
