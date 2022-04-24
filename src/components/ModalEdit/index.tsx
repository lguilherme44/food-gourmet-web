import { FiCheckSquare } from "react-icons/fi";
import { Form } from "./styles";
import Modal from "../Modal";
import EditFood from "../../types/EditFood";
import { useForm } from "react-hook-form";

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (data: EditFood) => void;
  editingFood: EditFood;
}

export default function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood,
}: ModalEditFoodProps) {
  const { register, handleSubmit } = useForm<EditFood>();

  const handleSubmitForm = handleSubmit((data) => {
    handleUpdateFood(data);
    setIsOpen();
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmitForm}>
        <h1>Editar Produto</h1>
        {editingFood.image && (
          <>
            <img
              src={editingFood.image}
              width="150"
              height="150"
              alt="Imagem Produto"
            />
          </>
        )}

        <input {...register("image")} type="file" />

        <input
          placeholder="Titulo"
          defaultValue={editingFood.name}
          {...register("name")}
        />
        <input
          placeholder="Valor"
          defaultValue={editingFood.price}
          {...register("price")}
          type="number"
          step=".01"
        />

        <textarea
          placeholder="Descrição"
          defaultValue={editingFood.description}
          {...register("description")}
        />

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
