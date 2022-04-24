import { FiCheckSquare } from "react-icons/fi";
import { Form } from "./styles";
import Modal from "../Modal";
import AddFood from "../../types/AddFood";
import { useForm } from "react-hook-form";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: AddFood) => void;
}

export default function ModalAddFood({
  isOpen,
  setIsOpen,
  handleAddFood,
}: ModalAddFoodProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFood>();

  const handleSubmitForm = handleSubmit((data) => {
    handleAddFood(data);
    setIsOpen();
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmitForm}>
        <h1>Novo Produto</h1>

        <input {...register("image", { required: true })} type="file" />
        {errors.image && <strong>Imagem obrigatória</strong>}

        <input {...register("name", { required: true })} placeholder="Titulo" />
        {errors.name && <strong>Titulo obrigatório</strong>}

        <input
          {...register("price", { required: true })}
          placeholder="Valor"
          type="number"
          step=".01"
        />
        {errors.price && <strong>Valor obrigatório</strong>}

        <textarea {...register("description")} placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Produto</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
